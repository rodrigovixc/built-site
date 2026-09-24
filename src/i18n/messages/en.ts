import type { Messages } from './pt'

const en: Messages = {
  meta: {
    title: 'BUILT CoLAB – The Built Environment of the Future',
    description: 'BUILT CoLAB – Collaborative Laboratory for the Built Environment of the Future. Digital and green transition of buildings and infrastructure.',
  },

  common: {
    home: 'Home',
    readMore: 'Read more',
    seeProject: 'View project',
    seeAll: 'See all',
    loading: 'Loading',
    skipToContent: 'Skip to content',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    menu: 'Menu',
    mainNav: 'Main',
    breadcrumb: 'Breadcrumb',
    pagination: 'Pagination',
    previous: '← Previous',
    next: 'Next →',
    locationTba: 'Venue to be announced',
    contactUs: 'Contact us',
    language: 'Language',
    logoHome: 'BUILT CoLAB – home page',
    published: 'Published',
    updated: 'Updated',
    fallbackNotice: 'This content is not yet available in English. We are showing the original Portuguese version.',
    machineNotice: 'This text was translated automatically from Portuguese.',
  },

  routes: {
    about: 'About us',
    team: 'Team',
    associates: 'Associates',
    governance: 'Governing bodies',
    careers: 'Careers',
    projects: 'Projects',
    news: 'News',
    events: 'Events and training',
    insights: 'Insights',
    podcast: 'TechOnBuilt podcast',
    services: 'Services',
    contact: 'Contact',
    diagnostic: 'Diagnostic',
    areas: 'Research areas',
    whoWeAre: 'Who we are',
    agenda: 'Events',
  },

  menu: {
    groupAbout: 'About BUILT',
    groupPlatforms: 'Platforms',
    groupContact: 'Contact',
    digitalbuilt: 'DIGITALbuilt · EDIH',
    research: 'BUILT Research',
    circularity: 'Circularity in construction',
    cities: 'Porto · Lisbon',
  },

  footer: {
    tagline: 'Collaborative Laboratory for the Built Environment of the Future.',
    explore: 'Explore',
    legal: 'Legal notices',
    newsletter: 'Newsletter',
    newsletterText: 'Subscribe and stay up to date with all our news.',
    newsletterConsent: 'By subscribing, you accept our',
    privacyPolicy: 'privacy policy',
    rights: 'Digital Built Environment. All rights reserved.',
    email: 'Email',
    emailPlaceholder: 'your email',
    thanks: 'Thank you! You will receive our next updates.',
  },

  legal: {
    terms: 'Terms and conditions',
    privacy: 'Privacy policy',
    equality: 'Gender equality plan',
    funded: 'Funded projects',
    info: 'Legal information',
  },

  offices: {
    porto: 'Porto – Head office',
    lisbon: 'Lisbon – EngineersHub',
  },

  home: {
    heroEyebrow: 'Collaborative laboratory · AEC sector',
    heroLine1: 'Building',
    heroLine2: 'the',
    heroAccent: 'future',
    heroSubtitle: 'The digital and green transition of the built environment',
    heroText: 'Applied research, services and training for adaptable, intelligent, resilient and sustainable buildings and infrastructure.',
    heroCta: 'Free diagnostic →',
    heroSecondary: 'See projects',

    servicesEyebrow: 'Our services',
    servicesTitle: 'From research to the construction site.',
    servicesText:
      'As a member of DIGITALbuilt, the European Digital Innovation Hub for the built environment, we bring innovation to SMEs and public administration at prices co-funded by the Recovery and Resilience Plan and the European Union.',
    services: [
      {
        title: 'Skills & Training',
        text: 'Training in BIM, from basic to advanced, Life Cycle Assessment, Nature-Based Solutions and programming for the AEC sector.',
        cta: 'See training',
      },
      {
        title: 'Test Before Invest',
        text: 'BIM readiness tests, custom software up to MVP and digital twins tailored to each project, before you invest.',
        cta: 'Learn more',
      },
      {
        title: 'Digital Maturity Assessment',
        text: 'We identify opportunities for improvement, with strategies to gain efficiency, cut costs and compete better.',
        cta: 'Take the diagnostic',
      },
    ],

    statementLine1: 'Collaborative',
    statementLine2: 'laboratory',
    statementLine3: 'for the built',
    statementLine4: 'environment',
    statementTitle: 'Bringing science and industry together.',
    statementText:
      'BUILT CoLAB brings together knowledge centres, industry and end users in a collaborative environment, with a “Technology to Market” approach that turns technologies into products and services, to raise the productivity, competitiveness and sustainable growth of the AEC sector.',
    statYears: 'years of activity',
    statProjects: 'R&D projects',
    statTeam: 'team members',
    statAssociates: 'associates',
    statementCta: 'Discover BUILT →',

    areasEyebrow: 'Research areas',
    areasTitle: 'Two transitions, one agenda.',
    areasText: 'Our R&D is organised into Digitalisation and Sustainability, across six thematic lines.',
    projectsCount: (n: number) => `${n} ${n === 1 ? 'project' : 'projects'}`,

    projectsEyebrow: 'Projects',
    projectsTitle: 'Innovation already on site.',
    projectsText: 'National and European projects that take applied research into companies and public bodies.',
    projectsAll: 'See all →',

    agendaTitle: 'Events',
    agendaAll: 'All events',
    knowledgeTitle: 'Knowledge',
    kindInsight: 'Insight',
    kindPodcast: 'Podcast',
    kindNews: 'News',

    partners: 'Associates and partners',

    ctaTitle: 'Ready to transform your company?',
    ctaText: 'Take the digital and sustainability maturity diagnostic in 3 steps. Our team will reply with a tailored plan.',
    ctaButton: 'Start the diagnostic →',
  },

  pillars: { digital: 'Digitalisation', sustainable: 'Sustainability' },

  areas: {
    'bim-and-point-clouds': {
      label: 'BIM & Point Clouds',
      summary: 'Information modelling, Scan-to-BIM and digital repositories of built assets.',
    },
    'automation-and-artificial-intelligence': {
      label: 'Automation & Artificial Intelligence',
      summary: 'AI applied to design and construction: automated monitoring, computer vision and automation.',
    },
    'digital-twin-iot': {
      label: 'Digital Twin & IoT',
      summary: 'Digital twins of buildings and infrastructure, from water networks to railways.',
    },
    'augmented-virtual-reality': {
      label: 'Augmented & Virtual Reality',
      summary: 'Immersive environments for design, construction, maintenance and industrial training.',
    },
    'sustainable-buildings-and-cities': {
      label: 'Sustainable Buildings & Cities',
      summary: 'Circularity, nature-based solutions and the environmental performance of the built stock.',
    },
    'industry-decarbonization-and-reporting': {
      label: 'Decarbonisation & Reporting',
      summary: 'Life cycle assessment, ESG reporting and the decarbonisation of the construction industry.',
    },
  },

  technologies: ['BIM', 'Digital Twin', 'Artificial Intelligence', 'Scan-to-BIM', 'Augmented Reality', 'Life Cycle Assessment', 'Circularity', 'ESG'],

  projects: {
    title: 'Innovation already on site.',
    intro:
      'BUILT CoLAB carries out its R&D in two strategic areas, Digitalisation and Sustainability, with projects that promote the competitiveness and internationalisation of the AEC sector.',
    filterLabel: 'Filter by area',
    all: 'All',
    empty: 'No projects in this area',
    eyebrowDetail: 'Project',
    factSheet: 'Project fact sheet',
    related: 'Related projects',
    relatedAll: 'All projects',
  },

  news: {
    eyebrow: 'Communication',
    intro: (n: number) => `${n} news stories about BUILT CoLAB and the AEC sector.`,
    eyebrowDetail: 'News',
    more: 'More news',
    all: 'All news',
  },

  insights: {
    eyebrow: 'Knowledge',
    title: 'BUILT Insights',
    intro: 'Use cases, articles and publications on the digital and green transition of the built environment.',
    eyebrowDetail: 'Insight',
    more: 'More insights',
    all: 'All insights',
  },

  events: {
    eyebrow: 'Events and training',
    title: 'Events',
    intro: 'Workshops, conferences and training in BIM, LCA and digital transition for AEC professionals.',
    show: 'Show',
    upcoming: 'Upcoming',
    past: 'Past',
    emptyTitle: 'No events scheduled',
    emptyText: 'Follow our newsletter to hear about upcoming dates.',
    eyebrowUpcoming: 'Upcoming event',
    eyebrowPast: 'Past event',
    info: 'Details',
    date: 'Date',
    location: 'Venue',
    tba: 'To be announced',
    joinTitle: 'Want to take part?',
    joinText: 'Registration details are in the text. For any questions, write to us.',
    joinButton: 'Get in touch',
    others: 'Other events',
    all: 'All events',
    pastParam: 'past',
  },

  about: {
    title: 'The Collaborative Laboratory for the Built Environment of the Future.',
    intro: 'We promote the digital and green transition of buildings and infrastructure, making them adaptable, intelligent, resilient and sustainable.',
    whoEyebrow: 'Who we are',
    whoTitle: 'Technology to Market.',
    whoParagraphs: [
      'BUILT CoLAB carries out research, innovation and knowledge transfer to increase the productivity, competitiveness and sustainable growth of the AEC – Architecture, Engineering and Construction – ecosystem.',
      'It follows a “Technology to Market” approach, raising the maturity of technologies into products and services. It brings together knowledge centres, industry and end users in a collaborative environment, in a model of shared creation.',
      'It works with leading national and international networks, acting as an incubator and demonstrator to lower the risk of knowledge and technology transfer. Its scope is the built environment as a whole: buildings and infrastructure, including energy transmission and the water cycle.',
      'It is also the “operational arm” of the AEC Cluster for knowledge development and scientific research, and benefits from a wide network of Collaborative Laboratories for mission-oriented initiatives: resilience, digital transition, energy transition.',
    ],
    agendaEyebrow: 'R&D agenda',
    agendaTitle: 'The whole life cycle of the built environment, built on BIM.',
    phase: (n: number) => `Phase ${n}`,
    lifecycle: [
      'Data-driven architecture and design',
      'Manufacturing and modular construction',
      'Robotics and 3D printing',
      'Digital twins in factory and on site',
      'Operation and maintenance',
      'Deconstruction and recycling',
    ],
    clustersEyebrow: 'Clusters for competitiveness and internationalisation',
    clustersTitle: 'A close bond with the sector’s clusters.',
    clustersText:
      'BUILT CoLAB drives the technological modernisation of the AEC Cluster and the Railway Cluster, two of the clusters that signed the Sectoral Pact for Competitiveness and Internationalisation with the Ministry of Economy and Digital Transition.',
    clusters: [
      {
        name: 'AEC Cluster',
        signed: 'Sectoral pact signed in March 2019',
        text: 'A platform that brings together knowledge and skills, with a central role in industrial policy. It bets on R&D&I and internationalisation as drivers of competitiveness in architecture, engineering and construction, fostering synergies across the value chain.',
      },
      {
        name: 'Railway Cluster',
        signed: 'Sectoral pact signed in September 2019',
        text: 'Strengthens cooperation between railway stakeholders, with a common research and innovation strategy, joint R&D projects, new business and the internationalisation of the sector.',
      },
    ],
  },

  team: {
    intro:
      'Working across many areas, our team strives for excellence every day, building partnerships and producing research applied to everyday life.',
    roles: {
      Director: 'Director',
      'Técnica de Gestão Financeira': 'Financial Management Officer',
      'Técnica Administrativa e de Compras': 'Administrative and Procurement Officer',
    },
  },

  associates: {
    intro: (n: number) => `${n} organisations – universities, laboratories, institutes and construction companies – make up BUILT CoLAB.`,
  },

  governance: {
    bodies: {
      'Mesa da Assembleia Geral': 'Board of the General Assembly',
      'Conselho Fiscal': 'Supervisory Board',
      'Conselho de Administração': 'Board of Directors',
      'Conselho Consultivo Científico Empresarial': 'Scientific and Business Advisory Board',
    },
    positions: {
      Presidente: 'Chair',
      'Vice-Presidente': 'Vice-Chair',
      Secretário: 'Secretary',
      ROC: 'Statutory Auditor',
      'Vogal Executivo': 'Executive Member',
      'Vogal não Executivo': 'Non-Executive Member',
      Membro: 'Member',
    },
  },

  careers: {
    intro: 'Come and work with us – join this team.',
    open: 'Open position',
    pdf: 'Download job description (PDF)',
    apply: 'Apply',
    emptyTitle: 'No open positions at the moment',
    emptyText: 'Send spontaneous applications to',
  },

  podcast: {
    title: 'The podcast on digital transition in construction.',
    intro: (n: number) => `${n} episodes of conversation with guests about BIM, artificial intelligence, modular construction, 3D printing and the future of the AEC sector.`,
    episode: (n: number) => `Episode ${n}`,
    listen: 'Listen',
    languageNote: 'The episodes are recorded in Portuguese.',
  },

  services: {
    eyebrow: 'Services · DIGITALbuilt',
    title: 'The European Digital Innovation Hub for the Built Environment.',
    intro:
      'DIGITALbuilt unites the AEC Cluster, the Mineral Resources Cluster and the Railway Cluster to make SMEs and public administration more innovative, sustainable and efficient. As a member, BUILT CoLAB provides services below market prices, co-funded by the Recovery and Resilience Plan and the European Union.',
    ctaDiagnostic: 'Start with the diagnostic →',
    ctaTeam: 'Talk to the team',
    scope: (i: number, n: number) => `Scope ${i} of ${n}`,
    moreInfo: 'Details and registration',
    groups: [
      {
        name: 'Skills and Training',
        intro: 'BIM training, from basic to advanced, and implementation support; Life Cycle Assessment, Nature-Based Solutions and programming for the AEC sector.',
        services: [
          { title: 'Training: BIM – Introductory Level', text: 'Essential concepts and basic use of BIM in construction project management.' },
          { title: 'Training: BIM – Advanced Level', text: 'Using BIM tools: model coordination, simulation and data management.' },
          { title: 'Training: Programming for the AEC sector', text: 'Programming languages applied to automation and the integration of technology solutions.' },
          { title: 'BIM implementation', text: 'Moving organisations to BIM, adapting their processes along the way.' },
          { title: 'Training: LCA – Introductory Level', text: 'Essential concepts of Life Cycle Assessment and a digital LCA tool.' },
          { title: 'Training: planning Nature-Based Solutions', text: 'Planning nature-based solutions in urban areas, with GIS and a digital tool.' },
        ],
      },
      {
        name: 'Test Before Invest',
        intro: 'BIM adoption readiness tests, custom software and digital twins tailored to the needs of each project.',
        services: [
          {
            title: 'Test: BIM methodology and digitalisation solutions',
            text: 'Try out, with experts, BIM modelling, coordination and visualisation, point clouds, Digital Twins and AR/VR solutions.',
          },
          { title: 'Test: environmental impact assessment software', text: 'Explore an LCA tool and environmental impact calculation before deciding to invest.' },
          { title: 'Custom software up to MVP', text: 'Development up to a minimum viable product, to test whether the solution is viable.' },
          { title: 'Tailor-made digital twins', text: 'Digital twins to monitor and optimise specific infrastructure or projects, at the scale of the challenge.' },
        ],
      },
      {
        name: 'Digital Maturity Assessment',
        intro: 'Identifying opportunities for improvement, with proposals to increase efficiency, reduce costs and boost competitiveness.',
        services: [
          {
            title: 'Digital maturity assessment',
            text: 'Required to access the co-funded conditions; it is the first step for every service.',
          },
        ],
      },
    ],
    accessTitle: 'How to access these services?',
    accessText: 'Your organisation must meet a few requirements and complete a digital maturity assessment. Start with the diagnostic and we will take care of the rest.',
  },

  contact: {
    title: 'Let’s talk.',
    intro: 'A question, a partnership or a challenge in your company? Write to us.',
    general: 'General',
    formTitle: 'Send us a message',
    name: 'Name',
    email: 'Email',
    company: 'Organisation',
    subject: 'Subject',
    message: 'Message',
    consent: 'By sending, you agree to our privacy policy.',
    submit: 'Prepare message →',
    mailSubject: (who: string) => `Website enquiry – ${who}`,
  },

  sent: {
    title: 'One more click.',
    text: 'We have prepared the message with your answers. Open it in your email and send it to',
    open: 'Open in email →',
    back: 'Back to editing',
  },

  diagnostic: {
    eyebrow: 'Free diagnostic',
    title: 'Drive the digital and sustainable transformation of your company.',
    intro: 'Three steps, two minutes. The BUILT CoLAB team reviews your answers and proposes a tailored path.',
    steps: ['Your company', 'Challenges', 'Contact'],
    stepsLabel: 'Steps',
    company: 'Company',
    size: 'Company size (people)',
    sizes: ['1 to 10', '11 to 50', '51 to 100', '101+'],
    area: 'Area of intervention',
    areas: ['Digitalisation', 'Sustainability'],
    digital: 'Current digitalisation challenges',
    digitalOptions: ['Digitalisation', 'Efficiency improvement', 'New business creation', 'Internationalisation', 'Competitiveness'],
    sustainable: 'Current sustainability challenges',
    sustainableOptions: ['ESG implementation', 'Impact assessment', 'Eco-design', 'Introducing circularity principles'],
    notes: 'Notes',
    notesPlaceholder: 'Tell us about the context, if you like.',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    consent: 'By continuing, you agree to our privacy policy.',
    back: '← Back',
    continue: 'Continue →',
    finish: 'Finish →',
    mailSubject: (company: string) => `Maturity diagnostic – ${company}`,
  },

  cms: { eyebrowLegal: 'Legal notices' },

  notFound: {
    title: 'Page not found',
    text: 'The page you are looking for may have moved or no longer exists.',
    home: 'Back to home',
    projects: 'See projects',
  },

  locations: {
    'On-line': 'Online',
    'On-Line': 'Online',
    Online: 'Online',
    Lisboa: 'Lisbon',
    'Evento Virtual': 'Virtual event',
    'Centro de Congressos do CCB - Lisboa': 'CCB Congress Centre – Lisbon',
    'Porto - ANJE | Lisboa - Sede da OE': 'Porto – ANJE | Lisbon – OE headquarters',
    'Sede da OERN - Porto': 'OERN headquarters – Porto',
    'Auditório Mariano Gago - Pavilhão do Conhecimento | Lisboa': 'Mariano Gago Auditorium – Pavilhão do Conhecimento | Lisbon',
    'Auditório do IMPIC | Lisboa': 'IMPIC Auditorium | Lisbon',
    'Lisboa | Auditório do LNEC': 'Lisbon | LNEC Auditorium',
    'Porto | Auditório da AICCOPN': 'Porto | AICCOPN Auditorium',
    'Leiria | Auditório da NERLEI': 'Leiria | NERLEI Auditorium',
    'Leiria | Auditório Serviços Centrais IP Leiria': 'Leiria | IP Leiria Central Services Auditorium',
  },
}

export default en
