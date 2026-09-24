import { AboutNav } from '@/components/layout/AboutNav'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { BodyContent } from '@/components/ui/Prose'
import { useBody } from '@/hooks/useBody'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useI18n } from '@/i18n/useI18n'
import { collection } from '@/lib/content'
import { contact } from '@/lib/site'
import type { Job } from '@/lib/types'

function JobCard({ job }: { job: Job }) {
  const { t, to } = useI18n()
  const body = useBody('jobs', job.slug)
  return (
    <article className="rounded-2xl border border-line bg-card p-8 shadow-card">
      <p className="text-xs font-bold tracking-[0.14em] text-green uppercase">{t.careers.open}</p>
      <h2 className="mt-2 text-3xl font-bold">{job.title}</h2>
      <div className="mt-5">
        <BodyContent body={body} fallbackText={job.excerpt} />
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        {job.pdf && <Button href={job.pdf}>{t.careers.pdf}</Button>}
        <Button to={to('contact')} variant="outline">
          {t.careers.apply}
        </Button>
      </div>
    </article>
  )
}

export default function CareersPage() {
  const { t, to, locale } = useI18n()
  useDocumentTitle(t.routes.careers)
  const jobs = collection('jobs', locale)
  return (
    <>
      <PageHeader
        eyebrow={t.menu.groupAbout}
        title={t.routes.careers}
        crumbs={[{ label: t.menu.groupAbout, to: to('about') }, { label: t.routes.careers }]}
        intro={t.careers.intro}
      />
      <AboutNav />
      <Container className="grid gap-6 py-14 md:py-20">
        {jobs.length ? (
          jobs.map((j) => <JobCard key={j.id} job={j} />)
        ) : (
          <EmptyState title={t.careers.emptyTitle}>
            {t.careers.emptyText} <span className="select-all">{contact.email}</span>.
          </EmptyState>
        )}
      </Container>
    </>
  )
}
