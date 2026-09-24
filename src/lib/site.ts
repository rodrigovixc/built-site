/** Informação fixa do BUILT CoLAB que não depende do idioma. Os textos estão em src/i18n/messages. */

export const contact = {
  email: 'info@builtcolab.pt',
  offices: [
    { key: 'porto', lines: ['Rua de Campo Alegre, 760', '4150-171 Porto'] },
    { key: 'lisbon', lines: ['Av. Fontes Pereira de Melo 17, 1.º', '1050-208 Lisboa'] },
  ] as const,
}

export const social = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/builtcolab/' },
  { label: 'Instagram', href: 'https://www.instagram.com/builtcolab/' },
  { label: 'Facebook', href: 'https://www.facebook.com/Laborat%C3%B3rio-Colaborativo-BUILT-112754147248179' },
  { label: 'X / Twitter', href: 'https://twitter.com/builtcolab' },
]

export const external = {
  research: 'https://research.builtcolab.pt/',
  circularity: 'https://circularidade.builtcolab.pt/',
}

/** Slugs das páginas legais do WordPress (iguais em todos os idiomas). */
export const legalPages = [
  { key: 'terms', slug: 'termos-e-condicoes' },
  { key: 'privacy', slug: 'politica-privacidade' },
  { key: 'equality', slug: 'plano-igualdade-de-genero' },
  { key: 'funded', slug: 'projetos-financiados' },
  { key: 'info', slug: 'informacoes-legais' },
] as const

export type Pillar = 'digital' | 'sustainable'

/** As seis áreas de I&D, arrumadas nas duas áreas estratégicas. */
export const areaPillar: Record<string, Pillar> = {
  'bim-and-point-clouds': 'digital',
  'automation-and-artificial-intelligence': 'digital',
  'digital-twin-iot': 'digital',
  'augmented-virtual-reality': 'digital',
  'sustainable-buildings-and-cities': 'sustainable',
  'industry-decarbonization-and-reporting': 'sustainable',
}

/** Formações do DIGITALbuilt com página própria no WordPress. */
export const trainingPages: Record<string, string> = {
  '0-0': 'digitalbuilt-bim-introdutorio',
  '0-4': 'digitalbuilt-acv-introdutorio',
}

export const trainingHours: Record<string, string> = { '0-0': '8 h', '0-1': '24 h', '0-2': '40 h', '0-4': '8 h', '0-5': '8 h' }
