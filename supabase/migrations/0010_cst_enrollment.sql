-- CST Async enrollment automation (Edge Function `cst-enrollment`). ADDITIVE ONLY: cohort rows are untouched.
-- Access codes stay hashed (bcrypt) like every other code, so there is no plaintext `access_code` column.
-- `email` and `unsub_token` are added beyond the brief: the email is the dedupe / opt-out key, the token makes the
-- unsubscribe link unguessable.

alter table public.student_access_codes
  add column if not exists email text,
  add column if not exists source text,
  add column if not exists opted_out boolean not null default false,
  add column if not exists enrolled_at timestamptz,
  add column if not exists unsub_token text;
-- existing (cohort) rows keep enrolled_at = null; only new rows get the timestamp
alter table public.student_access_codes alter column enrolled_at set default now();

create unique index if not exists student_access_codes_email_uq on public.student_access_codes (lower(email)) where email is not null;
create unique index if not exists student_access_codes_unsub_uq on public.student_access_codes (unsub_token) where unsub_token is not null;

-- Throttle log for the public enrollment endpoint
create table if not exists public.cst_enrollment_log (
  id bigint generated always as identity primary key,
  ip text not null,
  at timestamptz not null default now()
);
create index if not exists cst_enrollment_log_ip_at on public.cst_enrollment_log (ip, at);
alter table public.cst_enrollment_log enable row level security;
revoke all on public.cst_enrollment_log from anon, authenticated;

-- Does this plaintext code already belong to someone? (salted hashes cannot be compared with =)
create or replace function public.cst_code_exists(p_code text)
returns boolean language sql security definer set search_path = public, extensions stable as $$
  select exists (select 1 from public.student_access_codes
                  where access_code_hash = crypt(upper(trim(p_code)), access_code_hash));
$$;

-- Atomic enrollment: dedupe by e-mail, make the display name unique, store the hashed code.
create or replace function public.cst_enroll(p_name text, p_email text, p_code text, p_source text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare
  e text := lower(trim(p_email));
  base text := trim(p_name);
  nm text := trim(p_name);
  i int := 1;
  tok text;
  r record;
begin
  if p_source not in ('culinarycoach', 'redshirtops') then raise exception 'bad_source'; end if;
  perform pg_advisory_xact_lock(hashtext('cst_enroll:' || e));
  select opted_out into r from public.student_access_codes where lower(email) = e;
  if found then
    return jsonb_build_object('status', case when r.opted_out then 'opted_out' else 'duplicate' end);
  end if;
  while exists (select 1 from public.student_access_codes where student_name = nm) loop
    i := i + 1;
    if i > 50 then raise exception 'name_unavailable'; end if;
    nm := base || ' (' || i || ')';
  end loop;
  tok := encode(gen_random_bytes(24), 'hex');
  insert into public.student_access_codes (student_name, access_code_hash, is_admin, level, email, source, opted_out, unsub_token)
  values (nm, crypt(upper(trim(p_code)), gen_salt('bf', 8)), false, 'cst-async', e, p_source, false, tok);
  return jsonb_build_object('status', 'created', 'student_name', nm, 'unsub_token', tok);
end $$;

-- One-click unsubscribe: only the e-mail opt-out flag changes; the learner keeps their access.
create or replace function public.cst_unsubscribe(p_token text)
returns boolean language plpgsql security definer set search_path = public as $$
declare n int;
begin
  if p_token is null or length(p_token) < 32 then return false; end if;
  update public.student_access_codes set opted_out = true where unsub_token = p_token and level = 'cst-async';
  get diagnostics n = row_count;
  return n > 0;
end $$;

revoke all on function public.cst_code_exists(text), public.cst_enroll(text, text, text, text), public.cst_unsubscribe(text)
  from public, anon, authenticated;
grant execute on function public.cst_code_exists(text), public.cst_enroll(text, text, text, text), public.cst_unsubscribe(text)
  to service_role;
