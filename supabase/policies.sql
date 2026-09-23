-- Public read access is limited to published content.
-- Newsletter signups are intentionally insert-only for anonymous visitors.

create policy "published recipes are public"
on public.recipes for select to anon, authenticated
using (is_published = true);

create policy "published stories are public"
on public.stories for select to anon, authenticated
using (is_published = true);

create policy "published products are public"
on public.products for select to anon, authenticated
using (is_published = true);

create policy "visitors can subscribe"
on public.newsletter_subscribers for insert to anon, authenticated
with check (length(email) between 3 and 320);

create policy "users can view their orders"
on public.orders for select to authenticated
using (auth.uid() = user_id);

create policy "users can view their order items"
on public.order_items for select to authenticated
using (
  exists (
    select 1 from public.orders
    where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
  )
);
