"use client"

import { useEffect, useRef, useState } from "react"

const STATS = [
  { value: 10, suffix: "+", label: "Anos de atuação" },
  { value: 300, suffix: "+", label: "Clientes satisfeitos" },
  { value: 500, suffix: "+", label: "Filmes registrados" },
  { value: 2000, suffix: "+", label: "Projetos e filmes entregues" },
]

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return { ref, inView }
}

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const start = performance.now()
    let raf = 0
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(eased * to))
      if (t < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, to])

  return (
    <span ref={ref} className="tabular-nums">
      {value.toLocaleString("pt-BR")}
      {suffix}
    </span>
  )
}

export function Stats() {
  return (
    <section className="relative grain bg-[#050505] border-y border-white/5 py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-14 flex items-center gap-6">
          <span className="h-px w-10 bg-[var(--gold)]" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)]">
            Por trás das câmeras
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-14 md:gap-0">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col gap-3 px-4 md:px-8 ${
                i > 0 ? "md:border-l md:border-white/5" : ""
              }`}
            >
              <div className="display text-5xl md:text-7xl text-ivory">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-ivory/50 leading-relaxed max-w-[180px]">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
