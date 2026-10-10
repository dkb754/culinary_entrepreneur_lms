# CST Async enrollment automation (`cst-enrollment`)

A form on culinarycoach.org or redshirtops.com posts to one Supabase Edge Function. It issues a free access code, stores it
(hashed), and sends two e-mails through Resend at the same time. It does not use `lms-api-v2`, `validate-login`, `student_progress`
or any cohort data.

## Endpoint
`POST https://mddvqxesxfifqxhuzhsi.supabase.co/functions/v1/cst-enrollment` (no API key or login needed)

```json
{ "name": "Maya Brooks", "email": "maya@example.com", "source": "culinarycoach" }
```
- `name` 2–60 letters (spaces . ' - allowed), `email` valid address, `source` is `"culinarycoach"` or `"redshirtops"`.
- Optional hidden field `"website"`: leave it empty. Bots fill it in and are silently ignored.

Responses
| Status | Body | Meaning |
|---|---|---|
| 200 | `{ "success": true, "code": "CST-2026-X7K2M9", "emails": {"applicant":"sent","notice":"sent"} }` | New learner. `emails` can also say `failed` or `not_configured`; the enrollment still stands. |
| 200 | `{ "success": true }` | That e-mail is already enrolled or has opted out. No new code, no e-mail. |
| 400 | `{ "success": false, "error": "bad_name" \| "bad_email" \| "bad_source" \| "bad_json" }` | Fix the form data. |
| 429 | `{ "success": false, "error": "rate_limited" }` | More than 5 per visitor or 100 in total in an hour. |
| 500 | `{ "success": false, "error": "server_error" }` | Try again. |

Browser forms: only culinarycoach.org, www.culinarycoach.org, redshirtops.com and www.redshirtops.com may call it from a page.

Minimal HTML form hook:
```js
fetch('https://mddvqxesxfifqxhuzhsi.supabase.co/functions/v1/cst-enrollment', {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, source: 'culinarycoach' })   // or 'redshirtops'
}).then(r => r.json()).then(d => { /* d.success */ });
```

## What it does
1. Validates the data, applies the throttle, ignores the honeypot.
2. Makes `CST-{YEAR}-{6 characters}` (no 0, O, 1 or I). It checks that nobody else has that code.
3. Inserts one row in `student_access_codes`: `student_name`, hashed code, `level = 'cst-async'`, `is_admin = false`, `email`, `source`,
   `enrolled_at`, `opted_out = false`, and an unguessable `unsub_token`. A name that is already taken gets "(2)", "(3)" and so on.
   The same e-mail is never enrolled twice.
4. Sends the applicant's welcome e-mail (from Chef Duane Brown) and Duane's notice (from noreply@culinarycoach.org) in parallel.

Differences from the written brief, on purpose:
- The code is stored as a bcrypt hash like every other access code, so there is no readable `access_code` column. The only place the
  code appears is the welcome e-mail, Duane's notice and the response to the form.
- `email` and `unsub_token` columns were added (the table had no e-mail column, and the unsubscribe link needs an unguessable token).
- `enrolled_at` is empty for the 10 cohort rows (only new rows get a time).

## Unsubscribe
Every applicant e-mail has a one-click link and the `List-Unsubscribe` header. Clicking sets `opted_out = true`. That stops all e-mail to
that address (including a second form submission). The learner keeps their access to the course.

## Where to see enrollments
1. Duane's notice e-mail, immediately.
2. resend.com/emails: every outgoing e-mail and its delivery status.
3. Supabase → Table Editor → `student_access_codes` (filter `level = cst-async`): name, e-mail, source, enrolled_at, opted_out. The
   code itself is not shown (hashed). It is in Duane's notice.
Also, new learners appear in the course's Student Tracker as soon as they enrol.

## Needs Resend
Set the `RESEND_API_KEY` secret and verify `culinarycoach.org` in Resend, so `duane@culinarycoach.org` and `noreply@culinarycoach.org` can send.
Without the key, enrollment still works and the response shows `"emails": {"applicant":"not_configured", ...}`. The learner only gets
their code if your form shows it from the response.

## Tests
`tools/backend-tests-enrollment.mjs` runs in CI against the real function and a mock Resend server (`tools/mock-resend.mjs`).
