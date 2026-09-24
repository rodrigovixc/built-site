import { Link } from 'react-router'
import { ProjectCard } from '@/components/cards/ProjectCard'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useI18n } from '@/i18n/useI18n'
import { collection } from '@/lib/content'

/** Quatro projetos mais recentes num mosaico 7/5 – 5/7. */
export function FeaturedProjects() {
  const { t, to, locale } = useI18n()
  const spans = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7']
  return (
    <section id="projetos" className="py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={t.home.projectsEyebrow} title={t.home.projectsTitle}>
            {t.home.projectsText}{' '}
            <Link to={to('projects')} className="font-bold text-blue">
              {t.home.projectsAll}
            </Link>
          </SectionHeading>
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-12">
          {collection('projects', locale)
            .slice(0, 4)
            .map((p, i) => (
              <Reveal key={p.id} className={spans[i]}>
                <ProjectCard project={p} feature className="h-full" />
              </Reveal>
            ))}
        </div>
      </Container>
    </section>
  )
}
