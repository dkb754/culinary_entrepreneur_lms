// Browser test for the self-paced CST product (index.html on branch cst-async). Real page in headless Chromium against a
// MOCK cst-async-api, MOCK validate-login and a MOCK signed-upload endpoint: no network, never touches real data.
//   npm i -D playwright && node tools/e2e.mjs        (SHOTS=dir saves screenshots; CHROMIUM_PATH=... uses a local browser)
import { chromium } from 'playwright';
import { pathToFileURL } from 'node:url';
import { mkdirSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { Reporter } from './lib/report.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const PAGE = pathToFileURL(path.join(ROOT, 'index.html')).href;
const SHOTS = process.env.SHOTS; if (SHOTS) mkdirSync(SHOTS, { recursive: true });
const launchOpts = process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {};
const R = new Reporter('Browser tests: CST Async (Chromium, mock backend)', 'e2e');
const ok = (c, n, x = '') => R.check(c, n, x);

// ---- real course data, so the mock can never drift from the page
const rd = f => readFileSync(path.join(ROOT, 'content', f), 'utf8');
const names = readdirSync(path.join(ROOT, 'content'));
const g = re => names.filter(f => re.test(f)).sort();
const code = rd('level1.js') + rd('cst-level2.js') + ['level1-lessons.js', ...g(/^cst-l2-lessons-w\d\.js$/)].map(rd).join('\n') + rd('cst-attach.js') +
  rd('level1-quizzes.js') + g(/^cst-l2-quizzes-w\d\.js$/).map(rd).join('\n') + '\nreturn { LEVEL1, LESSONS, QUIZ_BANK };';
const { LEVEL1, LESSONS, QUIZ_BANK: QB } = new Function(code)();
const DAYS = LEVEL1.days;
const QUIZ_IDS = DAYS.filter(d => d.quiz).map(d => d.quiz);
const L1_IDS = DAYS.filter(d => d.week <= 4 && d.quiz).map(d => d.quiz);
const FILE_LABELS = Object.fromEntries(DAYS.filter(d => d.file).map(d => [d.id, d.file.label]));
const weekQ = n => DAYS.filter(d => d.week === n && d.quiz).map(d => d.quiz);
const slug = s => s.normalize('NFKD').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'x';

const CODES = { 'MOCK-CST-A': { name: 'Mia Learner', level: 'cst-async' }, 'MOCK-CST-B': { name: 'Ben Learner', level: 'cst-async' }, 'MOCK-CST-ADMIN': { name: 'Instructor', admin: true, level: 'cst-async' }, 'MOCK-COHORT': { name: 'Cohort Kid', level: 'L1' } };

function makeBackend() {
  const rows = new Map(), sessions = new Map(), files = [], subs = [], calls = [], urls = [], roster = ['Mia Learner', 'Ben Learner'];
  const settings = { published_quizzes: [...L1_IDS] };
  const mode = { apiDown: false };
  const CORS = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': '*', 'content-type': 'application/json' };
  const reply = (route, status, body) => route.fulfill({ status, headers: CORS, body: JSON.stringify(body) });
  const row = n => { if (!rows.has(n)) rows.set(n, { quizzes: {}, deliverables: {}, krp_portfolio: {}, exercises: {}, unlock_through: 0, checkin: { opt_in: false, email: '', sent: false } }); return rows.get(n); };
  const passedAll = (r, ids) => ids.every(id => r.quizzes[id]?.passed);
  const ready = r => passedAll(r, L1_IDS) && !!r.deliverables.w4d3;
  const weeks = r => { const out = [1]; for (let n = 2; n <= 8; n++) if ((out.includes(n - 1) && passedAll(r, weekQ(n - 1)) && (n !== 5 || ready(r))) || n <= r.unlock_through) out.push(n); return out; };
  const prog = r => ({ ...r, unlocked_weeks: weeks(r), ready_l2: ready(r), l1_done: passedAll(r, L1_IDS), module_2_complete: passedAll(r, weekQ(2)) });

  async function login(route) {
    const req = route.request();
    if (req.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS });
    calls.push({ fn: 'validate-login' });
    const c = String(JSON.parse(req.postData() || '{}').access_code || '').trim().toUpperCase();
    const hit = CODES[c];
    if (!hit) return reply(route, 401, { valid: false });
    const token = 'tok-' + Math.random().toString(16).slice(2);
    sessions.set(token, { ...hit });
    return reply(route, 200, { valid: true, is_admin: !!hit.admin, student_name: hit.name, level: hit.level, token });
  }
  async function cohortApi(route) { // only used to prove the page ends a cohort session
    const req = route.request();
    if (req.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS });
    const b = JSON.parse(req.postData() || '{}'); calls.push({ fn: 'lms-api-v2', action: b.action });
    return reply(route, 200, { ok: true });
  }
  async function api(route) {
    const req = route.request();
    if (req.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS });
    const b = JSON.parse(req.postData() || '{}'); calls.push({ fn: 'cst-async-api', action: b.action });
    if (mode.apiDown) return reply(route, 503, { error: 'down' });
    const s = sessions.get(b.token);
    if (!s) return reply(route, 401, { error: 'session_expired' });
    if (s.level !== 'cst-async') return reply(route, 403, { error: 'wrong_product' });
    const adminOnly = () => !s.admin && (reply(route, 403, { error: 'forbidden' }), true);
    switch (b.action) {
      case 'logout': sessions.delete(b.token); return reply(route, 200, { ok: true });
      case 'load': return reply(route, 200, { progress: s.admin ? { ...prog(row('x')), unlocked_weeks: [1, 2, 3, 4, 5, 6, 7, 8], module_2_complete: true } : prog(row(s.name)), settings, is_admin: !!s.admin });
      case 'save': {
        const r = row(s.name), open = weeks(r);
        for (const [k, v] of Object.entries(b.quizzes || {})) {
          if (!settings.published_quizzes.includes(k) || !open.includes(Number(k[1]))) continue;
          const c = r.quizzes[k];
          if (!c || v.score > c.score || (v.score >= 70 && !c.passed)) r.quizzes[k] = { ...v, passed: v.score >= 70, at: c?.at || new Date().toISOString() };
        }
        return reply(route, 200, { progress: prog(r) });
      }
      case 'create-upload': {
        const label = FILE_LABELS[b.assignment]; if (!label) return reply(route, 400, { error: 'unknown_assignment' });
        const r = row(s.name); if (!weeks(r).includes(Number(b.assignment[1]))) return reply(route, 403, { error: 'week_locked' });
        const p = `cst-async/${slug(s.name)}/${slug(label)}/${b.filename.replace(/[^A-Za-z0-9._-]+/g, '_')}`;
        return reply(route, 200, { path: p, signedUrl: `https://mock.supabase.co/storage/v1/object/upload/sign/submissions/${p}?token=t`, mime: 'application/pdf' });
      }
      case 'record-submission': {
        const f = files.find(x => x.path === b.path); if (!f) return reply(route, 409, { error: 'file_missing' });
        const sub = { id: subs.length + 1, student_name: s.name, assignment_id: b.assignment, assignment: FILE_LABELS[b.assignment], file_name: b.filename, file_path: b.path, file_size: f.bytes, attempt: 1, submitted_at: new Date().toISOString() };
        subs.push(sub);
        const rec = { submitted: true, kind: 'file', date: sub.submitted_at, fileName: sub.file_name, fileSize: sub.file_size, filePath: sub.file_path, attempts: 1 };
        const r = row(s.name); r.deliverables[b.assignment] = rec;
        return reply(route, 200, { record: rec, progress: prog(r) });
      }
      case 'save-activity': {
        if (s.admin) return reply(route, 200, { ok: true });
        const r = row(s.name);
        if (!/^a_w[1-8]d[1-4]_(intro|p[1-4]|end)(_[0-9]{1,2})?$/.test(b.id)) return reply(route, 400, { error: 'unknown_activity' });
        if (!weeks(r).includes(Number(b.id[3]))) return reply(route, 403, { error: 'week_locked' });
        r.exercises[b.id] = { passed: b.score >= 70, best: b.score, attempts: 1, date: new Date().toISOString(), ...(b.texts ? { text: b.texts } : {}) };
        return reply(route, 200, { progress: prog(r) });
      }
      case 'set-checkin': { const r = row(s.name); r.checkin = { opt_in: !!b.opt_in, email: b.email || '', sent: false }; return reply(route, 200, { progress: prog(r) }); }
      case 'admin-overview': { if (adminOnly()) return; const progress = {}; for (const [n, r] of rows) progress[n] = prog(r); return reply(route, 200, { roster, progress, submissions: [...subs], settings }); }
      case 'admin-create-student': { if (adminOnly()) return; if (roster.includes(b.student_name)) return reply(route, 409, { error: 'name_taken' }); roster.push(b.student_name); return reply(route, 200, { ok: true, student_name: b.student_name }); }
      case 'admin-unlock': { if (adminOnly()) return; const r = row(b.student_name); r.unlock_through = b.through; return reply(route, 200, { progress: prog(r) }); }
      case 'admin-set-published': { if (adminOnly()) return; const cur = settings.published_quizzes; settings.published_quizzes = b.published ? [...new Set([...cur, b.quiz_id])] : cur.filter(x => x !== b.quiz_id); return reply(route, 200, { published_quizzes: settings.published_quizzes }); }
      default: return reply(route, 400, { error: 'unknown_action' });
    }
  }
  async function signedPut(route) {
    const req = route.request();
    if (req.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS });
    const p = decodeURIComponent(new URL(req.url()).pathname.replace('/storage/v1/object/upload/sign/submissions/', ''));
    files.push({ path: p, bytes: (req.postDataBuffer() || Buffer.alloc(0)).length });
    return reply(route, 200, { Key: 'submissions/' + p });
  }
  return { rows, sessions, files, subs, calls, urls, mode, settings, roster, login, api, cohortApi, signedPut };
}

async function newPage(browser, be, opts = {}) {
  const ctx = await browser.newContext({ viewport: opts.viewport || { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(String(e)));
  page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource|ERR_|Save failed|Load failed/.test(m.text())) errors.push(m.text()); });
  page.on('request', r => { if (/supabase\.co/.test(r.url())) be.urls.push(r.method() + ' ' + r.url()); });
  await page.route('**/functions/v1/validate-login', be.login);
  await page.route('**/functions/v1/cst-async-api', be.api);
  await page.route('**/functions/v1/lms-api-v2', be.cohortApi);
  await page.route('**/storage/v1/object/upload/sign/**', be.signedPut);
  await page.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  await page.goto(PAGE);
  return { page, ctx, errors };
}
const login = async (page, c) => { await page.fill('#login-user', ''); await page.fill('#login-pass', c); await page.click('#login-btn'); };
const appUp = page => page.waitForSelector('#app', { state: 'visible' });
const answerQuiz = (page, id) => page.evaluate(([qid, ans]) => { selectedAnswers[qid] = {}; ans.forEach((a, i) => { selectedAnswers[qid][i] = a; }); submitQuiz(qid); }, [id, QB[id].questions.map(q => q.ans)]);

const browser = await chromium.launch(launchOpts);
const be = makeBackend();

// ===== content =====
R.section('Course content');
{
  ok(DAYS.length === 32 && LEVEL1.weeks.length === 8, '32 days over 8 weeks (Level I weeks 1–4, Level II weeks 5–8)', `${DAYS.length} days`);
  ok(!DAYS.some(d => d.lab) && !DAYS.some(d => /lab/i.test(d.id)), 'no lab days remain');
  ok(!DAYS.some(d => d.date || d.dow || d.short), 'no calendar dates or weekdays on any day');
  ok(QUIZ_IDS.length === 30 && QUIZ_IDS.every(id => QB[id] && QB[id].questions.length >= 10), '30 quizzes, each with at least 10 questions');
  ok(Object.keys(FILE_LABELS).join() === 'w1d4,w2d3,w3d4,w4d3,w4d4,w6d4,w8d4', 'deliverables: Honest Map, Identity Statement, Recipe Cost Sheet, Concept Brief, KRP Portfolio, Business Plan, Operating Plan');
  ok(DAYS.every(d => LESSONS[d.id] && LESSONS[d.id].length > 400), 'every day has lesson text');
  const files = ['level1.js', 'cst-level2.js', 'level1-lessons.js', 'level1-quizzes.js', 'level1-diagrams.js', 'level1-exercises.js', ...g(/^(cst-l2|activities)-.*\.js$/), 'index.html'];
  const bad = /\bOCWB\b|\bMOU\b|City of Richmond|Parsley[’']s|Saturday|proctor|NRAEF|\bLab [1-4]\b|Fall 2026|VCU|Oct(ober)? 12|ServSafe Food Handler exam|Nine Mile/i;
  const hits = files.map(f => { const t = f === 'index.html' ? readFileSync(path.join(ROOT, f), 'utf8') : rd(f); const m = bad.exec(t); return m ? `${f}: ${m[0]}` : null; }).filter(Boolean);
  ok(hits.length === 0, 'no OCWB, MOU, Richmond, Parsley\'s Kitchen, Saturday, lab, proctoring or cohort-date text anywhere', hits.join(' | '));
  ok(!Object.values(LESSONS).some(h => /Resend|is_l2_eligible|Supabase|Proprietary|DELIVERABLE/.test(h)), 'lesson text has no developer-only notes');
  ok(/Self-Paced/.test(LEVEL1.title), 'course title is "Culinary Systems Training — Self-Paced"', LEVEL1.title);
}

// ===== login =====
R.section('Login and page hygiene');
{
  const { page, errors } = await newPage(browser, be);
  const src = await page.content();
  ok(/Culinary Systems <span>Training<\/span> — Self-Paced/.test(src) && /Culinary Coach LLC/.test(src), 'login page shows the self-paced title and Culinary Coach LLC');
  ok(!/ADMIN2026|CE2026|TEST0000|service_role|eyJ[A-Za-z0-9_-]{20,}/.test(src), 'no access codes or keys in the page source');
  await login(page, 'WRONG');
  await page.waitForSelector('#login-error', { state: 'visible' });
  ok(/Invalid access code/.test(await page.locator('#login-error').innerText()), 'a wrong code is rejected');
  await login(page, 'MOCK-COHORT');
  await page.waitForFunction(() => /Invalid access code/.test(document.getElementById('login-error').innerText) && document.getElementById('login-btn').disabled === false);
  ok(!(await page.locator('#app').isVisible()), 'a code from the cohort course does not open this site');
  await page.waitForTimeout(200);
  ok(be.calls.some(c => c.fn === 'lms-api-v2' && c.action === 'logout'), 'the cohort session that was opened is ended immediately');
  await login(page, 'mock-cst-a');
  await appUp(page);
  ok(/Mia Learner/.test(await page.locator('#nav-name').innerText()), 'an async code signs in (case-insensitive)');
  ok(be.urls.every(u => /functions\/v1\/(validate-login|cst-async-api|lms-api-v2)|storage/.test(u)), 'the page only talks to the expected endpoints', be.urls.join(' | '));
  ok(errors.length === 0, 'no JS errors on login', errors.join(' | '));
  await page.context().close();
}

// ===== student journey =====
R.section('Gates and dashboard (student)');
{
  const { page, errors } = await newPage(browser, be);
  await login(page, 'MOCK-CST-A'); await appUp(page);
  ok(await page.locator('#page-programs.active').count() === 1, 'after sign-in the learner lands on the program list');
  const hub = await page.locator('#page-programs').innerText();
  ok(await page.locator('#page-programs .level-card').count() === 4 && /Culinary Systems Training/.test(hub) && /Culinary Entrepreneurship I\b/.test(hub) && /Frontline Supervisor Development/.test(hub) && /Culinary Entrepreneurship II/.test(hub), 'the program list shows all four programs', hub.slice(0, 300) + ' | cards=' + await page.locator('#page-programs .level-card').count());
  ok(await page.locator('#page-programs .level-card.current').count() === 1 && /Culinary Systems Training/.test(await page.locator('#page-programs .level-card.current').innerText()), 'this course is marked as the learner\'s program', 'current=' + await page.locator('#page-programs .level-card.current').count());
  ok(!/\bfree\b/i.test(hub), 'the program list never says "free"');
  await page.evaluate(() => showPage('dashboard'));
  const dash = await page.locator('#page-dashboard').innerText();
  ok(/Current Week/i.test(dash) && /Quiz Pass Rate/i.test(dash) && /Deliverables Submitted/i.test(dash) && /Quizzes Passed/i.test(dash), 'dashboard shows current week, quiz pass rate, quizzes passed and deliverables');
  ok(!/Upcoming|Lab|Saturday|cohort/i.test(dash), 'dashboard has no lab cards, Saturday dates or cohort calendar');
  ok(await page.locator('#page-dashboard .week-card').count() === 8, 'dashboard has 8 week cards');
  ok(await page.locator('#l2-banner').isHidden(), 'the Level II callout is hidden at the start');
  ok(await page.locator('#sb-ibm').isHidden() && await page.locator('#ibm-banner').isHidden(), 'IBM SkillsBuild is hidden before Module 2 is complete');
  await page.evaluate(() => showPage('ibm'));
  ok(await page.locator('#page-ibm.active').count() === 0, 'the IBM SkillsBuild page cannot be opened early');
  ok(/Level II · Week 1/i.test(await page.locator('#sidebar').innerText()) && /Level II · Week 4/i.test(await page.locator('#sidebar').innerText()), 'sidebar labels weeks 5–8 as Level II · Week 1–4');
  ok(await page.locator('#sb-w2-badge.locked, #sb-w3-badge.locked, #sb-w5-badge.locked').count() === 3, 'weeks 2, 3 and 5 show a lock');
  await page.evaluate(() => showPage('w2'));
  ok(/Week 2 is locked/.test(await page.locator('#page-gate').innerText()) && /by itself/.test(await page.locator('#page-gate').innerText()), 'opening Week 2 shows a lock message that needs no instructor');
  await page.evaluate(() => showPage('w1'));
  ok(await page.locator('#page-w1 .day-card').count() === 4, 'Week 1 is open with 4 days');
  ok(await page.locator('#page-w1 .lab-card, #page-w1 .servsafe-card').count() === 0, 'no lab or ServSafe cards');

  // quizzes: week 1 -> opens week 2, partial week 2 does not open week 3
  for (const id of weekQ(1)) await answerQuiz(page, id);
  await page.waitForFunction(() => weekUnlocked(2));
  ok(true, 'passing every Week 1 quiz opens Week 2');
  await page.evaluate(() => showPage('w2'));
  ok(await page.locator('#page-w2.active').count() === 1, 'Week 2 page opens');
  for (const id of weekQ(2).slice(0, 3)) await answerQuiz(page, id);
  await page.waitForTimeout(400);
  ok(!(await page.evaluate(() => weekUnlocked(3))), 'three of four Week 2 quizzes keeps Week 3 locked');
  const fail = weekQ(2)[3];
  await page.evaluate(([qid]) => { selectedAnswers[qid] = {}; QUIZ_BANK[qid].questions.forEach((q, i) => { selectedAnswers[qid][i] = (q.ans + 1) % 4; }); submitQuiz(qid); }, [fail]);
  await page.waitForTimeout(400);
  ok(!(await page.evaluate(() => weekUnlocked(3))), 'a failing score does not open Week 3');
  ok(/Retry/.test(await page.locator(`#quiz-${fail}-container`).innerText()), 'a failed quiz offers Retry');
  await page.evaluate(([qid]) => retryQuiz(qid), [fail]);
  await answerQuiz(page, fail);
  await page.waitForFunction(() => weekUnlocked(3));
  ok(true, 'the retry pass opens Week 3');
  ok(await page.locator('#sb-ibm').isVisible() && /IBM SkillsBuild/.test(await page.locator('#sb-ibm').innerText()), 'finishing every Week 2 quiz adds the "IBM SkillsBuild" sidebar item');
  await page.evaluate(() => showPage('dashboard'));
  ok(await page.locator('#ibm-banner').isVisible() && /premium access to IBM SkillsBuild/.test(await page.locator('#ibm-banner').innerText()), 'the dashboard shows the IBM SkillsBuild banner');
  await page.evaluate(() => showPage('ibm'));
  ok(await page.locator('#ibm-modal').isVisible() && /earned premium access to IBM SkillsBuild/.test(await page.locator('#ibm-modal').innerText()), 'the unlock message appears the first time');
  await page.evaluate(() => document.getElementById('ibm-modal').remove());
  const ibmLinks = await page.locator('#page-ibm a').evaluateAll(as => as.map(a => ({ t: a.textContent.trim(), h: a.href, tg: a.target })));
  ok(ibmLinks.length === 4 && ibmLinks[0].t === 'Register for IBM SkillsBuild' && ibmLinks[0].h === 'https://skills.yourlearning.ibm.com/?ngo-id=0427&mgr=5521635reg&mgr2=5440980reg&utm_campaign=culinarycoach', 'the registration link is listed first, then 3 courses', JSON.stringify(ibmLinks.map(l => l.t)));
  ok(['Lifelong Professional Skills', 'Collaboration', 'Job Readiness'].every((t, i) => ibmLinks[i + 1].t === t && ibmLinks[i + 1].h.endsWith('&utm_campaign=culinarycoach')), 'the three Pathway 1 courses carry the Culinary Coach tracking tags');
  ok(ibmLinks.every(l => l.tg === '_blank'), 'every IBM SkillsBuild link opens in a new tab');
  ok(!/\bfree\b/i.test(await page.locator('#page-ibm').innerText()), 'the IBM SkillsBuild page never says "free"');
  await page.evaluate(() => showPage('w3'));
  for (const n of [3, 4]) for (const id of weekQ(n)) { await page.evaluate(() => { }); await answerQuiz(page, id); await page.waitForTimeout(150); }
  await page.waitForFunction(() => weekUnlocked(4));
  ok(await page.evaluate(() => !weekUnlocked(5)), 'every Level I quiz passed does not open Level II by itself');
  ok(await page.locator('#l2-banner').isHidden(), 'the Level II callout still hidden without the Concept Brief');
  await page.evaluate(() => showPage('w5'));
  ok(/Concept Brief/.test(await page.locator('#page-gate').innerText()), 'the Level II lock explains it needs the Concept Brief');

  // Concept Brief upload through the real flow
  await page.evaluate(() => { showPage('w4'); toggleDay('w4d3'); });
  await page.setInputFiles('#file-w4d3', { name: 'My Concept Brief.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4 brief') });
  await page.click('#sp-w4d3 .btn-submit-work.big');
  await page.waitForFunction(() => weekUnlocked(5), null, { timeout: 8000 });
  ok(be.files.some(f => f.path.startsWith('cst-async/mia-learner/concept-brief/')), 'the file was sent to cst-async/{student}/{assignment}/', be.files.map(f => f.path).join());
  await page.evaluate(() => showPage('dashboard'));
  ok(await page.locator('#l2-banner').isVisible(), 'the "You\'re ready for Level II" callout appears automatically');
  ok(/Level II/.test(await page.locator('#l2-banner').innerText()), 'callout text mentions Level II');
  ok(/Level II · Week 1/.test(await page.locator('#cur-week').innerText()), 'the current week moves to Level II · Week 1', await page.locator('#cur-week').innerText());
  const pct = await page.locator('#global-pct').innerText();
  ok(/^\d+%$/.test(pct) && Number(pct.slice(0, -1)) > 0, 'the progress bar moves with quizzes passed and deliverables submitted', pct);
  ok(/14\/14/.test(await page.locator('#stat-quizzes').innerText()), 'quizzes passed shows 14/14 (Level II quizzes are unpublished)');
  ok(/1\/7/.test(await page.locator('#stat-deliverables').innerText()), 'deliverables submitted shows 1/7');
  await page.evaluate(() => showPage('w5'));
  ok(await page.locator('#page-w5 .day-card').count() === 4, 'Level II Week 1 opens with its 4 days');
  ok(/not open yet/i.test(await page.locator('#quiz-w5d1-container').innerText()), 'an unpublished Level II quiz says it is not open yet');

  // activities save through the API and respect the gate
  await page.evaluate(() => { showPage('w1'); toggleDay('w1d1'); });
  const hadAct = await page.locator('#w1d1 .act').count();
  ok(hadAct > 0, 'lesson activities render in Week 1', String(hadAct));
  await page.evaluate(() => showPage('my-grades'));
  const grades = await page.locator('#my-grades-body').innerText();
  ok(/Level II · Week 1/.test(grades) && !/Lab|ServSafe|Rubric/i.test(grades), 'My Grades covers both levels with no lab, rubric or ServSafe rows');
  await page.evaluate(() => showPage('krp'));
  ok(/90 days after you pass the final Level I quiz/.test(await page.locator('#checkin-card').innerText()), 'the 90-day check-in is described as counting from the final Level I quiz');
  await page.fill('#checkin-email', 'mia@example.com'); await page.check('#checkin-opt'); await page.click('#checkin-card .btn-submit-work');
  await page.waitForFunction(() => /opted in/.test(document.getElementById('checkin-status').innerText));
  ok(true, 'opting in to the check-in works');
  ok(errors.length === 0, 'no JS errors during the whole journey', errors.join(' | '));
  if (SHOTS) await page.screenshot({ path: `${SHOTS}/student-dashboard.png`, fullPage: true });
  await page.context().close();
}

R.section('Persistence');
{
  const { page } = await newPage(browser, be);
  await login(page, 'MOCK-CST-A'); await appUp(page);
  ok(await page.evaluate(() => weekUnlocked(5) && memCache.quizzes.w1d1.passed), 'a fresh sign-in restores progress and unlocked weeks from the server');
  const { page: p2 } = await newPage(browser, be);
  await login(p2, 'MOCK-CST-B'); await appUp(p2);
  ok(await p2.evaluate(() => !weekUnlocked(2) && Object.keys(memCache.quizzes).length === 0), 'another student starts with only Week 1 open');
  await page.context().close(); await p2.context().close();
}

// ===== instructor =====
R.section('Instructor tools');
{
  const { page, errors } = await newPage(browser, be);
  await login(page, 'MOCK-CST-ADMIN'); await appUp(page);
  ok(await page.locator('#admin-nav').isVisible(), 'the instructor sees the instructor menu');
  ok(await page.locator('[data-page="rubric"]').count() === 0, 'there is no CST rubric entry');
  await page.evaluate(() => showPage('w5'));
  ok(await page.locator('#page-w5.active').count() === 1, 'instructor preview can open any week');
  await page.evaluate(() => showPage('admin'));
  await page.waitForSelector('#admin-body tr td strong');
  const head = await page.locator('#admin-table thead').innerText();
  ok(!/Lab|ServSafe|rubric/i.test(head) && /Weeks open/.test(head), 'tracker has no lab, ServSafe or rubric columns', head);
  ok(await page.locator('#admin-body tr').count() === 2, 'tracker lists the enrolled students');
  await page.fill('#new-student-name', 'Zed Newstudent'); await page.fill('#new-student-code', 'abc');
  await page.click('#add-student-card .btn-submit-work');
  ok(/6–40/.test(await page.locator('#add-student-status').innerText()), 'a short access code is refused with a clear message');
  await page.fill('#new-student-code', 'MOCK-ZED-1234');
  await page.click('#add-student-card .btn-submit-work');
  await page.waitForFunction(() => /Created Zed Newstudent/.test(document.getElementById('add-student-status').innerText));
  await page.waitForFunction(() => document.querySelectorAll('#admin-body tr').length === 3);
  ok(be.roster.includes('Zed Newstudent') && (await page.inputValue('#new-student-code')) === '', 'a student can be added and the code field is cleared');
  ok(!(await page.content()).includes('MOCK-ZED-1234'), 'the code you typed is not shown anywhere afterwards');
  await page.fill('#new-student-name', 'Mia Learner'); await page.fill('#new-student-code', 'MOCK-OTHER-1');
  await page.click('#add-student-card .btn-submit-work');
  await page.waitForFunction(() => /already used/.test(document.getElementById('add-student-status').innerText));
  ok(true, 'a duplicate name is reported');
  await page.selectOption('[data-unlock="Ben Learner"]', '3'); await page.click('[data-unlock="Ben Learner"] ~ button');
  await page.waitForFunction(() => /Level II|Week 3/.test(document.body.innerText));
  ok(be.rows.get('Ben Learner').unlock_through === 3, 'the optional "open weeks through" override is saved');
  await page.evaluate(() => showPage('quizreview'));
  await page.waitForSelector('details.qr-card');
  ok(await page.locator('details.qr-card').count() === 30, 'quiz review lists all 30 quizzes');
  ok(await page.locator('details.qr-card', { hasText: 'Quiz 15' }).locator('.score-badge', { hasText: 'DRAFT' }).count() === 1, 'Level II quizzes show as DRAFT until published');
  ok(errors.length === 0, 'no JS errors in the instructor pages', errors.join(' | '));
  await page.context().close();
}

// ===== layout =====
R.section('Phone and tablet layout');
for (const vp of [{ width: 375, height: 760 }, { width: 768, height: 900 }]) {
  const { page, errors } = await newPage(browser, be, { viewport: vp });
  await login(page, 'MOCK-CST-A'); await appUp(page);
  for (const pg of ['dashboard', 'w1', 'w5', 'w3', 'krp', 'my-grades']) {
    await page.evaluate(p => showPage(p), pg);
    await page.evaluate(() => document.querySelectorAll('.page-view.active .day-card-body').forEach(b => b.classList.add('open')));
    const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    ok(over <= 1, `${vp.width}px: ${pg} fits the screen`, `overflow ${over}px`);
  }
  ok(errors.length === 0, `${vp.width}px: no JS errors`, errors.join(' | '));
  await page.context().close();
}
{
  const { page } = await newPage(browser, be, { viewport: { width: 375, height: 760 } });
  await login(page, 'MOCK-CST-ADMIN'); await appUp(page);
  for (const pg of ['admin', 'quizreview']) {
    await page.evaluate(p => showPage(p), pg); await page.waitForTimeout(400);
    const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    ok(over <= 1, `375px: instructor ${pg} fits the screen`, `overflow ${over}px`);
  }
  await page.context().close();
}

await browser.close();
process.exit(R.finish());
