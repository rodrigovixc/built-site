import { contact } from './site'

/**
 * O site ainda não tem servidor para receber formulários: o pedido é
 * montado como e-mail para info@builtcolab.pt, que a pessoa envia do seu cliente.
 */
export function mailto(subject: string, fields: [label: string, value: string][]) {
  const body = fields
    .filter(([, v]) => v.trim())
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
