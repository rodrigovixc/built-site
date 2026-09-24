import { AgendaAndKnowledge } from '@/components/home/AgendaAndKnowledge'
import { AreasSection } from '@/components/home/AreasSection'
import { CtaBand } from '@/components/home/CtaBand'
import { FeaturedProjects } from '@/components/home/FeaturedProjects'
import { Hero } from '@/components/home/Hero'
import { PartnersStrip } from '@/components/home/PartnersStrip'
import { ServicesSection } from '@/components/home/ServicesSection'
import { StatementSection } from '@/components/home/StatementSection'
import { Ticker } from '@/components/home/Ticker'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function HomePage() {
  useDocumentTitle()
  return (
    <>
      <Hero />
      <Ticker />
      <ServicesSection />
      <StatementSection />
      <AreasSection />
      <FeaturedProjects />
      <AgendaAndKnowledge />
      <PartnersStrip />
      <CtaBand />
    </>
  )
}
