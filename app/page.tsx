import { Navbar } from "@/components/motin/navbar"
import { Hero } from "@/components/motin/hero"
import { Stats } from "@/components/motin/stats"
import { WhyInvest } from "@/components/motin/why-invest"
import { BrandStatement } from "@/components/motin/brand-statement"
import { Clients } from "@/components/motin/clients"
import { Portfolio } from "@/components/motin/portfolio"
import { Services } from "@/components/motin/services"
import { Process } from "@/components/motin/process"
import { Testimonials } from "@/components/motin/testimonials"
import { ContactForm } from "@/components/motin/contact-form"
import { Footer } from "@/components/motin/footer"
import { VapiWidget } from "@/components/motin/vapi-widget"

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
      <VapiWidget />
    </main>
    </>
  )
}
