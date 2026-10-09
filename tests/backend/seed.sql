-- Fixture logins for the backend tests. These are throwaway codes for a throwaway CI database, shaped like the real ones
-- but NOT the real ones (real access codes never appear in this repo). Runs against the local stack only.
select public.lms_set_code('CI Student A', 'CI-FIXTURE-A', false);
select public.lms_set_code('CI Student B', 'CI-FIXTURE-B', false);
select public.lms_set_code('CI Student C', 'CI-FIXTURE-C', false);
select public.lms_set_code('CI Student D', 'CI-FIXTURE-D', false);
select public.lms_set_code('CI Student E', 'CI-FIXTURE-E', false);
select public.lms_set_code('CI Student F', 'CI-FIXTURE-F', false);
select public.lms_set_code('CI Student G', 'CI-FIXTURE-G', false);
select public.lms_set_code('CI Student H', 'CI-FIXTURE-H', false);
select public.lms_set_code('CI Instructor', 'CI-FIXTURE-ADMIN', true);

-- CST Async (self-paced) fixtures: same throwaway-database rules as above.
select public.lms_set_code_level('CST Student A', 'CST-FIXTURE-A', false, 'cst-async');
select public.lms_set_code_level('CST Student B', 'CST-FIXTURE-B', false, 'cst-async');
select public.lms_set_code_level('CST Student C', 'CST-FIXTURE-C', false, 'cst-async');
select public.lms_set_code_level('CST Instructor', 'CST-FIXTURE-ADMIN', true, 'cst-async');
