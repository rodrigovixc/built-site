import { useState, type FormEvent } from 'react'
import { TextArea, TextField } from '@/components/forms/Fields'
import { SentNotice } from '@/components/forms/SentNotice'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useI18n } from '@/i18n/useI18n'
import { mailto } from '@/lib/mailto'
import { contact, social } from '@/lib/site'

export default function ContactPage() {
  const { t } = useI18n()
  const c = t.contact
  useDocumentTitle(t.routes.contact)
  const [href, setHref] = useState<string | null>(null)

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const v = (k: string) => String(f.get(k) ?? '')
    setHref(
      mailto(c.mailSubject(v('subject') || v('name')), [
        [c.name, v('name')],
        [c.email, v('email')],
        [c.company, v('company')],
        [c.message, v('message')],
      ]),
    )
  }

  return (
    <>
      <PageHeader eyebrow={t.routes.contact} title={c.title} crumbs={[{ label: t.routes.contact }]} intro={c.intro} />
      <Container className="grid gap-14 py-14 md:py-20 lg:grid-cols-[1fr_1.3fr]">
        <div className="grid content-start gap-8">
          {contact.offices.map((o) => (
            <div key={o.key} className="border-t-2 border-ink pt-5">
              <h2 className="text-xl font-bold">{t.offices[o.key]}</h2>
              <p className="mt-2 text-muted">
                {o.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </p>
            </div>
          ))}
          <div className="border-t-2 border-ink pt-5">
            <h2 className="text-xl font-bold">{c.general}</h2>
            <p className="mt-2 text-lg font-semibold text-blue select-all">{contact.email}</p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              {social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-blue">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {href ? (
          <SentNotice href={href} onBack={() => setHref(null)} />
        ) : (
          <form onSubmit={submit} className="grid gap-5 rounded-2xl border border-line bg-card p-6 shadow-card md:p-10">
            <h2 className="text-2xl font-bold">{c.formTitle}</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField id="name" label={c.name} required autoComplete="name" />
              <TextField id="email" label={c.email} type="email" required autoComplete="email" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField id="company" label={c.company} autoComplete="organization" />
              <TextField id="subject" label={c.subject} />
            </div>
            <TextArea id="message" label={c.message} required />
            <p className="text-xs text-muted">{c.consent}</p>
            <Button type="submit" className="justify-self-start">
              {c.submit}
            </Button>
          </form>
        )}
      </Container>
    </>
  )
}
