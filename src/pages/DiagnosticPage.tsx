import { useState, type FormEvent } from 'react'
import { ChoiceGroup, TextArea, TextField } from '@/components/forms/Fields'
import { SentNotice } from '@/components/forms/SentNotice'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useI18n } from '@/i18n/useI18n'
import { mailto } from '@/lib/mailto'

/** As mesmas perguntas do formulário do site actual, em três passos. */
type Answers = {
  company: string
  size: string[]
  areas: string[]
  digital: string[]
  sustainable: string[]
  notes: string
  name: string
  email: string
  phone: string
}

const empty: Answers = { company: '', size: [], areas: [], digital: [], sustainable: [], notes: '', name: '', email: '', phone: '' }

export default function DiagnosticPage() {
  const { t } = useI18n()
  const d = t.diagnostic
  useDocumentTitle(t.routes.diagnostic)
  const [step, setStep] = useState(0)
  const [a, setA] = useState<Answers>(empty)
  const [href, setHref] = useState<string | null>(null)
  const set = <K extends keyof Answers>(k: K, v: Answers[K]) => setA((prev) => ({ ...prev, [k]: v }))
  const last = d.steps.length - 1

  const next = (e: FormEvent) => {
    e.preventDefault()
    if (step < last) {
      setStep(step + 1)
      return
    }
    setHref(
      mailto(d.mailSubject(a.company), [
        [d.company, a.company],
        [d.size, a.size.join(', ')],
        [d.area, a.areas.join(', ')],
        [d.digital, a.digital.join(', ')],
        [d.sustainable, a.sustainable.join(', ')],
        [d.notes, a.notes],
        [d.name, a.name],
        [d.email, a.email],
        [d.phone, a.phone],
      ]),
    )
  }

  return (
    <>
      <PageHeader eyebrow={d.eyebrow} title={d.title} crumbs={[{ label: t.routes.diagnostic }]} intro={d.intro} />
      <Container className="max-w-3xl py-14 md:py-20">
        {href ? (
          <SentNotice href={href} onBack={() => setHref(null)} />
        ) : (
          <>
            <ol className="mb-10 grid grid-cols-3 gap-2" aria-label={d.stepsLabel}>
              {d.steps.map((s, i) => (
                <li key={s} aria-current={i === step ? 'step' : undefined}>
                  <span className={`block h-1.5 rounded-full transition ${i <= step ? 'bg-blue' : 'bg-line'}`} />
                  <span className={`mt-2 block text-sm font-semibold ${i === step ? 'text-ink' : 'text-muted'}`}>
                    {i + 1}. {s}
                  </span>
                </li>
              ))}
            </ol>
            <form onSubmit={next} className="grid gap-8 rounded-2xl border border-line bg-card p-6 shadow-card md:p-10">
              {step === 0 && (
                <>
                  <TextField id="company" label={d.company} required value={a.company} onChange={(e) => set('company', e.target.value)} autoComplete="organization" />
                  <ChoiceGroup legend={d.size} name="size" required options={d.sizes} value={a.size} onChange={(v) => set('size', v)} />
                  <ChoiceGroup legend={d.area} name="areas" multiple options={d.areas} value={a.areas} onChange={(v) => set('areas', v)} />
                </>
              )}
              {step === 1 && (
                <>
                  <ChoiceGroup legend={d.digital} name="digital" multiple options={d.digitalOptions} value={a.digital} onChange={(v) => set('digital', v)} />
                  <ChoiceGroup
                    legend={d.sustainable}
                    name="sustainable"
                    multiple
                    options={d.sustainableOptions}
                    value={a.sustainable}
                    onChange={(v) => set('sustainable', v)}
                  />
                  <TextArea id="notes" label={d.notes} value={a.notes} onChange={(e) => set('notes', e.target.value)} placeholder={d.notesPlaceholder} />
                </>
              )}
              {step === 2 && (
                <>
                  <TextField id="name" label={d.name} required value={a.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <TextField id="email" label={d.email} type="email" required value={a.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" />
                    <TextField id="phone" label={d.phone} type="tel" value={a.phone} onChange={(e) => set('phone', e.target.value)} autoComplete="tel" />
                  </div>
                  <p className="text-xs text-muted">{d.consent}</p>
                </>
              )}
              <div className="flex flex-wrap justify-between gap-3">
                {step > 0 ? (
                  <Button variant="outline" onClick={() => setStep(step - 1)}>
                    {d.back}
                  </Button>
                ) : (
                  <span />
                )}
                <Button type="submit">{step < last ? d.continue : d.finish}</Button>
              </div>
            </form>
          </>
        )}
      </Container>
    </>
  )
}
