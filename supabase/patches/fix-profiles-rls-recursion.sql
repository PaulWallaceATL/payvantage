-- Fix: "infinite recursion detected in policy for relation profiles"
-- Run once in Supabase SQL Editor (safe to re-run).
-- Admin policies must not SELECT profiles from within profiles RLS.

create or replace function public.is_platform_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce(
    (
      select p.role = 'admin'
      from public.profiles p
      where p.id = auth.uid()
    ),
    false
  );
$$;

revoke all on function public.is_platform_admin() from public;
grant execute on function public.is_platform_admin() to authenticated;
grant execute on function public.is_platform_admin() to service_role;

drop policy if exists "Admins can view all profiles" on public.profiles;
create policy "Admins can view all profiles"
  on public.profiles for select
  using (public.is_platform_admin());

drop policy if exists "Admins can update all profiles" on public.profiles;
create policy "Admins can update all profiles"
  on public.profiles for update
  using (public.is_platform_admin());

drop policy if exists "Admins can view all settings" on public.merchant_settings;
create policy "Admins can view all settings"
  on public.merchant_settings for select
  using (public.is_platform_admin());

drop policy if exists "Admins can update all settings" on public.merchant_settings;
create policy "Admins can update all settings"
  on public.merchant_settings for update
  using (public.is_platform_admin());

drop policy if exists "Admins manage merchant PayRam credentials" on public.merchant_payram_credentials;
create policy "Admins manage merchant PayRam credentials"
  on public.merchant_payram_credentials for all
  using (public.is_platform_admin())
  with check (public.is_platform_admin());

drop policy if exists "Admins can view all API keys" on public.api_keys;
create policy "Admins can view all API keys"
  on public.api_keys for select
  using (public.is_platform_admin());

drop policy if exists "Admins can view all transactions" on public.transactions;
create policy "Admins can view all transactions"
  on public.transactions for select
  using (public.is_platform_admin());
