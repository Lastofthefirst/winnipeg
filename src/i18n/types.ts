export type Locale = 'en' | 'fr'

export interface Dictionary {
  nav: {
    home: string; about: string; communityLife: string; learnMore: string
    events: string; news: string; contact: string
  }
  footer: { explore: string; officialResources: string; connect: string }
  contactSection: { heading: string; button: string }
  eventsPreview: {
    eyebrow: string; heading: string; intro: string; seeAllEvents: string
    invitation: { eyebrow: string; heading: string; body: string; link: string }
  }
  home: {
    hero: { eyebrow: string; heading: string; subheading: string; ctaActivities: string; ctaContact: string }
    activities: {
      heading: string; intro: string; link: string
      items: { title: string; description: string }[]
    }
    community: { eyebrow: string; heading: string; body: string[]; link: string }
    news: { eyebrow: string; heading: string; intro: string; link: string }
  }
  about: {
    eyebrow: string; heading: string; intro: string; body: string[]
    stats: { bahaisWorldwide: string; localitiesGlobally: string; yearsInWinnipeg: string }
    corePrinciples: {
      eyebrow: string; heading: string; intro: string
      items: { title: string; body: string }[]
    }
    localCommunity: {
      eyebrow: string; heading: string; intro: string; body: string[]
    }
  }
  communityLife: {
    eyebrow: string; heading: string; intro: string
    devotional: { title: string; body: string[]; whatToExpect: string; tags: string[] }
    studyCircles: { title: string; body: string[] }
    childrensClasses: { title: string; body: string[]; programHighlights: string; tags: string[] }
    juniorYouth: { title: string; body: string[] }
    service: { eyebrow: string; heading: string; body: string[] }
    values: { eyebrow: string; heading: string; intro: string; items: { title: string; body: string }[] }
  }
  learnMore: {
    eyebrow: string; heading: string; intro: string; body: string
    centralFigures: { eyebrow: string; heading: string; intro: string; items: { title: string; body: string }[] }
    coreTeachings: { eyebrow: string; heading: string; intro: string; items: { title: string; body: string }[] }
    officialResources: { eyebrow: string; heading: string; intro: string }
  }
  events: {
    eyebrow: string; heading: string; intro: string
    invitation: { eyebrow: string; heading: string; body: string; link: string }
    alwaysGathering: string; evergreenBody: string; evergreenLink: string
  }
  news: { eyebrow: string; heading: string; intro: string; visitMore: string }
  contact: {
    eyebrow: string; heading: string; intro: string
    form: {
      heading: string; name: string; email: string; phone: string
      subject: string; subjectPlaceholder: string; subjectOptions: string[]
      message: string; button: string
    }
    visiting: { heading: string; body: string }
    email: { heading: string; generalInquiries: string }
    follow: { heading: string }
  }
  meta: {
    home: { title: string; description: string }
    about: { title: string; description: string }
    communityLife: { title: string; description: string }
    learnMore: { title: string; description: string }
    events: { title: string; description: string }
    news: { title: string; description: string }
    contact: { title: string; description: string }
  }
}
