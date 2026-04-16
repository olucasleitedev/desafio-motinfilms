"use client"

import { useEffect, useState } from "react"

/**
 * IntroOverlay
 * Abertura cinematográfica que toca apenas na primeira visita da sessão.
 * - Lock scroll durante a sequência
 * - Fade out em 700ms após 1.6s
 * - Respeita prefers-reduced-motion (pula)
 */
export function IntroOverlay() {
  // Começa como "done" para o SSR/LCP — o overlay só aparece após hidratação
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("done")

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    const seen = window.sessionStorage?.getItem("motin-intro-seen") === "1"

    if (reduce || seen) return

    // Mostra o overlay após a primeira pintura do browser (LCP já foi capturado)
    setPhase("loading")
    document.documentElement.style.overflow = "hidden"
    const t1 = setTimeout(() => setPhase("reveal"), 1400)
    const t2 = setTimeout(() => {
      setPhase("done")
      document.documentElement.style.overflow = ""
      try {
        window.sessionStorage.setItem("motin-intro-seen", "1")
      } catch {}
    }, 2200)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      document.documentElement.style.overflow = ""
    }
  }, [])

  if (phase === "done") return null

  return (
    <div
      aria-hidden
      className={[
        "fixed inset-0 z-[100] flex items-center justify-center bg-[#050506]",
        "transition-opacity duration-700 ease-out",
        phase === "reveal" ? "opacity-0 pointer-events-none" : "opacity-100",
      ].join(" ")}
    >
      {/* curtains */}
      <span
        className={[
          "absolute inset-y-0 left-0 w-1/2 bg-[#050506]",
          "transition-transform duration-[900ms] ease-[cubic-bezier(0.7,0,0.15,1)]",
          phase === "reveal" ? "-translate-x-full" : "translate-x-0",
        ].join(" ")}
      />
      <span
        className={[
          "absolute inset-y-0 right-0 w-1/2 bg-[#050506]",
          "transition-transform duration-[900ms] ease-[cubic-bezier(0.7,0,0.15,1)]",
          phase === "reveal" ? "translate-x-full" : "translate-x-0",
        ].join(" ")}
      />

      {/* center mark */}
      <div className="relative z-10 flex flex-col items-center gap-5">
        <div className="h-px w-0 bg-[var(--gold)] animate-intro-rule" />
        <span className="display text-4xl md:text-6xl tracking-[0.02em] text-ivory opacity-0 animate-intro-logo">
          MOTIN <span className="text-[var(--gold)]">FILMS</span>
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.45em] text-ivory/45 opacity-0 animate-intro-sub">
          Cinema · Brand · Story
        </span>
      </div>
    </div>
  )
}
