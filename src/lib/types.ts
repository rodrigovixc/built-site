/** `src` aponta para /media/…webp (até 1600 px); a variante -sm.webp tem até 800 px. */
export type Media = {
  src: string
  alt: string
  width: number | null
  height: number | null
}

/** Campos comuns a tudo o que vem de um tipo de conteúdo do WordPress. */
export type Entry = {
  id: number
  slug: string
  date: string
  modified: string
  title: string
  excerpt: string
  image: Media | null
}

export type NewsItem = Entry & { categories: string[] }
/** `areas` são slugs (bim-and-point-clouds…), traduzidos pelos dicionários. */
export type Project = Entry & { areas: string[] }
export type Insight = Entry
export type EventItem = Entry & { startsAt: string; location: string | null }
export type Job = Entry & { pdf: string | null }

export type Area = { slug: string; name: string; count: number }

export type TeamMember = {
  id: number
  name: string
  role: string
  linkedin: string | null
  orcid: string | null
  photo: string | null
}

export type GoverningBody = {
  name: string
  members: { position: string; name: string; organization: string }[]
}

export type Associate = { id: number; name: string; logo: string | null; url: string | null }

export type Episode = {
  number: number
  title: string
  description: string
  links: string[]
}

/** Corpo de um item ou página num idioma. `fallback`: não existe no idioma, mostra-se o PT. */
export type Body = { content: string; machine?: boolean; fallback?: boolean }

export type Page = Body & { title: string }

/** Título e resumo de um item num idioma. */
export type Overlay = Record<string, { title: string; excerpt: string }>

/** Colecções cujo corpo se carrega à parte, só na página de detalhe. */
export type ContentKind = 'news' | 'projects' | 'insights' | 'events' | 'jobs'
