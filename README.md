# Motin Films — Site Institucional

Mini-ecossistema de captação de leads desenvolvido como desafio técnico Full-Stack Next.js.

**[Demo ao vivo](https://motinfilms-site-institucional.vercel.app)** · **[Repositório](https://github.com/seu-usuario/motinfilms-site-institucional)**

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) |
| Linguagem | TypeScript (strict) |
| Estilização | Tailwind CSS v4 (Mobile First) |
| Backend/DB | Supabase (PostgreSQL + Auth + RLS) |
| Deploy | Vercel |
| Gráficos | Recharts |
| 3D/Visual | Three.js + React Three Fiber |

---

## Configuração local

### 1. Clone e instale as dependências

```bash
git clone https://github.com/seu-usuario/motinfilms-site-institucional.git
cd motinfilms-site-institucional
npm install
```

### 2. Configure as variáveis de ambiente

```bash
cp .env.example .env.local
```

Preencha com as credenciais do seu projeto Supabase (Project Settings → API):

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

### 3. Configure o banco de dados Supabase

No SQL Editor do seu projeto Supabase, execute o conteúdo de `supabase/schema.sql`. Isso irá:

- Criar a tabela `leads` com os campos: nome, email, telefone, necessidade, status, created_at
- Ativar **Row Level Security (RLS)**
- Criar as políticas de segurança:
  - `anon` pode **inserir** (formulário público)
  - `authenticated` pode **ler**, **atualizar** e **deletar** (painel admin)

### 4. Crie um usuário admin no Supabase

No painel do Supabase, vá em **Authentication → Users → Add user** e crie o usuário administrador com e-mail e senha.

### 5. Inicie o servidor

```bash
npm run dev
```

Acesse em `http://localhost:3000`.

---

## Estrutura do projeto

```
app/
├── page.tsx                    # Landing page (Server Component)
├── layout.tsx                  # Root layout com fontes e Analytics
├── admin/
│   ├── layout.tsx              # Layout do painel (meta robots: noindex)
│   ├── page.tsx                # Dashboard com stats, gráfico e tabela (Server Component)
│   ├── actions.ts              # Server Actions: updateLeadStatus, deleteLead, logout
│   └── login/
│       └── page.tsx            # Formulário de login (Client Component)
└── api/
    ├── leads/
    │   └── route.ts            # POST /api/leads — valida com Zod e salva no Supabase
    └── auth/
        └── callback/
            └── route.ts        # Callback OAuth/Magic Link do Supabase

components/
├── motin/                      # Componentes da landing page
│   └── contact-form.tsx        # Formulário de leads com estados loading/success/error
└── admin/
    ├── leads-table.tsx         # Tabela interativa com toggle status e delete (Client)
    └── leads-chart.tsx         # Gráfico de barras "Leads por dia" com Recharts (Client)

lib/
└── supabase/
    ├── client.ts               # Browser client (createBrowserClient)
    └── server.ts               # Server client (createServerClient + cookies)

middleware.ts                   # Proteção da rota /admin via Supabase session
supabase/
└── schema.sql                  # SQL completo para configurar o banco
```

---

## Decisões de arquitetura

### Server Components vs Client Components

A diretriz foi simples: **Server Component por padrão, Client Component apenas quando necessário**.

- `app/admin/page.tsx` é um **Server Component** que busca os leads diretamente no Supabase antes de renderizar. Isso elimina loading states, evita waterfalls e garante que o HTML chegue ao navegador com os dados prontos.
- `components/admin/leads-table.tsx` é **Client Component** porque precisa de `useTransition` para mostrar loading por linha ao chamar as Server Actions.
- `components/admin/leads-chart.tsx` é **Client Component** porque o Recharts usa APIs do browser (canvas/SVG interativo).
- O formulário de contato (`contact-form.tsx`) é **Client Component** pois gerencia estado de formulário com validação em tempo real.

### Server Actions para mutações

Em vez de criar API routes para update e delete, usei **Server Actions** (`app/admin/actions.ts`). Isso mantém as mutações colocadas junto à página que as consome, elimina boilerplate de fetch/response, e o `revalidatePath('/admin')` garante que os dados são atualizados sem reload manual.

### Segurança com RLS

Toda a segurança de dados está na camada do banco, não só no middleware:

- A **inserção** de leads é permitida para `anon` (usuário não autenticado) — necessário para o formulário público funcionar.
- **Leitura, atualização e exclusão** exigem `authenticated` — mesmo que alguém descubra a URL da API, o Supabase rejeita com 403.
- O **middleware Next.js** protege a rota `/admin` no nível de navegação, redirecionando para `/admin/login` se não houver sessão ativa.

### Validação em duas camadas

- **Cliente**: validação inline no formulário com feedback visual (blur-triggered).
- **Servidor**: validação com Zod no `POST /api/leads` antes de qualquer escrita no banco. Isso garante integridade mesmo se o cliente for bypassado.

---

## Uso de IA no desenvolvimento

Este projeto foi desenvolvido com auxílio do **Claude Code (Anthropic)** como pair programmer.

**Onde a IA ajudou mais:**
- Geração inicial da estrutura visual da landing page com base no briefing textual
- Implementação do hero 3D com shaders Three.js (componente `hero-3d.tsx`)
- Code review da arquitetura: identificou que o `ignoreBuildErrors: true` mascarava erros de TypeScript e que o formulário não tinha backend real
- Geração do schema SQL com RLS e políticas corretas para o modelo anon/authenticated
- Scaffolding do painel admin completo (layout, Server Actions, gráfico Recharts)

**O que foi feito manualmente:**
- Todas as decisões de design e identidade visual (paleta dourada, tipografia, animações)
- Ajustes de UX no formulário (touch state, phone masking)
- Revisão crítica de cada sugestão da IA antes de aceitar

A IA acelerou em ~60% o tempo de implementação das partes repetitivas (boilerplate de componentes, configuração do Supabase), liberando tempo para focar em qualidade visual e decisões arquiteturais.
