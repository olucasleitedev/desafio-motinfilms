# Motin Films — Desafio Full-Stack Next.js

**[Demo ao vivo](https://desafio-motinfilms.vercel.app)** · **[Repositório](https://github.com/olucasleitedev/desafio-motinfilms)**

---

## Stack

| Camada         | Tecnologia                         |
| -------------- | ---------------------------------- |
| Framework      | Next.js 16 — App Router            |
| Linguagem      | TypeScript strict                  |
| Estilização    | Tailwind CSS v4 — Mobile First     |
| Banco de dados | Supabase (PostgreSQL + Auth + RLS) |
| Deploy         | Vercel                             |
| Gráficos       | Recharts                           |
| 3D             | Three.js + React Three Fiber       |

---

## Requisitos atendidos

### Parte 1 — Landing Page

- Todos os blocos do briefing implementados: Hero, Números, Por quê investir, Portfólio, Clientes, Serviços, Depoimentos e Contato
- Formulário com campos Nome, E-mail, Telefone e Necessidade (select)
- Estados de loading, sucesso e erro com feedback visual ao usuário
- Mobile First com breakpoints Tailwind em todos os componentes

### Parte 2 — Backend & Supabase

- `POST /api/leads` valida os dados com **Zod** no servidor antes de gravar
- Dados persistidos na tabela `leads` do Supabase
- **RLS ativo**: `anon` pode inserir, `authenticated` pode ler/atualizar/deletar
- Evento de analytics disparado no submit: `console.log('GTM Event: Lead Generated')`

### Parte 3 — Painel Admin (`/admin`)

- Rota protegida via **middleware Next.js** + Supabase Auth
- Login com e-mail e senha (`/admin/login`)
- Tabela de leads com nome, e-mail, telefone, necessidade, status e data
- Botão para **marcar como "Contatado"** e botão para **excluir** lead
- Feedback de loading por linha via `useTransition`

### Diferenciais implementados

- Gráfico de barras **"Leads por dia"** (últimos 14 dias) com Recharts
- Evento GTM fictício no submit do formulário
- Hero 3D com shaders GLSL via Three.js

---

## Decisões de arquitetura

**Server vs Client Components** — Server Component por padrão, Client apenas quando necessário. O dashboard (`/admin/page.tsx`) busca os leads no servidor antes de renderizar, sem loading states no cliente. Apenas os componentes com interação (`leads-table.tsx`, `leads-chart.tsx`, `contact-form.tsx`) são Client Components.

**Server Actions** — Mutações de status e exclusão usam Server Actions (`actions.ts`) com `revalidatePath`, eliminando API routes extras e mantendo o código colocado junto à feature.

**Segurança em camadas** — O middleware redireciona rotas `/admin` sem sessão. O RLS no banco rejeita operações não autorizadas mesmo que o middleware seja bypassado. A API route valida o schema com Zod antes de qualquer escrita.

---

## Setup local

```bash
git clone https://github.com/olucasleitedev/desafio-motinfilms.git
cd desafio-motinfilms
npm install
cp .env.example
```

Preencha `.env.local` com as credenciais do Supabase (Project Settings → API):

```env
NEXT_PUBLIC_SUPABASE_URL=etc
NEXT_PUBLIC_SUPABASE_ANON_KEY=etc
```

Execute o SQL de `supabase/schema.sql` no SQL Editor do Supabase, crie um usuário em **Authentication → Users → Add user** e rode:

```bash
npm run dev
```
