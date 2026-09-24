import { Link } from 'react-router'
import { Img } from '@/components/ui/Img'
import { Tag } from '@/components/ui/Tag'
import { useI18n } from '@/i18n/useI18n'
import { tidyExcerpt } from '@/lib/format'
import { projectAreas } from '@/lib/projects'
import type { Project } from '@/lib/types'

/**
 * Cartão de projeto: imagem em cima, texto em baixo. Muitas imagens do site são
 * logótipos dos projetos, por isso o texto nunca fica por cima delas.
 */
export function ProjectCard({ project, feature = false, className = '' }: { project: Project; feature?: boolean; className?: string }) {
  const { t, to } = useI18n()
  const [area] = projectAreas(project, t)
  return (
    <Link
      to={to('projects', project.slug)}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-card transition duration-300 hover:-translate-y-1.5 hover:border-blue ${className}`}
    >
      <div className={`overflow-hidden bg-white ${feature ? 'aspect-[16/8]' : 'aspect-[16/10]'}`}>
        <Img media={project.image} className="size-full transition duration-700 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-6 md:p-7">
        {area && (
          <span className="justify-self-start">
            <Tag tone={area.pillar}>{area.label}</Tag>
          </span>
        )}
        <h3 className={`leading-snug font-bold group-hover:text-blue ${feature ? 'text-2xl' : 'text-xl'}`}>{project.title}</h3>
        <p className="text-sm text-muted">{tidyExcerpt(project.excerpt, feature ? 170 : 120)}</p>
        <span className="mt-auto pt-2 text-sm font-bold text-blue">{t.common.seeProject} →</span>
      </div>
    </Link>
  )
}
