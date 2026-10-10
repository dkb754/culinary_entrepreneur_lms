// POST /functions/v1/cst-async-api   { token, action, ...args }
// API for "Culinary Systems Training — Self-Paced" (free, online-only, no labs, no cohort calendar).
// Same architecture as lms-api-v2: the browser never touches tables or the bucket; identity comes from the server session.
// Sessions opened with an async code carry level 'cst-async'; any other session is refused (and cohort sessions cannot
// reach this API's data, nor can async sessions reach lms-api-v2).
//   student: load, save, create-upload, record-submission, submit-exercise, save-activity, set-checkin, logout
//   admin:   admin-overview, admin-create-student, admin-unlock, admin-set-published, admin-file-url
// Gates are PROGRESS-BASED and computed here: Week 1 is open; Week N+1 opens when every quiz of Week N is passed (70%+).
// Part 2 (Weeks 5-8) additionally needs the Concept Brief submitted. No instructor action is required (admin-unlock is an optional override).
import { createClient } from "npm:@supabase/supabase-js@2";

const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
  auth: { persistSession: false },
});

const BUCKET = "submissions";
const MAX_BYTES = 25 * 1024 * 1024;
const PASS_MARK = 70;
const LEVEL = "cst-async";
const PUBLISHED_KEY = "cst_async_published";

// Keep in sync with content/level1.js and content/cst-level2.js. `krp` = also recorded in student_progress.krp_portfolio.
const FILE_ASSIGNMENTS: Record<string, { label: string; krp?: string }> = {
  w1d4: { label: "Honest Map", krp: "honest_map" },
  w2d3: { label: "Professional Identity Statement", krp: "identity_statement" },
  w3d4: { label: "Recipe Cost Sheet" },
  w4d3: { label: "Concept Brief" },
  w4d4: { label: "KRP Portfolio", krp: "portfolio" },
  w6d4: { label: "Business Plan" },
  w8d4: { label: "Operating Plan" },
};
// Quizzes per week (weeks 1-4 = Part 1, 5-8 = Part 2)
const WEEK_QUIZZES: Record<number, string[]> = {
  1: ["w1d1", "w1d2", "w1d3", "w1d4"], 2: ["w2d1", "w2d2", "w2d3", "w2d4"], 3: ["w3d1", "w3d2", "w3d3", "w3d4"], 4: ["w4d1", "w4d2"],
  5: ["w5d1", "w5d2", "w5d3", "w5d4"], 6: ["w6d1", "w6d2", "w6d3", "w6d4"], 7: ["w7d1", "w7d2", "w7d3", "w7d4"], 8: ["w8d1", "w8d2", "w8d3", "w8d4"],
};
const QUIZ_IDS = Object.values(WEEK_QUIZZES).flat();
const L1_QUIZ_IDS = [1, 2, 3, 4].flatMap((w) => WEEK_QUIZZES[w]);
const FINAL_L1_QUIZ = "w4d2"; // "Part 1 Quiz 14": the 90-day check-in clock starts when this is first passed
const CAPSTONE = "w4d3";       // Concept Brief
// Week 1 scaling exercises: key -> [correct answer, tolerance]. Keep keys in sync with content/level1-exercises.js.
const EXERCISES: Record<string, Record<string, [number, number]>> = {
  ex1: { factor: [6, 0.001], oil: [24, 0.01], vinegar: [12, 0.01], dijon: [6, 0.01], salt: [6, 0.01] },
  ex2: { factor: [0.25, 0.001], onion: [2, 0.01], stock: [2.5, 0.01], cream: [0.5, 0.01], cream_cups: [2, 0.01] },
  ex3: { factor: [2.5, 0.001], onion_ep: [7.5, 0.01], onion_ap: [8.52, 0.05], chicken_ep: [11.25, 0.01], chicken_ap: [15, 0.05] },
};
const EXT_MIME: Record<string, string> = {
  pdf: "application/pdf", doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  csv: "text/csv", txt: "text/plain", png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", zip: "application/zip",
};
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type, authorization, apikey, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });

class HttpError extends Error { constructor(public status: number, public code: string) { super(code); } }

const slug = (s: string) =>
  s.normalize("NFKD").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "x";
const extOf = (n: string) => (/\.([A-Za-z0-9]+)$/.exec(n)?.[1] || "").toLowerCase();
function safeName(n: string): string {
  const ext = extOf(n);
  const base = n.replace(/\.[^.]*$/, "").replace(/[^A-Za-z0-9._-]+/g, "_").replace(/^[._]+/, "").slice(0, 60) || "file";
  return ext ? `${base}.${ext}` : base;
}
function withSuffix(name: string, suffix: string): string {
  const ext = extOf(name);
  return ext ? `${name.slice(0, -(ext.length + 1))}${suffix}.${ext}` : name + suffix;
}

// ---------- progress rows ----------
type Row = Record<string, any>;
const EMPTY_PATCH = () => ({
  quizzes: {}, deliverables: {}, w2_unlocked: false, krp_portfolio: {}, lab_attendance: {}, servsafe: {},
  is_l2_eligible: false, exercises: {}, checkin_opt_in: false, checkin_email: null, checkin_sent_at: null, unlock_through: 0,
});
const weekOf = (id: string) => Number(/^(?:a_)?w([1-8])d[1-4]/.exec(id)?.[1] || 0);

// ---------- gates (all progress-based; computed here, never trusted from the browser) ----------
const passedAll = (q: Record<string, any>, ids: string[]) => ids.every((id) => !!q[id]?.passed);
function readyForL2(r: Row): boolean {
  return passedAll(r.quizzes || {}, L1_QUIZ_IDS) && !!r.deliverables?.[CAPSTONE]?.submitted;
}
function unlockedWeeks(r: Row): number[] {
  const q = r.quizzes || {};
  const out = [1];
  for (let n = 2; n <= 8; n++) {
    const open = out.includes(n - 1) && passedAll(q, WEEK_QUIZZES[n - 1]) && (n !== 5 || readyForL2(r));
    if (open || n <= (r.unlock_through || 0)) out.push(n);
  }
  return out;
}
const toProgress = (r: Row | null | undefined) => {
  const row = r || {};
  const q = row.quizzes || {};
  const weeks = unlockedWeeks(row);
  return {
    quizzes: q, deliverables: row.deliverables || {}, krp_portfolio: row.krp_portfolio || {}, exercises: row.exercises || {},
    unlocked_weeks: weeks, ready_l2: readyForL2(row),
    module_2_complete: passedAll(q, WEEK_QUIZZES[2]),   // opens the IBM SkillsBuild section (Week 2 = Module 2)
    l1_done: passedAll(q, L1_QUIZ_IDS), unlock_through: row.unlock_through || 0,
    checkin: { opt_in: !!row.checkin_opt_in, email: row.checkin_email || "", sent: !!row.checkin_sent_at },
  };
};

async function getRow(name: string) {
  const { data, error } = await sb.from("student_progress").select("*").eq("student_name", name).maybeSingle();
  if (error) throw error;
  return data as Row | null;
}
async function writeRow(name: string, patch: Row) {
  const { data, error } = await sb.from("student_progress")
    .update({ ...patch, last_updated: new Date().toISOString() }).eq("student_name", name).select().single();
  if (error) throw error;
  return data as Row;
}
async function ensureRow(name: string): Promise<Row> {
  let row = await getRow(name);
  if (!row) {
    const ins = await sb.from("student_progress")
      .insert({ student_name: name, ...EMPTY_PATCH(), level: LEVEL, cohort: LEVEL }).select().single();
    if (ins.error) { row = await getRow(name); if (!row) throw ins.error; } else return ins.data as Row;
  }
  if (row.level !== LEVEL) throw new HttpError(409, "wrong_product"); // a cohort student's row is never touched from here
  return row;
}

async function getPublished(): Promise<string[]> {
  const { data, error } = await sb.from("lms_settings").select("value").eq("key", PUBLISHED_KEY).maybeSingle();
  if (error) throw error;
  return Array.isArray(data?.value) ? (data!.value as string[]) : [];
}

function mergeQuizzes(cur: Record<string, any>, inc: unknown, published: string[], weeks: number[]) {
  const out = { ...cur };
  if (inc && typeof inc === "object") {
    for (const [k, v] of Object.entries(inc as Record<string, any>)) {
      if (!QUIZ_IDS.includes(k) || !published.includes(k) || !weeks.includes(weekOf(k))) continue; // published, unlocked quizzes only
      const score = Number((v as any)?.score);
      if (!Number.isFinite(score) || score < 0 || score > 100) continue;
      const rec: Record<string, unknown> = {
        score: Math.round(score), passed: score >= PASS_MARK,
        correct: Number.isInteger((v as any)?.correct) ? (v as any).correct : undefined,
        total: Number.isInteger((v as any)?.total) ? (v as any).total : undefined,
      };
      const c = out[k];
      if (!c || (rec.passed && !c.passed) || (rec.passed === !!c.passed && rec.score > c.score)) {
        // `at` = when the quiz was first passed; the 90-day check-in counts from it (Part 1 final quiz)
        const at = rec.passed ? (c?.passed && c.at ? c.at : new Date().toISOString()) : undefined;
        out[k] = at ? { ...rec, at } : rec;
      }
    }
  }
  return out;
}

// ---------- handler ----------
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (req.method !== "POST") return json(405, { error: "method_not_allowed" });

  let body: any;
  try { body = await req.json(); } catch { return json(400, { error: "bad_json" }); }
  const token = typeof body?.token === "string" ? body.token : "";
  const action = String(body?.action || "");

  try {
    const { data: sess, error: sErr } = await sb.rpc("lms_session", { p_token: token });
    if (sErr) throw sErr;
    if (!sess) return json(401, { error: "session_expired" });
    if (sess.level !== LEVEL) return json(403, { error: "wrong_product" });
    const user: string = sess.student_name;
    const isAdmin: boolean = !!sess.is_admin;
    const needStudent = () => { if (isAdmin) throw new HttpError(403, "admin_preview"); };
    const needAdmin = () => { if (!isAdmin) throw new HttpError(403, "forbidden"); };
    const target = async () => {
      const name = String(body.student_name || "");
      const ok = await sb.from("student_access_codes").select("student_name").eq("student_name", name).eq("is_admin", false).eq("level", LEVEL).maybeSingle();
      if (!ok.data) throw new HttpError(404, "unknown_student");
      return name;
    };
    const needWeek = (row: Row, week: number) => { if (!unlockedWeeks(row).includes(week)) throw new HttpError(403, "week_locked"); };

    switch (action) {
      case "logout": {
        await sb.rpc("lms_logout", { p_token: token });
        return json(200, { ok: true });
      }

      case "load": {
        const published = await getPublished();
        if (isAdmin) {
          const p = toProgress(null); p.unlocked_weeks = [1, 2, 3, 4, 5, 6, 7, 8]; p.module_2_complete = true; // instructor preview: everything readable
          return json(200, { progress: p, is_admin: true, settings: { published_quizzes: published } });
        }
        const row = await ensureRow(user);
        return json(200, { progress: toProgress(row), settings: { published_quizzes: published } });
      }

      case "save": {
        needStudent();
        const row = await ensureRow(user);
        const quizzes = mergeQuizzes(row.quizzes || {}, body.quizzes, await getPublished(), unlockedWeeks(row));
        const next = { ...row, quizzes };
        const saved = await writeRow(user, { quizzes, is_l2_eligible: readyForL2(next) });
        return json(200, { progress: toProgress(saved) });
      }

      case "create-upload": {
        needStudent();
        const id = String(body.assignment || "");
        const a = FILE_ASSIGNMENTS[id];
        if (!a) throw new HttpError(400, "unknown_assignment");
        needWeek(await ensureRow(user), weekOf(id));
        const filename = String(body.filename || "");
        const ext = extOf(filename);
        if (!EXT_MIME[ext]) throw new HttpError(400, "file_type_not_allowed");
        const size = Number(body.size);
        if (!Number.isFinite(size) || size <= 0) throw new HttpError(400, "empty_file");
        if (size > MAX_BYTES) throw new HttpError(413, "file_too_large");

        const dir = `${LEVEL}/${slug(user)}/${slug(a.label)}`; // cst-async/{student}/{assignment}/
        const listed = await sb.storage.from(BUCKET).list(dir, { limit: 1000 });
        if (listed.error) throw listed.error;
        const taken = new Set((listed.data || []).map((o) => o.name));
        const base = safeName(filename);
        let name = base, n = 2;
        while (taken.has(name)) name = withSuffix(base, `-v${n++}`);
        const path = `${dir}/${name}`;

        const signed = await sb.storage.from(BUCKET).createSignedUploadUrl(path);
        if (signed.error) throw signed.error;
        return json(200, { path, signedUrl: signed.data.signedUrl, mime: EXT_MIME[ext] });
      }

      case "record-submission": {
        needStudent();
        const id = String(body.assignment || "");
        const a = FILE_ASSIGNMENTS[id];
        if (!a) throw new HttpError(400, "unknown_assignment");
        needWeek(await ensureRow(user), weekOf(id));
        const path = String(body.path || "");
        const dir = `${LEVEL}/${slug(user)}/${slug(a.label)}`;
        if (!path.startsWith(dir + "/") || path.includes("..") || path.slice(dir.length + 1).includes("/"))
          throw new HttpError(403, "bad_path");
        const name = path.slice(dir.length + 1);

        // The file must really be in storage — a record can never claim a file that was not received
        const found = await sb.storage.from(BUCKET).list(dir, { limit: 100, search: name });
        if (found.error) throw found.error;
        const obj = (found.data || []).find((o) => o.name === name);
        if (!obj) throw new HttpError(409, "file_missing");

        const displayName = String(body.filename || name).slice(0, 200);
        const prior = await sb.from("submissions").select("id", { count: "exact", head: true })
          .eq("student_name", user).eq("assignment_id", id);
        const attempt = (prior.count || 0) + 1;
        const meta = {
          student_name: user, assignment_id: id, assignment: a.label, file_name: displayName, file_path: path,
          file_size: obj.metadata?.size ?? null, file_type: obj.metadata?.mimetype ?? null, attempt,
        };
        let s: any;
        const ins = await sb.from("submissions").insert(meta).select().single();
        if (ins.error) { // same path recorded twice (a retry) -> idempotent
          const again = await sb.from("submissions").select("*").eq("file_path", path).eq("student_name", user).maybeSingle();
          if (!again.data) throw ins.error;
          s = again.data;
        } else s = ins.data;
        const rec = {
          submitted: true, kind: "file", date: s.submitted_at, fileName: s.file_name, fileSize: s.file_size,
          fileType: s.file_type, filePath: s.file_path, attempts: s.attempt,
        };
        const row = await ensureRow(user);
        const deliverables = { ...(row.deliverables || {}), [id]: rec };
        const patch: Row = { deliverables };
        if (a.krp) patch.krp_portfolio = { ...(row.krp_portfolio || {}), [a.krp]: { date: rec.date, fileName: rec.fileName, filePath: rec.filePath, attempts: rec.attempts } };
        patch.is_l2_eligible = readyForL2({ ...row, deliverables });
        const saved = await writeRow(user, patch);
        return json(200, { record: rec, progress: toProgress(saved) });
      }

      case "submit-exercise": { // graded here; the correct answers are never sent to the browser
        const id = String(body.exercise_id || "");
        const key = EXERCISES[id];
        if (!key) throw new HttpError(400, "unknown_exercise");
        const given = (body.answers && typeof body.answers === "object" ? body.answers : {}) as Record<string, unknown>;
        const results: Record<string, boolean> = {};
        for (const [k, [ans, tol]] of Object.entries(key)) {
          const v = Number(given[k]);
          results[k] = Number.isFinite(v) && Math.abs(v - ans) <= tol;
        }
        const total = Object.keys(key).length;
        const correct = Object.values(results).filter(Boolean).length;
        const passed = correct === total;
        if (isAdmin) return json(200, { results, correct, total, passed }); // instructor preview: graded, nothing recorded
        const row = await ensureRow(user);
        const prev = (row.exercises || {})[id];
        const rec = {
          passed: !!(prev?.passed || passed), best: Math.max(prev?.best || 0, correct), total,
          attempts: (prev?.attempts || 0) + 1, date: new Date().toISOString(),
        };
        const saved = await writeRow(user, { exercises: { ...(row.exercises || {}), [id]: rec } });
        return json(200, { results, correct, total, passed, record: rec, progress: toProgress(saved) });
      }

      case "save-activity": { // lesson activities are graded in the browser (practice); the server keeps best score, attempts and written answers
        const id = String(body.id || "");
        if (!/^a_w[1-8]d[1-4]_(intro|p[1-4]|end)(_[0-9]{1,2})?$/.test(id)) throw new HttpError(400, "unknown_activity");
        const score = Math.round(Number(body.score));
        if (!Number.isFinite(score) || score < 0 || score > 100) throw new HttpError(400, "bad_score");
        let text: Record<string, string> | undefined;
        if (body.texts && typeof body.texts === "object") {
          text = {};
          for (const [k, v] of Object.entries(body.texts as Record<string, unknown>).slice(0, 8)) {
            if (/^[a-z0-9_]{1,24}$/.test(k)) text[k] = String(v).slice(0, 1500);
          }
        }
        if (isAdmin) return json(200, { ok: true }); // instructor preview: nothing recorded
        const row = await ensureRow(user);
        needWeek(row, weekOf(id));
        const cur = row.exercises || {};
        if (!cur[id] && Object.keys(cur).filter((k) => k.startsWith("a_")).length >= 300) throw new HttpError(400, "too_many_activities");
        const prev = cur[id];
        const rec: Record<string, unknown> = {
          passed: !!(prev?.passed || score >= 70), best: Math.max(prev?.best || 0, score), attempts: (prev?.attempts || 0) + 1,
          date: new Date().toISOString(),
        };
        if (text) rec.text = text; else if (prev?.text) rec.text = prev.text;
        const saved = await writeRow(user, { exercises: { ...cur, [id]: rec } });
        return json(200, { progress: toProgress(saved) });
      }

      case "set-checkin": { // student opts in/out of the 90-day follow-up email
        needStudent();
        const optIn = !!body.opt_in;
        const email = String(body.email || "").trim();
        if (optIn && (email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email))) throw new HttpError(400, "bad_email");
        await ensureRow(user);
        const saved = await writeRow(user, optIn ? { checkin_opt_in: true, checkin_email: email } : { checkin_opt_in: false, checkin_email: null });
        return json(200, { progress: toProgress(saved) });
      }

      case "admin-overview": {
        needAdmin();
        const [rows, subs, roster, published] = await Promise.all([
          sb.from("student_progress").select("*").eq("level", LEVEL),
          sb.from("submissions").select("*").like("file_path", `${LEVEL}/%`).order("submitted_at", { ascending: false }).limit(2000),
          sb.from("student_access_codes").select("student_name").eq("is_admin", false).eq("level", LEVEL).order("student_name"),
          getPublished(),
        ]);
        for (const r of [rows, subs, roster]) if (r.error) throw r.error;
        const progress: Record<string, unknown> = {};
        for (const r of rows.data || []) progress[r.student_name] = toProgress(r);
        return json(200, {
          roster: (roster.data || []).map((r) => r.student_name), progress, submissions: subs.data || [],
          settings: { published_quizzes: published },
        });
      }

      case "admin-create-student": { // the instructor provisions access codes by hand; the code is stored hashed and never echoed
        needAdmin();
        const name = String(body.student_name || "").trim();
        const code = String(body.access_code || "").trim();
        if (!/^[A-Za-z][A-Za-z .'-]{1,59}$/.test(name)) throw new HttpError(400, "bad_name");
        if (!/^[A-Za-z0-9-]{6,40}$/.test(code)) throw new HttpError(400, "bad_code");
        const { error } = await sb.rpc("lms_set_code_level", { p_name: name, p_code: code, p_admin: false, p_level: LEVEL });
        if (error) {
          if (String(error.message).includes("name_belongs_to_other_product")) throw new HttpError(409, "name_taken");
          if (String(error.message).includes("duplicate key")) throw new HttpError(409, "code_taken");
          throw error;
        }
        await ensureRow(name);
        return json(200, { ok: true, student_name: name });
      }

      case "admin-unlock": { // optional override: open Weeks 1..N for one student (normally unnecessary: gates are automatic)
        needAdmin();
        const name = await target();
        const through = Number(body.through);
        if (!Number.isInteger(through) || through < 0 || through > 8) throw new HttpError(400, "bad_week");
        await ensureRow(name);
        const saved = await writeRow(name, { unlock_through: through });
        return json(200, { progress: toProgress(saved) });
      }

      case "admin-set-published": {
        needAdmin();
        const id = String(body.quiz_id || "");
        if (!QUIZ_IDS.includes(id)) throw new HttpError(400, "unknown_quiz");
        const cur = await getPublished();
        const next = body.published ? Array.from(new Set([...cur, id])) : cur.filter((x) => x !== id);
        const { error } = await sb.from("lms_settings")
          .upsert({ key: PUBLISHED_KEY, value: next, updated_at: new Date().toISOString() }, { onConflict: "key" });
        if (error) throw error;
        return json(200, { published_quizzes: next });
      }

      case "admin-file-url": {
        needAdmin();
        const path = String(body.path || "");
        if (!path.startsWith(`${LEVEL}/`)) throw new HttpError(404, "unknown_file");
        const known = await sb.from("submissions").select("file_name").eq("file_path", path).maybeSingle();
        if (!known.data) throw new HttpError(404, "unknown_file");
        const url = await sb.storage.from(BUCKET).createSignedUrl(path, 300, { download: known.data.file_name });
        if (url.error) throw url.error;
        return json(200, { url: url.data.signedUrl });
      }

      default:
        return json(400, { error: "unknown_action" });
    }
  } catch (e) {
    if (e instanceof HttpError) return json(e.status, { error: e.code });
    console.error("cst-async-api error", action, e);
    return json(500, { error: "server_error" });
  }
});
