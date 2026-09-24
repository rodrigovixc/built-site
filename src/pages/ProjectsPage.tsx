import { useSearchParams } from 'react-router'
import { ProjectCard } from '@/components/cards/ProjectCard'
import { PageHeader } from '@/components/layout/PageHeader'
import { Container } from '@/components/ui/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { FilterChips } from '@/components/ui/FilterChips'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useI18n } from '@/i18n/useI18n'
import { areas, collection } from '@/lib/content'
import { areaPillar } from '@/lib/site'

export default function ProjectsPage() {
  const { t, locale } = useI18n()
  useDocumentTitle(t.routes.projects)
  const [params, setParams] = useSearchParams()
  const projects = collection('projects', locale)
  const area = params.get('area') ?? 'all'
  const list = area === 'all' ? projects : projects.filter((p) => p.areas.includes(area))

  const options = [
    { value: 'all', label: t.projects.all, count: projects.length },
    ...areas.filter((a) => areaPillar[a.slug]).map((a) => ({ value: a.slug, label: t.areas[a.slug].label, count: a.count })),
  ]

  return (
    <>
      <PageHeader eyebrow={t.routes.projects} title={t.projects.title} crumbs={[{ label: t.routes.projects }]} intro={t.projects.intro} />
      <Container className="py-14 md:py-20">
        <FilterChips
          label={t.projects.filterLabel}
          options={options}
          value={area}
          onChange={(v) => setParams(v === 'all' ? {} : { area: v }, { replace: true, preventScrollReset: true })}
        />
        <p className="mt-6 text-sm text-muted" aria-live="polite">
          {t.home.projectsCount(list.length)}
        </p>
        {list.length ? (
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <EmptyState title={t.projects.empty} />
        )}
      </Container>
    </>
  )
}
