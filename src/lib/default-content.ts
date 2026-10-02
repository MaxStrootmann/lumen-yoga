export const DEFAULT_SITE_SETTINGS = {
  siteTitle: 'Lumen Yoga | yoga, meditatie & mindfulness voor kinderen',
  metaDescription:
    'Laat kinderen kennis maken met yoga, meditatie en mindfulness. Geef kinderen de tools waar ze de rest van hun leven profijt van hebben.',
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
    text: 'Ben je een basisschool? Ik bied hiervoor een lespakket aan op maat.',
    linkLabel: 'Bekijk hier alle info',
    url: 'https://drive.google.com/open?id=1cTG3qLlsL_BKrcSjEv3FPumj3G1yQHBqSLzid2KP-vw',
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
    title: 'Kinderyoga in Schagen',
    locationLabel: 'YPHS Huis, Zijperweg 9, 1742 NE Schagen',
    locationUrl: 'https://maps.google.com/?q=YPHS+Huis,+Zijperweg+9,+1742+NE+Schagen',
    description:
      'Laat kinderen kennis maken met yoga, meditatie en mindfulness. Geef kinderen de tools waar ze de rest van hun leven profijt van hebben.',
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
        title: 'Ouder-kind yoga',
        time: '10.30 - 11.30 uur',
        body:
          'Op de laatste zaterdag van elke schoolvakantie\n\nLocatie: YPHS Huis / Zijperweg 9 / Schagen\n\nActietarief: €20 per ouder-kind duo\nMet z’n vieren? Betaal samen slechts €30!',
        buttonLabel: 'Aanmelden',
        buttonUrl:
          '/aanmelden/ouder-kindyoga?groep=kinderen',
      },
      {
        color: 'magenta',
        title: 'Kinderyoga\n4 t/m 7 jaar',
        time: '14.30 - 15.30 uur',
        body:
          'Elke woensdagmiddag\n\nLocatie: YPHS Huis / Zijperweg 9 / Schagen\n\nTarief: vanaf €9,50 per les',
        buttonLabel: 'Aanmelden',
        buttonUrl:
          '/aanmelden/kinderyoga',
      },
      {
        color: 'purple',
        title: 'Kinderyoga\n8 t/m 12 jaar',
        time: '15.45 - 16.45 uur',
        body:
          'Elke woensdagmiddag\n\nLocatie: YPHS Huis / Zijperweg 9 / Schagen\n\nTarief: vanaf €9,50 per les',
        buttonLabel: 'Aanmelden',
        buttonUrl:
          '/aanmelden/kinderyoga',
      },
      {
        color: 'blue',
        title: 'Ouder-kind\npeuteryoga',
        time: '9.30 - 10.15 uur',
        body:
          'Op de laatste zaterdag van elke schoolvakantie\n\nLocatie: YPHS Huis / Zijperweg 9 / Schagen\n\nTarief: €20 per ouder-kind duo\nMet z’n vieren? Betaal samen slechts €30!',
        buttonLabel: 'Aanmelden',
        buttonUrl: '/aanmelden/ouder-kindyoga?groep=peuters',
      },
      {
        color: 'green',
        title: 'Kinderyoga workshop',
        time: 'op aanvraag',
        body: 'Spelenderwijs ontspannen',
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
        text: 'Ik ben Ellen Wissink, trotse eigenaar van Lumen Yoga en woon met mijn man en zoontje in het gezellige Schagen.',
      },
      {
        text: 'Yoga heeft mijn leven veranderd. Het heeft me geleerd om zachter voor mezelf te zijn en mijn innerlijke kracht te omarmen. Waar ik voorheen worstelde met strenge verwachtingen en een kritische stem, vind ik nu rust en balans.',
      },
      {
        text: 'Steeds vaker vroeg ik me af waarom ik deze belangrijke vaardigheden niet als kind had geleerd. Wat als we kinderen al vroeg deze waardevolle tools bijbrengen?',
      },
      {
        text: 'Sinds 2016 werk ik op de Burgemeester de Wildeschool (cluster 2 onderwijs) en hiervoor heb ik vijf jaar in de buitenschoolse opvang gewerkt. In 2023 volgde ik de cursus schoolverlichting van de nieuwe yogaschool, wat mijn nieuwe avontuur startte. Mijn missie is om kinderen te leren zichzelf te waarderen en hun kwaliteiten te ontdekken.',
      },
      {
        text: 'Ik droom ervan dat kinderyoga een vast onderdeel wordt op basisscholen, zodat elk kind de kans krijgt om deze waardevolle vaardigheden te leren.',
      },
    ],
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
            text: 'Draagt bij aan meer zelfvertrouwen, lichaamsbesef en helpt kinderen te verbinden met zichzelf en anderen! Yoga is een manier om meer rust te voelen in je lijf en in je hoofd. Je voert de oefeningen uit met aandacht, hierdoor leren kinderen zich beter te concentreren.',
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
            text: 'Kinderyoga helpt kinderen vaardigheden te ontdekken die ze niet alleen nu, maar ook later in hun leven kunnen gebruiken.',
          },
        ],
      },
      {
        heading: 'Ouder-kind yoga: lol en verbinding',
        paragraphs: [
          {
            text: 'Tijdens ouder-kind yoga neem je samen de tijd om te bewegen, ontspannen en plezier te maken. Het draait niet om prestatie, maar om verbinding. Met speelse oefeningen, ademhaling en ontspanning leer je je kind én jezelf beter kennen. Een waardevol moment om te lachen, knuffelen en samen te zijn in de drukte van alledag.',
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
