"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "./section-heading";

type Step = {
  n: string;
  title: string;
  body: string;
  tag: string;
  duration: string;
  image: string;
  deliverables: string[];
  output: string;
};

const STEPS: Step[] = [
  {
    n: "01",
    title: "Imersão & Estratégia",
    body: "Mergulhamos no seu negócio, público e objetivos para definir a narrativa com precisão cirúrgica. Cada decisão é lastreada em dados e intenção.",
    tag: "Briefing · Research",
    duration: "3 a 5 dias",
    image: "/process-01-imersao.jpg",
    deliverables: [
      "Kick-off com stakeholders e alinhamento",
      "Pesquisa de marca, público e concorrência",
      "Definição de tom, objetivo e KPIs",
      "Proposta narrativa e moodboard inicial",
    ],
    output: "Blueprint estratégico assinado",
  },
  {
    n: "02",
    title: "Roteiro & Pré-Produção",
    body: "Construímos o conceito, o roteiro e o storyboard com a logística completa por trás. Cada frame é planejado antes da câmera rolar.",
    tag: "Script · Storyboard",
    duration: "5 a 10 dias",
    image: "/process-02-roteiro.jpg",
    deliverables: [
      "Roteiro cinematográfico completo",
      "Storyboard frame-a-frame",
      "Casting, locação, arte e logística",
      "Cronograma e decoupage final",
    ],
    output: "Produção 100% blindada",
  },
  {
    n: "03",
    title: "Direção & Captação",
    body: "Câmeras cinema, ópticas profissionais, equipe completa em set. Dirigimos com precisão e capturamos com a liberdade que a história exige.",
    tag: "Shoot · Direction",
    duration: "1 a 5 diárias",
    image: "/process-03-direcao.jpg",
    deliverables: [
      "Direção criativa em set",
      "Captação em câmera cinema + ópticas premium",
      "Áudio profissional e iluminação cinematográfica",
      "Acompanhamento ao vivo do cliente (opcional)",
    ],
    output: "Material bruto cinematográfico",
  },
  {
    n: "04",
    title: "Pós & Entrega",
    body: "Edição, color grading, trilha e finalização. Entregamos em padrão cinema, prontos para rodar nos canais de maior exigência.",
    tag: "Edit · Color · Sound",
    duration: "7 a 15 dias",
    image: "/process-04-pos.jpg",
    deliverables: [
      "Edição narrativa e rítmica",
      "Color grading em padrão cinema (DaVinci)",
      "Trilha original, design de som e mix",
      "Masters para TV, web, cinema e social",
    ],
    output: "Peça final pronta para veicular",
  },
];

export function Process() {
  const [active, setActive] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const rafRef = useRef<number | null>(null);

  const go = useCallback(
    (i: number) =>
      setActive(((i % STEPS.length) + STEPS.length) % STEPS.length),
    [],
  );

  // Auto advance every 7s, pausa no hover
  useEffect(() => {
    if (isHover) return;
    const t = setTimeout(() => go(active + 1), 7000);
    return () => clearTimeout(t);
  }, [active, isHover, go]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(active + 1);
      if (e.key === "ArrowLeft") go(active - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, go]);

  // Cleanup raf if ever used
  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  const step = STEPS[active];

  return (
    <section
      id="processo"
      className="relative overflow-hidden bg-background py-24 md:py-32"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="mesh-bg absolute inset-0 opacity-60" aria-hidden />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 md:px-8">
        <div className="mb-16 md:mb-20">
          <SectionHeading
            kicker="Processo"
            title={
              <>
                Do briefing ao{" "}
                <em className="display-italic text-[var(--gold)]">
                  último frame
                </em>
                .
              </>
            }
            subtitle="Um método testado em mais de 2.000 produções — transparente, colaborativo e obcecado por qualidade."
          />
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-20">
          {/* LEFT — step rail (clickable) */}
          <div className="relative">
            <div className="absolute left-[11px] top-3 bottom-3 w-px bg-white/10" />
            <div
              className="absolute left-[11px] top-3 w-px bg-[var(--gold)] transition-[height] duration-700 ease-out"
              style={{
                height: `calc(${((active + 1) / STEPS.length) * 100}% - 24px)`,
              }}
              aria-hidden
            />

            <ul className="flex flex-col gap-3">
              {STEPS.map((s, i) => {
                const isActive = i === active;
                return (
                  <li key={s.n}>
                    <button
                      type="button"
                      onClick={() => go(i)}
                      aria-current={isActive ? "step" : undefined}
                      className="group relative w-full text-left pl-10 py-4 pr-4 rounded-lg transition-colors duration-500 focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--gold)]/60"
                    >
                      {/* dot */}
                      <span
                        aria-hidden
                        className={`absolute left-1 top-1/2 -translate-y-1/2 h-[22px] w-[22px] rounded-full border-2 transition-all duration-500 ${
                          isActive
                            ? "border-[var(--gold)] bg-[var(--gold)] scale-100"
                            : "border-white/20 bg-transparent group-hover:border-[var(--gold)]/60 scale-[0.85]"
                        }`}
                      />

                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ivory/55">
                          {s.n}
                        </span>
                        <span
                          className={`display text-[clamp(1.35rem,2.2vw,1.9rem)] leading-none transition-colors duration-500 ${
                            isActive
                              ? "text-ivory"
                              : "text-ivory/50 group-hover:text-ivory/80"
                          }`}
                        >
                          {s.title}
                        </span>
                      </div>

                      <div
                        className={`grid transition-all duration-700 ease-out ${
                          isActive
                            ? "grid-rows-[1fr] opacity-100 mt-3"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <p className="text-sm leading-relaxed text-ivory/65 max-w-md">
                            {s.body}
                          </p>
                          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
                            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]">
                              {s.tag}
                            </span>
                            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ivory/50">
                              {s.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-10 flex items-center gap-3">
              <button
                onClick={() => go(active - 1)}
                aria-label="Etapa anterior"
                className="btn-pill"
              >
                <ArrowRight className="h-3.5 w-3.5 rotate-180" />
                Anterior
              </button>
              <button
                onClick={() => go(active + 1)}
                aria-label="Próxima etapa"
                className="btn-pill btn-pill-primary"
              >
                Próxima
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* RIGHT — cinematic reveal card */}
          <div className="relative perspective-1200">
            <div className="relative aspect-[4/5] md:aspect-[5/6] w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)]">
              {/* Stack: crossfade images */}
              {STEPS.map((s, i) => (
                <div
                  key={s.n}
                  aria-hidden={i !== active}
                  className={`absolute inset-0 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    i === active
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-[1.06] pointer-events-none"
                  }`}
                >
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    priority={i === 0}
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover"
                  />
                </div>
              ))}

              {/* gradients */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent"
                aria-hidden
              />
              <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(212,180,106,0.18),transparent_55%)] mix-blend-screen"
                aria-hidden
              />

              {/* Film frame corners */}
              {[
                "top-4 left-4 border-t border-l",
                "top-4 right-4 border-t border-r",
                "bottom-4 left-4 border-b border-l",
                "bottom-4 right-4 border-b border-r",
              ].map((pos) => (
                <span
                  key={pos}
                  aria-hidden
                  className={`pointer-events-none absolute h-5 w-5 ${pos} border-[var(--gold)]/60`}
                />
              ))}

              {/* Top info bar */}
              <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 md:p-7">
                <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-ivory/75">
                  Etapa {step.n} / 0{STEPS.length}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-ivory/75">
                  {step.duration}
                </span>
              </div>

              {/* Bottom content block */}
              <div
                key={`content-${active}`}
                className="absolute inset-x-0 bottom-0 p-6 md:p-10"
              >
                <div className="overflow-hidden">
                  <span className="animate-text-clip font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--gold)] block">
                    {step.tag}
                  </span>
                </div>

                <h3
                  className="display mt-3 text-[clamp(2rem,4.4vw,3.75rem)] text-ivory text-balance"
                  style={{
                    animation:
                      "text-clip 0.9s cubic-bezier(0.77,0,0.175,1) both",
                  }}
                >
                  {step.title}
                </h3>

                <p
                  className="mt-4 max-w-xl text-[15px] leading-relaxed text-ivory/70"
                  style={{
                    animation: "text-clip 1s cubic-bezier(0.77,0,0.175,1) both",
                    animationDelay: "0.15s",
                  }}
                >
                  {step.body}
                </p>

                {/* Deliverables */}
                <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {step.deliverables.map((d, idx) => (
                    <li
                      key={d}
                      className="flex items-start gap-2.5 text-[13.5px] leading-snug text-ivory/80"
                      style={{
                        animation:
                          "text-clip 0.9s cubic-bezier(0.77,0,0.175,1) both",
                        animationDelay: `${0.22 + idx * 0.08}s`,
                      }}
                    >
                      <Check className="mt-[3px] h-3.5 w-3.5 shrink-0 text-[var(--gold)]" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                {/* Output chip */}
                <div
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 px-3 py-1.5"
                  style={{
                    animation:
                      "text-clip 0.9s cubic-bezier(0.77,0,0.175,1) both",
                    animationDelay: "0.55s",
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--gold-soft)]">
                    Entrega: {step.output}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-5 flex items-center gap-3">
              <span className="font-mono text-[11px] tracking-[0.25em] text-ivory/50">
                {String(active + 1).padStart(2, "0")}
              </span>
              <div className="relative h-px flex-1 bg-white/10">
                <div
                  className="absolute left-0 top-0 h-px bg-[var(--gold)] transition-[width] duration-700 ease-out"
                  style={{ width: `${((active + 1) / STEPS.length) * 100}%` }}
                />
              </div>
              <span className="font-mono text-[11px] tracking-[0.25em] text-ivory/50">
                {String(STEPS.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
