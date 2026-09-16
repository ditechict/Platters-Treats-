
create schema if not exists private;
grant usage on schema private to authenticated, service_role;

create or replace function private.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;
revoke all on function private.has_role(uuid, public.app_role) from public, anon;
grant execute on function private.has_role(uuid, public.app_role) to authenticated, service_role;

-- user_roles
drop policy "Users can view their own roles" on public.user_roles;
drop policy "Admins manage roles" on public.user_roles;
create policy "Users can view their own roles" on public.user_roles for select to authenticated
using (auth.uid() = user_id or private.has_role(auth.uid(),'admin'));
create policy "Admins manage roles" on public.user_roles for all to authenticated
using (private.has_role(auth.uid(),'admin')) with check (private.has_role(auth.uid(),'admin'));

-- profiles
drop policy "Users view own profile" on public.profiles;
create policy "Users view own profile" on public.profiles for select to authenticated
using (auth.uid() = id or private.has_role(auth.uid(),'admin'));

-- menu_categories
drop policy "Admins manage menu categories" on public.menu_categories;
create policy "Admins manage menu categories" on public.menu_categories for all to authenticated
using (private.has_role(auth.uid(),'admin')) with check (private.has_role(auth.uid(),'admin'));

-- menu_items
drop policy "Admins manage menu items" on public.menu_items;
create policy "Admins manage menu items" on public.menu_items for all to authenticated
using (private.has_role(auth.uid(),'admin')) with check (private.has_role(auth.uid(),'admin'));

-- gallery
drop policy "Admins manage gallery" on public.gallery_images;
create policy "Admins manage gallery" on public.gallery_images for all to authenticated
using (private.has_role(auth.uid(),'admin')) with check (private.has_role(auth.uid(),'admin'));

-- orders
drop policy "Customers view own orders" on public.orders;
drop policy "Admins update orders" on public.orders;
create policy "Customers view own orders" on public.orders for select to authenticated
using (auth.uid() = user_id or private.has_role(auth.uid(),'admin'));
create policy "Admins update orders" on public.orders for update to authenticated
using (private.has_role(auth.uid(),'admin')) with check (private.has_role(auth.uid(),'admin'));

-- order_items
drop policy "Customers view own order items" on public.order_items;
create policy "Customers view own order items" on public.order_items for select to authenticated
using (exists (select 1 from public.orders o where o.id = order_id and (o.user_id = auth.uid() or private.has_role(auth.uid(),'admin'))));

-- enquiries
drop policy "Admins view enquiries" on public.enquiries;
drop policy "Admins update enquiries" on public.enquiries;
create policy "Admins view enquiries" on public.enquiries for select to authenticated using (private.has_role(auth.uid(),'admin'));
create policy "Admins update enquiries" on public.enquiries for update to authenticated
using (private.has_role(auth.uid(),'admin')) with check (private.has_role(auth.uid(),'admin'));

-- event_bookings
drop policy "Own or admin bookings visible" on public.event_bookings;
drop policy "Admins update bookings" on public.event_bookings;
create policy "Own or admin bookings visible" on public.event_bookings for select to authenticated
using (auth.uid() = user_id or private.has_role(auth.uid(),'admin'));
create policy "Admins update bookings" on public.event_bookings for update to authenticated
using (private.has_role(auth.uid(),'admin')) with check (private.has_role(auth.uid(),'admin'));

drop function public.has_role(uuid, public.app_role);
