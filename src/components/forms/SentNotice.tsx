import { Button } from '@/components/ui/Button'
import { useI18n } from '@/i18n/useI18n'
import { contact } from '@/lib/site'

/** Passo final dos formulários: abre o e-mail já preenchido. */
export function SentNotice({ href, onBack }: { href: string; onBack: () => void }) {
  const { t } = useI18n()
  return (
    <div className="rounded-2xl border border-line bg-soft p-8">
      <p className="font-display text-2xl font-bold">{t.sent.title}</p>
      <p className="mt-2 max-w-[56ch] text-muted">
        {t.sent.text} <strong className="text-ink select-all">{contact.email}</strong>.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={href} className="inline-flex items-center gap-2 rounded-lg bg-blue px-6 py-3.5 font-semibold text-white hover:bg-blue-2">
          {t.sent.open}
        </a>
        <Button variant="outline" onClick={onBack}>
          {t.sent.back}
        </Button>
      </div>
    </div>
  )
}
