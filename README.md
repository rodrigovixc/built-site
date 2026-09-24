# BUILT CoLAB — novo site

Recriação de [builtcolab.pt](https://builtcolab.pt) com um design system próprio: branco dominante,
grelha de papel técnico, azul-marinho com ciano (Digitalização) e verde (Sustentabilidade).
Em português, inglês e espanhol.

React 19 · TypeScript · Tailwind CSS 4 · React Router · Vite.

```bash
npm install
npm run dev        # compila os dados e arranca em http://localhost:5173
npm run build      # compila os dados e gera dist/
npm run lint
```

## Conteúdo

`content/` é a fonte da verdade e está versionada. `src/data/` e `public/content/` são
gerados a partir dela por `scripts/build-data.mjs`, que corre sozinho antes de `dev` e `build`.

```
content/
  <kind>.json                    metadados (datas, imagem, áreas, local…), sem texto
  <locale>/<kind>/<slug>.json    { title, excerpt, content, source } por idioma
  team.json, governance.json, associates.json, podcast.json, areas.json
```

`kind` é `news`, `projects`, `insights`, `events`, `jobs` ou `pages`; `locale` é `pt`, `en` ou `es`.

| Comando | O que faz |
|---|---|
| `npm run scrape` | Recolhe de novo o WordPress, descarrega as imagens e compila os dados |
| `npm run media` | Só as imagens: descarrega para `public/media/` em WebP (1600 px e `-sm` 800 px) e reescreve os endereços em `content/` |
| `npm run data` | Só compila `content/` para `src/data/` e `public/content/` |
| `npm run i18n:todo` | Lista o que falta traduzir em EN e ES |

### De onde vem cada coisa

- **PT e EN oficiais:** API REST do WordPress com o `lang` do WPML. Cada página PT indica, no
  `hreflang`, qual é a sua versão inglesa; é assim que se emparelham.
- **Cargos, órgãos sociais, associados, podcast, datas e locais dos eventos:** HTML das
  listagens JetEngine, porque a API não os expõe.
- **Traduções automáticas:** o espanhol todo e o inglês que o WordPress não tem. Estão em
  `content/<locale>/…` com `"source": "machine"`; o site mostra um aviso nesses textos.
  O scraper nunca as apaga: só as substitui se aparecer a tradução oficial.

Para traduzir o que faltar depois de um novo scrape: `node scripts/i18n-todo.mjs --batches .i18n-batches`
divide o trabalho em lotes (origem PT → destino) que podem ser entregues a um tradutor ou a um modelo.

O HTML do WordPress é limpo no scraper: sem classes, estilos, scripts nem invólucros do
Elementor. As ligações internas ficam em caminhos PT (`/noticias/…`) e o componente `Prose`
converte-as para o idioma de quem lê. Os PDFs continuam a apontar para builtcolab.pt.

## Idiomas

| | Prefixo | Exemplo |
|---|---|---|
| Português | — | `/projetos/hive-…`, `/built/equipa` |
| Inglês | `/en` | `/en/projects/hive-…`, `/en/about/team` |
| Espanhol | `/es` | `/es/proyectos/hive-…`, `/es/sobre/equipo` |

- Os nomes das rotas estão em `src/i18n/locales.ts`; os textos da interface em
  `src/i18n/messages/{pt,en,es}.ts`. `en` e `es` têm o tipo de `pt`: o TypeScript acusa o que faltar.
- Os slugs dos itens são os portugueses em todos os idiomas.
- O PT vem no bundle; os dicionários e os títulos de EN/ES só se descarregam quando alguém entra
  nesse idioma (loader da rota). O corpo de cada artigo é um JSON estático pedido na página de detalhe.

## Estrutura

```
src/
  components/
    ui/        peças base: Button, Tag, Eyebrow, Container, Prose, Pagination, FilterChips…
    layout/    Header, MenuOverlay, LanguageSwitcher, Footer, PageHeader, ArticleLayout…
    cards/     ProjectCard, NewsCard, EventRow, TeamCard, EpisodeCard, InsightItem
    home/      secções da página inicial, incluindo ScanCanvas (a animação Scan-to-BIM)
    forms/     campos e o passo final dos formulários
  pages/       uma página por rota, carregada sob pedido
  i18n/        idiomas, rotas traduzidas, dicionários e contexto
  lib/         tipos, acesso aos dados, informação fixa do site
  hooks/
```

## Design system

Os tokens estão em `src/index.css`:

- **Marca** (fixos): `navy`, `navy-2`, `blue`, `blue-2`, `cyan`, `green`, `mist`.
- **Semânticos** (mudam no modo escuro): `surface`, `soft`, `card`, `line`, `ink`, `muted`.
  Os componentes usam só estes, por isso o modo escuro não precisa de variantes `dark:`.
- **Tipografia**: Sora nos títulos, Plus Jakarta Sans no texto.
- `.blueprint` desenha a grelha técnica; `.prose-cms` dá tipografia ao HTML do WordPress.

## Publicação

É uma SPA: no alojamento, todas as rotas têm de servir o `index.html`. Os caminhos PT mantêm
os endereços do site actual; `/projectos/…` redirecciona para `/projetos/…`.

## O que ainda falta

- **Formulários sem servidor.** Contacto e diagnóstico montam um e-mail para
  info@builtcolab.pt (`src/lib/mailto.ts`). A newsletter só confirma localmente.
- **PDFs servidos por builtcolab.pt.** As imagens já estão no repositório; os PDFs não.
- **Revisão humana das traduções automáticas**, sobretudo do espanhol.
