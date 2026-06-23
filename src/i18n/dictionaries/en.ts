import type { Dictionary } from '../types'
import { mergeCms } from '../cms'
import cmsEn from '../../../content/cms/en.json'

const cms = cmsEn as {
  hero: { eyebrow: string; heading: string; subheading: string; ctaActivities: string; ctaContact: string }
  community: { eyebrow: string; heading: string; body: string[]; link: string }
  activities: { intro: string; items: { title: string; description: string }[] }
  events: Array<{ id: string; title: string; date: string; time: string; location: string }>
}

const en: Dictionary = {
  nav: {
    home: 'Home', about: 'About', communityLife: 'Community Life',
    learnMore: 'Learn More', events: 'Events', news: 'News', contact: 'Contact',
  },
  footer: { explore: 'Explore', officialResources: 'Official Resources', connect: 'Connect' },
  contactSection: { heading: "Connect with the Bahá'í Community", button: 'Get in Touch' },
  eventsPreview: {
    eyebrow: 'Events',
    heading: 'Upcoming gatherings',
    intro: "Bahá'ís and their friends gather for prayer, study, celebration, and service. Everyone is welcome.",
    seeAllEvents: 'See all events',
    invitation: {
      eyebrow: 'A path of service',
      heading: 'A path of service, open to all',
      body: 'Do you hope to walk alongside young people as they discover their power to serve, to contribute to the moral and spiritual education of children, to explore the ideas that can transform both the individual and society, or to draw closer to God through collective worship? Come join a path of service being walked by growing numbers from all backgrounds.',
      link: 'Reach out',
    },
  },
  home: {
    hero: mergeCms({
      eyebrow: "Bahá'í Community of Winnipeg",
      heading: 'Where rivers converge, hearts unite',
      subheading: 'A welcoming community devoted to the oneness of humanity, gathering on Treaty 1 territory in the heart of the prairies.',
      ctaActivities: 'Activities',
      ctaContact: 'Contact',
    }, cms.hero),
    activities: mergeCms({
      heading: 'Building vibrant communities',
      intro: "In our communities, we are learning to build spaces where people of all ages can gather to reflect on spiritual teachings, strengthen friendships, consult together, accompany one another, and contribute to the well-being of their neighbourhoods. The Bahá'í community in Winnipeg is engaged in activities that include devotional gatherings, children's classes, junior youth groups, study circles, home visits, and acts of service. Like the rivers that meet at The Forks, Bahá'ís and their friends draw together from many backgrounds, united by a shared vision of a peaceful and flourishing community.",
      link: 'Learn more',
      items: [
        { title: "Children's Classes", description: 'Nurture the spiritual development of young hearts through stories, songs, art, and virtues-based education.' },
        { title: 'Junior Youth', description: 'Accompany young people ages 12–15 as they develop their powers of expression, moral reasoning, and capacity for service to their communities.' },
        { title: 'Devotional Meetings', description: 'Come together for collective worship — prayers, sacred readings, and quiet reflection — in a welcoming setting open to people of all backgrounds.' },
        { title: 'Study Circles', description: 'Explore spiritual and social principles in small group settings, building capacity for service to society.' },
      ],
    }, cms.activities),
    community: mergeCms({
      eyebrow: 'In Winnipeg',
      heading: 'Where the rivers meet',
      body: [
        "The two rivers converge at the Forks into a single united current — the vision of Bahá'u'lláh draws together people from every background into one community, working toward a more just and peaceful world.",
        "The local spiritual assembly was established in 1953, with Bahá'ís having been present in Winnipeg for decades prior, seeking to promote the spiritual and material progress of the community.",
        "In Winnipeg, Bahá'ís and their friends are engaged in a growing pattern of community-building activities that bring people together to pray, reflect, learn, serve, and contribute to the well-being of the wider community. What is unfolding here is part of a global endeavor, as communities around the world learn how to build unity, empower young people, strengthen families and neighbourhoods, and work for the betterment of society. All are warmly invited to join and be part of this growing community.",
      ],
      link: 'Learn more',
    }, cms.community),
    news: {
      eyebrow: 'News',
      heading: "From the Bahá'í World",
      intro: "Stories from the global Bahá'í community, sourced from the Bahá'í World News Service.",
      link: 'See all news',
    },
  },
  about: {
    eyebrow: 'About',
    heading: "The Bahá'í Faith",
    intro: "The fundamental purpose animating the Bahá'í Faith is to safeguard the interests and promote the unity of the human race, and to foster the spirit of love and fellowship amongst all people.",
    body: [
      "Founded by Bahá'u'lláh in the nineteenth century, the Bahá'í Faith has spread to virtually every country and territory on Earth, bringing together people from more than 2,100 diverse ethnic and cultural backgrounds. At the heart of the Faith is the conviction that humanity is one family and that the time has come for its unification into one peaceful global society.",
      "Bahá'ís are engaged in a twofold endeavour: attending to the inner life of the individual and contributing to the transformation of society. These are not separate aims. Through devotional meetings, study circles, and programs for children and youth, Bahá'ís and their friends work to build communities that reflect the principles of justice, unity, and the oneness of humankind.",
    ],
    stats: { bahaisWorldwide: "Bahá'ís worldwide", localitiesGlobally: 'Localities globally', yearsInWinnipeg: 'Years in Winnipeg' },
    corePrinciples: {
      eyebrow: 'Core principles',
      heading: 'The oneness of humanity — the pivot round which all else revolves.',
      intro: "Bahá'ís believe that humanity is one family. All else flows from this conviction: the equality of women and men, the elimination of prejudice, the harmony of science and religion.",
      items: [
        { title: 'Unity of humanity', body: 'All people belong to one human family. This is not merely an ideal but the foundation upon which a just and peaceful civilisation can be built.' },
        { title: 'Equality of women and men', body: 'Humanity is like a bird: one wing is women, the other men. Only when both wings are equally strong can the bird fly.' },
        { title: 'Elimination of prejudice', body: "Of all forms of prejudice, racial prejudice is the most destructive. Bahá'ís strive actively to build bonds across every line of division." },
        { title: 'Harmony of science and religion', body: 'Religion without science is superstition; science without religion is materialism. Both are needed for the progress of civilisation.' },
        { title: 'Independent investigation of truth', body: 'Each person has the right and responsibility to search for truth independently — unfettered by tradition, superstition, or the imitation of others.' },
        { title: 'Universal education', body: 'Regard every human being as a mine rich in gems. Education alone can reveal its treasures and enable all of humanity to benefit.' },
      ],
    },
    localCommunity: {
      eyebrow: 'In Winnipeg',
      heading: "The Bahá'ís of Winnipeg",
      intro: "The two rivers converge at the Forks into a single united current — the vision of Bahá'u'lláh draws together people from every background into one community, working toward a more just and peaceful world.",
      body: [
        "The Bahá'í community in Winnipeg has been present for over a century, growing from a handful of early believers into a vibrant community that reflects the city's rich multicultural heritage. Members from dozens of cultural backgrounds come together in a spirit of unity and shared purpose.",
        "Bahá'ís and their friends are deeply engaged in the life of Winnipeg's neighbourhoods — through devotional meetings, study circles, children's classes, and programs for junior youth. Working alongside neighbours and all those who share the desire to cultivate hope and foster purposeful effort in the world.",
        "Every person has a contribution to make. Whether exploring the Bahá'í Faith for the first time or simply looking to participate in something meaningful, there is a place here.",
      ],
    },
  },
  communityLife: {
    eyebrow: 'Community life',
    heading: 'Growing together in spirit and service',
    intro: "In Winnipeg, Bahá'ís and their friends are engaged in a growing pattern of community-building activities that bring people together to pray, reflect, learn, serve, and contribute to the well-being of the wider community. What is unfolding here is part of a global endeavor, as communities around the world learn how to build unity, empower young people, strengthen families and neighbourhoods, and work for the betterment of society. All are warmly invited to walk this path of service.",
    devotional: {
      title: 'Devotional Meetings',
      body: [
        'Devotional meetings bring people together in collective worship — reading and reflecting on sacred writings, offering prayers, and cultivating the spiritual sensibilities that sustain a life of service. They are held in homes, community spaces, and wherever people choose to gather.',
        'These gatherings are open to everyone, regardless of background or belief. There is no requirement to speak or perform — you may come simply to listen, to reflect, or to add your voice to those of others.',
      ],
      writings: [
        { label: 'Virtues', slug: 'virtues' },
        { label: 'A Prayer for Unity', slug: 'unity-prayer' },
        { label: 'Oneness of Mankind', slug: 'oneness' },
        { label: "Children's Prayer", slug: 'children' },
      ],
    },
    studyCircles: {
      title: 'Study Circles',
      body: [
        "A study circle is a small group of people who come together with a tutor to work through the Ruhi Institute's main sequence of courses. The atmosphere is one of joy, calm, and meditative serenity — a space to read, to reflect, to discuss, and to build the understanding that sustains meaningful service.",
        'The courses explore themes such as the life of the spirit, service to others, and the forces shaping individuals and communities. They are designed to enhance the capacity of youth and adults alike to contribute to the well-being of their communities. Friends and neighbours from every background are welcome to join.',
      ],
    },
    childrensClasses: {
      title: "Children's Classes",
      body: [
        "Children's classes focus on the development of spiritual qualities — the beliefs, habits, and patterns of conduct that make for a worthy and meaningful life. Through stories, songs, prayers, art, and cooperative games, children are helped to discover and strengthen spiritual qualities such as honesty, kindness, generosity, and a love of learning.",
        'Classes are open to all children in the neighbourhood between the ages of 5 and 11. The program is carried out by trained teachers who are themselves walking a path of service.',
      ],
      programHighlights: 'Program highlights',
      tags: ['Stories', 'Songs', 'Prayers', 'Art', 'Cooperative games', 'Ages 5 to 11'],
    },
    juniorYouth: {
      title: 'Junior Youth Spiritual Empowerment',
      body: [
        'The years between 12 and 15 are a crucial period of development — a time when young people are forming their identity and deciding what kind of person they want to be. The junior youth spiritual empowerment program accompanies them through this stage, helping them direct their energies and talents toward the advancement of their communities.',
        'Small groups of junior youth meet regularly with an older youth animator to work through texts that develop their powers of expression, their moral reasoning, and their capacity for service. The program is open to all young people in the neighbourhood, regardless of background.',
      ],
    },
    service: {
      eyebrow: 'The animating spirit',
      heading: 'Service',
      body: [
        "Bahá'ís understand service as an expression of love for humanity and as the means by which spiritual qualities are developed. Such qualities are not acquired through focusing on the self — they grow in the act of giving. Devotion sustains this impulse; service gives it form. Together, they give rise to a pattern of community life infused with the spirit of worship.",
        "This understanding harmonizes being and doing, and individual and collective transformation. To serve one's community is to participate in the building of a better world — and in so doing so, to transform one's own character.",
      ],
    },
    values: {
      eyebrow: 'Principles in action',
      heading: 'Two dimensions of one unfolding process',
      intro: "The Bahá'í community is engaged in a twofold endeavour: attending to the inner life of the individual and contributing to the transformation of society. These are not separate aims — they are inseparable.",
      items: [
        { title: 'Oneness of humanity', body: "The principle that all people belong to one human family is the pivot round which the teachings of the Bahá'í Faith revolve — not merely an ideal, but the foundation of all community action." },
        { title: 'Individual and collective transformation', body: 'Spiritual qualities are not acquired through focusing on the self; they develop in service to others. Personal and communal growth are inseparable and mutually reinforcing.' },
        { title: 'Devotion and service in concert', body: 'Worship awakens spiritual susceptibilities; service gives them expression. Together, they give rise to a pattern of community life infused with the spirit of devotion.' },
        { title: 'Learning through action', body: 'Community building is approached as a process of learning — not theoretical study alone, but reflection on lived experience, adjusting course, and growing through the work itself.' },
        { title: 'Universal participation', body: 'Every person has a contribution to make. Our activities are open to all, and every voice is valued in the conversation about building a better world.' },
        { title: 'Material and spiritual civilization', body: "For the Bahá'í community, the inner life and practical action are deeply connected. Building a just world is itself a spiritual undertaking." },
      ],
    },
  },
  learnMore: {
    eyebrow: 'Learn more',
    heading: "Exploring the Bahá'í Faith",
    intro: "The Bahá'í Faith addresses both the spiritual life of the individual and the structures of human society — offering a coherent vision of justice, unity, and the oneness of humankind.",
    body: "Founded in the nineteenth century, the Faith has spread to virtually every country and territory on Earth. Its central conviction is that humanity is one family, that all the world's great religions come from the same divine source, and that the long-promised age of peace is now within humanity's reach.",
    centralFigures: {
      eyebrow: 'Central figures',
      heading: "The founders and exemplar of the Bahá'í Faith",
      intro: "The Bahá'í Faith centres on the lives and writings of three figures — the Báb, Bahá'u'lláh, and 'Abdu'l-Bahá — whose vision of humanity's oneness continues to inspire millions around the world.",
      items: [
        { title: "Bahá'u'lláh (1817–1892)", body: "The Founder of the Bahá'í Faith and its central figure. Born in Tehran, Bahá'u'lláh endured forty years of exile and imprisonment for proclaiming His message that humanity is one family and that the long-awaited moment for its unification has arrived. His writings encompass over 100 volumes and form the sacred scripture of the Faith." },
        { title: 'The Báb (1819–1850)', body: "The Herald of the Bahá'í Faith. In 1844, the Báb declared His mission and called humanity to spiritual renewal, announcing the coming of the Promised One anticipated by the world's religions." },
        { title: "'Abdu'l-Bahá (1844–1921)", body: "The son of Bahá'u'lláh and the Centre of His Covenant — appointed by Bahá'u'lláh as the sole authoritative interpreter of His teachings. 'Abdu'l-Bahá is regarded as the perfect exemplar of Bahá'í life: one in whom all the spiritual and humanitarian virtues of the Faith found complete expression." },
      ],
    },
    coreTeachings: {
      eyebrow: 'Core teachings',
      heading: 'The oneness of God, religion, and humanity',
      intro: "At the heart of the Bahá'í Faith are teachings about the oneness of God and religion, the oneness of humanity and freedom from prejudice, and the harmony of science and religion. These are not abstract ideals — they are principles for the ordering of human life and the building of civilisation.",
      items: [
        { title: 'Oneness of God', body: "There is only one God — unknowable in essence, yet made known to humanity through a succession of divine Messengers. All the great religions of the world flow from this one source." },
        { title: 'Progressive revelation', body: "Religious truth is revealed progressively. The Manifestations of God — Abraham, Moses, Buddha, Christ, Muhammad, Bahá'u'lláh — each brought teachings suited to the needs and capacity of the age in which they appeared." },
        { title: 'Oneness of humanity', body: 'The diversity of the human race is not a source of division but a cause of love and harmony. All prejudice — of race, class, nationality, or religion — must be overcome.' },
        { title: 'Inherent nobility', body: 'Every human being is "a mine rich in gems of inestimable value." The purpose of education, spiritual and material alike, is to reveal these inner capacities in service to one another and to civilisation.' },
        { title: 'Harmony of science and religion', body: "Science and religion are two complementary systems of knowledge. Religion without science leads to superstition; science without religion leads to materialism. Both are essential to human progress." },
        { title: 'Justice', body: "Justice is the best-beloved of all things in the sight of God and the centrality of justice to all human endeavours is a cornerstone of Bahá'í social teaching. A just society upholds the rights and dignity of every person." },
      ],
    },
    writingsAndPrayer: {
      eyebrow: 'Writings and prayer',
      heading: 'Sacred texts',
      intro: "For four decades, thousands of verses, letters and books flowed from the pen of Bahá'u'lláh, amounting to some 100 volumes of Sacred Writings. These passages constitute a central part of Bahá'í scripture, offered here as food for reflection and prayer.",
    },
    officialResources: {
      eyebrow: 'Official resources',
      heading: 'Explore further',
      intro: "These official Bahá'í websites offer a wealth of information, sacred texts, news stories, and resources for deeper study.",
    },
  },
  events: {
    eyebrow: 'Events',
    heading: 'Upcoming gatherings',
    intro: "Whether you are a parent, a young person, or someone who cares about your neighbourhood, there is a place for you. We are walking this path together—locally and globally—and you are warmly invited to take part: join a gathering, connect with others, and help build a community where all can belong and contribute.",
    invitation: {
      eyebrow: 'A path of service',
      heading: 'A path of service, open to all',
      body: 'Do you hope to walk alongside young people as they discover their power to serve, to contribute to the moral and spiritual education of children, to explore the ideas that can transform both the individual and society, or to draw closer to God through collective worship? Come join a path of service being walked by growing numbers from all backgrounds.',
      link: 'Reach out',
    },
    alwaysGathering: 'Always gathering',
    evergreenBody: 'Beyond these listed events, the community meets regularly for devotion, study, and service.',
    evergreenLink: 'Get in touch',
  },
  news: {
    eyebrow: 'News',
    heading: "Bahá'í World News",
    intro: "Stories from the global Bahá'í community, sourced from the Bahá'í World News Service.",
    visitMore: 'Visit news.bahai.org for more stories',
  },
  contact: {
    eyebrow: 'Contact',
    heading: 'Get in touch',
    intro: 'Every question and every conversation is welcome.',
    form: {
      heading: 'Get in touch',
      name: 'Name', email: 'Email', phone: 'Phone',
      subject: 'Subject', subjectPlaceholder: 'Select a reason',
      subjectOptions: ['General inquiry', 'Attending an event', 'Learning about the Faith', 'Community activities', 'Facility rental', 'Other'],
      message: 'Message', button: 'Send Message',
    },
    visiting: {
      heading: 'Visiting',
      body: "Visitors and those curious about the Bahá'í Faith are warmly welcomed. Feel free to reach out or pop by.",
    },
    email: { heading: 'Email', generalInquiries: 'General Inquiries' },
    follow: { heading: 'Follow' },
  },
  meta: {
    home: { title: 'Home', description: "The official website of the Bahá'í Community of Winnipeg, Manitoba. Learn about the Bahá'í Faith, community activities, and upcoming events." },
    about: { title: 'About', description: "Learn about the Bahá'í Faith and the Bahá'í Community of Winnipeg, Manitoba." },
    communityLife: { title: 'Community Life', description: "Explore the activities of the Bahá'í Community of Winnipeg — devotional meetings, study circles, children's classes, junior youth groups, and more." },
    learnMore: { title: 'Learn More', description: "Learn about the central figures, core teachings, and principles of the Bahá'í Faith." },
    events: { title: 'Events', description: "Upcoming events and gatherings of the Bahá'í Community of Winnipeg." },
    news: { title: 'News', description: "The latest news from the Bahá'í World News Service and the global Bahá'í community." },
    contact: { title: 'Contact', description: "Get in touch with the Bahá'í Community of Winnipeg." },
  },
}

export default en
