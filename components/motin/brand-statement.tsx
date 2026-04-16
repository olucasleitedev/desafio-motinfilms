"use client"

import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { Magnetic } from "./magnetic"
import { Reveal } from "./reveal"

export function BrandStatement() {
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-[#050507] py-28 md:py-44">
      <div className="mesh-bg absolute inset-0" aria-hidden />
      <div className="grain absolute inset-0" aria-hidden />

      {/* Floating gold orbs */}
      <div
        aria-hidden
        className="absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-[var(--gold)]/10 blur-[80px] animate-float"
      />
      <div
        aria-hidden
        className="absolute right-[12%] bottom-[18%] h-80 w-80 rounded-full bg-[var(--gold-soft)]/10 blur-[100px] animate-float [animation-delay:-4s]"
      />

      <div className="relative z-10 mx-auto max-w-[1200px] px-5 md:px-8 text-center">
        <Reveal>
          <div className="mb-10 flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-ivory/70">
                Manifesto
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <h2 className="display text-[clamp(2.25rem,7vw,6rem)] text-ivory text-balance">
            Impacto em cada{" "}
            <em className="display-italic text-[var(--gold)]">cena</em>,
            <br className="hidden md:block" />
            essência em cada{" "}
            <em className="display-italic text-[var(--gold)]">frame</em>.
          </h2>
        </Reveal>

        <Reveal delay={260}>
          <p className="mx-auto mt-10 max-w-2xl text-balance text-base leading-relaxed text-ivory/65 md:text-lg">
            +10 anos de experiência, certificação Ancine e um método testado
            em mais de 2.000 produções. Transformamos a complexidade dos seus
            produtos e serviços em narrativas visuais poderosas e
            irresistíveis.
          </p>
        </Reveal>

        <Reveal delay={400}>
          <div className="mt-14 flex justify-center">
            <Magnetic>
              <Link href="#portfolio" className="btn-pill btn-pill-primary">
                Veja o portfólio
                <ArrowUpRight size={14} />
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
