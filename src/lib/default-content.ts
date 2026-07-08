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
    url: 'https://res.cloudinary.com/strootmann/image/upload/v1708871727/lumen-yoga/Lumen-Yoga_logo-vol_xg1uur.svg',
    alt: 'Lumen Yoga logo',
    width: 667,
    height: 430,
  },
  instagramUrl: 'https://www.instagram.com/lumen.yoga/',
  facebookUrl: 'https://www.facebook.com/profile.php?id=100091839270911',
  primaryCTA: {
    label: 'Aanmelden',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSctAPfSQAKw3pdtxlDASPai16SxSO1XGNYz1UBzw5ysTdIIKQ/viewform',
  },
  navItems: [
    { label: 'Home', link: '/' },
    { label: 'Recensies', link: '#recensies' },
    { label: 'Kinderyoga', link: '#kinderyoga' },
    { label: 'Over mij', link: '#over-mij' },
    { label: 'Ons aanbod', link: '#aanbod' },
    { label: 'Info', link: '#info' },
    { label: 'Verlof', link: '#verlof', highlightAsButton: true },
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
} as const

export const DEFAULT_HOME = {
  announcementModal: {
    enabled: true,
    title: 'Lumen Yoga viert momenteel zwangerschapsverlof',
    intro:
      'Ik ben er even tussenuit, maar kijk er nu al naar uit om jullie in de zomer weer te zien op de mat in Schagen!',
    scheduleTitle: 'De agenda voor 2026:',
    scheduleItems: [
      { text: 'Zaterdag 4 juli: Eerste ouder-kindyoga workshop' },
      { text: 'Woensdag 19 augustus: Start van de wekelijkse lessen' },
    ],
    signupTitle: 'Aanmelden:',
    signupText:
      'Je kunt je voor alle lessen en workshops alvast opgeven via de website. Eind juni neem ik contact met je op om de inschrijving te bevestigen.',
    closingText: 'Ik wens je een mooie tijd en tot snel!',
    signature: 'Ellen Wissink - Lumen Yoga',
  },
  hero: {
    image: {
      url: 'https://res.cloudinary.com/strootmann/image/upload/v1708871503/lumen-yoga/Handen_omhoog_4k_k12f9g.jpg',
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
      url: 'https://docs.google.com/forms/d/e/1FAIpQLSctAPfSQAKw3pdtxlDASPai16SxSO1XGNYz1UBzw5ysTdIIKQ/viewform',
    },
    secondaryCTA: {
      label: 'Meer info',
      url: '#info',
    },
    quote: '“Eerst had ik stress en nu voel ik me helemaal rustig”',
    accentImage: {
      url: 'https://res.cloudinary.com/strootmann/image/upload/v1708871728/lumen-yoga/halve_zon_mfcoaz.svg',
      alt: 'Halve zon',
      width: 239,
      height: 342,
    },
  },
  intro: {
    image: {
      url: 'https://res.cloudinary.com/strootmann/image/upload/v1708871503/lumen-yoga/Masseren_4k_mbxhqj.jpg',
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
          'https://docs.google.com/forms/d/e/1FAIpQLScFbOtfK54SVAj_Vtzo3TMh23UTZWkz7sbYqfzp4EcbqeRLpg/viewform',
      },
      {
        color: 'magenta',
        title: 'Kinderyoga\n4 t/m 7 jaar',
        time: '14.30 - 15.30 uur',
        body:
          'Elke woensdagmiddag\n\nLocatie: YPHS Huis / Zijperweg 9 / Schagen\n\nTarief: vanaf €9,50 per les',
        buttonLabel: 'Aanmelden',
        buttonUrl:
          'https://docs.google.com/forms/d/e/1FAIpQLSctAPfSQAKw3pdtxlDASPai16SxSO1XGNYz1UBzw5ysTdIIKQ/viewform',
      },
      {
        color: 'purple',
        title: 'Kinderyoga\n8 t/m 12 jaar',
        time: '15.45 - 16.45 uur',
        body:
          'Elke woensdagmiddag\n\nLocatie: YPHS Huis / Zijperweg 9 / Schagen\n\nTarief: vanaf €9,50 per les',
        buttonLabel: 'Aanmelden',
        buttonUrl:
          'https://docs.google.com/forms/d/e/1FAIpQLSctAPfSQAKw3pdtxlDASPai16SxSO1XGNYz1UBzw5ysTdIIKQ/viewform',
      },
      {
        color: 'blue',
        title: 'Schoolverlichting',
        time: 'op aanvraag',
        body: 'Lesprogramma voor basisscholen',
        buttonLabel: 'Meer info',
        buttonUrl: '#info',
      },
      {
        color: 'green',
        title: 'Kinderyoga workshop',
        time: 'op aanvraag',
        body: 'Spelenderwijs ontspannen',
        buttonLabel: 'Meer info',
        buttonUrl:
          'https://docs.google.com/forms/d/e/1FAIpQLSe1UIald50arX6u9Qeov0bc-gCncpNA2QTjGnDK0y_XIL8kOw/viewform?usp=dialog',
      },
    ],
  },
  about: {
    image: {
      url: 'https://res.cloudinary.com/strootmann/image/upload/v1708871503/lumen-yoga/Ellen_binnen_5_4k_ze0iyt.jpg',
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
      url: 'https://res.cloudinary.com/strootmann/image/upload/v1708871726/lumen-yoga/Lumen-Yoga_logo-type_kv0iki.svg',
      alt: 'Lumen Yoga',
      width: 667,
      height: 122,
    },
    sideImage: {
      url: 'https://res.cloudinary.com/strootmann/image/upload/v1714821937/lumen-yoga/Krijgers_csawdv.jpg',
      alt: 'Krijgers',
      width: 2000,
      height: 2793,
    },
    mobileImage: {
      url: 'https://res.cloudinary.com/strootmann/image/upload/v1715243821/lumen-yoga/Krijgers-cropped_pgidcb.jpg',
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
