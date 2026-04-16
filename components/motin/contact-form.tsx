"use client"

import { useState } from "react"
import { Check, Instagram, MapPin, Mail, Phone, Send, Loader2 } from "lucide-react"

const NEEDS = [
  "Filme Institucional",
  "Filme Produto",
  "Filme Evento Corporativo",
  "Filme Conteúdo",
  "Outro",
]

function formatPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10)
    return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

export function ContactForm() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  )
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    necessidade: "",
  })
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const errors = {
    nome: form.nome.trim().length < 2 ? "Informe seu nome completo" : "",
    email: !/^\S+@\S+\.\S+$/.test(form.email) ? "E-mail inválido" : "",
    telefone:
      form.telefone.replace(/\D/g, "").length < 10
        ? "Telefone inválido"
        : "",
    necessidade: !form.necessidade ? "Selecione uma opção" : "",
  }

  const isValid = Object.values(errors).every((e) => !e)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ nome: true, email: true, telefone: true, necessidade: true })
    if (!isValid) return
    setState("loading")

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const { error } = await res.json().catch(() => ({ error: "Erro desconhecido" }))
        throw new Error(error ?? "Erro ao enviar")
      }

      console.log("GTM Event: Lead Generated", { email: form.email, necessidade: form.necessidade })
      setState("success")
    } catch {
      setState("error")
    }
  }

  return (
    <section
      id="contato"
      className="relative bg-[#050505] py-24 md:py-36 border-t border-white/5"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24">
          {/* LEFT — info */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px w-10 bg-[var(--gold)]" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)]">
                Contato
              </span>
            </div>
            <h2 className="display text-4xl md:text-6xl text-ivory mb-10">
              Vamos criar algo{" "}
              <em className="display-italic text-[var(--gold)]">
                memorável
              </em>{" "}
              juntos.
            </h2>
            <p className="text-ivory/60 leading-relaxed max-w-md mb-14">
              Preencha o formulário ao lado ou fale direto com o nosso time.
              Respondemos em até 24h úteis com uma proposta personalizada.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <MapPin
                  className="h-5 w-5 text-[var(--gold)] shrink-0 mt-0.5"
                  strokeWidth={1.2}
                />
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-ivory/40 mb-1">
                    Estúdio
                  </div>
                  <p className="text-ivory/80 text-sm leading-relaxed">
                    Rua Coronel Joaquim Ignácio Taborda Ribas, 212 — Bigorrilho
                    <br />
                    Curitiba / PR — CEP 80730-320, Brasil
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail
                  className="h-5 w-5 text-[var(--gold)] shrink-0 mt-0.5"
                  strokeWidth={1.2}
                />
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-ivory/40 mb-1">
                    E-mail
                  </div>
                  <a
                    href="mailto:contato@motinfilms.com.br"
                    className="text-ivory/80 text-sm hover:text-[var(--gold)] transition-colors"
                  >
                    contato@motinfilms.com.br
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone
                  className="h-5 w-5 text-[var(--gold)] shrink-0 mt-0.5"
                  strokeWidth={1.2}
                />
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-ivory/40 mb-1">
                    Telefone
                  </div>
                  <a
                    href="tel:+5541991425126"
                    className="text-ivory/80 text-sm hover:text-[var(--gold)] transition-colors"
                  >
                    +55 41 9142-5126
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-14 pt-10 border-t border-white/10">
              <div className="text-[10px] tracking-[0.4em] uppercase text-ivory/40 mb-5">
                Siga-nos
              </div>
              <div className="flex items-center gap-3">
                {[
                  {
                    icon: Instagram,
                    label: "@motinfilms",
                    href: "https://instagram.com/motinfilms",
                  },
                  {
                    icon: TiktokIcon,
                    label: "@motinfilms",
                    href: "https://tiktok.com/@motinfilms",
                  },
                  {
                    icon: FacebookIcon,
                    label: "/motinfilms",
                    href: "https://facebook.com/motinfilms",
                  },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex h-11 w-11 items-center justify-center border border-white/15 text-ivory/80 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
                  >
                    <s.icon className="h-4 w-4" strokeWidth={1.4} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — form */}
          <div className="relative">
            {state === "success" ? (
              <div className="flex flex-col items-start gap-6 p-10 md:p-14 border border-[var(--gold)]/40 bg-[var(--gold)]/5">
                <div className="flex h-14 w-14 items-center justify-center border border-[var(--gold)] text-[var(--gold)]">
                  <Check className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="display text-3xl md:text-4xl text-ivory mb-4">
                    Mensagem enviada.
                  </h3>
                  <p className="text-ivory/70 max-w-md leading-relaxed">
                    Recebemos seu contato. Entraremos em contato em breve com
                    uma proposta personalizada para o seu projeto.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setState("idle")
                    setForm({
                      nome: "",
                      email: "",
                      telefone: "",
                      necessidade: "",
                    })
                    setTouched({})
                  }}
                  className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)] hover:underline underline-offset-4"
                >
                  Enviar outra mensagem ↗
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 border border-white/10 p-8 md:p-12 bg-black/40 backdrop-blur-sm"
              >
                <FieldWrap
                  label="Nome"
                  error={touched.nome ? errors.nome : ""}
                >
                  <input
                    type="text"
                    value={form.nome}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, nome: e.target.value }))
                    }
                    onBlur={() => setTouched((t) => ({ ...t, nome: true }))}
                    placeholder="Seu nome completo"
                    className={inputCls}
                  />
                </FieldWrap>

                <FieldWrap
                  label="E-mail"
                  error={touched.email ? errors.email : ""}
                >
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                    placeholder="voce@empresa.com"
                    className={inputCls}
                  />
                </FieldWrap>

                <FieldWrap
                  label="Telefone"
                  error={touched.telefone ? errors.telefone : ""}
                >
                  <input
                    type="tel"
                    value={form.telefone}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        telefone: formatPhone(e.target.value),
                      }))
                    }
                    onBlur={() =>
                      setTouched((t) => ({ ...t, telefone: true }))
                    }
                    placeholder="(41) 99999-9999"
                    className={inputCls}
                  />
                </FieldWrap>

                <FieldWrap
                  label="Necessidade"
                  error={touched.necessidade ? errors.necessidade : ""}
                >
                  <select
                    value={form.necessidade}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, necessidade: e.target.value }))
                    }
                    onBlur={() =>
                      setTouched((t) => ({ ...t, necessidade: true }))
                    }
                    className={`${inputCls} appearance-none cursor-pointer bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%227%22 viewBox=%220 0 12 7%22><path d=%22M1 1l5 5 5-5%22 stroke=%22%23C9A84C%22 stroke-width=%221.5%22 fill=%22none%22/></svg>')] bg-no-repeat bg-[right_0.75rem_center] pr-10`}
                  >
                    <option value="" disabled className="bg-black">
                      Selecione uma opção
                    </option>
                    {NEEDS.map((n) => (
                      <option key={n} value={n} className="bg-black">
                        {n}
                      </option>
                    ))}
                  </select>
                </FieldWrap>

                {state === "error" && (
                  <p className="text-destructive text-sm">
                    Ops, algo deu errado. Tente novamente.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="btn-pill btn-pill-primary mt-2 justify-center disabled:opacity-60"
                >
                  {state === "loading" ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-3 w-3" strokeWidth={1.5} />
                      Enviar mensagem
                    </>
                  )}
                </button>

                <p className="text-[10px] tracking-[0.15em] uppercase text-ivory/30 text-center mt-2">
                  Seus dados estão protegidos • Resposta em até 24h
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

const inputCls =
  "w-full bg-transparent border-0 border-b border-white/15 px-0 py-3 text-ivory placeholder:text-ivory/25 focus:border-[var(--gold)] focus:outline-none focus:ring-0 transition-colors text-base"

function FieldWrap({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] tracking-[0.3em] uppercase text-ivory/50">
        {label}
      </label>
      {children}
      {error && <span className="text-destructive text-xs">{error}</span>}
    </div>
  )
}

function TiktokIcon({ className, strokeWidth }: { className?: string; strokeWidth?: number }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  )
}

function FacebookIcon({ className, strokeWidth }: { className?: string; strokeWidth?: number }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}
