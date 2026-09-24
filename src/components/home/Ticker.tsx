import { useI18n } from '@/i18n/useI18n'

export function Ticker() {
  const { t } = useI18n()
  const row = t.technologies.flatMap((x) => [x, '✦'])
  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-line py-4 whitespace-nowrap">
      <div className="inline-flex animate-ticker gap-12 pl-12 font-display font-bold tracking-wider uppercase">
        {[...row, ...row].map((x, i) => (
          <span key={i} className={x === '✦' ? 'text-cyan' : ''}>
            {x}
          </span>
        ))}
      </div>
    </div>
  )
}
