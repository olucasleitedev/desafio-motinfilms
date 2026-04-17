import dynamic from "next/dynamic"
import { Navbar } from "@/components/motin/navbar"
import { Hero } from "@/components/motin/hero"

// Above-fold: carregados normalmente
import { Stats } from "@/components/motin/stats"
import { BrandStatement } from "@/components/motin/brand-statement"

// Below-fold: JS dividido em chunks separados, HTML mantido via SSR
const Portfolio = dynamic(() => import("@/components/motin/portfolio").then(m => ({ default: m.Portfolio })))
const WhyInvest = dynamic(() => import("@/components/motin/why-invest").then(m => ({ default: m.WhyInvest })))
const Services = dynamic(() => import("@/components/motin/services").then(m => ({ default: m.Services })))
const Process = dynamic(() => import("@/components/motin/process").then(m => ({ default: m.Process })))
const Clients = dynamic(() => import("@/components/motin/clients").then(m => ({ default: m.Clients })))
const Testimonials = dynamic(() => import("@/components/motin/testimonials").then(m => ({ default: m.Testimonials })))
const ContactForm = dynamic(() => import("@/components/motin/contact-form").then(m => ({ default: m.ContactForm })))
const Footer = dynamic(() => import("@/components/motin/footer").then(m => ({ default: m.Footer })))

// Widget flutuante — carregado via client wrapper com ssr: false
import { VapiWidgetLoader } from "@/components/motin/vapi-widget-loader"

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Motin Films",
  url: "https://desafio-motinfilms.vercel.app",
  logo: "https://desafio-motinfilms.vercel.app/logo.png",
  description:
    "Produtora audiovisual cinematográfica com +10 anos de experiência e +2.000 projetos entregues. Especialistas em filmes institucionais e produção de vídeo em Curitiba.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Curitiba",
    addressRegion: "PR",
    addressCountry: "BR",
  },
  sameAs: ["https://motinfilms.com.br"],
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <main className="relative overflow-x-hidden bg-background text-ivory">
        <Navbar />
        <Hero />
        <Stats />
        <BrandStatement />
        <Portfolio />
        <WhyInvest />
        <Services />
        <Process />
        <Clients />
        <Testimonials />
        <ContactForm />
        <Footer />
        <VapiWidgetLoader />
      </main>
    </>
  )
}
