import { useI18n } from '@/i18n/useI18n'

export function DateBlock({ iso, className = '' }: { iso: string; className?: string }) {
  const { dateParts } = useI18n()
  const { day, month, year } = dateParts(iso)
  return (
    <div className={`rounded-xl bg-soft py-2.5 text-center ${className}`}>
      <span className="block font-display text-3xl leading-none font-extrabold text-blue tabular-nums">{day}</span>
      <span className="mt-1 block text-[0.66rem] font-bold tracking-[0.12em] text-muted">
        {month} {year}
      </span>
    </div>
  )
}
