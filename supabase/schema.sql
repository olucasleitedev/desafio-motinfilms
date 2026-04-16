-- =============================================================
-- Motin Films — Schema Supabase
-- Execute este SQL no SQL Editor do seu projeto Supabase
-- =============================================================

-- Tabela de leads
create table if not exists leads (
  id           uuid        default gen_random_uuid() primary key,
  nome         text        not null,
  email        text        not null,
  telefone     text        not null,
  necessidade  text        not null,
  status       text        not null default 'novo'
                           check (status in ('novo', 'contatado')),
  created_at   timestamptz default now() not null
);

-- Índice para queries ordenadas por data
create index if not exists leads_created_at_idx
  on leads (created_at desc);

-- ---------------------------------------------------------------
-- Row Level Security (RLS)
-- ---------------------------------------------------------------
alter table leads enable row level security;

-- Qualquer visitante (anon) pode inserir um lead
create policy "Inserção pública de leads"
  on leads for insert
  to anon
  with check (true);

-- Somente usuários autenticados (admin) podem ler
create policy "Leitura restrita a autenticados"
  on leads for select
  to authenticated
  using (true);

-- Somente usuários autenticados podem atualizar (ex: status)
create policy "Atualização restrita a autenticados"
  on leads for update
  to authenticated
  using (true)
  with check (true);

-- Somente usuários autenticados podem excluir
create policy "Exclusão restrita a autenticados"
  on leads for delete
  to authenticated
  using (true);
