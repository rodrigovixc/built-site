import type { Messages } from '@/i18n/messages/pt'
import type { Pillar } from './site'
import { areaPillar } from './site'
import type { Project } from './types'

/** Áreas do projeto com nome e pilar no idioma actual. */
export function projectAreas(project: Project, t: Messages) {
  return project.areas
    .filter((slug) => areaPillar[slug])
    .map((slug) => ({ slug, pillar: areaPillar[slug] as Pillar, label: t.areas[slug]?.label ?? slug }))
}
