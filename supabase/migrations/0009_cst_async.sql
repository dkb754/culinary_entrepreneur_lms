-- CST Async (free, self-paced Culinary Systems Training) shares this Supabase project with the OCWB cohort build.
-- The two products are separated by a `level` tag: cohort rows/codes/sessions are 'L1' (or 'L2'); async ones are 'cst-async'.
-- The login session now remembers the level of the code that opened it, so each API can refuse the other product's sessions.
-- ADDITIVE: existing cohort rows, codes and sessions keep working (they default to 'L1').

alter table public.lms_sessions add column if not exists level text not null default 'L1';
alter table public.student_progress add column if not exists unlock_through int not null default 0; -- optional instructor override (weeks <= this are open)

create or replace function public.lms_session(p_token text)
returns jsonb language sql security definer set search_path = public, extensions stable as $$
  select jsonb_build_object('student_name', student_name, 'is_admin', is_admin, 'level', level)
    from public.lms_sessions
   where token_hash = encode(digest(coalesce(p_token, ''), 'sha256'), 'hex') and expires_at > now();
$$;

create or replace function public.lms_login(p_code text, p_ip text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare
  r record; tok text; fails int; exp timestamptz := now() + interval '12 hours';
begin
  perform public.lms_cleanup();
  perform public.lms_cleanup_attempts();
  select count(*) into fails from public.login_attempts
   where ip = coalesce(p_ip, 'unknown') and not ok and at > now() - interval '10 minutes';
  if fails >= 15 then return jsonb_build_object('status', 'locked'); end if;

  if p_code is null or length(p_code) = 0 or length(p_code) > 64 then
    insert into public.login_attempts (ip, ok) values (coalesce(p_ip, 'unknown'), false);
    return jsonb_build_object('status', 'invalid');
  end if;

  select * into r from public.student_access_codes
   where access_code_hash = crypt(upper(trim(p_code)), access_code_hash) limit 1;
  if not found then
    insert into public.login_attempts (ip, ok) values (coalesce(p_ip, 'unknown'), false);
    return jsonb_build_object('status', 'invalid');
  end if;

  tok := encode(gen_random_bytes(32), 'hex');
  insert into public.lms_sessions (token_hash, student_name, is_admin, level, expires_at)
  values (encode(digest(tok, 'sha256'), 'hex'), r.student_name, r.is_admin, r.level, exp);
  return jsonb_build_object('status', 'ok', 'student_name', r.student_name, 'is_admin', r.is_admin, 'level', r.level,
                            'token', tok, 'expires_at', exp);
end $$;

-- Creates or replaces a code AND sets which product it belongs to. Refuses to take over a code that belongs to another product.
create or replace function public.lms_set_code_level(p_name text, p_code text, p_admin boolean, p_level text)
returns void language plpgsql security definer set search_path = public, extensions as $$
begin
  if exists (select 1 from public.student_access_codes where student_name = p_name and level <> p_level) then
    raise exception 'name_belongs_to_other_product';
  end if;
  insert into public.student_access_codes (student_name, access_code_hash, is_admin, level)
  values (p_name, crypt(upper(trim(p_code)), gen_salt('bf', 8)), p_admin, p_level)
  on conflict (student_name) do update
    set access_code_hash = excluded.access_code_hash, is_admin = excluded.is_admin;
end $$;

-- Async quizzes: Level I (14) is published; Level II stays hidden until the instructor reviews and publishes it.
insert into public.lms_settings (key, value) values
  ('cst_async_published', '["w1d1","w1d2","w1d3","w1d4","w2d1","w2d2","w2d3","w2d4","w3d1","w3d2","w3d3","w3d4","w4d1","w4d2"]'::jsonb)
on conflict (key) do nothing;

revoke all on function public.lms_session(text), public.lms_login(text, text), public.lms_set_code_level(text, text, boolean, text)
  from public, anon, authenticated;
grant execute on function public.lms_session(text), public.lms_login(text, text), public.lms_set_code_level(text, text, boolean, text)
  to service_role;
