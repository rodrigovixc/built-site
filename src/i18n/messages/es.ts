import type { Messages } from './pt'

const es: Messages = {
  meta: {
    title: 'BUILT CoLAB – El Entorno Construido del Futuro',
    description: 'BUILT CoLAB – Laboratorio Colaborativo para el Entorno Construido del Futuro. Transición digital y ecológica de edificios e infraestructuras.',
  },

  common: {
    home: 'Inicio',
    readMore: 'Leer más',
    seeProject: 'Ver proyecto',
    seeAll: 'Ver todo',
    loading: 'Cargando',
    skipToContent: 'Saltar al contenido',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    menu: 'Menú',
    mainNav: 'Principal',
    breadcrumb: 'Ruta de navegación',
    pagination: 'Paginación',
    previous: '← Anterior',
    next: 'Siguiente →',
    locationTba: 'Lugar por anunciar',
    contactUs: 'Contáctenos',
    language: 'Idioma',
    logoHome: 'BUILT CoLAB – página de inicio',
    published: 'Publicado',
    updated: 'Actualizado',
    fallbackNotice: 'Este contenido todavía no está disponible en español. Mostramos la versión original en portugués.',
    machineNotice: 'Este texto se ha traducido automáticamente del portugués.',
  },

  routes: {
    about: 'Sobre nosotros',
    team: 'Equipo',
    associates: 'Asociados',
    governance: 'Órganos sociales',
    careers: 'Empleo',
    projects: 'Proyectos',
    news: 'Noticias',
    events: 'Agenda y formación',
    insights: 'Insights',
    podcast: 'Podcast TechOnBuilt',
    services: 'Servicios',
    contact: 'Contacto',
    diagnostic: 'Diagnóstico',
    areas: 'Áreas de actuación',
    whoWeAre: 'Quiénes somos',
    agenda: 'Agenda',
  },

  nav: {
    knowledge: 'Conocimiento',
    allProjects: 'Todos los proyectos',
    allServices: 'Ver todos los servicios',
    latest: 'Lo más reciente',
    insightsDesc: 'Casos de aplicación y artículos técnicos.',
    newsDesc: 'La actividad del laboratorio y del sector.',
    podcastDesc: 'Conversaciones sobre la transición digital.',
    whoWeAreDesc: 'Misión, agenda de I+D y clústeres.',
    teamDesc: 'Las personas del laboratorio.',
    associatesDesc: 'Universidades, laboratorios y empresas.',
    governanceDesc: 'Asamblea general y consejos.',
    careersDesc: 'Vacantes abiertas y candidaturas.',
  },

  menu: {
    groupAbout: 'Sobre BUILT',
    groupPlatforms: 'Plataformas',
    groupContact: 'Contacto',
    digitalbuilt: 'DIGITALbuilt · EDIH',
    research: 'BUILT Research',
    circularity: 'Circularidad en la construcción',
    cities: 'Oporto · Lisboa',
  },

  footer: {
    tagline: 'Laboratorio Colaborativo para el Entorno Construido del Futuro.',
    explore: 'Explorar',
    legal: 'Avisos legales',
    newsletter: 'Boletín',
    newsletterText: 'Suscríbase y manténgase al día de todas las novedades.',
    newsletterConsent: 'Al suscribirse, acepta nuestra',
    privacyPolicy: 'política de privacidad',
    rights: 'Digital Built Environment. Todos los derechos reservados.',
    email: 'Correo electrónico',
    emailPlaceholder: 'su correo electrónico',
    thanks: '¡Gracias! Recibirá nuestras próximas novedades.',
  },

  legal: {
    terms: 'Términos y condiciones',
    privacy: 'Política de privacidad',
    equality: 'Plan de igualdad de género',
    funded: 'Proyectos financiados',
    info: 'Información legal',
  },

  offices: {
    porto: 'Oporto – Sede',
    lisbon: 'Lisboa – EngineersHub',
  },

  home: {
    heroEyebrow: 'Laboratorio colaborativo · sector AEC',
    heroLine1: 'Construir',
    heroLine2: 'el',
    heroAccent: 'futuro',
    heroSubtitle: 'Transición digital y ecológica del entorno construido',
    heroText: 'Investigación aplicada, servicios y formación para edificios e infraestructuras adaptables, inteligentes, resilientes y sostenibles.',
    heroCta: 'Diagnóstico gratuito →',
    heroSecondary: 'Ver proyectos',

    servicesEyebrow: 'Nuestros servicios',
    servicesTitle: 'De la investigación a la obra.',
    servicesText:
      'Como miembro de DIGITALbuilt, el European Digital Innovation Hub del entorno construido, llevamos la innovación a pymes y a la Administración Pública a precios cofinanciados por el Plan de Recuperación y Resiliencia portugués y la Unión Europea.',
    services: [
      {
        title: 'Skills & Training',
        text: 'Formación en BIM, de nivel básico a avanzado, Análisis del Ciclo de Vida, Nature-Based Solutions y programación en el sector AEC.',
        cta: 'Ver formaciones',
      },
      {
        title: 'Test Before Invest',
        text: 'Pruebas de preparación BIM, software a medida hasta MVP y gemelos digitales ajustados a cada proyecto, antes de invertir.',
        cta: 'Saber más',
      },
      {
        title: 'Diagnóstico de Madurez Digital',
        text: 'Identificamos oportunidades de mejora, con estrategias para ganar eficiencia, reducir costes y competir mejor.',
        cta: 'Hacer el diagnóstico',
      },
    ],

    statementLine1: 'Laboratorio',
    statementLine2: 'colaborativo',
    statementLine3: 'para el entorno',
    statementLine4: 'construido',
    statementTitle: 'Acercar ciencia e industria.',
    statementText:
      'BUILT CoLAB reúne centros de conocimiento, industria y usuarios finales en un entorno colaborativo, con un enfoque “Technology to Market” que convierte tecnologías en productos y servicios, para aumentar la productividad, la competitividad y el crecimiento sostenible del sector AEC.',
    statYears: 'años de actividad',
    statProjects: 'proyectos de I+D',
    statTeam: 'personas en el equipo',
    statAssociates: 'asociados',
    statementCta: 'Conozca BUILT →',

    areasEyebrow: 'Áreas de actuación',
    areasTitle: 'Dos transiciones, una agenda.',
    areasText: 'Nuestra I+D se organiza en Digitalización y Sostenibilidad, en seis líneas temáticas.',
    projectsCount: (n: number) => `${n} ${n === 1 ? 'proyecto' : 'proyectos'}`,

    projectsEyebrow: 'Proyectos',
    projectsTitle: 'Innovación que ya está en obra.',
    projectsText: 'Proyectos nacionales y europeos que llevan la investigación aplicada al interior de empresas y entidades públicas.',
    projectsAll: 'Ver todos →',

    agendaTitle: 'Agenda',
    agendaAll: 'Todos los eventos',
    knowledgeTitle: 'Conocimiento',
    kindInsight: 'Insight',
    kindPodcast: 'Podcast',
    kindNews: 'Noticia',

    partners: 'Asociados y socios',

    ctaTitle: '¿Transformamos su empresa?',
    ctaText: 'Haga el diagnóstico de madurez digital y sostenible en 3 pasos. Nuestro equipo le responderá con un plan a medida.',
    ctaButton: 'Empezar el diagnóstico →',
  },

  pillars: { digital: 'Digitalización', sustainable: 'Sostenibilidad' },

  areas: {
    'bim-and-point-clouds': {
      label: 'BIM y Nubes de Puntos',
      summary: 'Modelado de la información, Scan-to-BIM y repositorios digitales de activos construidos.',
    },
    'automation-and-artificial-intelligence': {
      label: 'Automatización e Inteligencia Artificial',
      summary: 'IA aplicada al proyecto y a la obra: monitorización automática, visión artificial y automatización.',
    },
    'digital-twin-iot': {
      label: 'Digital Twin e IoT',
      summary: 'Gemelos digitales de edificios e infraestructuras, de la red de agua al ferrocarril.',
    },
    'augmented-virtual-reality': {
      label: 'Realidad Aumentada y Virtual',
      summary: 'Entornos inmersivos para proyecto, obra, mantenimiento y formación industrial.',
    },
    'sustainable-buildings-and-cities': {
      label: 'Edificios y Ciudades Sostenibles',
      summary: 'Circularidad, soluciones basadas en la naturaleza y desempeño ambiental del parque edificado.',
    },
    'industry-decarbonization-and-reporting': {
      label: 'Descarbonización y Reporte',
      summary: 'Análisis del ciclo de vida, reporte ESG y descarbonización de la industria de la construcción.',
    },
  },

  technologies: ['BIM', 'Digital Twin', 'Inteligencia Artificial', 'Scan-to-BIM', 'Realidad Aumentada', 'Análisis del Ciclo de Vida', 'Circularidad', 'ESG'],

  projects: {
    title: 'Innovación que ya está en obra.',
    intro:
      'BUILT CoLAB desarrolla su actividad de I+D en dos áreas estratégicas, Digitalización y Sostenibilidad, con proyectos que impulsan la competitividad y la internacionalización del sector AEC.',
    filterLabel: 'Filtrar por área',
    all: 'Todos',
    empty: 'No hay proyectos en esta área',
    eyebrowDetail: 'Proyecto',
    factSheet: 'Ficha del proyecto',
    related: 'Proyectos relacionados',
    relatedAll: 'Todos los proyectos',
  },

  news: {
    eyebrow: 'Comunicación',
    intro: (n: number) => `${n} noticias sobre la actividad de BUILT CoLAB y del sector AEC.`,
    eyebrowDetail: 'Noticia',
    more: 'Más noticias',
    all: 'Todas las noticias',
  },

  insights: {
    eyebrow: 'Conocimiento',
    title: 'BUILT Insights',
    intro: 'Casos de aplicación, artículos y publicaciones sobre la transición digital y ecológica del entorno construido.',
    eyebrowDetail: 'Insight',
    more: 'Más insights',
    all: 'Todos los insights',
  },

  events: {
    eyebrow: 'Agenda y formación',
    title: 'Eventos',
    intro: 'Talleres, conferencias y acciones de formación en BIM, ACV y transición digital para profesionales del sector AEC.',
    show: 'Mostrar',
    upcoming: 'Próximos',
    past: 'Anteriores',
    emptyTitle: 'No hay eventos programados',
    emptyText: 'Siga nuestro boletín para conocer las próximas fechas.',
    eyebrowUpcoming: 'Próximo evento',
    eyebrowPast: 'Evento celebrado',
    info: 'Información',
    date: 'Fecha',
    location: 'Lugar',
    tba: 'Por anunciar',
    joinTitle: '¿Quiere participar?',
    joinText: 'Las inscripciones se indican en el texto. Para cualquier duda, escríbanos.',
    joinButton: 'Contactar',
    others: 'Otros eventos',
    all: 'Toda la agenda',
    pastParam: 'anteriores',
  },

  about: {
    title: 'El Laboratorio Colaborativo para el Entorno Construido del Futuro.',
    intro: 'Impulsamos la transición digital y ecológica de edificios e infraestructuras, haciéndolos adaptables, inteligentes, resilientes y sostenibles.',
    whoEyebrow: 'Quiénes somos',
    whoTitle: 'Technology to Market.',
    whoParagraphs: [
      'BUILT CoLAB desarrolla actividades de investigación, innovación y transferencia de conocimiento para aumentar la productividad, la competitividad y el crecimiento sostenible del ecosistema del sector AEC – Arquitectura, Ingeniería y Construcción.',
      'Se guía por un enfoque “Technology to Market”, elevando la madurez de las tecnologías hasta convertirlas en productos y servicios. Reúne centros de conocimiento, industria y usuarios finales en un entorno colaborativo, en un modelo de creación conjunta.',
      'Trabaja con redes nacionales e internacionales de referencia, como incubadora y demostrador, para reducir el riesgo de la transferencia de conocimiento y tecnología. Su ámbito es el entorno construido en su conjunto: edificios e infraestructuras, incluido el transporte de energía y el ciclo del agua.',
      'Es también el “brazo ejecutor” del Clúster AEC en el desarrollo del conocimiento y la investigación científica, y cuenta con una amplia red de Laboratorios Colaborativos para iniciativas orientadas a misiones: resiliencia, transición digital, transición energética.',
    ],
    agendaEyebrow: 'Agenda de I+D',
    agendaTitle: 'Todo el ciclo de vida del entorno construido, basado en BIM.',
    phase: (n: number) => `Fase ${n}`,
    lifecycle: [
      'Arquitectura y diseño basados en datos',
      'Fabricación y construcción modular',
      'Robotización e impresión 3D',
      'Gemelo digital en fábrica y obra',
      'Gestión y mantenimiento',
      'Deconstrucción y reciclaje',
    ],
    clustersEyebrow: 'Clústeres para la competitividad y la internacionalización',
    clustersTitle: 'Un vínculo estrecho con los clústeres del sector.',
    clustersText:
      'BUILT CoLAB es la entidad que impulsa la modernización tecnológica del Clúster AEC y del Clúster Ferroviario, dos de los clústeres que firmaron el Pacto Sectorial para la Competitividad y la Internacionalización con el Ministerio de Economía y Transición Digital de Portugal.',
    clusters: [
      {
        name: 'Clúster AEC',
        signed: 'Pacto sectorial firmado en marzo de 2019',
        text: 'Plataforma que reúne conocimiento y competencias, con un papel central en la política industrial. Apuesta por la I+D+i y la internacionalización como motores de la competitividad de la arquitectura, la ingeniería y la construcción, fomentando sinergias en toda la cadena de valor.',
      },
      {
        name: 'Clúster Ferroviario',
        signed: 'Pacto sectorial firmado en septiembre de 2019',
        text: 'Refuerza la cooperación entre los actores del sector ferroviario, con una estrategia común de investigación e innovación, proyectos conjuntos de I+D, nuevos negocios y la internacionalización del sector.',
      },
    ],
  },

  team: {
    intro:
      'Centrado en múltiples áreas de actuación, nuestro equipo busca cada día la excelencia, estableciendo alianzas y produciendo investigación aplicada a nuestro día a día.',
    roles: {
      Director: 'Director',
      'Head of Digital Transformation': 'Responsable de Transformación Digital',
      'Head of Sustainability': 'Responsable de Sostenibilidad',
      'AI Researcher': 'Investigadora en IA',
      'BIM Programming Specialist': 'Especialista en Programación BIM',
      'Digital Transition Specialist': 'Especialista en Transición Digital',
      'Standardization Specialist': 'Especialista en Normalización',
      'BIM & AI Programming Specialist': 'Especialista en Programación BIM e IA',
      'BIM & AI Developer': 'Desarrolladora BIM e IA',
      'Digital Twin & IoT Developer': 'Desarrollador de Digital Twin e IoT',
      'Sustainable Urban Planner': 'Urbanista Sostenible',
      'BIM & Standardization Specialist': 'Especialista en BIM y Normalización',
      'Sustainability Specialist': 'Especialista en Sostenibilidad',
      'Programming & Integration Specialist': 'Especialista en Programación e Integración',
      'Virtual and Augmented Reality Specialist': 'Especialista en Realidad Virtual y Aumentada',
      'Full-Stack Developer': 'Desarrollador Full-Stack',
      'AI Developer': 'Desarrollador de IA',
      'Business Developer': 'Desarrollo de Negocio',
      'Project and Finance Manager': 'Gestión de Proyectos y Finanzas',
      'Técnica de Gestão Financeira': 'Técnica de Gestión Financiera',
      'Técnica Administrativa e de Compras': 'Técnica Administrativa y de Compras',
      'Marketing & Communication Officer': 'Responsable de Marketing y Comunicación',
    },
  },

  associates: {
    intro: (n: number) => `${n} entidades – universidades, laboratorios, institutos y empresas constructoras – forman BUILT CoLAB.`,
  },

  governance: {
    bodies: {
      'Mesa da Assembleia Geral': 'Mesa de la Asamblea General',
      'Conselho Fiscal': 'Consejo Fiscal',
      'Conselho de Administração': 'Consejo de Administración',
      'Conselho Consultivo Científico Empresarial': 'Consejo Consultivo Científico y Empresarial',
    },
    positions: {
      Presidente: 'Presidencia',
      'Vice-Presidente': 'Vicepresidencia',
      Secretário: 'Secretaría',
      ROC: 'Auditor de cuentas',
      'Vogal Executivo': 'Vocal ejecutivo',
      'Vogal não Executivo': 'Vocal no ejecutivo',
      Membro: 'Miembro',
    },
  },

  careers: {
    intro: 'Venga a trabajar con nosotros y únase a este equipo.',
    open: 'Vacante abierta',
    pdf: 'Descargar la oferta (PDF)',
    apply: 'Presentar candidatura',
    emptyTitle: 'No hay vacantes abiertas en este momento',
    emptyText: 'Candidaturas espontáneas a',
  },

  podcast: {
    title: 'El podcast de la transición digital en la construcción.',
    intro: (n: number) => `${n} episodios de conversación con invitados sobre BIM, inteligencia artificial, construcción modular, impresión 3D y el futuro del sector AEC.`,
    episode: (n: number) => `Episodio ${n}`,
    listen: 'Escuchar',
    languageNote: 'Los episodios están grabados en portugués.',
  },

  services: {
    eyebrow: 'Servicios · DIGITALbuilt',
    title: 'El European Digital Innovation Hub para el Entorno Construido.',
    intro:
      'DIGITALbuilt une el Clúster AEC, el Clúster de Recursos Minerales y el Clúster Ferroviario para hacer más innovadoras, sostenibles y eficientes a las pymes y a la Administración Pública. Como miembro, BUILT CoLAB presta servicios por debajo del precio de mercado, cofinanciados por el Plan de Recuperación y Resiliencia y la Unión Europea.',
    ctaDiagnostic: 'Empezar por el diagnóstico →',
    ctaTeam: 'Hablar con el equipo',
    scope: (i: number, n: number) => `Ámbito ${i} de ${n}`,
    moreInfo: 'Información e inscripciones',
    groups: [
      {
        name: 'Skills and Training',
        intro: 'Formación en BIM, de básico a avanzado, y apoyo a la implantación; Análisis del Ciclo de Vida, Nature-Based Solutions y programación en el sector AEC.',
        services: [
          { title: 'Formación: BIM – Nivel Introductorio', text: 'Conceptos esenciales y uso básico de la metodología BIM en la gestión de proyectos de construcción.' },
          { title: 'Formación: BIM – Nivel Avanzado', text: 'Uso de herramientas BIM: coordinación de modelos, simulaciones y gestión de datos.' },
          { title: 'Formación: Programación en el sector AEC', text: 'Lenguajes de programación aplicados a la automatización y la integración de soluciones tecnológicas.' },
          { title: 'Implantación BIM', text: 'Transición de las entidades a la metodología BIM, adaptando sus procesos.' },
          { title: 'Formación: ACV – Nivel Introductorio', text: 'Conceptos esenciales del Análisis del Ciclo de Vida y una herramienta digital de ACV.' },
          { title: 'Formación: planificación de Nature-Based Solutions', text: 'Planificación de soluciones basadas en la naturaleza en zonas urbanas, con SIG y herramienta digital.' },
        ],
      },
      {
        name: 'Test Before Invest',
        intro: 'Pruebas de preparación para adoptar BIM, software a medida y gemelos digitales ajustados a las necesidades de cada proyecto.',
        services: [
          {
            title: 'Prueba: metodología BIM y soluciones de digitalización',
            text: 'Experimentar, con especialistas, modelado, coordinación y visualización BIM, nubes de puntos, Digital Twins y soluciones AR/VR.',
          },
          { title: 'Prueba: software de evaluación de impactos ambientales', text: 'Explorar una herramienta de ACV/LCA y cálculo de impactos ambientales antes de decidir invertir.' },
          { title: 'Software a medida hasta MVP', text: 'Desarrollo hasta producto mínimo viable, para comprobar la viabilidad de la solución.' },
          { title: 'Gemelos digitales a medida', text: 'Gemelos digitales para monitorizar y optimizar infraestructuras o proyectos concretos, a la escala del reto.' },
        ],
      },
      {
        name: 'Diagnóstico de Madurez Digital',
        intro: 'Identificación de oportunidades de mejora, con propuestas para aumentar la eficiencia, reducir costes y optimizar la competitividad.',
        services: [
          {
            title: 'Evaluación de madurez digital',
            text: 'Obligatoria para acceder a las condiciones cofinanciadas; es el primer paso para todos los servicios.',
          },
        ],
      },
    ],
    accessTitle: '¿Cómo acceder a estos servicios?',
    accessText: 'Su organización debe cumplir algunos requisitos y realizar una evaluación de madurez digital. Empiece por el diagnóstico y nosotros nos ocupamos del resto.',
  },

  contact: {
    title: 'Hablemos.',
    intro: '¿Una duda, una colaboración o un reto de su empresa? Escríbanos.',
    general: 'General',
    formTitle: 'Envíenos un mensaje',
    name: 'Nombre',
    email: 'Correo electrónico',
    company: 'Organización',
    subject: 'Asunto',
    message: 'Mensaje',
    consent: 'Al enviar, acepta nuestra política de privacidad.',
    submit: 'Preparar mensaje →',
    mailSubject: (who: string) => `Contacto desde la web – ${who}`,
  },

  sent: {
    title: 'Solo falta un clic.',
    text: 'Hemos preparado el mensaje con sus respuestas. Ábralo en su correo y envíelo a',
    open: 'Abrir en el correo →',
    back: 'Volver a editar',
  },

  diagnostic: {
    eyebrow: 'Diagnóstico gratuito',
    title: 'Impulse la transformación digital y sostenible de su empresa.',
    intro: 'Tres pasos, dos minutos. El equipo de BUILT CoLAB analiza sus respuestas y le propone un camino a medida.',
    steps: ['Su empresa', 'Retos', 'Contacto'],
    stepsLabel: 'Pasos',
    company: 'Empresa',
    size: 'Tamaño de la empresa (personas)',
    sizes: ['1 a 10', '11 a 50', '51 a 100', 'Más de 100'],
    area: 'Área de intervención',
    areas: ['Digitalización', 'Sostenibilidad'],
    digital: 'Retos actuales de digitalización',
    digitalOptions: ['Digitalización', 'Mejora de la eficiencia', 'Creación de nuevos negocios', 'Internacionalización', 'Competitividad'],
    sustainable: 'Retos actuales de sostenibilidad',
    sustainableOptions: ['Implantación de ESG', 'Evaluación de impactos', 'Ecodiseño', 'Introducción de principios de circularidad'],
    notes: 'Notas',
    notesPlaceholder: 'Cuéntenos el contexto, si lo desea.',
    name: 'Nombre',
    email: 'Correo electrónico',
    phone: 'Teléfono',
    consent: 'Al continuar, acepta nuestra política de privacidad.',
    back: '← Volver',
    continue: 'Continuar →',
    finish: 'Finalizar →',
    mailSubject: (company: string) => `Diagnóstico de madurez – ${company}`,
  },

  cms: { eyebrowLegal: 'Avisos legales' },

  notFound: {
    title: 'Página no encontrada',
    text: 'Es posible que la página que busca haya cambiado de dirección o ya no exista.',
    home: 'Volver al inicio',
    projects: 'Ver proyectos',
  },

  locations: {
    'On-line': 'En línea',
    'On-Line': 'En línea',
    Online: 'En línea',
    'Evento Virtual': 'Evento virtual',
    'Centro de Congressos do CCB - Lisboa': 'Centro de Congresos del CCB – Lisboa',
    'Porto - ANJE | Lisboa - Sede da OE': 'Oporto – ANJE | Lisboa – Sede de la OE',
    'Sede da OERN - Porto': 'Sede de la OERN – Oporto',
    'Auditório Mariano Gago - Pavilhão do Conhecimento | Lisboa': 'Auditorio Mariano Gago – Pavilhão do Conhecimento | Lisboa',
    'Auditório do IMPIC | Lisboa': 'Auditorio del IMPIC | Lisboa',
    'Lisboa | Auditório do LNEC': 'Lisboa | Auditorio del LNEC',
    'Porto | Auditório da AICCOPN': 'Oporto | Auditorio de la AICCOPN',
    'AICCOPN - Porto': 'AICCOPN – Oporto',
    'Alfândega do Porto': 'Alfândega de Oporto',
    'Leiria | Auditório da NERLEI': 'Leiria | Auditorio de NERLEI',
    'Leiria | Auditório Serviços Centrais IP Leiria': 'Leiria | Auditorio de los Servicios Centrales del IP Leiria',
  },
}

export default es
