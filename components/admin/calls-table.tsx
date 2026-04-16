"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ChevronDown, ExternalLink, Mic } from "lucide-react"

export interface Call {
  id: string
  vapi_call_id: string
  transcript: string | null
  recording_url: string | null
  duration_seconds: number | null
  summary: string | null
  ended_reason: string | null
  created_at: string
}

function formatDuration(seconds: number | null) {
  if (!seconds) return "—"
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}m ${s}s`
}

function EndedReasonBadge({ reason }: { reason: string | null }) {
  const labels: Record<string, string> = {
    "customer-ended-call": "Cliente encerrou",
    "assistant-ended-call": "Sofia encerrou",
    "max-duration-exceeded": "Tempo máximo",
    "silence-timed-out": "Inatividade",
  }
  return (
    <span className="text-[10px] tracking-[0.15em] uppercase text-[#eeeae0]/40">
      {reason ? (labels[reason] ?? reason) : "—"}
    </span>
  )
}

export function CallsTable({ calls }: { calls: Call[] }) {
  const [expanded, setExpanded] = useState<string | null>(null)

  if (calls.length === 0) {
    return (
      <div className="border border-white/10 px-8 py-16 text-center">
        <Mic className="h-6 w-6 text-[#eeeae0]/15 mx-auto mb-3" strokeWidth={1.2} />
        <p className="text-[#eeeae0]/30 text-sm">Nenhuma chamada registrada ainda.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {calls.map((call) => {
        const isOpen = expanded === call.id
        return (
          <div key={call.id} className="border border-white/10 bg-black/10">
            {/* row */}
            <button
              onClick={() => setExpanded(isOpen ? null : call.id)}
              className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d4b46a]/20 bg-[#d4b46a]/5 shrink-0">
                <Mic className="h-3.5 w-3.5 text-[#d4b46a]" strokeWidth={1.5} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-sm text-[#eeeae0]">
                    {format(new Date(call.created_at), "dd/MM/yy 'às' HH:mm", { locale: ptBR })}
                  </span>
                  <span className="text-[#eeeae0]/25 text-xs">·</span>
                  <span className="text-xs text-[#eeeae0]/50">
                    {formatDuration(call.duration_seconds)}
                  </span>
                  <span className="text-[#eeeae0]/25 text-xs">·</span>
                  <EndedReasonBadge reason={call.ended_reason} />
                </div>
                {call.summary && (
                  <p className="text-xs text-[#eeeae0]/40 mt-1 truncate">{call.summary}</p>
                )}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {call.recording_url && (
                  <a
                    href={call.recording_url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[10px] tracking-[0.2em] uppercase text-[#d4b46a]/60 hover:text-[#d4b46a] flex items-center gap-1 transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Ouvir
                  </a>
                )}
                <ChevronDown
                  className="h-4 w-4 text-[#eeeae0]/25 transition-transform duration-200"
                  style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}
                  strokeWidth={1.5}
                />
              </div>
            </button>

            {/* transcript */}
            {isOpen && (
              <div className="border-t border-white/10 px-5 py-4">
                {call.transcript ? (
                  <pre className="text-xs text-[#eeeae0]/55 leading-relaxed whitespace-pre-wrap font-sans">
                    {call.transcript}
                  </pre>
                ) : (
                  <p className="text-xs text-[#eeeae0]/30 italic">
                    Transcrição não disponível.
                  </p>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
