"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const NAV = [
  { href: "#portfolio", label: "Portfólio", num: "01" },
  { href: "#servicos", label: "Serviços", num: "02" },
  { href: "#processo", label: "Processo", num: "03" },
  { href: "#depoimentos", label: "Clientes", num: "04" },
  { href: "#contato", label: "Contato", num: "05" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, y / max) : 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-background/70 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent",
        ].join(" ")}
      >
        <nav
          aria-label="Navegação principal"
          className="mx-auto grid h-16 md:h-20 max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 md:px-10"
        >
          {/* left */}
          <ul className="hidden md:flex items-center gap-7">
            {NAV.slice(0, 2).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="nav-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* center — logo */}
          <Link
            href="#top"
            className="relative flex h-11 w-auto max-w-[min(58vw,14rem)] shrink-0 items-center justify-self-center sm:h-12 md:h-[3.35rem] md:max-w-[18rem] lg:max-w-[20rem]"
            aria-label="Motin Films — início"
          >
            <Image
              src="/logo.png"
              alt="Motin Films"
              width={320}
              height={93}
              className="h-full w-auto object-contain object-center"
              priority
            />
          </Link>

          {/* right */}
          <div className="hidden md:flex items-center justify-end gap-6">
            <Link href="#depoimentos" className="nav-link">
              Clientes
            </Link>
            <Link
              href="#contato"
              className={[
                "group/nav-cta relative isolate inline-flex items-center gap-3 overflow-hidden",
                "rounded-full border border-white/[0.14] bg-white/[0.035] px-5 py-2.5",
                "backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset]",
                "transition-[border-color,box-shadow,transform,color] duration-300 ease-out",
                "hover:border-[color-mix(in_oklab,var(--gold)_42%,transparent)]",
                "hover:shadow-[0_0_40px_-12px_color-mix(in_oklab,var(--gold)_55%,transparent),0_0_0_1px_color-mix(in_oklab,var(--gold)_18%,transparent)_inset]",
                "hover:-translate-y-px active:translate-y-0",
              ].join(" ")}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-[var(--gold)]/[0.14] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/nav-cta:opacity-100"
              />
              <span className="font-display text-[11px] uppercase tracking-[0.2em] text-ivory/90 transition-colors duration-300 group-hover/nav-cta:text-[var(--gold)]">
                Fale conosco
              </span>
              <span
                className={[
                  "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  "bg-[var(--gold)] text-[#08080a]",
                  "shadow-[0_0_20px_-4px_color-mix(in_oklab,var(--gold)_60%,transparent)]",
                  "transition-[transform,box-shadow] duration-300 ease-out",
                  "group-hover/nav-cta:scale-105 group-hover/nav-cta:shadow-[0_0_28px_-2px_color-mix(in_oklab,var(--gold)_70%,transparent)]",
                ].join(" ")}
              >
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover/nav-cta:-translate-y-0.5 group-hover/nav-cta:translate-x-0.5"
                  strokeWidth={2.5}
                />
              </span>
            </Link>
          </div>

          {/* mobile toggle */}
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden col-start-3 justify-self-end relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-ivory transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
          >
            <span className="sr-only">Menu</span>
            <span aria-hidden className="relative block h-2.5 w-4">
              <span
                className={[
                  "absolute left-0 top-0 h-px w-full bg-current transition-transform duration-300 ease-out",
                  open ? "translate-y-[5px] rotate-45" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 bottom-0 h-px w-full bg-current transition-transform duration-300 ease-out",
                  open ? "-translate-y-[5px] -rotate-45" : "",
                ].join(" ")}
              />
            </span>
          </button>
        </nav>

        {/* scroll progress */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-[var(--gold)] transition-transform duration-150"
          style={{ transform: `scaleX(${progress})` }}
        />
      </header>

      {/* Mobile drawer — slide-in from right */}
      <div
        className={[
          "fixed inset-0 z-40 md:hidden transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="Fechar menu"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />
        <aside
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
          className={[
            "absolute right-0 top-0 h-full w-[88vw] max-w-[420px]",
            "bg-[#09090b] border-l border-white/5",
            "flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.15,1)]",
            open ? "translate-x-0" : "translate-x-full",
          ].join(" ")}
        >
          {/* header */}
          <div className="flex h-16 items-center justify-between border-b border-white/5 px-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-ivory/60">
              Menu
            </span>
            <span className="relative flex h-10 w-auto max-w-[12rem] items-center">
              <Image
                src="/logo.png"
                alt="Motin Films"
                width={280}
                height={81}
                className="h-full w-auto object-contain object-right"
              />
            </span>
          </div>

          {/* links */}
          <ul className="flex-1 overflow-y-auto px-6 pt-10 pb-6">
            {NAV.map((item, i) => (
              <li
                key={item.href}
                className={[
                  "group border-b border-white/[0.06] py-5",
                  "transition-all duration-500",
                  open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6",
                ].join(" ")}
                style={{ transitionDelay: open ? `${160 + i * 70}ms` : "0ms" }}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between gap-4"
                >
                  <span className="display text-[2.25rem] leading-none text-ivory transition-colors group-hover:text-[var(--gold)]">
                    {item.label}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.32em] text-ivory/50">
                    {item.num}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* footer CTA */}
          <div
            className={[
              "border-t border-white/5 px-6 pb-8 pt-6",
              "transition-all duration-500",
              open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
            style={{ transitionDelay: open ? "520ms" : "0ms" }}
          >
            <a
              href="mailto:contato@motinfilms.com.br"
              className="block text-[13px] text-ivory/70 hover:text-[var(--gold)] transition-colors"
            >
              contato@motinfilms.com.br
            </a>
            <a
              href="tel:+554191425126"
              className="mt-1 block text-[13px] text-ivory/70 hover:text-[var(--gold)] transition-colors"
            >
              +55 41 9142-5126
            </a>
            <Link
              href="#contato"
              onClick={() => setOpen(false)}
              className="btn-pill btn-pill-primary mt-6 w-full justify-center"
            >
              Iniciar projeto
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </aside>
      </div>
    </>
  )
}
