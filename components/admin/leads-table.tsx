'use client'

import { useState, useTransition } from 'react'
import { updateLeadStatus, deleteLead } from '@/app/admin/actions'
import { Loader2, Trash2, CheckCircle2, RotateCcw } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export interface Lead {
  id: string
  nome: string
  email: string
  telefone: string
  necessidade: string
  status: 'novo' | 'contatado'
  created_at: string
}

export function LeadsTable({ leads }: { leads: Lead[] }) {
  const [isPending, startTransition] = useTransition()
  const [loadingId, setLoadingId] = useState<string | null>(null)

  function handleToggleStatus(lead: Lead) {
    setLoadingId(lead.id)
    startTransition(async () => {
      await updateLeadStatus(lead.id, lead.status === 'novo' ? 'contatado' : 'novo')
      setLoadingId(null)
    })
  }

  function handleDelete(id: string) {
    if (!confirm('Tem certeza que deseja excluir este lead?')) return
    setLoadingId(id)
    startTransition(async () => {
      await deleteLead(id)
      setLoadingId(null)
    })
  }

  if (leads.length === 0) {
    return (
      <div className="border border-white/10 px-8 py-16 text-center">
        <p className="text-[#eeeae0]/30 text-sm">Nenhum lead cadastrado ainda.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            {['Nome', 'E-mail', 'Telefone', 'Necessidade', 'Status', 'Data', ''].map(
              (h) => (
                <th
                  key={h}
                  className="text-left text-[10px] tracking-[0.3em] uppercase text-[#eeeae0]/35 font-normal py-3 px-4 first:pl-0 last:pr-0"
                >
                  {h}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => {
            const isLoading = loadingId === lead.id && isPending
            return (
              <tr
                key={lead.id}
                className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
              >
                <td className="py-4 px-4 pl-0 text-[#eeeae0] font-medium">
                  {lead.nome}
                </td>
                <td className="py-4 px-4 text-[#eeeae0]/60">{lead.email}</td>
                <td className="py-4 px-4 text-[#eeeae0]/60 whitespace-nowrap">
                  {lead.telefone}
                </td>
                <td className="py-4 px-4 text-[#eeeae0]/60">{lead.necessidade}</td>
                <td className="py-4 px-4">
                  <span
                    className={`inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 border ${
                      lead.status === 'contatado'
                        ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5'
                        : 'border-[#d4b46a]/30 text-[#d4b46a] bg-[#d4b46a]/5'
                    }`}
                  >
                    {lead.status === 'contatado' ? (
                      <CheckCircle2 className="h-2.5 w-2.5" />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#d4b46a]" />
                    )}
                    {lead.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-[#eeeae0]/40 whitespace-nowrap text-xs">
                  {format(new Date(lead.created_at), "dd/MM/yy 'às' HH:mm", {
                    locale: ptBR,
                  })}
                </td>
                <td className="py-4 px-4 pr-0">
                  <div className="flex items-center gap-2 justify-end">
                    <button
                      onClick={() => handleToggleStatus(lead)}
                      disabled={isLoading}
                      title={
                        lead.status === 'novo'
                          ? 'Marcar como contatado'
                          : 'Marcar como novo'
                      }
                      className="flex items-center gap-1.5 border border-white/15 px-2.5 py-1.5 text-[10px] tracking-[0.2em] uppercase text-[#eeeae0]/60 hover:border-[#d4b46a]/50 hover:text-[#d4b46a] transition-colors disabled:opacity-40"
                    >
                      {isLoading ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : lead.status === 'novo' ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : (
                        <RotateCcw className="h-3 w-3" />
                      )}
                      {lead.status === 'novo' ? 'Contatar' : 'Reabrir'}
                    </button>
                    <button
                      onClick={() => handleDelete(lead.id)}
                      disabled={isLoading}
                      title="Excluir lead"
                      className="flex items-center justify-center border border-white/10 p-1.5 text-[#eeeae0]/30 hover:border-red-400/40 hover:text-red-400 transition-colors disabled:opacity-40"
                    >
                      {isLoading ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Trash2 className="h-3 w-3" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
