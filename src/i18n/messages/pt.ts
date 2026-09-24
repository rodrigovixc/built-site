/**
 * Textos da interface em português. Define a forma dos outros idiomas:
 * en.ts e es.ts são do tipo `Messages` e o TypeScript acusa o que faltar.
 */
const pt = {
  meta: {
    title: 'BUILT CoLAB – Ambiente Construído do Futuro',
    description: 'BUILT CoLAB – Laboratório Colaborativo para o Ambiente Construído do Futuro. Transição digital e ecológica de edifícios e infraestruturas.',
  },

  common: {
    home: 'Início',
    readMore: 'Ler mais',
    seeProject: 'Ver projeto',
    seeAll: 'Ver tudo',
    loading: 'A carregar',
    skipToContent: 'Saltar para o conteúdo',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    menu: 'Menu',
    mainNav: 'Principal',
    breadcrumb: 'Localização',
    pagination: 'Paginação',
    previous: '← Anterior',
    next: 'Seguinte →',
    locationTba: 'Local a anunciar',
    contactUs: 'Fale connosco',
    language: 'Idioma',
    logoHome: 'BUILT CoLAB – página inicial',
    published: 'Publicado',
    updated: 'Atualizado',
    /** Aviso quando o texto não existe no idioma pedido e aparece em português. */
    fallbackNotice: 'Este conteúdo ainda não está disponível neste idioma. Mostramos a versão original em português.',
    machineNotice: '',
  },

  routes: {
    about: 'Sobre nós',
    team: 'Equipa',
    associates: 'Associados',
    governance: 'Órgãos sociais',
    careers: 'Recrutamento',
    projects: 'Projetos',
    news: 'Notícias',
    events: 'Agenda e formação',
    insights: 'Insights',
    podcast: 'Podcast TechOnBuilt',
    services: 'Serviços',
    contact: 'Contactos',
    diagnostic: 'Diagnóstico',
    areas: 'Áreas de atuação',
    whoWeAre: 'Quem somos',
    agenda: 'Agenda',
  },

  menu: {
    groupAbout: 'O Built',
    groupPlatforms: 'Plataformas',
    groupContact: 'Contacto',
    digitalbuilt: 'DIGITALbuilt · EDIH',
    research: 'BUILT Research',
    circularity: 'Circularidade na construção',
    cities: 'Porto · Lisboa',
  },

  footer: {
    tagline: 'Laboratório Colaborativo para o Ambiente Construído do Futuro.',
    explore: 'Explorar',
    legal: 'Avisos legais',
    newsletter: 'Newsletter',
    newsletterText: 'Subscreva e fique a par de todas as novidades.',
    newsletterConsent: 'Ao subscrever, aceita a nossa',
    privacyPolicy: 'política de privacidade',
    rights: 'Digital Built Environment. Todos os direitos reservados.',
    email: 'E-mail',
    emailPlaceholder: 'o seu e-mail',
    thanks: 'Obrigado! Vai receber as próximas novidades.',
  },

  legal: {
    terms: 'Termos e condições',
    privacy: 'Política de privacidade',
    equality: 'Plano de igualdade de género',
    funded: 'Projetos financiados',
    info: 'Informações legais',
  },

  offices: {
    porto: 'Porto – Sede',
    lisbon: 'Lisboa – EngineersHub',
  },

  home: {
    heroEyebrow: 'Laboratório colaborativo · setor AEC',
    heroLine1: 'Construir',
    heroLine2: 'o',
    heroAccent: 'futuro',
    heroSubtitle: 'Transição digital e ecológica do ambiente construído',
    heroText: 'Investigação aplicada, serviços e formação para edifícios e infraestruturas adaptáveis, inteligentes, resilientes e sustentáveis.',
    heroCta: 'Diagnóstico gratuito →',
    heroSecondary: 'Ver projetos',

    servicesEyebrow: 'Os nossos serviços',
    servicesTitle: 'Da investigação ao estaleiro.',
    servicesText:
      'Como membro do DIGITALbuilt, o European Digital Innovation Hub do ambiente construído, levamos inovação a PME e à Administração Pública a preços co-financiados pelo PRR e pela União Europeia.',
    services: [
      {
        title: 'Skills & Training',
        text: 'Capacitação em BIM, do básico ao avançado, Avaliação do Ciclo de Vida, Nature-Based Solutions e programação no setor AEC.',
        cta: 'Ver formações',
      },
      {
        title: 'Test Before Invest',
        text: 'Testes de prontidão BIM, software à medida até MVP e gémeos digitais ajustados a cada projeto, antes de investir.',
        cta: 'Saber mais',
      },
      {
        title: 'Diagnóstico de Maturidade Digital',
        text: 'Identificação de oportunidades de melhoria, com estratégias para ganhar eficiência, reduzir custos e competir melhor.',
        cta: 'Fazer diagnóstico',
      },
    ],

    statementLine1: 'Laboratório',
    statementLine2: 'colaborativo',
    statementLine3: 'para o ambiente',
    statementLine4: 'construído',
    statementTitle: 'Aproximar ciência e indústria.',
    statementText:
      'O BUILT CoLAB agrega centros de saber, indústria e utilizadores finais num ambiente colaborativo, com uma abordagem “Technology to Market” que leva tecnologias a produtos e serviços, para aumentar a produtividade, a competitividade e o crescimento sustentável do setor AEC.',
    statYears: 'anos de atividade',
    statProjects: 'projetos de I&D',
    statTeam: 'pessoas na equipa',
    statAssociates: 'associados',
    statementCta: 'Conheça o BUILT →',

    areasEyebrow: 'Áreas de atuação',
    areasTitle: 'Duas transições, uma agenda.',
    areasText: 'A nossa I&D organiza-se em Digitalização e Sustentabilidade, em seis linhas temáticas.',
    projectsCount: (n: number) => `${n} ${n === 1 ? 'projeto' : 'projetos'}`,

    projectsEyebrow: 'Projetos',
    projectsTitle: 'Inovação que já está em obra.',
    projectsText: 'Projetos nacionais e europeus que levam investigação aplicada para dentro de empresas e entidades públicas.',
    projectsAll: 'Ver todos →',

    agendaTitle: 'Agenda',
    agendaAll: 'Todos os eventos',
    knowledgeTitle: 'Conhecimento',
    kindInsight: 'Insight',
    kindPodcast: 'Podcast',
    kindNews: 'Notícia',

    partners: 'Associados e parceiros',

    ctaTitle: 'Vamos transformar a sua empresa?',
    ctaText: 'Faça o diagnóstico de maturidade digital e sustentável em 3 passos. A nossa equipa responde com um plano à medida.',
    ctaButton: 'Começar diagnóstico →',
  },

  pillars: { digital: 'Digitalização', sustainable: 'Sustentabilidade' },

  areas: {
    'bim-and-point-clouds': {
      label: 'BIM & Nuvens de Pontos',
      summary: 'Modelação da informação, Scan-to-BIM e repositórios digitais de ativos construídos.',
    },
    'automation-and-artificial-intelligence': {
      label: 'Automação & Inteligência Artificial',
      summary: 'IA aplicada ao projeto e à obra: monitorização automática, visão computacional e automação.',
    },
    'digital-twin-iot': {
      label: 'Digital Twin & IoT',
      summary: 'Gémeos digitais de edifícios e infraestruturas, da rede de água à ferrovia.',
    },
    'augmented-virtual-reality': {
      label: 'Realidade Aumentada & Virtual',
      summary: 'Ambientes imersivos para projeto, obra, manutenção e formação industrial.',
    },
    'sustainable-buildings-and-cities': {
      label: 'Edifícios & Cidades Sustentáveis',
      summary: 'Circularidade, soluções baseadas na natureza e desempenho ambiental do edificado.',
    },
    'industry-decarbonization-and-reporting': {
      label: 'Descarbonização & Reporte',
      summary: 'Avaliação do ciclo de vida, reporte ESG e descarbonização da indústria da construção.',
    },
  } as Record<string, { label: string; summary: string }>,

  technologies: ['BIM', 'Digital Twin', 'Inteligência Artificial', 'Scan-to-BIM', 'Realidade Aumentada', 'Avaliação de Ciclo de Vida', 'Circularidade', 'ESG'],

  projects: {
    title: 'Inovação que já está em obra.',
    intro:
      'O BUILT CoLAB desenvolve as suas atividades de I&D em duas áreas estratégicas, Digitalização e Sustentabilidade, com projetos que promovem a competitividade e a internacionalização do setor AEC.',
    filterLabel: 'Filtrar por área',
    all: 'Todos',
    empty: 'Sem projetos nesta área',
    eyebrowDetail: 'Projeto',
    factSheet: 'Ficha do projeto',
    related: 'Projetos relacionados',
    relatedAll: 'Todos os projetos',
  },

  news: {
    eyebrow: 'Comunicação',
    intro: (n: number) => `${n} notícias sobre a atividade do BUILT CoLAB e do setor AEC.`,
    eyebrowDetail: 'Notícia',
    more: 'Mais notícias',
    all: 'Todas as notícias',
  },

  insights: {
    eyebrow: 'Conhecimento',
    title: 'BUILT Insights',
    intro: 'Casos de aplicação, artigos e publicações sobre a transição digital e ecológica do ambiente construído.',
    eyebrowDetail: 'Insight',
    more: 'Mais insights',
    all: 'Todos os insights',
  },

  events: {
    eyebrow: 'Agenda e formação',
    title: 'Eventos',
    intro: 'Workshops, conferências e ações de capacitação em BIM, ACV e transição digital para profissionais do setor AEC.',
    show: 'Mostrar',
    upcoming: 'Próximos',
    past: 'Anteriores',
    emptyTitle: 'Sem eventos agendados',
    emptyText: 'Acompanhe a newsletter para saber das próximas datas.',
    eyebrowUpcoming: 'Próximo evento',
    eyebrowPast: 'Evento realizado',
    info: 'Informação',
    date: 'Data',
    location: 'Local',
    tba: 'A anunciar',
    joinTitle: 'Quer participar?',
    joinText: 'As inscrições estão indicadas no texto. Para dúvidas, escreva-nos.',
    joinButton: 'Contactar',
    others: 'Outros eventos',
    all: 'Toda a agenda',
    /** Parâmetro de URL para ver os eventos anteriores. */
    pastParam: 'anteriores',
  },

  about: {
    title: 'O Laboratório Colaborativo para o Ambiente Construído do Futuro.',
    intro: 'Promovemos a transição digital e ecológica dos edifícios e infraestruturas, tornando-os adaptáveis, inteligentes, resilientes e sustentáveis.',
    whoEyebrow: 'Quem somos',
    whoTitle: 'Technology to Market.',
    whoParagraphs: [
      'O BUILT CoLAB desenvolve atividades de investigação, inovação e transferência de conhecimento para aumentar a produtividade, a competitividade e o crescimento sustentável do ecossistema do setor AEC – Arquitetura, Engenharia e Construção.',
      'Pauta-se por uma abordagem “Technology to Market”, elevando os níveis de maturidade de tecnologias para produtos e serviços. Agrega centros de saber, indústria e utilizadores finais num ambiente colaborativo, num modelo de criação comum.',
      'Atua em parceria com redes nacionais e internacionais de referência, posicionando-se como incubador e demonstrador, para diminuir o risco da transferência de conhecimento e tecnologia. O âmbito é o ambiente construído como um todo: edifícios e infraestruturas, incluindo o transporte de energia e o ciclo da água.',
      'É também o “braço armado” do Cluster AEC no desenvolvimento do conhecimento e da investigação científica, e beneficia de uma vasta rede de Laboratórios Colaborativos para iniciativas orientadas à missão: resiliência, transição digital, transição energética.',
    ],
    agendaEyebrow: 'Agenda de I&D',
    agendaTitle: 'Todo o ciclo de vida do ambiente construído, assente em BIM.',
    phase: (n: number) => `Fase ${n}`,
    lifecycle: [
      'Arquitetura e design data-driven',
      'Fabricação e construção modular',
      'Robotização e impressão 3D',
      'Digital twin em fábrica e estaleiro',
      'Gestão e manutenção',
      'Desconstrução e reciclagem',
    ],
    clustersEyebrow: 'Clusters para a competitividade e internacionalização',
    clustersTitle: 'Uma ligação umbilical aos clusters do setor.',
    clustersText:
      'O BUILT CoLAB é a entidade que dinamiza o esforço de modernização tecnológica do Cluster AEC e do Cluster Ferrovia, dois dos clusters que assinaram o Pacto Setorial para a Competitividade e Internacionalização com o Ministério da Economia e da Transição Digital.',
    clusters: [
      {
        name: 'Cluster AEC',
        signed: 'Pacto setorial assinado em março de 2019',
        text: 'Plataforma agregadora de conhecimento e competências, com papel central na política industrial. Aposta na IDI e na internacionalização como motores da competitividade da arquitetura, engenharia e construção, fomentando sinergias em toda a cadeia de valor.',
      },
      {
        name: 'Cluster Ferrovia',
        signed: 'Pacto setorial assinado em setembro de 2019',
        text: 'Fortalece a cooperação entre os atores do setor ferroviário, com uma estratégia comum de investigação e inovação, projetos conjuntos de I&D, novos negócios e a internacionalização do setor.',
      },
    ],
  },

  team: {
    intro:
      'Focando-se em múltiplas áreas de atuação, a nossa equipa procura diariamente a excelência, estabelecendo parcerias e produzindo investigação aplicada ao nosso quotidiano.',
    /** Cargos tal como vêm do site → tradução (em PT, só os que estão noutra língua). */
    roles: {} as Record<string, string>,
  },

  associates: {
    intro: (n: number) => `${n} entidades – universidades, laboratórios, institutos e empresas de construção – que fazem o BUILT CoLAB.`,
  },

  governance: {
    bodies: {} as Record<string, string>,
    positions: {} as Record<string, string>,
  },

  careers: {
    intro: 'Venha trabalhar connosco e junte-se a esta equipa.',
    open: 'Vaga aberta',
    pdf: 'Descarregar anúncio (PDF)',
    apply: 'Candidatar-me',
    emptyTitle: 'Sem vagas abertas neste momento',
    emptyText: 'Candidaturas espontâneas para',
  },

  podcast: {
    title: 'O podcast da transição digital na construção.',
    intro: (n: number) =>
      `${n} episódios de conversa com convidados sobre BIM, inteligência artificial, construção modular, impressão 3D e o futuro do setor AEC.`,
    episode: (n: number) => `Episódio ${n}`,
    listen: 'Ouvir',
    languageNote: '',
  },

  services: {
    eyebrow: 'Serviços · DIGITALbuilt',
    title: 'O European Digital Innovation Hub para o Ambiente Construído.',
    intro:
      'O DIGITALbuilt une o Cluster AEC, o Cluster Recursos Minerais e o Cluster da Ferrovia para tornar PME e Administração Pública mais inovadoras, sustentáveis e eficientes. Como membro, o BUILT CoLAB presta serviços a preços abaixo do mercado, co-financiados pelo PRR e pela União Europeia.',
    ctaDiagnostic: 'Começar pelo diagnóstico →',
    ctaTeam: 'Falar com a equipa',
    scope: (i: number, n: number) => `Âmbito ${i} de ${n}`,
    moreInfo: 'Informações e inscrições',
    groups: [
      {
        name: 'Skills and Training',
        intro:
          'Capacitação em BIM, do básico ao avançado, e apoio à implementação; Avaliação do Ciclo de Vida, Nature-Based Solutions e programação no setor AEC.',
        services: [
          { title: 'Capacitação: BIM – Nível Introdutório', text: 'Conceitos essenciais e uso básico da metodologia BIM na gestão de projetos de construção.' },
          { title: 'Capacitação: BIM – Nível Avançado', text: 'Uso de ferramentas BIM: coordenação de modelos, simulações e gestão de dados.' },
          { title: 'Capacitação: Programação no setor AEC', text: 'Linguagens de programação aplicadas à automação e integração de soluções tecnológicas.' },
          { title: 'Implementação BIM', text: 'Transição das entidades para a metodologia BIM, adaptando os seus processos.' },
          { title: 'Capacitação: ACV – Nível Introdutório', text: 'Conceitos essenciais da Avaliação do Ciclo de Vida e ferramenta digital para ACV.' },
          { title: 'Capacitação: planeamento de Nature-Based Solutions', text: 'Planeamento de soluções baseadas na natureza em áreas urbanas, com GIS e ferramenta digital.' },
        ],
      },
      {
        name: 'Test Before Invest',
        intro: 'Testes de prontidão para adoção do BIM, software personalizado e gémeos digitais ajustados às necessidades de cada projeto.',
        services: [
          {
            title: 'Teste: Metodologia BIM e soluções de digitalização',
            text: 'Experimentar, com especialistas, modelação, coordenação e visualização BIM, nuvens de pontos, Digital Twins e soluções AR/VR.',
          },
          { title: 'Teste: software de avaliação de impactes ambientais', text: 'Explorar uma ferramenta de ACV/LCA e cálculo de impactes ambientais antes de decidir investir.' },
          { title: 'Software personalizado até MVP', text: 'Desenvolvimento até produto mínimo viável, para testar a viabilidade da solução.' },
          { title: 'Gémeos digitais à medida', text: 'Gémeos digitais para monitorizar e otimizar infraestruturas ou projetos específicos, à escala do desafio.' },
        ],
      },
      {
        name: 'Diagnóstico de Maturidade Digital',
        intro: 'Identificação de oportunidades de melhoria, com propostas para aumentar a eficiência, reduzir custos e otimizar a competitividade.',
        services: [
          {
            title: 'Avaliação de maturidade digital',
            text: 'Obrigatória para aceder às condições co-financiadas; é o primeiro passo para todos os serviços.',
          },
        ],
      },
    ],
    accessTitle: 'Como aceder a estes serviços?',
    accessText:
      'A sua organização tem de cumprir alguns requisitos e fazer uma avaliação de maturidade digital. Comece pelo diagnóstico e nós tratamos do resto.',
  },

  contact: {
    title: 'Vamos conversar.',
    intro: 'Uma dúvida, uma parceria ou um desafio da sua empresa? Escreva-nos.',
    general: 'Geral',
    formTitle: 'Envie-nos uma mensagem',
    name: 'Nome',
    email: 'E-mail',
    company: 'Organização',
    subject: 'Assunto',
    message: 'Mensagem',
    consent: 'Ao enviar, concorda com a nossa política de privacidade.',
    submit: 'Preparar mensagem →',
    mailSubject: (who: string) => `Contacto pelo site – ${who}`,
  },

  sent: {
    title: 'Falta um clique.',
    text: 'Preparámos a mensagem com as suas respostas. Abra-a no seu e-mail e envie para',
    open: 'Abrir no e-mail →',
    back: 'Voltar a editar',
  },

  diagnostic: {
    eyebrow: 'Diagnóstico gratuito',
    title: 'Promova a transformação digital e sustentável da sua empresa.',
    intro: 'Três passos, dois minutos. A equipa do BUILT CoLAB analisa as respostas e propõe um caminho à medida.',
    steps: ['A sua empresa', 'Desafios', 'Contacto'],
    stepsLabel: 'Passos',
    company: 'Empresa',
    size: 'Dimensão da empresa (pessoas)',
    sizes: ['1 a 10', '11 a 50', '51 a 100', '+ 101'],
    area: 'Área de intervenção',
    areas: ['Digitalização', 'Sustentabilidade'],
    digital: 'Desafios atuais para a digitalização',
    digitalOptions: ['Digitalização', 'Melhoria de eficiência', 'Criação de novos negócios', 'Internacionalização', 'Competitividade'],
    sustainable: 'Desafios atuais para a sustentabilidade',
    sustainableOptions: ['Implementação de ESG', 'Avaliação de impactes', 'Eco-design', 'Introdução de princípios de circularidade'],
    notes: 'Notas',
    notesPlaceholder: 'Conte-nos o contexto, se quiser.',
    name: 'Nome',
    email: 'E-mail',
    phone: 'Telefone',
    consent: 'Ao continuar, concorda com a nossa política de privacidade.',
    back: '← Voltar',
    continue: 'Continuar →',
    finish: 'Concluir →',
    mailSubject: (company: string) => `Diagnóstico de maturidade – ${company}`,
  },

  cms: { eyebrowLegal: 'Avisos legais' },

  notFound: {
    title: 'Página não encontrada',
    text: 'A página que procura pode ter mudado de endereço ou já não existir.',
    home: 'Voltar ao início',
    projects: 'Ver projetos',
  },

  /** Nomes de locais de eventos que merecem tradução (os outros ficam como estão). */
  locations: {} as Record<string, string>,
}

export default pt
export type Messages = typeof pt
