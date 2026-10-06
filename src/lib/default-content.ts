export const DEFAULT_SITE_SETTINGS = {
  siteTitle: 'Lumen Yoga | Kinderyoga, peuteryoga en ouder-kindyoga in Schagen',
  metaDescription:
    'Kinderyoga, peuteryoga en ouder-kindyoga in Schagen voor kinderen van 2 tot en met 12 jaar. Geef kinderen de tools waar ze de rest van hun leven profijt van hebben.',
  favicon: {
    url: 'https://res.cloudinary.com/strootmann/image/upload/v1708871727/lumen-yoga/Favicon_32x32_e6ei0q.svg',
    alt: 'Lumen Yoga favicon',
    width: 32,
    height: 32,
  },
  socialImage: {
    url: 'https://res.cloudinary.com/strootmann/image/upload/v1708871503/lumen-yoga/Handen_omhoog_4k_k12f9g.jpg',
    alt: 'Kinderyoga bij Lumen Yoga',
    width: 3840,
    height: 2355,
  },
} as const

export const DEFAULT_HEADER = {
  logo: {
    url: '/images/logo-vol.svg',
    alt: 'Lumen Yoga logo',
    width: 667,
    height: 430,
  },
  instagramUrl: 'https://www.instagram.com/lumen.yoga/',
  facebookUrl: 'https://www.facebook.com/profile.php?id=100091839270911',
  primaryCTA: {
    label: 'Aanmelden',
    url: '/aanmelden/kinderyoga',
  },
  navItems: [
    { label: 'Home', link: '/' },
    { label: 'Recensies', link: '#recensies' },
    { label: 'Kinderyoga', link: '#kinderyoga' },
    { label: 'Over mij', link: '#over-mij' },
    { label: 'Ons aanbod', link: '#aanbod' },
    { label: 'Contact', link: '#contact' },
  ],
} as const

export const DEFAULT_FOOTER = {
  logo: DEFAULT_HEADER.logo,
  navItems: DEFAULT_HEADER.navItems,
  instagramUrl: DEFAULT_HEADER.instagramUrl,
  facebookUrl: DEFAULT_HEADER.facebookUrl,
  termsUrl:
    'https://drive.google.com/file/d/1jyNU2_TVlmN6UK_pNmRDR6kcUKdguYuu/view?ts=673ce9e5',
  creditLabel: 'Mann Digital',
  creditUrl: 'https://www.linkedin.com/in/max-strootmann/',
  schoolOffer: {
    text: 'Werk je op een basisschool of kinderopvang? Ik bied een lespakket op maat.',
    linkLabel: 'Bekijk hier alle info',
    url: '/scholen-en-kinderopvang',
  },
} as const

export const DEFAULT_HOME = {
  hero: {
    image: {
      url: '/images/handen-omhoog',
      alt: 'Handen omhoog',
      width: 3840,
      height: 2355,
    },
    title: 'Kinder- en peuteryoga in Schagen',
    locationLabel: 'YPHS Huis, Zijperweg 9, 1742 NE Schagen',
    locationUrl: 'https://maps.google.com/?q=YPHS+Huis,+Zijperweg+9,+1742+NE+Schagen',
    description:
      'Laat kinderen kennismaken met yoga, meditatie en mindfulness. Geef kinderen de tools waar ze de rest van hun leven profijt van hebben.',
    primaryCTA: {
      label: 'Aanmelden',
      url: '/aanmelden/kinderyoga',
    },
    secondaryCTA: {
      label: 'Meer info',
      url: '#kinderyoga',
    },
    quote: '“Eerst had ik stress en nu voel ik me helemaal rustig”',
    accentImage: {
      url: '/images/halve-zon.svg',
      alt: 'Halve zon',
      width: 239,
      height: 342,
    },
  },
  intro: {
    image: {
      url: '/images/masseren',
      alt: 'Masseren',
      width: 2800,
      height: 5280,
    },
    quote: 'Yoga! Het beste van de hele dag!',
  },
  offers: {
    sectionTitle: 'Ons aanbod',
    items: [
      {
        color: 'yellow',
        title: 'Ouder-kindyoga\n4 t/m 12 jaar',
        time: '10.30 - 11.30 uur',
        body:
          'Op de laatste zaterdag van elke schoolvakantie\n\nLocatie: YPHS Huis / Zijperweg 9 / Schagen\n\nTarief: €20 per ouder-kindduo\nMet z’n vieren? Betaal samen slechts €30!',
        buttonLabel: 'Aanmelden',
        buttonUrl:
          '/aanmelden/ouder-kindyoga?groep=kinderen',
      },
      {
        color: 'blue',
        title: 'Ouder-kind peuteryoga\n2 t/m 4 jaar',
        time: '9.30 - 10.15 uur',
        body:
          'Op de laatste zaterdag van elke schoolvakantie\n\nLocatie: YPHS Huis / Zijperweg 9 / Schagen\n\nTarief: €20 per ouder-kindduo\nMet z’n vieren? Betaal samen slechts €30!',
        buttonLabel: 'Aanmelden',
        buttonUrl: '/aanmelden/ouder-kindyoga?groep=peuters',
      },
      {
        color: 'magenta',
        title: 'Kinderyoga\n4 t/m 12 jaar',
        time: '15.45 - 16.45 uur',
        body:
          'Elke woensdagmiddag\n\nVoorlopig één groep. Bij meer aanmeldingen splitsen we weer in 4 t/m 7 en 8 t/m 12 jaar.\n\nLocatie: YPHS Huis / Zijperweg 9 / Schagen\n\nTarief: vanaf €9,50 per les',
        buttonLabel: 'Aanmelden',
        buttonUrl:
          '/aanmelden/kinderyoga',
      },
      {
        color: 'green',
        title: 'Kinderyoga op locatie',
        time: 'op aanvraag',
        body: 'Voor school, kinderopvang, bibliotheek, boekhandel of kinderfeestje',
        buttonLabel: 'Meer info',
        buttonUrl:
          '/aanmelden/workshop',
      },
    ],
  },
  about: {
    image: {
      url: '/images/ellen-binnen',
      alt: 'Ellen Wissink',
      width: 1920,
      height: 2664,
    },
    heading: 'Welkom bij Lumen Yoga!',
    paragraphs: [
      {
        text: 'Ik ben Ellen Wissink, trotse eigenaar van Lumen Yoga in het gezellige Schagen.',
      },
      {
        text: 'Yoga heeft mijn leven veranderd. Het heeft me geleerd om zachter voor mezelf te zijn en mijn innerlijke kracht te omarmen. Waar ik voorheen worstelde met strenge verwachtingen en een kritische stem, vind ik nu rust en balans.',
      },
      {
        text: 'Steeds vaker vroeg ik me af waarom ik deze belangrijke vaardigheden niet als kind had geleerd. Wat als we kinderen al vroeg deze waardevolle tools bijbrengen?',
      },
      {
        text: 'Kinderen kunnen al heel jong beginnen met korte oefeningen: samen diep ademhalen, bewegen als een dier en voor het slapengaan een massageverhaal. Daarom geef ik nu ook yoga voor peuters, samen met papa, mama, opa of oma.',
      },
      {
        text: 'Sinds 2016 werk ik op de Burgemeester de Wildeschool (cluster 2-onderwijs). Daarvoor werkte ik vijf jaar in de buitenschoolse opvang. In 2023 volgde ik de opleiding Schoolverlichting bij De Nieuwe Yogaschool, en daarmee begon Lumen Yoga. In 2026 rondde ik de kinderyoga-opleiding van Helen Purperhart af, bij de Kinderyoga Academie. Mijn missie: kinderen leren zichzelf te waarderen en hun eigen kwaliteiten te ontdekken.',
      },
      {
        text: 'Ik droom ervan dat yoga een vast onderdeel wordt van de kinderopvang en de basisschool, zodat elk kind de kans krijgt om dit te leren.',
      },
    ],
    certification: {
      title: 'Gecertificeerd kinderyogadocent',
      issuer: 'Kinderyoga Academie · Helen Purperhart',
      url: 'https://kinderyoga.nl/opleiding/',
      seal: {
        url: '/images/keurmerk-kinderyoga-academie.png',
        alt: 'Keurmerk Kinderyoga Academie, Helen Purperhart gecertificeerd',
      },
    },
    instagramLabel: 'Volg ons op Instagram',
    instagramUrl: 'https://www.instagram.com/lumen.yoga/',
  },
  kinderyoga: {
    logo: {
      url: '/images/logo-type.svg',
      alt: 'Lumen Yoga',
      width: 667,
      height: 122,
    },
    sideImage: {
      url: '/images/krijgers',
      alt: 'Krijgers',
      width: 2000,
      height: 2793,
    },
    mobileImage: {
      url: '/images/krijgers-cropped',
      alt: 'Krijgers',
      width: 1500,
      height: 3000,
    },
    mobileQuote: 'Wat een fijne les, mijn hoofd is helemaal leeg!',
    sections: [
      {
        heading: 'Yoga, meditatie en mindfulness',
        paragraphs: [
          {
            text: 'Yoga helpt kinderen om rust te voelen in hun lijf en in hun hoofd. Stilzitten hoeft niet: eerst bewegen, springen en dansen we, daarna komt de rust vanzelf. Omdat kinderen de oefeningen met aandacht doen, leren ze zich beter te concentreren. Het geeft zelfvertrouwen, lichaamsbesef en verbinding met zichzelf en met anderen.',
          },
        ],
      },
      {
        heading: 'Waarom kiezen voor kinderyoga?',
        paragraphs: [
          {
            text: 'Kinderyoga geeft kinderen een fijne balans tussen bewegen en ontspannen. In de lessen oefenen we spelenderwijs met yogahoudingen, ademhaling, korte meditaties en een massage op de rug om respectvol te leren omgaan met grenzen en wensen.',
          },
          {
            text: 'De lessen dragen bij aan meer zelfvertrouwen, concentratie en emotionele balans. We besteden aandacht aan thema’s zoals omgaan met spanning, samenwerken, complimenten geven, emoties herkennen en jezelf waarderen.',
          },
          {
            text: 'Niet elk kind houdt van voetbal, hockey of turnen. Bij kinderyoga beweegt je kind op eigen tempo, zonder winnen of prestatiedruk.',
          },
        ],
      },
      {
        heading: 'Peuteryoga: samen ontdekken',
        paragraphs: [
          {
            text: 'Peuters leren door te doen en na te doen. In de peuteryoga bewegen we als dieren, zingen we liedjes en spelen we korte verhaaltjes na. Jij doet als ouder, opa of oma gezellig mee. Het helpt bij de motorische ontwikkeling, de concentratie, de fantasie en het zelfvertrouwen. En het is vooral een moment met alle aandacht voor elkaar.',
          },
        ],
      },
      {
        heading: 'Ouder-kindyoga: lol en verbinding',
        paragraphs: [
          {
            text: 'Tijdens ouder-kindyoga neem je samen de tijd om te bewegen, ontspannen en plezier te maken. Het draait niet om prestatie, maar om verbinding. Met speelse oefeningen, ademhaling en ontspanning leer je je kind én jezelf beter kennen. Een waardevol moment om te lachen, knuffelen en samen te zijn in de drukte van alledag.',
          },
          {
            text: 'Er zijn groepen voor peuters (2 t/m 4 jaar) en voor kinderen (4 t/m 12 jaar), op de laatste zaterdag van elke schoolvakantie. Op één maandagochtend per maand kun je ook terecht bij Toetie & Bo.',
          },
        ],
      },
    ],
  },
  reviews: {
    heading: 'Klanten aan het woord',
  },
  contact: {
    heading: 'Persoonlijk & vrijblijvend kennismaken?',
    email: 'ellen@lumenyoga.nl',
    phone: '+31 6 30 14 14 08',
    locationLabel: 'YPHS Huis, Zijperweg 9, 1742 NE Schagen',
    locationUrl:
      'https://www.google.com/maps/dir//Zijperweg+9,+1742+NE+Schagen/@52.7899589,4.7032031,12z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x47cf4fb00e26744b:0xb6bf74e88712983f!2m2!1d4.7856595!2d52.7900205?entry=ttu',
  },
} as const

export const DEFAULT_SEED_MEDIA = [
  DEFAULT_SITE_SETTINGS.favicon,
  DEFAULT_SITE_SETTINGS.socialImage,
  DEFAULT_HEADER.logo,
  DEFAULT_HOME.hero.image,
  DEFAULT_HOME.hero.accentImage,
  DEFAULT_HOME.intro.image,
  DEFAULT_HOME.about.image,
  DEFAULT_HOME.kinderyoga.logo,
  DEFAULT_HOME.kinderyoga.sideImage,
  DEFAULT_HOME.kinderyoga.mobileImage,
] as const
