import { useParams } from 'react-router'
import { ProjectCard } from '@/components/cards/ProjectCard'
import { ArticleLayout, FactSheet } from '@/components/layout/ArticleLayout'
import { RelatedSection } from '@/components/layout/RelatedSection'
import { Tag } from '@/components/ui/Tag'
import { useBody } from '@/hooks/useBody'
import { useI18n } from '@/i18n/useI18n'
import { collection } from '@/lib/content'
import { projectAreas } from '@/lib/projects'
import NotFoundPage from './NotFoundPage'

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const { t, to, locale, formatDate } = useI18n()
  const projects = collection('projects', locale)
  const project = projects.find((p) => p.slug === slug)
  const body = useBody('projects', slug)
  if (!project) return <NotFoundPage />

  const areas = projectAreas(project, t)
  const related = projects.filter((p) => p.id !== project.id && p.areas.some((a) => project.areas.includes(a))).slice(0, 3)

  return (
    <ArticleLayout
      entry={project}
      body={body}
      eyebrow={t.projects.eyebrowDetail}
      crumbs={[{ label: t.routes.projects, to: to('projects') }, { label: project.title.split(/\s[–-]\s/)[0] }]}
      meta={areas.map((a) => (
        <Tag key={a.slug} tone={a.pillar}>
          {a.label}
        </Tag>
      ))}
      aside={
        <FactSheet
          title={t.projects.factSheet}
          rows={[
            ...areas.map((a) => ({ label: t.pillars[a.pillar], value: a.label })),
            { label: t.common.published, value: formatDate(project.date) },
            { label: t.common.updated, value: formatDate(project.modified) },
          ]}
        />
      }
      related={
        related.length > 0 && (
          <RelatedSection title={t.projects.related} to={to('projects')} cta={t.projects.relatedAll}>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </RelatedSection>
        )
      }
    />
  )
}
