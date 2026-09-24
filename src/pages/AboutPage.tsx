import { CtaBand } from '@/components/home/CtaBand'
import { StatementSection } from '@/components/home/StatementSection'
import { AboutNav } from '@/components/layout/AboutNav'
import { PageHeader } from '@/components/layout/PageHeader'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useI18n } from '@/i18n/useI18n'

export default function AboutPage() {
  const { t } = useI18n()
  const a = t.about
  useDocumentTitle(t.routes.about)
  return (
    <>
      <PageHeader eyebrow={t.menu.groupAbout} title={a.title} intro={a.intro} />
      <AboutNav />

      <section className="py-20 md:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <Eyebrow>{a.whoEyebrow}</Eyebrow>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">{a.whoTitle}</h2>
          </Reveal>
          <Reveal className="space-y-5 text-lg text-muted">
            {a.whoParagraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="border-y border-line bg-soft py-20 md:py-24">
        <Container>
          <Reveal>
            <Eyebrow>{a.agendaEyebrow}</Eyebrow>
            <h2 className="mt-3 max-w-[22ch] text-3xl font-extrabold md:text-4xl">{a.agendaTitle}</h2>
          </Reveal>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {a.lifecycle.map((step, i) => (
              <li key={step} className="bg-card p-6">
                <span className="font-display text-sm font-semibold text-blue">{a.phase(i + 1)}</span>
                <p className="mt-2 font-display text-lg font-bold">{step}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <StatementSection />

      <section className="py-20 md:py-24">
        <Container>
          <Reveal>
            <Eyebrow>{a.clustersEyebrow}</Eyebrow>
            <h2 className="mt-3 max-w-[24ch] text-3xl font-extrabold md:text-4xl">{a.clustersTitle}</h2>
            <p className="mt-4 max-w-[62ch] text-muted">{a.clustersText}</p>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {a.clusters.map((c) => (
              <Reveal key={c.name} className="rounded-2xl border border-line bg-card p-8 shadow-card">
                <h3 className="text-2xl font-bold">{c.name}</h3>
                <p className="mt-1 text-sm font-semibold text-green">{c.signed}</p>
                <p className="mt-4 text-muted">{c.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  )
}
