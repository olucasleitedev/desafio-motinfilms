import { ArrowUpRight, Film, Package, Calendar, Megaphone } from "lucide-react"
import { SectionHeading } from "./section-heading"

const SERVICES = [
  {
    n: "01",
    icon: Film,
    title: "Filmes Institucional",
    body:
      "Apresente seus produtos, serviços, valores e missão em uma narrativa cinematográfica que posiciona sua marca como referência no mercado.",
  },
  {
    n: "02",
    icon: Package,
    title: "Filmes Produto",
    body:
      "Destaque seus produtos de maneira única no mercado com direção de arte impecável, iluminação controlada e storytelling focado em conversão.",
  },
  {
    n: "03",
    icon: Calendar,
    title: "Filme Evento Corporativo",
    body:
      "Capture os momentos mais importantes dos seus eventos e transforme em um aftermovie que emociona, informa e prolonga o impacto da sua marca.",
  },
  {
    n: "04",
    icon: Megaphone,
    title: "Filmes Conteúdo",
    body:
      "Dê voz à sua marca nas redes sociais com formatos pensados para cada plataforma — verticais, horizontais, curtos e em série.",
  },
]

export function Services() {
  return (
    <section id="servicos" className="relative bg-[#050505] py-24 md:py-36 border-y border-white/5">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeading
          kicker="Serviços"
          title={
            <>
              Soluções audiovisuais para <em className="display-italic text-[var(--gold)]">empresas</em>.
            </>
          }
          subtitle="Oferecemos um leque completo de soluções audiovisuais para impulsionar sua marca — da estratégia ao último corte."
        />

        <div className="mt-16 md:mt-24 grid md:grid-cols-2 gap-px bg-white/5">
          {SERVICES.map((s) => {
            const Icon = s.icon
            return (
              <article
                key={s.n}
                className="group relative bg-[#050505] p-8 md:p-14 overflow-hidden transition-colors duration-500 hover:bg-[#080603]"
              >
                {/* Corner gold */}
                <div className="absolute top-0 left-0 h-8 w-px bg-[var(--gold)] transition-all duration-500 group-hover:h-16" />
                <div className="absolute top-0 left-0 w-8 h-px bg-[var(--gold)] transition-all duration-500 group-hover:w-16" />

                <div className="flex items-start justify-between gap-6 mb-8">
                  <span className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)]">
                    {s.n} — Serviço
                  </span>
                  <Icon
                    className="h-5 w-5 text-ivory/40 group-hover:text-[var(--gold)] transition-colors"
                    strokeWidth={1.2}
                  />
                </div>

                <h3 className="display text-3xl md:text-4xl text-ivory mb-5">
                  {s.title}
                </h3>
                <p className="text-ivory/60 leading-relaxed max-w-md mb-10">
                  {s.body}
                </p>

                <a
                  href="#contato"
                  className="inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-[var(--gold)] hover:gap-5 transition-all"
                >
                  Saiba mais
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </a>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
