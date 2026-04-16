const CLIENTS = [
  "Unimed",
  "Electrolux",
  "LJ Santos",
  "Inplasul",
  "Liquexpress",
  "Pasa",
  "Spaten",
  "Warner Pictures",
]

export function Clients() {
  return (
    <section className="relative bg-black py-24 md:py-32 border-t border-white/5">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 mb-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <span className="h-px w-10 bg-[var(--gold)]" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)]">
                Nossos clientes
              </span>
            </div>
            <h2 className="display text-3xl md:text-5xl text-ivory max-w-2xl">
              O padrão de qualidade escolhido pelas{" "}
              <em className="display-italic text-[var(--gold)]">
                grandes marcas
              </em>
              .
            </h2>
          </div>
          <p className="text-[10px] tracking-[0.4em] uppercase text-ivory/40">
            / Parcerias desde 2014
          </p>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-black to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-black to-transparent"
        />

        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 2 }).map((_, lane) => (
            <div key={lane} className="flex items-center gap-4 md:gap-6 pr-4 md:pr-6">
              {CLIENTS.map((c) => (
                <span
                  key={`${lane}-${c}`}
                  className="group rounded-full px-6 md:px-9 py-3 md:py-4 border border-white/10 bg-white/[0.02] text-ivory/80 font-display text-xl md:text-2xl hover:border-[var(--gold)] hover:text-[var(--gold)] hover:bg-[var(--gold)]/5 transition-all duration-500 hover:scale-[1.03]"
                >
                  {c}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
