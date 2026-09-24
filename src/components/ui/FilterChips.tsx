type Option = { value: string; label: string; count?: number }

export function FilterChips({ options, value, onChange, label }: { options: Option[]; value: string; onChange: (v: string) => void; label: string }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = o.value === value
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.value)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${active ? 'bg-ink text-surface' : 'bg-soft text-ink hover:bg-line'}`}
          >
            {o.label}
            {o.count !== undefined && <span className={`ml-1.5 tabular-nums ${active ? 'opacity-70' : 'text-muted'}`}>{o.count}</span>}
          </button>
        )
      })}
    </div>
  )
}
