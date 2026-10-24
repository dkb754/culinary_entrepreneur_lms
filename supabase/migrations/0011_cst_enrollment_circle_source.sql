-- Add a third enrollment source for leads referred from the Circle Resource Needs Check-In
-- (a Google Form / Sheet used by a separate outreach program). ADDITIVE ONLY: the existing
-- 'culinarycoach' and 'redshirtops' sources, and every existing row, are untouched. Kept as its
-- own source value (not folded into either existing one) so the two referral populations stay
-- distinguishable in student_access_codes.source for reporting.

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
  if p_source not in ('culinarycoach', 'redshirtops', 'circle') then raise exception 'bad_source'; end if;
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

revoke all on function public.cst_enroll(text, text, text, text) from public, anon, authenticated;
grant execute on function public.cst_enroll(text, text, text, text) to service_role;
