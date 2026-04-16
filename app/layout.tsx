import type { Metadata, Viewport } from "next"
import { Anton, Instrument_Serif } from "next/font/google"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
  display: "swap",
})

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Motin Films — Produção Audiovisual Cinematográfica",
  description:
    "Filmes de alto impacto com qualidade cinematográfica. Conectamos marcas e pessoas com soluções audiovisuais únicas. +10 anos, +2.000 projetos entregues.",
  generator: "Lucas Leite - Dev Fullstack",
  keywords: [
    "produtora audiovisual",
    "filmes institucional",
    "produção de vídeo",
    "Curitiba",
    "Ancine",
    "cinema corporativo",
  ],
  openGraph: {
    title: "Motin Films — Produção Audiovisual Cinematográfica",
    description:
      "Filmes de alto impacto com qualidade cinematográfica. +10 anos de experiência e +2.000 projetos entregues.",
    type: "website",
    locale: "pt_BR",
    url: "https://motinfilms.com.br",
    siteName: "Motin Films",
    images: [
      {
        url: "/og.jpg",
        width: 800,
        height: 800,
        alt: "Motin Films — Produção Audiovisual Cinematográfica",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Motin Films — Produção Audiovisual Cinematográfica",
    description:
      "Filmes de alto impacto com qualidade cinematográfica. +10 anos de experiência.",
    images: ["/og.jpg"],
  },
}

export const viewport: Viewport = {
  themeColor: "#08080a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${GeistSans.variable} ${GeistMono.variable} ${anton.variable} ${instrument.variable} bg-background`}
      style={
        {
          "--font-geist": GeistSans.style.fontFamily,
          "--font-geist-mono": GeistMono.style.fontFamily,
        } as React.CSSProperties
      }
    >
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
