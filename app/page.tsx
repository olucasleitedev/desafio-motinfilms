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

export default function Page() {
  return (
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
  )
}
