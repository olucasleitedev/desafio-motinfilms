"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ChevronDown, Mic, Volume2, Clock, PhoneOff } from "lucide-react"

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

function formatDuration(s: number | null) {
  if (!s) return null
  const m = Math.floor(s / 60)
  const sec = s % 60
  return m > 0 ? `${m}m ${sec}s` : `${sec}s`
}

function parseTranscript(raw: string) {
  return raw.split("\n").filter(Boolean).map((line) => {
    const isSofia = /^sofia:/i.test(line)
    const isUser  = /^(user|usuário|cliente):/i.test(line)
    const text    = line.replace(/^[^:]+:\s*/, "")
    return { isSofia, isUser, text, raw: line }
  })
}

const REASON_LABELS: Record<string, string> = {
  "customer-ended-call":   "Cliente encerrou",
  "assistant-ended-call":  "Sofia encerrou",
  "max-duration-exceeded": "Tempo máximo",
  "silence-timed-out":     "Inatividade",
}

export function CallsTable({ calls }: { calls: Call[] }) {
  const [expanded, setExpanded] = useState<string | null>(null)

  if (calls.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 border border-white/10">
        <Mic className="h-5 w-5 text-[#eeeae0]/15" strokeWidth={1.2} />
        <p className="text-[#eeeae0]/30 text-sm">Nenhuma chamada registrada ainda.</p>
        <p className="text-[#eeeae0]/20 text-xs">As chamadas via widget de voz aparecem aqui automaticamente.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {calls.map((call) => {
        const isOpen   = expanded === call.id
        const duration = formatDuration(call.duration_seconds)
        const lines    = call.transcript ? parseTranscript(call.transcript) : []
        const reason   = call.ended_reason ? (REASON_LABELS[call.ended_reason] ?? call.ended_reason) : null

        return (
          <div key={call.id} className="border border-white/10 overflow-hidden">
            <button
              onClick={() => setExpanded(isOpen ? null : call.id)}
              className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-white/[0.02] transition-colors"
            >
              {/* icon */}
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d4b46a]/25 bg-[#d4b46a]/5 shrink-0">
                <Mic className="h-3.5 w-3.5 text-[#d4b46a]" strokeWidth={1.5} />
              </div>

              {/* info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-[#eeeae0]">
                    {format(new Date(call.created_at), "dd MMM yyyy, HH:mm", { locale: ptBR })}
                  </span>
                  {duration && (
                    <span className="flex items-center gap-1 text-[10px] tracking-[0.15em] uppercase text-[#eeeae0]/35">
                      <Clock className="h-2.5 w-2.5" />
                      {duration}
                    </span>
                  )}
                  {reason && (
                    <span className="flex items-center gap-1 text-[10px] tracking-[0.15em] uppercase text-[#eeeae0]/30">
                      <PhoneOff className="h-2.5 w-2.5" />
                      {reason}
                    </span>
                  )}
                </div>
                {call.summary && (
                  <p className="text-xs text-[#eeeae0]/45 mt-1 truncate">{call.summary}</p>
                )}
                {!call.summary && !call.transcript && (
                  <p className="text-xs text-[#eeeae0]/25 mt-1 italic">Sem transcrição disponível</p>
                )}
              </div>

              {/* chevron */}
              <ChevronDown
                className="h-4 w-4 text-[#eeeae0]/20 transition-transform duration-200 shrink-0"
                style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}
                strokeWidth={1.5}
              />
            </button>

            {isOpen && (
              <div className="border-t border-white/10 px-5 py-5 space-y-4">

                {/* audio player */}
                {call.recording_url ? (
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#d4b46a] mb-2 flex items-center gap-2">
                      <Volume2 className="h-3 w-3" strokeWidth={1.5} />
                      Gravação
                    </p>
                    <audio
                      controls
                      src={call.recording_url}
                      className="w-full h-9 opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </div>
                ) : (
                  <p className="text-[10px] text-[#eeeae0]/25 flex items-center gap-1.5">
                    <Volume2 className="h-3 w-3" />
                    Gravação não disponível — ative "Record Calls" nas configurações da Sofia na VAPI.
                  </p>
                )}

                {/* transcript */}
                {lines.length > 0 ? (
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#d4b46a] mb-3">
                      Transcrição
                    </p>
                    <div className="flex flex-col gap-2 max-h-72 overflow-y-auto pr-1">
                      {lines.map((line, i) => (
                        <div
                          key={i}
                          className={`flex gap-2 ${line.isSofia ? "flex-row" : "flex-row-reverse"}`}
                        >
                          <span className={`text-[9px] tracking-[0.2em] uppercase shrink-0 mt-1 ${
                            line.isSofia ? "text-[#d4b46a]/60" : "text-[#eeeae0]/30"
                          }`}>
                            {line.isSofia ? "Sofia" : "Cliente"}
                          </span>
                          <p className={`text-xs leading-relaxed px-3 py-2 max-w-[80%] ${
                            line.isSofia
                              ? "bg-[#d4b46a]/8 text-[#eeeae0]/70 border border-[#d4b46a]/15"
                              : "bg-white/5 text-[#eeeae0]/55 border border-white/8"
                          }`}>
                            {line.text || line.raw}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : call.transcript ? (
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#d4b46a] mb-3">Transcrição</p>
                    <p className="text-xs text-[#eeeae0]/50 leading-relaxed whitespace-pre-wrap">
                      {call.transcript}
                    </p>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
