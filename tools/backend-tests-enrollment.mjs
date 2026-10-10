// Integration tests for the CST enrollment function (cst-enrollment) against the real function on a local Supabase stack.
// Outbound e-mail goes to tools/mock-resend.mjs (the function is pointed at it with RESEND_API_URL), so the tests can prove
// exactly which e-mails were sent. Run order in CI: mock server -> functions serve (with env file) -> seed -> this file.
import { execFileSync } from 'node:child_process';
import { Reporter } from './lib/report.mjs';

const API = (process.env.API_URL || 'http://127.0.0.1:54321').replace(/\/$/, '');
const DB = process.env.DB_URL || 'postgresql://postgres:postgres@127.0.0.1:54322/postgres';
const MOCK = process.env.MOCK_RESEND_URL || 'http://127.0.0.1:8788';
const R = new Reporter('Backend tests: CST enrollment automation', 'backend-enrollment');
const ok = (c, n, x = '') => R.check(c, n, x);
const eq = (a, b, n) => R.check(JSON.stringify(a) === JSON.stringify(b), n, `got ${JSON.stringify(a)}, expected ${JSON.stringify(b)}`);
const sql = q => execFileSync('psql', [DB, '-At', '-v', 'ON_ERROR_STOP=1', '-c', q], { encoding: 'utf8' }).trim();
const jsonQ = q => JSON.parse(sql(`select coalesce(json_agg(t), '[]'::json) from (${q}) t`) || '[]');
const wait = ms => new Promise(r => setTimeout(r, ms));
let ipN = 20;
const freshIp = () => `203.0.113.${ipN++}`;
async function enroll(body, ip = freshIp(), extra = {}) {
  const r = await fetch(`${API}/functions/v1/cst-enrollment`, { method: 'POST', headers: { 'content-type': 'application/json', 'cf-connecting-ip': ip, ...extra }, body: typeof body === 'string' ? body : JSON.stringify(body) });
  let j = null; try { j = await r.json(); } catch { /* not json */ }
  return { status: r.status, body: j };
}
const mail = async () => (await fetch(`${MOCK}/captured`)).json();
const reset = () => fetch(`${MOCK}/reset`, { method: 'POST' });
async function t(name, fn) { try { await fn(); } catch (e) { ok(false, `${name}: unexpected error`, String(e && e.stack || e).split('\n').slice(0, 3).join(' | ')); } }
const year = new Date().getUTCFullYear();
const rowFor = email => jsonQ(`select * from public.student_access_codes where lower(email) = lower('${email}')`)[0];

R.section('Form submission creates an enrollment');
await t('create', async () => {
  await reset();
  const cohortBefore = sql(`select count(*) from public.student_access_codes where level <> 'cst-async'`);
  const progressBefore = sql(`select count(*) from public.student_progress`);
  const r = await enroll({ name: 'Maya Brooks', email: 'Maya.Brooks@example.com', source: 'culinarycoach' });
  ok(r.status === 200 && r.body.success === true, 'a valid submission returns 200 and success:true', JSON.stringify(r));
  ok(new RegExp(`^CST-${year}-[A-HJ-NP-Z2-9]{6}$`).test(r.body.code || ''), `the code looks like CST-${year}-XXXXXX`, r.body.code);
  const row = rowFor('maya.brooks@example.com');
  ok(!!row, 'a row was inserted into student_access_codes');
  eq([row.student_name, row.level, row.is_admin, row.source, row.opted_out], ['Maya Brooks', 'cst-async', false, 'culinarycoach', false], 'the row has the right name, level, source and flags');
  ok(!!row.enrolled_at && !!row.unsub_token, 'enrolled_at and an unsubscribe token are set');
  ok(row.access_code_hash && !row.access_code_hash.includes(r.body.code) && row.access_code_hash.startsWith('$2'), 'the code is stored as a bcrypt hash, never in plain text');
  const login = await fetch(`${API}/functions/v1/validate-login`, { method: 'POST', headers: { 'content-type': 'application/json', 'cf-connecting-ip': freshIp() }, body: JSON.stringify({ access_code: r.body.code }) }).then(x => x.json());
  ok(login.valid === true && login.level === 'cst-async' && login.student_name === 'Maya Brooks', 'the new code signs in to the self-paced course', JSON.stringify(login));
  eq(sql(`select count(*) from public.student_access_codes where level <> 'cst-async'`), cohortBefore, 'no cohort access codes were touched');
  eq(sql(`select count(*) from public.student_progress`), progressBefore, 'no student_progress rows were created or changed');

  await wait(500);
  const sent = await mail();
  eq(sent.length, 2, 'exactly two e-mails were sent to Resend');
  const a = sent.find(m => (m.to || []).includes('Maya.Brooks@example.com'));
  const n = sent.find(m => (m.to || []).includes('duane@culinarycoach.org'));
  ok(!!a && !!n, 'one e-mail went to the applicant and one to Duane');
  ok(a.auth === 'Bearer ci-test-key', 'the Resend API key is sent as a bearer token');
  eq(a.from, 'Chef Duane Brown <duane@culinarycoach.org>', 'applicant e-mail is from Chef Duane Brown');
  eq(a.subject, 'Your Premium Access to Culinary Systems Training — From Chef Duane', 'applicant subject says premium access');
  ok(a.text.includes('Hi Maya,') && a.text.includes('Your Name: Maya Brooks') && a.text.includes(`Your Access Code: ${r.body.code}`), 'applicant e-mail has the name and the access code');
  ok(a.text.includes('https://cst-async.netlify.app/') && a.text.includes('(804) 219-8211') && a.text.includes('Week 1 unlocks immediately'), 'applicant e-mail has the platform link, phone number and Week 1 line');
  ok(a.html.includes(r.body.code) && a.reply_to === 'duane@culinarycoach.org', 'HTML version carries the code, and replies go to Duane');
  const link = /(https?:\/\/[^\s<>"]+\?u=[0-9a-f]{48})/.exec(a.text);
  ok(!!link && link[1].endsWith(row.unsub_token), 'the e-mail carries a one-click unsubscribe link with the learner\'s token');
  ok((a.headers || {})['List-Unsubscribe']?.includes(row.unsub_token) && (a.headers || {})['List-Unsubscribe-Post'] === 'List-Unsubscribe=One-Click', 'List-Unsubscribe headers are set for one-click opt-out in mail apps');
  eq(n.from, 'noreply@culinarycoach.org', 'Duane\'s notice is from noreply@culinarycoach.org');
  eq(n.subject, 'New CST Enrollment — Maya Brooks', 'Duane\'s notice subject names the applicant');
  ok(['Name: Maya Brooks', 'Email: maya.brooks@example.com', 'Source: culinarycoach.org', `Code issued: ${r.body.code}`, 'Time: '].every(l => n.text.includes(l)), 'Duane\'s notice lists name, e-mail, source, code and time');
  const IBM = 'https://skills.yourlearning.ibm.com/?ngo-id=0427&mgr=5521635reg&mgr2=5440980reg&utm_campaign=culinarycoach';
  ok(a.text.includes(IBM) && a.html.includes('Register for IBM SkillsBuild') && a.html.includes(IBM.replace(/&/g, '&amp;')), 'learner e-mail carries the IBM SkillsBuild block and registration link');
  ok(a.text.indexOf('IBM SkillsBuild') < a.text.indexOf('Chef Duane Brown\nCulinary Coach LLC'), 'the IBM block comes before the sign-off');
  ok(!/\bfree\b/i.test(a.subject + a.text + a.html), 'learner e-mail never uses the word "free"');
  ok(!n.text.includes('IBM'), 'Duane\'s notice has no IBM block');
  ok(!a.text.includes('INSERT') && !a.text.includes('[Name]') && !a.text.includes('[Generated'), 'no template placeholders are left in the e-mail');
});

R.section('Sources, validation and look-alike submissions');
await t('validation', async () => {
  await reset();
  const rs = await enroll({ name: 'Devon Hall', email: 'devon.hall@example.com', source: 'redshirtops' });
  eq(rowFor('devon.hall@example.com')?.source, 'redshirtops', 'the redshirtops source is recorded');
  await wait(300);
  ok((await mail()).some(m => (m.text || '').includes('Source: redshirtops.com')), 'Duane\'s notice shows redshirtops.com', JSON.stringify(rs));
  for (const [label, body] of [['no name', { email: 'a@b.co', source: 'culinarycoach' }], ['bad e-mail', { name: 'Test Person', email: 'nope', source: 'culinarycoach' }], ['bad source', { name: 'Test Person', email: 'p@example.com', source: 'facebook' }], ['name with markup', { name: '<script>x</script>', email: 'q@example.com', source: 'culinarycoach' }]]) {
    const r = await enroll(body);
    ok(r.status === 400 && r.body.success === false, `${label} is rejected with 400`, JSON.stringify(r));
  }
  eq((await enroll('not json')).status, 400, 'a body that is not JSON is rejected');
  eq(sql(`select count(*) from public.student_access_codes where lower(email) in ('a@b.co','p@example.com','q@example.com')`), '0', 'rejected submissions create nothing');
  await reset();
  const bot = await enroll({ name: 'Bot Person', email: 'bot@example.com', source: 'culinarycoach', website: 'http://spam.example' });
  ok(bot.status === 200 && !bot.body.code && !rowFor('bot@example.com') && (await mail()).length === 0, 'a filled honeypot field looks successful but creates nothing and sends nothing');
  // Browser-permission policy, checked on the real POST answer (the local test stack answers the OPTIONS preflight itself)
  const good = await enroll({ name: 'Cors Good', email: 'cors.good@example.com', source: 'culinarycoach' }, freshIp(), { origin: 'https://culinarycoach.org' });
  eq(good.status, 200, 'a submission from the culinarycoach.org form is accepted');
  // (Which websites may read the answer is decided by the function's CORS headers. The local test stack overwrites those with *,
  // so that rule is checked against the deployed function instead; see docs/ENROLLMENT.md.)
});

R.section('Repeat submissions and name clashes');
await t('dedupe', async () => {
  await reset();
  const first = await enroll({ name: 'Tia Moore', email: 'tia.moore@example.com', source: 'culinarycoach' });
  await wait(300); await reset();
  const again = await enroll({ name: 'Tia Moore', email: 'TIA.MOORE@example.com', source: 'redshirtops' });
  ok(again.status === 200 && again.body.success === true && !again.body.code, 'the same e-mail again returns success without a second code');
  eq(sql(`select count(*) from public.student_access_codes where lower(email) = 'tia.moore@example.com'`), '1', 'still one row for that e-mail');
  await wait(300);
  eq((await mail()).length, 0, 'no e-mail is sent for a repeat submission');
  const login = await fetch(`${API}/functions/v1/validate-login`, { method: 'POST', headers: { 'content-type': 'application/json', 'cf-connecting-ip': freshIp() }, body: JSON.stringify({ access_code: first.body.code }) }).then(x => x.json());
  ok(login.valid === true, 'the first code still works after the repeat submission');

  await reset();
  const c = await enroll({ name: 'CI Student A', email: 'ci.a.twin@example.com', source: 'culinarycoach' });
  eq(rowFor('ci.a.twin@example.com')?.student_name, 'CI Student A (2)', 'a name already used by a cohort student gets a suffix instead of failing');
  eq(sql(`select level from public.student_access_codes where student_name = 'CI Student A'`), 'L1', 'the cohort student keeps their own level and code');
  ok(c.status === 200 && !!c.body.code, 'the new learner still receives a code');
});

R.section('Opting out');
await t('optout', async () => {
  await reset();
  const e = await enroll({ name: 'Rae Stone', email: 'rae.stone@example.com', source: 'culinarycoach' });
  const tok = rowFor('rae.stone@example.com').unsub_token;
  const bad = await fetch(`${API}/functions/v1/cst-enrollment?u=${'0'.repeat(48)}`);
  eq(bad.status, 404, 'an unknown unsubscribe token is refused');
  eq(sql(`select count(*) from public.student_access_codes where opted_out`), '0', 'a bad token changes nothing');
  const good = await fetch(`${API}/functions/v1/cst-enrollment?u=${tok}`);
  ok(good.status === 200 && /unsubscribed/i.test(await good.text()), 'the unsubscribe link works with one click');
  eq(rowFor('rae.stone@example.com').opted_out, true, 'opted_out is now true on the row');
  const login = await fetch(`${API}/functions/v1/validate-login`, { method: 'POST', headers: { 'content-type': 'application/json', 'cf-connecting-ip': freshIp() }, body: JSON.stringify({ access_code: e.body.code }) }).then(x => x.json());
  ok(login.valid === true, 'unsubscribing stops e-mail only; the learner keeps their access');
  await reset();
  const re = await enroll({ name: 'Rae Stone', email: 'rae.stone@example.com', source: 'redshirtops' });
  await wait(400);
  ok(re.status === 200 && !re.body.code, 'an opted-out address submitting the form again gets no new code');
  eq((await mail()).length, 0, 'no e-mail at all is sent to or about an opted-out address');
  // an address that was opted out before it ever submitted the form this time (row created by hand with opted_out = true)
  sql(`select public.lms_set_code_level('Pre Optout', 'CI-PREOPT-CODE-1', false, 'cst-async')`);
  sql(`update public.student_access_codes set email = 'pre.optout@example.com', opted_out = true, source = 'culinarycoach', unsub_token = '${'a'.repeat(48)}' where student_name = 'Pre Optout'`);
  await reset();
  const pre = await enroll({ name: 'Pre Optout', email: 'pre.optout@example.com', source: 'culinarycoach' });
  await wait(400);
  ok(pre.status === 200 && !pre.body.code && (await mail()).length === 0, 'opted_out:true on an existing row means nothing is sent');
});

R.section('Throttle and failure handling');
await t('throttle', async () => {
  await reset();
  const ip = '198.18.0.7';
  const codes = [];
  for (let i = 0; i < 5; i++) codes.push((await enroll({ name: `Flood Person ${String.fromCharCode(65 + i)}`, email: `flood${i}@example.com`, source: 'culinarycoach' }, ip)).status);
  eq(codes, [200, 200, 200, 200, 200], 'five submissions from one address in an hour are accepted');
  const sixth = await enroll({ name: 'Flood Person F', email: 'flood6@example.com', source: 'culinarycoach' }, ip);
  ok(sixth.status === 429 && !rowFor('flood6@example.com'), 'the sixth is refused with 429 and creates nothing', JSON.stringify(sixth));
  const other = await enroll({ name: 'Calm Person', email: 'calm@example.com', source: 'culinarycoach' });
  eq(other.status, 200, 'a different visitor is not affected');
});

process.exit(R.finish());
