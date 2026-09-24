import { AboutNav } from '@/components/layout/AboutNav'
import { PageHeader } from '@/components/layout/PageHeader'
import { Container } from '@/components/ui/Container'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useI18n } from '@/i18n/useI18n'
import { governance } from '@/lib/content'

export default function GovernancePage() {
  const { t, to } = useI18n()
  const g = t.governance
  useDocumentTitle(t.routes.governance)
  return (
    <>
      <PageHeader
        eyebrow={t.menu.groupAbout}
        title={t.routes.governance}
        crumbs={[{ label: t.menu.groupAbout, to: to('about') }, { label: t.routes.governance }]}
      />
      <AboutNav />
      <Container className="grid gap-16 py-14 md:py-20">
        {governance.map((body) => (
          <section key={body.name}>
            <h2 className="border-b-2 border-ink pb-4 text-2xl font-bold md:text-3xl">{g.bodies[body.name] ?? body.name}</h2>
            <ul className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
              {body.members.map((m, i) => (
                <li key={`${m.name}-${i}`} className="bg-surface py-6 pr-6">
                  <p className="text-xs font-bold tracking-[0.12em] text-blue uppercase">{g.positions[m.position] ?? m.position}</p>
                  <p className="mt-2 font-display text-lg font-bold">{m.name}</p>
                  <p className="mt-1 text-sm text-muted">{m.organization}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </Container>
    </>
  )
}
