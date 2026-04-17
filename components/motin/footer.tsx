import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/5 overflow-hidden">
      {/* Giant brand wordmark */}
      <div className="relative pt-24 md:pt-32 pb-12">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid md:grid-cols-[1fr_auto] gap-10 items-end">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="h-px w-12 bg-[var(--gold)]" />
                <span className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)]">
                  Pronto para começar?
                </span>
              </div>
              <h2 className="display text-4xl md:text-6xl lg:text-7xl text-ivory text-balance">
                Vamos dar vida à sua{" "}
                <em className="display-italic text-[var(--gold)]">
                  próxima história
                </em>
                .
              </h2>
            </div>
            <a href="#contato" className="btn-pill btn-pill-primary shrink-0">
              Iniciar projeto
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Wordmark */}
      <div className="relative overflow-hidden py-8 md:py-12 border-y border-white/5">
        <div className="flex items-center justify-center">
          <span className="display text-[18vw] text-ivory/[0.05] select-none whitespace-nowrap">
            Motin <span className="display-italic text-[var(--gold)]/30">Films</span>
          </span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-[11px] tracking-[0.2em] uppercase text-ivory/40">
        <div className="flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-5 sm:gap-6">
          <Image
            src="/og.jpg"
            alt="Motin Films"
            width={360}
            height={189}
            className="h-14 w-auto max-w-[min(100vw,16rem)] sm:h-16 sm:max-w-[18rem] md:h-[4.5rem] md:max-w-[20rem] object-contain object-left opacity-95"
          />
          <span className="sm:border-l sm:border-white/10 sm:pl-6">© 2026 Motin Films</span>
          <div className="flex items-center gap-2.5 sm:border-l sm:border-white/10 sm:pl-6">
            <Image
              src="/ANCINE.svg.png"
              alt="ANCINE — Agência Nacional do Cinema"
              width={88}
              height={32}
              className="h-6 w-auto object-contain opacity-90"
            />
            <span>Certificação Ancine</span>
          </div>
        </div>
        <div className="flex items-center gap-6 flex-wrap">
          <a href="#servicos" className="hover:text-[var(--gold)] transition-colors">
            Serviços
          </a>
          <a href="#portfolio" className="hover:text-[var(--gold)] transition-colors">
            Portfólio
          </a>
          <a href="#contato" className="hover:text-[var(--gold)] transition-colors">
            Contato
          </a>
          <span>Curitiba / PR — Brasil</span>
        </div>
      </div>
    </footer>
  )
}
