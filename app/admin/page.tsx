import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { format, subDays } from 'date-fns'
import { logout } from './actions'
import { LeadsTable, type Lead } from '@/components/admin/leads-table'
import { LeadsChart } from '@/components/admin/leads-chart'
import { CallsTable, type Call } from '@/components/admin/calls-table'
import { Film, Users, UserCheck, CalendarDays, LogOut, Mic } from 'lucide-react'

export default async function AdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/admin/login')

  const [{ data: leads }, { data: calls }] = await Promise.all([
    supabase.from('leads').select('*').order('created_at', { ascending: false }),
    supabase.from('calls').select('*').order('created_at', { ascending: false }).limit(50),
  ])

  const allLeads: Lead[] = leads ?? []
  const allCalls: Call[] = calls ?? []

  // Dados para o gráfico — últimos 14 dias
  const chartData = Array.from({ length: 14 }, (_, i) => {
    const day = subDays(new Date(), 13 - i)
    const dayStr = format(day, 'yyyy-MM-dd')
    const count = allLeads.filter((l) =>
      l.created_at.startsWith(dayStr)
    ).length
    return { date: format(day, 'dd/MM'), leads: count }
  })

  // Stats
  const total = allLeads.length
  const hoje = chartData[chartData.length - 1]?.leads ?? 0
  const contatados = allLeads.filter((l) => l.status === 'contatado').length
  const taxaContato = total > 0 ? Math.round((contatados / total) * 100) : 0

  return (
    <div className="min-h-screen bg-[#08080a]">
      {/* Header */}
      <header className="border-b border-white/10 px-6 md:px-10 py-4">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Film className="h-4 w-4 text-[#d4b46a]" strokeWidth={1.2} />
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#d4b46a]">
              Motin Films
            </span>
            <span className="text-white/20 text-xs mx-1">/</span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#eeeae0]/40">
              Dashboard
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#eeeae0]/30 text-xs hidden md:block">
              {user.email}
            </span>
            <form action={logout}>
              <button
                type="submit"
                className="flex items-center gap-1.5 text-[10px] tracking-[0.3em] uppercase text-[#eeeae0]/40 hover:text-[#eeeae0] transition-colors"
              >
                <LogOut className="h-3 w-3" />
                Sair
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 md:px-10 py-10 space-y-10">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: 'Total de leads',
              value: total,
              icon: Users,
              accent: false,
            },
            {
              label: 'Leads hoje',
              value: hoje,
              icon: CalendarDays,
              accent: hoje > 0,
            },
            {
              label: 'Contatados',
              value: contatados,
              icon: UserCheck,
              accent: false,
            },
            {
              label: 'Taxa de contato',
              value: `${taxaContato}%`,
              icon: UserCheck,
              accent: false,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="border border-white/10 bg-black/20 p-6 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#eeeae0]/35">
                  {stat.label}
                </span>
                <stat.icon
                  className="h-3.5 w-3.5 text-[#eeeae0]/20"
                  strokeWidth={1.2}
                />
              </div>
              <span
                className={`text-3xl font-light ${
                  stat.accent ? 'text-[#d4b46a]' : 'text-[#eeeae0]'
                }`}
              >
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="border border-white/10 bg-black/20 p-6 md:p-8">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-6 bg-[#d4b46a]" />
            <h2 className="text-[10px] tracking-[0.4em] uppercase text-[#d4b46a]">
              Leads por dia — últimos 14 dias
            </h2>
          </div>
          <LeadsChart data={chartData} />
        </div>

        {/* Leads Table */}
        <div className="border border-white/10 bg-black/20 p-6 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <span className="h-px w-6 bg-[#d4b46a]" />
              <h2 className="text-[10px] tracking-[0.4em] uppercase text-[#d4b46a]">
                Todos os leads
              </h2>
            </div>
            <span className="text-[#eeeae0]/25 text-xs">
              {total} {total === 1 ? 'registro' : 'registros'}
            </span>
          </div>
          <LeadsTable leads={allLeads} />
        </div>

        {/* Calls */}
        <div className="border border-white/10 bg-black/20 p-6 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <span className="h-px w-6 bg-[#d4b46a]" />
              <h2 className="text-[10px] tracking-[0.4em] uppercase text-[#d4b46a]">
                Chamadas — Sofia IA
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Mic className="h-3 w-3 text-[#eeeae0]/20" strokeWidth={1.2} />
              <span className="text-[#eeeae0]/25 text-xs">
                {allCalls.length} {allCalls.length === 1 ? 'chamada' : 'chamadas'}
              </span>
            </div>
          </div>
          <CallsTable calls={allCalls} />
        </div>
      </main>
    </div>
  )
}
