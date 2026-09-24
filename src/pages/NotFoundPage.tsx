import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useI18n } from '@/i18n/useI18n'

export default function NotFoundPage() {
  const { t, to, home } = useI18n()
  useDocumentTitle(t.notFound.title)
  return (
    <section className="relative overflow-hidden pt-40 pb-28">
      <p aria-hidden="true" className="absolute inset-x-0 top-24 text-center font-display text-[clamp(8rem,30vw,22rem)] leading-none font-extrabold text-soft select-none">
        404
      </p>
      <Container className="relative text-center">
        <h1 className="text-4xl font-extrabold md:text-5xl">{t.notFound.title}</h1>
        <p className="mx-auto mt-4 max-w-[48ch] text-muted">{t.notFound.text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to={home}>{t.notFound.home}</Button>
          <Button to={to('projects')} variant="outline">
            {t.notFound.projects}
          </Button>
        </div>
      </Container>
    </section>
  )
}
