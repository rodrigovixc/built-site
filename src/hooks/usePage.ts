/** Página actual a partir de ?page=, limitada ao intervalo válido. */
export function usePage(total: number, perPage: number, search: URLSearchParams) {
  const pages = Math.max(1, Math.ceil(total / perPage))
  const page = Math.min(pages, Math.max(1, Number(search.get('page')) || 1))
  return { page, pages, start: (page - 1) * perPage, end: page * perPage }
}
