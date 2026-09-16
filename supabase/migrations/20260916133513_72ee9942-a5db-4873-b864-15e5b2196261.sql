
create policy "Site images readable" on storage.objects for select to anon, authenticated
using (bucket_id = 'site-images');
create policy "Admins upload site images" on storage.objects for insert to authenticated
with check (bucket_id = 'site-images' and private.has_role(auth.uid(),'admin'));
create policy "Admins update site images" on storage.objects for update to authenticated
using (bucket_id = 'site-images' and private.has_role(auth.uid(),'admin'))
with check (bucket_id = 'site-images' and private.has_role(auth.uid(),'admin'));
create policy "Admins delete site images" on storage.objects for delete to authenticated
using (bucket_id = 'site-images' and private.has_role(auth.uid(),'admin'));
