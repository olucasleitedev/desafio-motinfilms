"use client";

import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

const capabilities = [
  { label: "01", word: "Cinematografia" },
  { label: "02", word: "Roteiro" },
  { label: "03", word: "Pós-produção" },
  { label: "04", word: "Trilha Original" },
  { label: "05", word: "Color Grading" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden"
    >
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <div className="hero-canvas absolute inset-0" />
      </div>

      <div
        className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_55%_45%_at_50%_48%,rgba(8,8,10,0)_0%,rgba(8,8,10,0.65)_60%,rgba(8,8,10,0.98)_100%)]"
        aria-hidden
      />
      <div className="absolute inset-0 z-10 grain" aria-hidden />

      <div className="relative z-20 flex flex-1 flex-col items-center justify-center px-5 md:px-10 pt-28 md:pt-32 pb-16">
        <div className="mb-6 md:mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 backdrop-blur-sm">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--gold)] opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
          </span>
          <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-ivory/70">
            Disponível para novos projetos — 2026
          </span>
        </div>

        <h1 className="display text-ivory text-center text-[clamp(2.8rem,10vw,9.5rem)] max-w-[14ch] text-balance leading-[0.9]">
          <span className="block animate-text-clip [animation-delay:0.1s]">
            Dê vida
          </span>
          <span className="block animate-text-clip [animation-delay:0.2s]">
            às suas ideias
          </span>
        </h1>

        <div className="relative mt-10 md:mt-12 aspect-[4/5] w-[min(64vw,280px)] md:w-[min(22vw,320px)] overflow-hidden rounded-[28px] ring-1 ring-white/10 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.6)] animate-float">
          <Image
            src="/cinematic-close-up-of-a-film-director-silhouette-a.jpg"
            alt="Diretor em set cinematográfico"
            fill
            priority
            sizes="(max-width: 768px) 60vw, 22vw"
            className="object-cover"
          />
          <Link
            href="#portfolio"
            aria-label="Ver portfólio"
            className="group absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/55 via-black/10 to-transparent"
          >
            {/* Play button — cinematic glass with gold accent */}
            <span className="relative flex h-16 w-16 items-center justify-center">
              {/* pulse ring */}
              <span
                aria-hidden
                className="absolute inset-0 rounded-full border border-[var(--gold)]/60 opacity-70 group-hover:scale-125 group-hover:opacity-0 transition-all duration-700"
              />
              <span
                aria-hidden
                className="absolute inset-0 rounded-full border border-[var(--gold)]/30"
              />
              {/* core */}
              <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-[var(--gold)]/70 bg-black/50 backdrop-blur-md transition-all duration-500 group-hover:bg-[var(--gold)] group-hover:border-[var(--gold)] group-hover:scale-105">
                <Play
                  size={18}
                  strokeWidth={0}
                  className="ml-[3px] fill-[var(--gold)] group-hover:fill-black transition-colors duration-300"
                />
              </span>
            </span>
          </Link>
        </div>

        <p className="mt-10 md:mt-12 max-w-xl text-pretty text-center text-[15px] leading-relaxed text-ivory/65">
          Produtora audiovisual cinematográfica com{" "}
          <span className="text-ivory">+10 anos</span> transformando marcas em
          narrativas de alto impacto.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link href="#contato" className="btn-pill btn-pill-primary">
            Iniciar um projeto
            <span aria-hidden>→</span>
          </Link>
          <Link href="#portfolio" className="btn-pill">
            <Play size={14} className="text-[var(--gold)]" />
            Ver trabalhos
          </Link>
        </div>
      </div>

      {/* Capabilities row — estilo Apex Films */}
      <div className="relative z-20 border-t border-white/5 bg-[rgba(8,8,10,0.55)] backdrop-blur-md">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-x-6 gap-y-4 px-5 py-6 md:flex md:flex-wrap md:items-baseline md:justify-center md:gap-x-10 md:py-8 md:px-10">
          {capabilities.map((c) => (
            <div key={c.word} className="flex items-baseline gap-2 md:gap-3">
              <span className="eyebrow shrink-0">{c.label}</span>
              <a
                href="#servicos"
                className="cap-word text-[clamp(1.2rem,2.4vw,2rem)]"
              >
                {c.word}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
