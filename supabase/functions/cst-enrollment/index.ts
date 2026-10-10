// POST /functions/v1/cst-enrollment   { name, email, source: "culinarycoach" | "redshirtops" }
//   -> { success: true, code: "CST-2026-X7K2M9" }   (a repeat or opted-out e-mail returns { success: true } with no code and no e-mail)
// GET  /functions/v1/cst-enrollment?u=<token>      one-click unsubscribe (also accepts POST for e-mail clients' List-Unsubscribe-Post)
//
// Creates a self-paced CST access code, stores it hashed (like every other code), then sends two e-mails in parallel
// through Resend: the applicant's welcome e-mail and a notice to Duane. It touches only student_access_codes rows with
// level 'cst-async' (through the cst_enroll SQL function); lms-api-v2, validate-login, student_progress and cohort data are not used.
//
// Secrets: RESEND_API_KEY (without it the enrollment still works and the response says emails: "not_configured").
// Optional env: CST_PLATFORM_URL (default https://cst-async.netlify.app/), PUBLIC_FUNCTIONS_URL (base of this function's public URL),
//               ENROLLMENT_RESEND_API_URL / ENROLLMENT_RESEND_API_KEY (CI only: a mock Resend server, so other functions are unaffected).
import { createClient } from "npm:@supabase/supabase-js@2";

const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });

const PLATFORM_URL = Deno.env.get("CST_PLATFORM_URL") || "https://cst-async.netlify.app/";
const RESEND_URL = Deno.env.get("ENROLLMENT_RESEND_API_URL") || "https://api.resend.com/emails"; // override is for CI only
const FROM_APPLICANT = "Chef Duane Brown <duane@culinarycoach.org>";
const FROM_NOTICE = "noreply@culinarycoach.org";
const DUANE = "duane@culinarycoach.org";
const SOURCE_LABEL: Record<string, string> = { culinarycoach: "culinarycoach.org", redshirtops: "redshirtops.com" };
const ORIGINS = new Set(["https://culinarycoach.org", "https://www.culinarycoach.org", "https://redshirtops.com", "https://www.redshirtops.com"]);
const MAX_PER_IP_HOUR = 5;
const MAX_TOTAL_HOUR = 100;

const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const NAME_RE = /^[\p{L}][\p{L} .'’-]{1,59}$/u;
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

function cors(req: Request): Record<string, string> {
  const o = req.headers.get("origin") || "";
  const h: Record<string, string> = { "Access-Control-Allow-Headers": "content-type, apikey, authorization, x-client-info", "Access-Control-Allow-Methods": "POST, GET, OPTIONS", "Vary": "Origin" };
  if (ORIGINS.has(o)) h["Access-Control-Allow-Origin"] = o;
  return h;
}
const reply = (req: Request, status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors(req), "Content-Type": "application/json" } });
const textReply = (req: Request, status: number, text: string) =>
  new Response(text, { status, headers: { ...cors(req), "Content-Type": "text/plain; charset=utf-8" } });

// CST-{YEAR}-{6 random characters}; no 0/O/1/I so a code can be read aloud or typed from an e-mail
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function makeCode(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return `CST-${new Date().getUTCFullYear()}-${[...bytes].map((b) => ALPHABET[b % ALPHABET.length]).join("")}`;
}

function functionsBase(): string {
  return (Deno.env.get("PUBLIC_FUNCTIONS_URL") || `${Deno.env.get("SUPABASE_URL")}/functions/v1`).replace(/\/$/, "");
}

async function sendMail(payload: Record<string, unknown>): Promise<"sent" | "failed" | "not_configured"> {
  const key = Deno.env.get("ENROLLMENT_RESEND_API_KEY") || Deno.env.get("RESEND_API_KEY"); // the first is for CI only
  if (!key) return "not_configured";
  try {
    const res = await fetch(RESEND_URL, {
      method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, body: JSON.stringify(payload),
    });
    if (!res.ok) { console.error("resend error", res.status, (await res.text()).slice(0, 200)); return "failed"; }
    return "sent";
  } catch (e) { console.error("resend fetch failed", String(e)); return "failed"; }
}

const IBM_Q = "?ngo-id=0427&mgr=5521635reg&mgr2=5440980reg&utm_campaign=culinarycoach";
const IBM_COURSES = [
  ["Lifelong Professional Skills", "https://skills.yourlearning.ibm.com/activity/PLAN-8AF5B141EC32" + IBM_Q],
  ["Collaboration", "https://skills.yourlearning.ibm.com/channel/CNL_LCB_1568648534810" + IBM_Q],
  ["Job Readiness", "https://skills.yourlearning.ibm.com/activity/PLAN-B1632133A641" + IBM_Q],
];
const IBM_URL = "https://skills.yourlearning.ibm.com/?ngo-id=0427&mgr=5521635reg&mgr2=5440980reg&utm_campaign=culinarycoach";

function applicantEmail(name: string, code: string, unsubUrl: string) {
  const first = name.split(" ")[0];
  const subject = "Your Premium Access to Culinary Systems Training — From Chef Duane";
  const text = `Hi ${first},

You reached out and I want to make sure you leave with something useful.

I'm opening up premium access to Culinary Systems Training — the same curriculum I use with my paid cohorts — so you can see exactly what we do and decide if it's right for you.

No cost. No commitment. Start whenever you're ready.

🔗 ${PLATFORM_URL}

Your Name: ${name}
Your Access Code: ${code}

Log in and Week 1 unlocks immediately. You go at your own pace.

Four weeks of content covering kitchen systems, food safety, costing, menu planning, and what it actually takes to run a food business. Finish Part 1 and Part 2 opens automatically.

If you want to talk through your goals before you start — or at any point along the way — just reply to this email or call me directly.

📞 (804) 219-8211

As a Culinary Coach learner, you now have premium access to IBM SkillsBuild. IBM SkillsBuild is a professional learning platform with courses that pair with what you are building in CST. Some courses earn digital badges you can add to your resume. Register with the link below. This link connects you to the Culinary Coach partnership.

Register for IBM SkillsBuild: ${IBM_URL}

Once registered, start with Lifelong Professional Skills, Collaboration, or Job Readiness. All courses are self-paced.

${IBM_COURSES.map(([n, u]) => `${n}: ${u}`).join("\n")}

Chef Duane Brown
Culinary Coach LLC
culinarycoach.org

---
Not interested? No problem — click here to opt out: ${unsubUrl}
`;
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.5;color:#222;max-width:600px">
<p>Hi ${esc(first)},</p>
<p>You reached out and I want to make sure you leave with something useful.</p>
<p>I'm opening up premium access to Culinary Systems Training — the same curriculum I use with my paid cohorts — so you can see exactly what we do and decide if it's right for you.</p>
<p>No cost. No commitment. Start whenever you're ready.</p>
<p>🔗 <a href="${esc(PLATFORM_URL)}">${esc(PLATFORM_URL)}</a></p>
<p>Your Name: <strong>${esc(name)}</strong><br>Your Access Code: <strong style="font-family:monospace;font-size:18px">${esc(code)}</strong></p>
<p>Log in and Week 1 unlocks immediately. You go at your own pace.</p>
<p>Four weeks of content covering kitchen systems, food safety, costing, menu planning, and what it actually takes to run a food business. Finish Part 1 and Part 2 opens automatically.</p>
<p>If you want to talk through your goals before you start — or at any point along the way — just reply to this email or call me directly.</p>
<p>📞 (804) 219-8211</p>
<p>As a Culinary Coach learner, you now have premium access to IBM SkillsBuild. IBM SkillsBuild is a professional learning platform with courses that pair with what you are building in CST. Some courses earn digital badges you can add to your resume. Register with the link below. This link connects you to the Culinary Coach partnership.</p>
<p><a href="${esc(IBM_URL)}">Register for IBM SkillsBuild</a></p>
<p>Once registered, start with ${IBM_COURSES.map(([n, u]) => `<a href="${esc(u)}">${esc(n)}</a>`).join(", ")}. All courses are self-paced.</p>
<p>Chef Duane Brown<br>Culinary Coach LLC<br>culinarycoach.org</p>
<hr style="border:none;border-top:1px solid #ddd">
<p style="font-size:13px;color:#666">Not interested? No problem — <a href="${esc(unsubUrl)}">click here to opt out</a>.</p>
</div>`;
  return { subject, text, html };
}

function noticeEmail(name: string, email: string, source: string, code: string, when: Date) {
  const stamp = `${when.toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "medium", timeStyle: "short" })} ET (${when.toISOString()})`;
  const lines = [
    "New CST Self-Paced enrollment just came in.", "",
    `Name: ${name}`, `Email: ${email}`, `Source: ${SOURCE_LABEL[source]}`, `Code issued: ${code}`, `Time: ${stamp}`, "",
    "They have been sent their welcome email and access code automatically.",
    "No action needed unless they reply requesting follow-up.",
  ];
  return { subject: `New CST Enrollment — ${name}`, text: lines.join("\n"), html: `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5">${lines.map((l) => (l ? `<div>${esc(l)}</div>` : "<br>")).join("")}</div>` };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(req) });
  const url = new URL(req.url);

  // ---- one-click unsubscribe (link in the e-mail = GET; mail clients' List-Unsubscribe-Post = POST with ?u=)
  const u = url.searchParams.get("u");
  if (u !== null) {
    const { data, error } = await sb.rpc("cst_unsubscribe", { p_token: u });
    if (error) { console.error("unsubscribe failed", error); return textReply(req, 500, "Something went wrong. Please reply to the email and we will take you off the list."); }
    return data
      ? textReply(req, 200, "You are unsubscribed. We will not email you again. Your access to Culinary Systems Training is unchanged.")
      : textReply(req, 404, "This unsubscribe link is not valid.");
  }

  if (req.method !== "POST") return reply(req, 405, { success: false, error: "method_not_allowed" });
  let body: any;
  try { body = await req.json(); } catch { return reply(req, 400, { success: false, error: "bad_json" }); }

  const name = String(body?.name ?? "").trim().replace(/\s+/g, " ");
  const email = String(body?.email ?? "").trim();
  const source = String(body?.source ?? "");
  if (!NAME_RE.test(name)) return reply(req, 400, { success: false, error: "bad_name" });
  if (email.length > 254 || !EMAIL_RE.test(email)) return reply(req, 400, { success: false, error: "bad_email" });
  if (!(source in SOURCE_LABEL)) return reply(req, 400, { success: false, error: "bad_source" });
  if (body?.website) return reply(req, 200, { success: true }); // honeypot field: bots fill it, people never see it

  try {
    // ---- throttle (per IP and overall)
    const ip = (req.headers.get("cf-connecting-ip") || (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown").slice(0, 64);
    const since = new Date(Date.now() - 3600_000).toISOString();
    const [mine, all] = await Promise.all([
      sb.from("cst_enrollment_log").select("id", { count: "exact", head: true }).eq("ip", ip).gte("at", since),
      sb.from("cst_enrollment_log").select("id", { count: "exact", head: true }).gte("at", since),
    ]);
    if (mine.error || all.error) throw mine.error || all.error;
    if ((mine.count || 0) >= MAX_PER_IP_HOUR || (all.count || 0) >= MAX_TOTAL_HOUR) return reply(req, 429, { success: false, error: "rate_limited" });
    await sb.from("cst_enrollment_log").insert({ ip });
    if (Math.random() < 0.05) await sb.from("cst_enrollment_log").delete().lt("at", new Date(Date.now() - 2 * 86400_000).toISOString());

    // ---- a code nobody else has, then one atomic insert (dedupes on e-mail, keeps the display name unique)
    let code = "", result: any = null;
    for (let attempt = 0; attempt < 5 && !result; attempt++) {
      code = makeCode();
      const taken = await sb.rpc("cst_code_exists", { p_code: code });
      if (taken.error) throw taken.error;
      if (taken.data) continue;
      const r = await sb.rpc("cst_enroll", { p_name: name, p_email: email, p_code: code, p_source: source });
      if (r.error) { if (String(r.error.code) === "23505" || String(r.error.message).includes("duplicate key")) continue; throw r.error; }
      result = r.data;
    }
    if (!result) throw new Error("could_not_enroll");

    // already enrolled, or opted out: success to the form, but no new code and no e-mail
    if (result.status !== "created") return reply(req, 200, { success: true });

    // ---- both e-mails at the same time
    const unsubUrl = `${functionsBase()}/cst-enrollment?u=${result.unsub_token}`;
    const a = applicantEmail(result.student_name, code, unsubUrl);
    const n = noticeEmail(result.student_name, email.toLowerCase(), source, code, new Date());
    const [applicant, notice] = await Promise.all([
      sendMail({
        from: FROM_APPLICANT, to: [email], reply_to: DUANE, subject: a.subject, text: a.text, html: a.html,
        headers: { "List-Unsubscribe": `<${unsubUrl}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" },
      }),
      sendMail({ from: FROM_NOTICE, to: [DUANE], subject: n.subject, text: n.text, html: n.html }),
    ]);
    return reply(req, 200, { success: true, code, emails: { applicant, notice } });
  } catch (e) {
    console.error("cst-enrollment error", e);
    return reply(req, 500, { success: false, error: "server_error" });
  }
});
