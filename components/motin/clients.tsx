"use client"

type ClientLogo = {
  name: string
  logoSrc?: string
  logoWidth?: number
  logoHeight?: number
}

const CLIENTS: ClientLogo[] = [
  {
    name: "Electrolux",
    logoSrc: "/logos/electrolux.svg",
    logoWidth: 120,
    logoHeight: 28,
  },
  { name: "Unimed" },
  {
    name: "Warner Bros.",
    logoSrc: "/logos/warnerbros.svg",
    logoWidth: 28,
    logoHeight: 28,
  },
  { name: "Spaten" },
  { name: "LJ Santos" },
  { name: "Inplasul" },
  { name: "Liquexpress" },
  { name: "Pasa" },
]

function ClientCard({ client }: { client: ClientLogo }) {
  return (
    <div className="group flex h-[72px] shrink-0 items-center justify-center rounded-none border border-white/[0.08] bg-white/[0.02] px-8 transition-all duration-500 hover:border-[var(--gold)]/30 hover:bg-[var(--gold)]/[0.04]">
      {client.logoSrc ? (
        <img
          src={client.logoSrc}
          alt={client.name}
          width={client.logoWidth}
          height={client.logoHeight}
          loading="lazy"
          style={{
            width: client.logoWidth,
            height: client.logoHeight,
            filter: "brightness(0) invert(1)",
            opacity: 0.55,
            transition: "opacity 0.4s ease",
            objectFit: "contain",
          }}
          className="group-hover:opacity-90"
        />
      ) : (
        <span
          className="font-display text-[15px] tracking-[0.12em] uppercase text-ivory/45 transition-colors duration-400 group-hover:text-ivory/80"
          style={{ letterSpacing: "0.08em" }}
        >
          {client.name}
        </span>
      )}
    </div>
  )
}

export function Clients() {
  const items = [...CLIENTS, ...CLIENTS]

  return (
    <section className="relative overflow-hidden bg-black py-24 md:py-32 border-t border-white/5">
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

      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-black to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-black to-transparent"
        />

        <div className="flex animate-marquee" style={{ gap: "12px" }}>
          {items.map((client, i) => (
            <ClientCard key={`${client.name}-${i}`} client={client} />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 md:px-10 mt-10 flex items-center gap-4">
        <span className="h-px flex-1 bg-white/5" />
        <span className="text-[10px] tracking-[0.3em] uppercase text-ivory/25">
          {CLIENTS.length} marcas atendidas
        </span>
        <span className="h-px flex-1 bg-white/5" />
      </div>
    </section>
  )
}
