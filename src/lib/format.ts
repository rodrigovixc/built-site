/** Remove o texto "Ler mais"/reticências que o WordPress junta aos resumos. */
export const tidyExcerpt = (text: string, max = 180) => {
  const t = text.replace(/\s*(Ler Mais|Saber Mais|Read More|Leer más)\s*$/i, '').trim()
  return t.length > max ? `${t.slice(0, max).replace(/\s+\S*$/, '')}…` : t
}
