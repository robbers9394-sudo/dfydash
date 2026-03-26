create table if not exists public.dfy_daily_sales (
  sales_date date primary key,
  musinsa_orders integer not null default 0 check (musinsa_orders >= 0),
  musinsa_sales bigint not null default 0 check (musinsa_sales >= 0),
  ably_orders integer not null default 0 check (ably_orders >= 0),
  ably_sales bigint not null default 0 check (ably_sales >= 0),
  kream_orders integer not null default 0 check (kream_orders >= 0),
  kream_sales bigint not null default 0 check (kream_sales >= 0),
  official_orders integer not null default 0 check (official_orders >= 0),
  official_sales bigint not null default 0 check (official_sales >= 0),
  expected_cost bigint not null default 0 check (expected_cost >= 0),
  daily_target bigint not null default 1042989 check (daily_target >= 0),
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.dfy_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists dfy_daily_sales_set_updated_at on public.dfy_daily_sales;
create trigger dfy_daily_sales_set_updated_at
before update on public.dfy_daily_sales
for each row
execute function public.dfy_set_updated_at();

create or replace view public.dfy_monthly_sales_summary as
select
  date_trunc('month', sales_date)::date as month_start,
  sum(musinsa_orders + ably_orders + kream_orders + official_orders) as total_orders,
  sum(musinsa_sales + ably_sales + kream_sales + official_sales) as total_sales,
  sum(daily_target) as total_target,
  sum((musinsa_sales + ably_sales + kream_sales + official_sales) - daily_target) as total_delta
from public.dfy_daily_sales
group by 1
order by 1 desc;

alter table public.dfy_daily_sales enable row level security;

drop policy if exists "dfy_daily_sales_public_rw" on public.dfy_daily_sales;
create policy "dfy_daily_sales_public_rw"
on public.dfy_daily_sales
for all
to anon, authenticated
using (true)
with check (true);
