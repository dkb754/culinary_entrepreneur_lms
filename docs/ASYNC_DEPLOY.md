# CST Async (Culinary Systems Training — Self-Paced): deploy and operate

Free, online-only course for external CST inquiries. No labs, no cohort calendar. It shares the Supabase project with the
OCWB cohort build but is a separate site, separate branch and separate API.

| | OCWB cohort | CST Async |
|---|---|---|
| Netlify site | `culinarycoachlearn` (branch `main`) | **new site** (branch `cst-async`) |
| Work branch | `staging` | `cst-async-staging` |
| Edge Function | `lms-api-v2` | `cst-async-api` |
| Login level tag | `L1` | `cst-async` |
| Upload folder | `L1/{student}/{assignment}/` | `cst-async/{student}/{assignment}/` |
| Published-quiz setting | `published_quizzes` | `cst_async_published` |

## One-time setup (only you can do these)
1. **Netlify → Add new site → Import from GitHub** → `dkb754/learning-lms`, branch **`cst-async`**, build command empty, publish directory `.`
   (the `netlify.toml` in the branch already says this). Enable branch deploys for `cst-async-staging` for previews.
2. **Supabase, in this order** (the cohort guard must be live before any async code exists):
   1. Apply `supabase/migrations/0009_cst_async.sql`.
   2. Redeploy `lms-api-v2` and `lms-api` (they now refuse async sessions and hide async rows) and `send-checkins` (adds the async 90-day run).
   3. Deploy `cst-async-api` (verify_jwt off, as in `supabase/config.toml`).
3. **Create the instructor code for this site** (a separate admin; do not reuse the cohort one). In the Supabase SQL editor:
   `select public.lms_set_code_level('Culinary Coach Instructor', '<a long random code you choose>', true, 'cst-async');`
   Do not put that code in the repo or in chat.
4. **Resend:** the existing `RESEND_API_KEY` secret and verified domain are shared; nothing more to do for async.
5. Sign in to the new site as the instructor → **Quiz Review**: read the Level II quizzes (they are drafts) and publish them when you are happy.
   Until a week's quizzes are published, the next week stays closed by design.

## Giving someone access
Instructor → Student Tracker → **Add a student**: type the name and choose an access code (6–40 letters, numbers, dashes). The code is
stored scrambled and is never shown again, so send it to the student yourself.

## How the gates work (all on the server, no instructor action)
- Week 1 is open on enrollment.
- Week N+1 opens when every quiz in Week N is passed (70%+). Weeks 5–8 are Level II weeks 1–4.
- Level II (week 5) also needs the **Concept Brief** submitted. When both are true the dashboard shows "You're ready for Level II".
- "Open weeks through…" in the tracker is an optional override for one student; "automatic" removes it.
- The 90-day check-in email is sent 90 days after the student first passes Level I Quiz 14 (`w4d2`), if they opted in with an email.

## Deliverables
Honest Map (w1d4), Professional Identity Statement (w2d3), Recipe Cost Sheet (w3d4), Concept Brief (w4d3, Level I capstone),
KRP Portfolio (w4d4), Business Plan (w6d4), Operating Plan (w8d4, Level II capstone).

## Release flow
Work on `cst-async-staging`. A pull request into `cst-async` is closed automatically unless it comes from `cst-async-staging` and every
automated test passed (secret scan, content checks, browser tests, backend tests for both products, link check informational).
