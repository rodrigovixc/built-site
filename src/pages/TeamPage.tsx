import { TeamCard } from '@/components/cards/TeamCard'
import { AboutNav } from '@/components/layout/AboutNav'
import { PageHeader } from '@/components/layout/PageHeader'
import { Container } from '@/components/ui/Container'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useI18n } from '@/i18n/useI18n'
import { team } from '@/lib/content'

export default function TeamPage() {
  const { t, to } = useI18n()
  useDocumentTitle(t.routes.team)
  return (
    <>
      <PageHeader
        eyebrow={t.menu.groupAbout}
        title={t.routes.team}
        crumbs={[{ label: t.menu.groupAbout, to: to('about') }, { label: t.routes.team }]}
        intro={t.team.intro}
      />
      <AboutNav />
      <Container className="py-14 md:py-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {team.map((m) => (
            <TeamCard key={m.id} member={m} />
          ))}
        </div>
      </Container>
    </>
  )
}
