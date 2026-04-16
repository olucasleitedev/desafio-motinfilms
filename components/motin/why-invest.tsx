import { SectionHeading } from "./section-heading"

const PROBLEMS = [
  {
    n: "01",
    title: "Vídeos genéricos?",
    body:
      "Produções que se misturam às demais, sem identidade visual e sem narrativa que gere identificação com o público certo.",
  },
  {
    n: "02",
    title: "Falta de tempo para planejar?",
    body:
      "Cuidamos de toda a cadeia: pré-produção, logística, direção, pós — para que você só precise acompanhar o resultado.",
  },
  {
    n: "03",
    title: "Roteiros confusos?",
    body:
      "Trabalhamos uma estratégia narrativa clara, com foco em conversão, storytelling e impacto emocional mensurável.",
  },
  {
    n: "04",
    title: "Falta de equipamentos e recursos?",
    body:
      "Câmeras cinema, ópticas profissionais, drones certificados, estúdio próprio, iluminação e equipe completa inclusos.",
  },
]

export function WhyInvest() {
  return (
    <section className="relative bg-black py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeading
          kicker="Diagnóstico"
          title={
            <>
              Por que você ainda <em className="display-italic text-[var(--gold)]">não investe</em> em audiovisual?
            </>
          }
          align="left"
        />

        <div className="mt-16 md:mt-24 grid md:grid-cols-2 gap-px bg-white/5">
          {PROBLEMS.map((p) => (
            <article
              key={p.n}
              className="group relative bg-black p-8 md:p-12 transition-colors duration-500 hover:bg-[#080603]"
            >
              <div className="flex items-start gap-6">
                <div className="flex flex-col items-start gap-3 pt-2">
                  <span className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)]">
                    {p.n}
                  </span>
                  <span className="h-8 w-px bg-[var(--gold)] transition-all duration-500 group-hover:h-16" />
                </div>

                <div className="flex-1">
                  <h3 className="display text-2xl md:text-3xl text-ivory mb-4">
                    {p.title}
                  </h3>
                  <p className="text-ivory/60 leading-relaxed max-w-lg">
                    {p.body}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
