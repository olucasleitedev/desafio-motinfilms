"use client"

import { useRef } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { SectionHeading } from "./section-heading"

const TESTIMONIALS = [
  {
    quote:
      "Ficamos super satisfeitos com a produção. A equipe entendeu a complexidade do nosso setor e entregou um filme que comunica exatamente o que precisávamos — com estética impecável e narrativa envolvente.",
    author: "ENAF",
    role: "Projeto Institucional",
  },
  {
    quote:
      "A nossa minisérie 'Escolar pelo Brasil' ficou além das expectativas. Profissionalismo do início ao fim, sensibilidade na direção e um acabamento digno de grandes produções.",
    author: "Escolar Office Brasil",
    role: "Minisérie Documental",
  },
  {
    quote:
      "Ficamos bem contentes com o resultado. A Motin entendeu nosso tom de voz, traduziu visualmente nossos valores e entregou um material que tem gerado resultado real nas campanhas.",
    author: "Liquexpress",
    role: "Campanha de Produto",
  },
]

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)

  const scrollBy = (dir: 1 | -1) => {
    if (!ref.current) return
    ref.current.scrollBy({ left: dir * ref.current.clientWidth * 0.85, behavior: "smooth" })
  }

  return (
    <section id="depoimentos" className="relative bg-black py-24 md:py-36 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <SectionHeading
            kicker="Depoimentos"
            title={
              <>
                Resultados comprovados por quem <em className="display-italic text-[var(--gold)]">mais entende</em>.
              </>
            }
          />
          <div className="hidden md:flex items-center gap-3">
            <button
              aria-label="Anterior"
              onClick={() => scrollBy(-1)}
              className="flex h-12 w-12 items-center justify-center border border-white/15 text-ivory hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              aria-label="Próximo"
              onClick={() => scrollBy(1)}
              className="flex h-12 w-12 items-center justify-center border border-white/15 text-ivory hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={ref}
        className="no-scrollbar flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth px-6 md:px-10 pb-4"
      >
        <div className="shrink-0 w-2 md:w-[calc((100vw-1400px)/2)]" aria-hidden />
        {TESTIMONIALS.map((t, i) => (
          <article
            key={i}
            className="relative snap-start shrink-0 w-[85%] sm:w-[60%] md:w-[46%] lg:w-[38%] p-8 md:p-12 bg-white/[0.02] border border-white/10 backdrop-blur-sm"
          >
            <div className="absolute -top-6 left-8 md:left-12 font-display text-[8rem] leading-none text-[var(--gold)]/80 select-none">
              &ldquo;
            </div>

            <div className="relative pt-8">
              <div className="flex items-center gap-3 mb-8">
                <span className="h-px w-8 bg-[var(--gold)]" />
                <span className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)]">
                  {String(i + 1).padStart(2, "0")} — Cliente
                </span>
              </div>

              <p className="font-display text-xl md:text-2xl leading-[1.35] text-ivory/90 mb-10">
                {t.quote}
              </p>

              <div className="pt-6 border-t border-white/10">
                <div className="text-[var(--gold)] text-sm tracking-[0.15em] uppercase font-medium">
                  {t.author}
                </div>
                <div className="text-ivory/50 text-xs tracking-[0.2em] uppercase mt-1">
                  {t.role}
                </div>
              </div>
            </div>
          </article>
        ))}
        <div className="shrink-0 w-2 md:w-[calc((100vw-1400px)/2)]" aria-hidden />
      </div>
    </section>
  )
}
