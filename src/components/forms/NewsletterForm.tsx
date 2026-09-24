import { useState, type FormEvent } from 'react'
import { useI18n } from '@/i18n/useI18n'

/**
 * Subscrição da newsletter. Ainda sem serviço de envio ligado:
 * valida e confirma localmente. Ver README → "O que ainda falta".
 */
export function NewsletterForm() {
  const { t } = useI18n()
  const [done, setDone] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setDone(true)
  }

  if (done) return <p className="mt-4 text-sm text-white">{t.footer.thanks}</p>

  return (
    <form onSubmit={submit} className="mt-4 flex overflow-hidden rounded-lg bg-white/8 focus-within:ring-2 focus-within:ring-cyan">
      <label htmlFor="newsletter-email" className="sr-only">
        {t.footer.email}
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder={t.footer.emailPlaceholder}
        className="min-w-0 flex-1 bg-transparent px-3.5 py-3 text-white placeholder:text-mist/60 focus:outline-none"
      />
      <button className="bg-blue px-5 font-bold text-white hover:bg-blue-2">OK</button>
    </form>
  )
}
