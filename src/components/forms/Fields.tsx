import type { ComponentProps, ReactNode } from 'react'

const control =
  'w-full rounded-lg border border-line bg-card px-4 py-3 text-ink placeholder:text-muted/70 transition focus:border-blue focus:outline-none focus:ring-3 focus:ring-blue/15'

export function TextField({ label, id, hint, ...props }: ComponentProps<'input'> & { label: string; id: string; hint?: string }) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
        {props.required && <span className="text-blue"> *</span>}
      </label>
      <input id={id} name={id} className={control} {...props} />
      {hint && <p className="text-xs text-muted">{hint}</p>}
    </div>
  )
}

export function TextArea({ label, id, ...props }: ComponentProps<'textarea'> & { label: string; id: string }) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <textarea id={id} name={id} rows={5} className={control} {...props} />
    </div>
  )
}

/** Grupo de opções em pastilhas (rádio ou caixas de seleção). */
export function ChoiceGroup({
  legend,
  name,
  options,
  value,
  onChange,
  multiple = false,
  required = false,
}: {
  legend: ReactNode
  name: string
  options: string[]
  value: string[]
  onChange: (value: string[]) => void
  multiple?: boolean
  required?: boolean
}) {
  const toggle = (o: string) => onChange(multiple ? (value.includes(o) ? value.filter((v) => v !== o) : [...value, o]) : [o])
  return (
    <fieldset className="grid gap-2.5">
      <legend className="mb-2.5 text-sm font-semibold">
        {legend}
        {required && <span className="text-blue"> *</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const checked = value.includes(o)
          return (
            <label
              key={o}
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition has-focus-visible:ring-3 has-focus-visible:ring-cyan ${
                checked ? 'border-blue bg-blue text-white' : 'border-line hover:border-blue'
              }`}
            >
              <input
                type={multiple ? 'checkbox' : 'radio'}
                name={name}
                value={o}
                checked={checked}
                required={required && !multiple && value.length === 0}
                onChange={() => toggle(o)}
                className="sr-only"
              />
              {o}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
