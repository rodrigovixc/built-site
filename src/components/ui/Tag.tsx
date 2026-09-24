import type { ReactNode } from 'react'
import type { Pillar } from '@/lib/site'

const tones = {
  neutral: 'bg-soft text-blue',
  digital: 'bg-cyan/10 text-cyan',
  sustainable: 'bg-green/10 text-green',
  glass: 'bg-white/15 text-white backdrop-blur-md',
} as const

export function Tag({ children, tone = 'neutral' }: { children: ReactNode; tone?: keyof typeof tones | Pillar }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[0.72rem] font-semibold ${tones[tone]}`}>{children}</span>
}
