"use client";

import { useState } from "react";
import { Play, X, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { TiltCard } from "./tilt-card";

const VIDEOS = [
  {
    id: "6bseD2wgI6A",
    title: "Filme Institucional",
    category: "Institucional",
    year: "2024",
  },
  {
    id: "J3KO2lBBh-w",
    title: "Marca & Posicionamento",
    category: "Branded Content",
    year: "2024",
  },
  {
    id: "Wyg3UPuf5Ec",
    title: "Série Corporativa",
    category: "Série",
    year: "2024",
  },
];

export function Portfolio() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="portfolio" className="relative bg-black py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <SectionHeading
            kicker="Portfólio"
            title={
              <>
                Veja o que fazemos{" "}
                <em className="display-italic text-[var(--gold)]">
                  na prática
                </em>
                .
              </>
            }
          />
          <a
            href="#contato"
            className="hidden md:inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-ivory/70 hover:text-[var(--gold)] transition-colors group"
          >
            Ver portfólio completo
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {VIDEOS.map((v, i) => (
            <TiltCard key={v.id} max={6} className="rounded-2xl">
              <button
                onClick={() => setActive(v.id)}
                className="group relative aspect-[4/5] md:aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[#0a0a0a] text-left"
              >
                <img
                  src={`https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`}
                  alt={v.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1200ms] ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />

                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                  }}
                />

                <div className="absolute top-6 left-6 text-[10px] tracking-[0.4em] uppercase text-ivory/60">
                  {String(i + 1).padStart(2, "0")} /{" "}
                  {String(VIDEOS.length).padStart(2, "0")}
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full border border-[var(--gold)] text-[var(--gold)] backdrop-blur-sm bg-black/20 transition-all duration-500 group-hover:scale-110 group-hover:bg-[var(--gold)] group-hover:text-black">
                    <Play className="h-5 w-5 md:h-6 md:w-6 fill-current translate-x-0.5" />
                  </div>
                </div>

                <div className="absolute bottom-0 inset-x-0 p-6 md:p-8">
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--gold)]">
                      {v.category}
                    </span>
                    <span className="text-[10px] tracking-[0.35em] uppercase text-ivory/50">
                      {v.year}
                    </span>
                  </div>
                  <h3 className="display text-xl md:text-2xl text-ivory">
                    {v.title}
                  </h3>
                  <div className="mt-4 h-px w-0 bg-[var(--gold)] transition-all duration-500 group-hover:w-full" />
                </div>
              </button>
            </TiltCard>
          ))}
        </div>

        <div className="mt-16 flex justify-center md:hidden">
          <a href="#contato" className="btn-pill btn-pill-primary">
            Ver portfólio completo
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300"
          onClick={() => setActive(null)}
        >
          <button
            aria-label="Fechar"
            className="absolute top-6 right-6 md:top-10 md:right-10 flex h-11 w-11 items-center justify-center border border-white/20 text-ivory hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
            onClick={() => setActive(null)}
          >
            <X className="h-4 w-4" />
          </button>
          <div
            className="relative w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${active}?autoplay=1&rel=0`}
              title="Motin Films — vídeo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      )}
    </section>
  );
}
