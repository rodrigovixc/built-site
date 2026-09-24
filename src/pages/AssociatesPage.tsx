import { AboutNav } from '@/components/layout/AboutNav'
import { PageHeader } from '@/components/layout/PageHeader'
import { Container } from '@/components/ui/Container'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useI18n } from '@/i18n/useI18n'
import { associates } from '@/lib/content'

export default function AssociatesPage() {
  const { t, to } = useI18n()
  useDocumentTitle(t.routes.associates)
  return (
    <>
      <PageHeader
        eyebrow={t.menu.groupAbout}
        title={t.routes.associates}
        crumbs={[{ label: t.menu.groupAbout, to: to('about') }, { label: t.routes.associates }]}
        intro={t.associates.intro(associates.length)}
      />
      <AboutNav />
      <Container className="py-14 md:py-20">
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-4">
          {associates.map((a) => (
            <li key={a.id} className="group flex flex-col items-center justify-center gap-4 bg-card p-8">
              {a.logo && (
                <img src={a.logo} alt="" loading="lazy" className="h-16 w-auto max-w-full object-contain grayscale transition group-hover:grayscale-0 dark:invert" />
              )}
              <span className="text-center text-sm font-semibold text-muted">{a.name}</span>
            </li>
          ))}
        </ul>
      </Container>
    </>
  )
}
