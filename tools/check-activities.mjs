// Validates content/activities-*.js against the lesson text: schema, answer indexes, diagram keys and coverage
// (every lesson PART has at least one graded activity). Run:  node tools/check-activities.mjs   (exit 1 on any problem)
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const rd = f => readFileSync(path.join(ROOT, 'content', f), 'utf8');
const files = readdirSync(path.join(ROOT, 'content')).filter(f => /^activities-w.*\.js$/.test(f)).sort();
const all = readdirSync(path.join(ROOT, 'content'));
const glob = re => all.filter(f => re.test(f)).sort();
const lessonFiles = ['level1-lessons.js', ...glob(/^cst-l2-lessons-w\d\.js$/)];
const quizFiles = ['level1-quizzes.js', ...glob(/^cst-l2-quizzes-w\d\.js$/)];
const code = rd('level1.js') + rd('cst-level2.js') + lessonFiles.map(rd).join('\n') + rd('cst-attach.js') + rd('activities-engine.js') + rd('level1-diagrams.js') + files.map(rd).join('\n') + quizFiles.map(rd).join('\n') +
  '\nreturn { LEVEL1, ACTIVITIES, DIAGRAMS, actDefs, QUIZ_BANK };';
const { LEVEL1, ACTIVITIES, DIAGRAMS, QUIZ_BANK } = new Function(code)();
const errs = []; const bad = (m) => errs.push(m);
const KEYS = ['intro', 'p1', 'p2', 'p3', 'p4', 'end'];
const wc = s => (String(s).match(/\S+/g) || []).length;
const dayById = Object.fromEntries(LEVEL1.days.map(d => [d.id, d]));
let counts = { choice: 0, order: 0, match: 0, fill: 0, reflect: 0, diagram: 0 };
for (const [day, parts] of Object.entries(ACTIVITIES)) {
  const d = dayById[day]; if (!d) { bad(`${day}: unknown day`); continue; }
  const partsInLesson = [...(d.lesson||"").matchAll(/<h4>PART (\d+)/g)].map(m => 'p' + m[1]);
  for (const [key, list] of Object.entries(parts)) {
    if (!KEYS.includes(key)) bad(`${day}.${key}: bad part key`);
    if (/^p\d$/.test(key) && !partsInLesson.includes(key)) bad(`${day}.${key}: lesson has no ${key.toUpperCase().replace('P', 'PART ')}`);
    if (key === 'end' && partsInLesson.length) bad(`${day}.end: lesson has PART headings; use p1..p${partsInLesson.length}`);
    list.forEach((a, i) => {
      const w = `${day}.${key}[${i}] "${a.title}"`;
      if (!a.title || a.title.length > 80) bad(`${w}: title missing or too long`);
      counts[a.type] = (counts[a.type] || 0) + 1;
      if (a.type === 'diagram') { if (!DIAGRAMS[a.svg]) bad(`${w}: unknown diagram ${a.svg}`); if (!a.caption) bad(`${w}: caption`); return; }
      if (a.intro && a.intro.length > 600) bad(`${w}: intro too long`);
      if (a.type === 'choice') {
        if (!a.items || a.items.length < 2 || a.items.length > 8) bad(`${w}: 2–8 items`);
        (a.items || []).forEach((it, j) => {
          if (!it.q || !it.why) bad(`${w} item ${j + 1}: q/why`);
          if (!it.opts || it.opts.length < 3 || it.opts.length > 5 || new Set(it.opts).size !== it.opts.length) bad(`${w} item ${j + 1}: 3–5 distinct options`);
          else if (!Number.isInteger(it.ans) || it.ans < 0 || it.ans >= it.opts.length) bad(`${w} item ${j + 1}: ans out of range`);
        });
      } else if (a.type === 'order') {
        if (!a.steps || a.steps.length < 3 || a.steps.length > 8 || new Set(a.steps).size !== a.steps.length) bad(`${w}: 3–8 distinct steps`);
        if (!a.why) bad(`${w}: why`);
      } else if (a.type === 'match') {
        if (!a.options || a.options.length < 2 || !a.rows || a.rows.length < 3) bad(`${w}: need options and 3+ rows`);
        (a.rows || []).forEach((r, j) => { if (!r.label || !Number.isInteger(r.ans) || r.ans < 0 || r.ans >= (a.options || []).length) bad(`${w} row ${j + 1}: label/ans`); });
        if (!a.why) bad(`${w}: why`);
      } else if (a.type === 'fill') {
        if (!a.rows || a.rows.length < 2) bad(`${w}: 2+ rows`);
        (a.rows || []).forEach((r, j) => { if (!r.label || typeof r.ans !== 'number') bad(`${w} row ${j + 1}: label/ans number`); });
        if (!a.why) bad(`${w}: why`);
      } else if (a.type === 'reflect') {
        if (!a.prompts || !a.prompts.length || a.prompts.length > 6) bad(`${w}: 1–6 prompts`);
        const ks = new Set();
        (a.prompts || []).forEach((p, j) => {
          if (!/^[a-z0-9_]{1,24}$/.test(p.key || '') || ks.has(p.key)) bad(`${w} prompt ${j + 1}: key`); ks.add(p.key);
          if (!p.label) bad(`${w} prompt ${j + 1}: label`);
          (p.keywords || []).forEach(k => { try { new RegExp('\\b' + k.match, 'i'); } catch (e) { bad(`${w} prompt ${j + 1}: bad keyword regex`); } if (!k.tip) bad(`${w}: keyword tip`); });
        });
        if (!a.model || wc(a.model) < 15) bad(`${w}: model answer required`);
      } else bad(`${w}: unknown type ${a.type}`);
    });
  }
}
// coverage: every PART (or the whole lesson when it has none) has at least one graded activity
for (const d of LEVEL1.days) {
  const parts = ACTIVITIES[d.id] || {};
  const graded = k => (parts[k] || []).filter(a => a.type !== 'diagram').length;
  const pl = [...(d.lesson||"").matchAll(/<h4>PART (\d+)/g)].map(m => 'p' + m[1]);
  if (pl.length) pl.forEach(k => { if (!graded(k)) bad(`${d.id}: ${k.toUpperCase().replace('P', 'PART ')} has no graded activity`); });
  else if (!graded('end') && !graded('intro')) bad(`${d.id}: no graded activity (use "end")`);
}
// every day has a lesson with PART headings (or at least some text) and a well-formed quiz where one is declared
for (const d of LEVEL1.days) {
  if (!d.lesson || d.lesson.length < 400) bad(`${d.id}: lesson text missing or too short`);
  if (d.quiz) {
    const q = QUIZ_BANK[d.quiz];
    if (!q) { bad(`${d.id}: quiz ${d.quiz} is missing from the quiz bank`); continue; }
    if (!q.title || q.passPct !== 70) bad(`${d.quiz}: title / passPct 70`);
    if (!q.questions || q.questions.length < 10) bad(`${d.quiz}: needs at least 10 questions`);
    (q.questions || []).forEach((x, i) => {
      if (!x.q || !x.feedback || !x.opts || x.opts.length !== 4 || new Set(x.opts).size !== 4 || !(x.ans >= 0 && x.ans < 4)) bad(`${d.quiz} Q${i + 1}: question, feedback, 4 distinct options and a valid answer`);
    });
  }
}
const n = Object.values(counts).reduce((a, b) => a + b, 0);
console.log(`${files.length} files · ${Object.keys(ACTIVITIES).length} days · ${n} activities ${JSON.stringify(counts)}`);
if (errs.length) { console.log(errs.map(e => '✗ ' + e).join('\n')); console.log(`${errs.length} problem(s)`); process.exit(1); }
console.log('OK');
