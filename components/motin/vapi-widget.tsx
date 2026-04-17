"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import type Vapi from "@vapi-ai/web"
import {
  Mic,
  MicOff,
  PhoneOff,
  X,
  MessageCircle,
  Phone,
} from "lucide-react"

const ASSISTANT_ID = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!
const WHATSAPP_NUMBER = "5541991425126"
const WHATSAPP_MSG = encodeURIComponent(
  "Olá! Vim pelo site da Motin Films e gostaria de saber mais sobre os serviços de produção audiovisual."
)

type WidgetState = "idle" | "open" | "connecting" | "active" | "ended" | "error"
type Speaker = "sofia" | "user" | null

export function VapiWidget() {
  const [state, setState] = useState<WidgetState>("idle")
  const [errorMsg, setErrorMsg] = useState<string>("")
  const [muted, setMuted] = useState(false)
  const [speaker, setSpeaker] = useState<Speaker>(null)
  const [volume, setVolume] = useState(0)
  const vapiRef = useRef<Vapi | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      vapiRef.current?.removeAllListeners()
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const startCall = useCallback(async () => {
    const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY
    const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID

    if (!publicKey || !assistantId) {
      setErrorMsg("Configuração incompleta. Tente o WhatsApp.")
      setState("error")
      return
    }

    setState("connecting")
    setErrorMsg("")

    // Timeout de segurança: se call-start não disparar em 20s, volta para open
    timeoutRef.current = setTimeout(() => {
      vapiRef.current?.stop()
      setErrorMsg("Tempo esgotado. Verifique sua conexão e tente novamente.")
      setState("error")
    }, 20000)

    try {
      const { default: VapiSDK } = await import("@vapi-ai/web")
      const vapi = new VapiSDK(publicKey)
      vapiRef.current = vapi

      vapi.on("call-start", () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setState("active")
      })
      vapi.on("call-end", () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setState("ended")
        setSpeaker(null)
        setTimeout(() => setState("idle"), 3000)
      })
      vapi.on("speech-start", () => setSpeaker("sofia"))
      vapi.on("speech-end", () => setSpeaker(null))
      vapi.on("volume-level", (v: number) => setVolume(v))
      vapi.on("error", (e: unknown) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        const msg = e instanceof Error ? e.message : String(e)
        console.error("[Vapi error]", msg)
        setErrorMsg("Erro na chamada. Tente novamente ou use o WhatsApp.")
        setState("error")
      })

      await vapi.start(assistantId)
    } catch (e) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      const msg = e instanceof Error ? e.message : String(e)
      console.error("[Vapi startCall error]", msg)
      setErrorMsg("Não foi possível iniciar a chamada.")
      setState("error")
    }
  }, [])

  const endCall = useCallback(() => {
    vapiRef.current?.stop()
  }, [])

  const toggleMute = useCallback(() => {
    const next = !muted
    vapiRef.current?.setMuted(next)
    setMuted(next)
  }, [muted])

  if (state === "idle") {
    return (
      <button
        onClick={() => setState("open")}
        aria-label="Fale com a Motin Films"
        className="fixed bottom-8 right-8 z-50 group"
      >
        <span className="absolute inset-0 rounded-full bg-[#d4b46a]/20 animate-ping" />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#d4b46a] shadow-lg shadow-[#d4b46a]/30 hover:bg-[#c9a84c] transition-colors">
          <Phone className="h-5 w-5 text-[#08080a]" strokeWidth={1.8} />
        </span>
      </button>
    )
  }

  if (state === "connecting" || state === "active" || state === "ended" || state === "error") {
    return (
      <div className="fixed bottom-8 right-8 z-50 w-64 border border-white/15 bg-[#0d0d10]/95 backdrop-blur-md shadow-2xl p-5 flex flex-col items-center gap-5">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-[#d4b46a]/30 bg-[#d4b46a]/10">
          {state === "connecting" && (
            <span className="absolute inset-0 rounded-full border border-[#d4b46a]/40 animate-ping" />
          )}
          {state === "active" && (
            <span
              className="absolute inset-0 rounded-full border border-[#d4b46a]/40 animate-ping"
              style={{ animationDuration: volume > 0.05 ? "0.6s" : "2s" }}
            />
          )}
          <span className="text-2xl select-none">🎬</span>
        </div>

        <div className="text-center space-y-0.5">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#d4b46a]">
            Sofia · Motin Films
          </p>
          <p className="text-xs text-[#eeeae0]/50">
            {state === "connecting" && "Conectando..."}
            {state === "ended" && "Chamada encerrada"}
            {state === "active" &&
              (speaker === "sofia" ? "Sofia está falando..." : "Ouvindo...")}
          </p>
        </div>

        {state === "connecting" && (
          <button
            onClick={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current)
              vapiRef.current?.stop()
              setState("open")
            }}
            className="text-xs text-[#eeeae0]/45 hover:text-[#eeeae0] transition-colors"
          >
            Cancelar
          </button>
        )}

        {state === "error" && (
          <div className="flex flex-col items-center gap-3">
            <p className="text-xs text-red-400 text-center">{errorMsg}</p>
            <button
              onClick={() => { setErrorMsg(""); setState("open") }}
              className="text-xs text-[#eeeae0]/45 hover:text-[#eeeae0] transition-colors"
            >
              Voltar
            </button>
          </div>
        )}

        {state === "active" && (
          <div className="flex items-end gap-0.5 h-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="w-1 rounded-full bg-[#d4b46a] transition-all duration-100"
                style={{
                  height: `${Math.max(
                    4,
                    Math.random() * volume * 24 + (speaker ? 8 : 4)
                  )}px`,
                  opacity: volume > 0.02 || speaker ? 1 : 0.3,
                }}
              />
            ))}
          </div>
        )}

        {state === "active" && (
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMute}
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
                muted
                  ? "border-red-400/50 bg-red-400/10 text-red-400"
                  : "border-white/20 text-[#eeeae0]/60 hover:border-white/40"
              }`}
            >
              {muted ? (
                <MicOff className="h-4 w-4" strokeWidth={1.5} />
              ) : (
                <Mic className="h-4 w-4" strokeWidth={1.5} />
              )}
            </button>
            <button
              onClick={endCall}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/90 text-white hover:bg-red-500 transition-colors"
            >
              <PhoneOff className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        )}

        {state === "ended" && (
          <p className="text-[10px] text-[#eeeae0]/45 text-center">
            Entraremos em contato em breve.
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 w-72 border border-white/10 bg-[#0d0d10]/95 backdrop-blur-md shadow-2xl">
      <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/10">
        <div>
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#d4b46a]">
            Motin Films
          </p>
          <p className="text-sm text-[#eeeae0]/80 mt-0.5">Como prefere falar?</p>
        </div>
        <button
          onClick={() => setState("idle")}
          className="text-[#eeeae0]/45 hover:text-[#eeeae0] transition-colors"
        >
          <X className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-3">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-4 p-4 border border-white/10 hover:border-[#25D366]/40 hover:bg-[#25D366]/5 transition-colors group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366]/10 border border-[#25D366]/20 group-hover:bg-[#25D366]/20 transition-colors shrink-0">
            <MessageCircle className="h-4 w-4 text-[#25D366]" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-sm text-[#eeeae0] font-medium">WhatsApp</p>
            <p className="text-[11px] text-[#eeeae0]/55 mt-0.5">
              Mensagem pré-pronta
            </p>
          </div>
        </a>

        <button
          onClick={startCall}
          className="flex items-center gap-4 p-4 border border-white/10 hover:border-[#d4b46a]/40 hover:bg-[#d4b46a]/5 transition-colors group text-left"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4b46a]/10 border border-[#d4b46a]/20 group-hover:bg-[#d4b46a]/20 transition-colors shrink-0">
            <Mic className="h-4 w-4 text-[#d4b46a]" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-sm text-[#eeeae0] font-medium">Falar com Sofia</p>
            <p className="text-[11px] text-[#eeeae0]/55 mt-0.5">
              Atendimento por voz · IA
            </p>
          </div>
        </button>
      </div>

      <p className="px-5 pb-4 text-[10px] text-[#eeeae0]/40 text-center">
        Respondemos em até 24h úteis
      </p>
    </div>
  )
}
