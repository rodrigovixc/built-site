import { Link } from 'react-router'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Tag } from '@/components/ui/Tag'
import { useI18n } from '@/i18n/useI18n'
import { areas } from '@/lib/content'
import { areaPillar } from '@/lib/site'

export function AreasSection() {
  const { t, to } = useI18n()
  const list = areas.filter((a) => areaPillar[a.slug]).sort((a, b) => areaPillar[a.slug].localeCompare(areaPillar[b.slug]))
  return (
    <section id="areas" className="scroll-mt-20 py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={t.home.areasEyebrow} title={t.home.areasTitle}>
            {t.home.areasText}
          </SectionHeading>
        </Reveal>
        <div className="border-t-2 border-ink">
          {list.map((a, i) => {
            const pillar = areaPillar[a.slug]
            const info = t.areas[a.slug]
            return (
              <Reveal key={a.slug}>
                <Link
                  to={`${to('projects')}?area=${a.slug}`}
                  className="group grid grid-cols-[1fr_48px] items-center gap-6 border-b border-line py-7 transition-all hover:bg-soft hover:px-4 md:grid-cols-[64px_1fr_1.2fr_48px]"
                >
                  <span className="hidden font-display text-sm font-semibold text-blue md:block">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="text-2xl font-bold md:text-[2.1rem] md:leading-tight">{info.label}</h3>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <Tag tone={pillar}>{t.pillars[pillar]}</Tag>
                      <Tag>{t.home.projectsCount(a.count)}</Tag>
                    </div>
                  </div>
                  <p className="hidden text-[0.95rem] text-muted md:block">{info.summary}</p>
                  <span className="grid size-12 place-items-center rounded-full ring-[1.5px] ring-line ring-inset transition group-hover:bg-blue group-hover:text-white group-hover:ring-0">
                    →
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
