-- =============================================================
-- Motin Films — Tabela de chamadas VAPI
-- Execute no SQL Editor do Supabase
-- =============================================================

create table if not exists calls (
  id               uuid        default gen_random_uuid() primary key,
  vapi_call_id     text        unique not null,
  transcript       text,
  recording_url    text,
  duration_seconds integer,
  summary          text,
  ended_reason     text,
  created_at       timestamptz default now() not null
);

create index if not exists calls_created_at_idx on calls (created_at desc);

alter table calls enable row level security;

create policy "Inserção via service (webhook)"
  on calls for insert
  to anon
  with check (true);

create policy "Leitura restrita a autenticados"
  on calls for select
  to authenticated
  using (true);
