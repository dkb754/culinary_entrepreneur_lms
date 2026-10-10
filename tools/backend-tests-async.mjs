// Backend integration tests for the self-paced CST product (cst-async-api) AND its isolation from the cohort build.
// Same setup as backend-tests.mjs: real Edge Functions on a local Supabase stack, rows read back with psql.
//   psql "$DB_URL" -f tests/backend/seed.sql ; API_URL=... DB_URL=... node tools/backend-tests-async.mjs
import { execFileSync } from 'node:child_process';
import { Reporter } from './lib/report.mjs';

const API = (process.env.API_URL || 'http://127.0.0.1:54321').replace(/\/$/, '');
const DB = process.env.DB_URL || 'postgresql://postgres:postgres@127.0.0.1:54322/postgres';
const R = new Reporter('Backend tests: CST Async (gates, isolation, uploads, admin)', 'backend-async');
const ok = (c, n, x = '') => R.check(c, n, x);
const eq = (a, b, n) => R.check(JSON.stringify(a) === JSON.stringify(b), n, `got ${JSON.stringify(a)}, expected ${JSON.stringify(b)}`);

const sql = q => execFileSync('psql', [DB, '-At', '-v', 'ON_ERROR_STOP=1', '-c', q], { encoding: 'utf8' }).trim();
const jsonQ = q => JSON.parse(sql(`select coalesce(json_agg(t), '[]'::json) from (${q}) t`) || '[]');
async function call(name, body, headers = {}) {
  const r = await fetch(`${API}/functions/v1/${name}`, { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(body) });
  let j = null; try { j = await r.json(); } catch { /* not json */ }
  return { status: r.status, body: j };
}
let ipN = 100;
const login = (code) => call('validate-login', { access_code: code }, { 'cf-connecting-ip': `198.51.100.${ipN++}` });
const api = (token, action, extra = {}) => call('cst-async-api', { token, action, ...extra });
const cohort = (token, action, extra = {}) => call('lms-api-v2', { token, action, ...extra });
async function session(code) { const r = await login(code); if (r.status !== 200) throw new Error(`login ${code} failed ${r.status}`); return r.body.token; }
const progress = name => jsonQ(`select * from public.student_progress where student_name = '${name}'`)[0];
async function t(name, fn) { try { await fn(); } catch (e) { ok(false, `${name}: unexpected error`, String(e && e.stack || e).split('\n').slice(0, 3).join(' | ')); } }

const WEEK = { 1: ['w1d1', 'w1d2', 'w1d3', 'w1d4'], 2: ['w2d1', 'w2d2', 'w2d3', 'w2d4'], 3: ['w3d1', 'w3d2', 'w3d3', 'w3d4'], 4: ['w4d1', 'w4d2'], 5: ['w5d1', 'w5d2', 'w5d3', 'w5d4'] };
const scores = (ids, score = 90) => Object.fromEntries(ids.map(id => [id, { score, correct: Math.round(score / 10), total: 10 }]));
const SA = 'CST Student A', SB = 'CST Student B';

async function upload(token, assignment, filename, bytes) {
  const c = await api(token, 'create-upload', { assignment, filename, size: bytes.length });
  if (c.status !== 200) return { c };
  const u = new URL(c.body.signedUrl); const base = new URL(API); u.protocol = base.protocol; u.host = base.host;
  const fd = new FormData(); fd.append('cacheControl', '3600'); fd.append('', new Blob([bytes], { type: c.body.mime }), filename);
  const put = await fetch(u, { method: 'PUT', body: fd });
  return { c, put };
}

// ---------------------------------------------------------------------------------------------------------------
R.section('Login and product isolation');
await t('login', async () => {
  const a = await login('CST-FIXTURE-A');
  ok(a.status === 200 && a.body.level === 'cst-async', 'an async code logs in and reports level cst-async', JSON.stringify(a));
  const c = await login('CI-FIXTURE-A');
  eq(c.body.level, 'L1', 'a cohort code still reports level L1');
  const ta = a.body.token, tc = c.body.token;
  const r1 = await api(tc, 'load');
  ok(r1.status === 403 && r1.body.error === 'wrong_product', 'a cohort session cannot use cst-async-api', JSON.stringify(r1));
  const r2 = await cohort(ta, 'load');
  ok(r2.status === 403 && r2.body.error === 'wrong_product', 'an async session cannot use lms-api-v2', JSON.stringify(r2));
  const r3 = await call('lms-api', { token: ta, action: 'load' });
  ok(r3.status === 403, 'an async session cannot use the old lms-api either', JSON.stringify(r3));
  const r4 = await api('not-a-token', 'load');
  eq(r4.status, 401, 'no session -> 401');
  const stored = sql(`select level from public.lms_sessions order by created_at desc limit 1`);
  ok(['L1', 'cst-async'].includes(stored), 'the session row records the product level');
});

R.section('Gates: progress-based, decided by the server');
const ta = await session('CST-FIXTURE-A');
await t('gates', async () => {
  const l = await api(ta, 'load');
  eq(l.body.progress.unlocked_weeks, [1], 'Week 1 is open on enrollment and nothing else');
  ok(l.body.settings.published_quizzes.length === 14 && !l.body.settings.published_quizzes.includes('w5d1'), 'Part 1 quizzes are published, Part 2 quizzes are not');
  const jump = await api(ta, 'save', { quizzes: scores([...WEEK[1], ...WEEK[2]]) });
  eq(Object.keys(jump.body.progress.quizzes).sort(), WEEK[1], 'quizzes from a locked week are ignored even when sent together with open ones');
  eq(jump.body.progress.unlocked_weeks, [1, 2], 'passing every Week 1 quiz opens Week 2');
  ok(WEEK[1].every(id => jump.body.progress.quizzes[id].at), 'each pass is timestamped (the 90-day clock)');
  const fail = await api(ta, 'save', { quizzes: scores(WEEK[2], 60) });
  eq(fail.body.progress.unlocked_weeks, [1, 2], 'scores under 70% do not open the next week');
  ok(fail.body.progress.quizzes.w2d1.passed === false, 'the failed attempt is recorded as not passed');
  const part = await api(ta, 'save', { quizzes: scores(WEEK[2].slice(0, 3)) });
  eq(part.body.progress.unlocked_weeks, [1, 2], 'three of four Week 2 quizzes is not enough');
  const w2 = await api(ta, 'save', { quizzes: scores(WEEK[2]) });
  eq(w2.body.progress.unlocked_weeks, [1, 2, 3], 'the fourth Week 2 pass opens Week 3');
  const first = jump.body.progress.quizzes.w1d1.at;
  const again = await api(ta, 'save', { quizzes: scores(['w1d1'], 100) });
  eq(again.body.progress.quizzes.w1d1.at, first, 'retaking a passed quiz keeps the original pass time');
  const down = await api(ta, 'save', { quizzes: scores(['w1d1'], 10) });
  eq(down.body.progress.quizzes.w1d1.score, 100, 'a worse retake never lowers the best score');
  const l2q = await api(ta, 'save', { quizzes: scores(['w5d1']) });
  ok(!l2q.body.progress.quizzes.w5d1, 'an unpublished Part 2 quiz cannot be scored');
});

R.section('Activities and uploads respect the gates');
await t('activities', async () => {
  const locked = await api(ta, 'save-activity', { id: 'a_w4d1_p1', score: 100 });
  ok(locked.status === 403 && locked.body.error === 'week_locked', 'activities in a locked week are refused', JSON.stringify(locked));
  const good = await api(ta, 'save-activity', { id: 'a_w1d1_p1', score: 80, texts: { a: 'hello' } });
  ok(good.status === 200 && good.body.progress.exercises.a_w1d1_p1.passed, 'an activity in an open week is saved');
  const l2 = await api(ta, 'save-activity', { id: 'a_w5d1_p1', score: 80 });
  eq(l2.status, 403, 'a Part 2 activity is refused before Part 2 is open');
  const bad = await api(ta, 'save-activity', { id: 'a_w9d1_p1', score: 80 });
  eq(bad.status, 400, 'week 9 is not a real activity id');
  const lab = await api(ta, 'save-activity', { id: 'a_w1lab_p1', score: 80 });
  eq(lab.status, 400, 'lab activity ids no longer exist');
  const early = await upload(ta, 'w4d3', 'brief.pdf', Buffer.from('%PDF-1.4 x'));
  ok(early.c.status === 403 && early.c.body.error === 'week_locked', 'the Concept Brief cannot be uploaded before Week 4 is open', JSON.stringify(early.c));
  const unk = await api(ta, 'create-upload', { assignment: 'w1lab', filename: 'x.pdf', size: 10 });
  eq(unk.status, 400, 'lab deliverables are gone (unknown assignment)');
});

R.section('Part 1 to Part 2 (quizzes + Concept Brief)');
await t('l2', async () => {
  await api(ta, 'save', { quizzes: scores(WEEK[3]) });
  const w4 = await api(ta, 'save', { quizzes: scores(WEEK[4]) });
  eq(w4.body.progress.unlocked_weeks, [1, 2, 3, 4], 'all of Part 1 passed still does not open Part 2 on its own');
  ok(w4.body.progress.l1_done === true && w4.body.progress.ready_l2 === false, 'Part 1 is done but not ready for Part 2 without the Concept Brief');
  ok(w4.body.progress.quizzes.w4d2.at, 'Quiz 14 (w4d2) carries the pass time that starts the 90-day check-in');
  const bytes = Buffer.from('%PDF-1.4 concept brief');
  const up = await upload(ta, 'w4d3', 'My Concept Brief.pdf', bytes);
  ok(up.c.status === 200 && up.put.ok, 'the signed upload works', JSON.stringify(up.c));
  ok(up.c.body.path.startsWith('cst-async/cst-student-a/concept-brief/'), 'the file goes under cst-async/{student}/{assignment}/', up.c.body.path);
  const rec = await api(ta, 'record-submission', { assignment: 'w4d3', path: up.c.body.path, filename: 'My Concept Brief.pdf' });
  ok(rec.status === 200 && rec.body.progress.ready_l2 === true, 'submitting the Concept Brief marks the student ready for Part 2', JSON.stringify(rec));
  eq(rec.body.progress.unlocked_weeks, [1, 2, 3, 4, 5], 'Part 2 Week 1 (week 5) opens automatically');
  eq(jsonQ(`select assignment_id, student_name from public.submissions where file_path = '${up.c.body.path}'`), [{ assignment_id: 'w4d3', student_name: SA }], 'the submission row is in the database');
  const steal = await api(ta, 'record-submission', { assignment: 'w4d3', path: 'cst-async/cst-student-b/concept-brief/x.pdf', filename: 'x.pdf' });
  eq(steal.status, 403, 'a student cannot record a path in someone else\'s folder');
  const act = await api(ta, 'save-activity', { id: 'a_w5d1_p1', score: 90 });
  eq(act.status, 200, 'Part 2 activities now save');
  eq(progress(SA).level, 'cst-async', 'the progress row is tagged cst-async');
});

R.section('Instructor tools');
const adm = await session('CST-FIXTURE-ADMIN');
await t('admin', async () => {
  const noAdmin = await api(ta, 'admin-overview');
  eq(noAdmin.status, 403, 'students cannot use instructor actions');
  const ov = await api(adm, 'admin-overview');
  ok(ov.body.roster.includes(SA) && !ov.body.roster.some(n => n.startsWith('CI ')), 'the instructor roster has async students only', JSON.stringify(ov.body.roster));
  ok(ov.body.submissions.every(s => s.file_path.startsWith('cst-async/')), 'only async submissions are listed');
  eq((await api(adm, 'load')).body.progress.unlocked_weeks.length, 8, 'instructor preview can read every week');
  const badCode = await api(adm, 'admin-create-student', { student_name: 'New Learner', access_code: 'abc' });
  eq(badCode.status, 400, 'a short access code is refused');
  const mk = await api(adm, 'admin-create-student', { student_name: 'New Learner', access_code: 'CST-NEW-LEARNER-1' });
  ok(mk.status === 200 && !JSON.stringify(mk.body).includes('LEARNER'), 'a student can be created and the code is not echoed back', JSON.stringify(mk));
  eq(sql(`select level from public.student_access_codes where student_name = 'New Learner'`), 'cst-async', 'the new code belongs to the async product');
  ok(!sql(`select access_code_hash from public.student_access_codes where student_name = 'New Learner'`).includes('LEARNER'), 'the code is stored hashed');
  const nl = await login('CST-NEW-LEARNER-1');
  ok(nl.status === 200 && nl.body.level === 'cst-async', 'the new student can sign in right away');
  const clash = await api(adm, 'admin-create-student', { student_name: 'CI Student A', access_code: 'CST-OTHER-CODE-2' });
  eq(clash.status, 409, 'an instructor cannot take over a cohort student\'s name');
  eq(sql(`select level from public.student_access_codes where student_name = 'CI Student A'`), 'L1', 'the cohort student is untouched');
  const un = await api(adm, 'admin-unlock', { student_name: 'New Learner', through: 3 });
  eq(un.body.progress.unlocked_weeks, [1, 2, 3], 'the optional override opens weeks up to the chosen one');
  eq((await api(adm, 'admin-unlock', { student_name: 'CI Student A', through: 3 })).status, 404, 'the override cannot reach a cohort student');
  const pub = await api(adm, 'admin-set-published', { quiz_id: 'w5d1', published: true });
  ok(pub.body.published_quizzes.includes('w5d1'), 'Part 2 quizzes can be published');
  const sc = await api(ta, 'save', { quizzes: scores(['w5d1']) });
  ok(sc.body.progress.quizzes.w5d1?.passed, 'once published (and Part 2 is open) a Part 2 quiz scores');
  await api(adm, 'admin-set-published', { quiz_id: 'w5d1', published: false });
  const dl = await api(adm, 'admin-file-url', { path: 'cst-async/cst-student-a/concept-brief/' + sql(`select split_part(file_path,'/',4) from public.submissions where student_name='${SA}' limit 1`) });
  ok(dl.status === 200 && /^https?:/.test(dl.body.url || ''), 'the instructor gets a short-lived download link');
});

R.section('Cohort API cannot see the self-paced course');
await t('cohort', async () => {
  const ca = await session('CI-FIXTURE-ADMIN');
  const ov = await cohort(ca, 'admin-overview');
  ok(ov.status === 200 && !ov.body.roster.some(n => n.startsWith('CST ') || n === 'New Learner'), 'the cohort roster does not list async students', JSON.stringify(ov.body.roster));
  ok(!Object.keys(ov.body.progress).some(n => n.startsWith('CST ')), 'cohort progress excludes async rows');
  ok(ov.body.submissions.every(s => !String(s.file_path).startsWith('cst-async/')), 'cohort submissions exclude async files');
  eq((await cohort(ca, 'admin-unlock', { student_name: SA })).status, 404, 'a cohort instructor cannot unlock an async student');
});

R.section('Existing sessions and data');
await t('existing', async () => {
  const sc = await session('CI-FIXTURE-B');
  const l = await cohort(sc, 'load');
  ok(l.status === 200, 'cohort students still load normally after the migration');
  eq(sql(`select count(*) from public.student_progress where level = 'cst-async' and cohort <> 'cst-async'`), '0', 'every async row carries the async cohort tag');
});

process.exit(R.finish());
