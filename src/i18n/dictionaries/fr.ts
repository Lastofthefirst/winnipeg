import type { Dictionary } from '../types'
import { mergeCms } from '../cms'
import cmsFr from '../../../content/cms/fr.json'

const cms = cmsFr as {
  hero: { eyebrow: string; heading: string; subheading: string; ctaActivities: string; ctaContact: string }
  community: { eyebrow: string; heading: string; body: string[]; link: string }
  activities: { intro: string; items: { title: string; description: string }[] }
  events: Array<{ id: string; title: string; date: string; time: string; location: string }>
}

const fr: Dictionary = {
  nav: {
    home: 'Accueil', about: 'À propos', communityLife: 'Vie communautaire',
    learnMore: 'En savoir plus', events: 'Activités', news: 'Nouvelles', contact: 'Nous contacter',
  },
  footer: { explore: 'Explorer', officialResources: 'Ressources officielles', connect: 'Nos réseaux sociaux' },
  contactSection: { heading: "Rejoignez la communauté bahá'íe", button: 'Nous contacter' },
  eventsPreview: {
    eyebrow: 'Événements',
    heading: 'Rassemblements à venir',
    intro: "Les bahá'ís et leurs amis se rassemblent pour la prière, l'étude, la célébration et le service. Tous sont les bienvenus.",
    seeAllEvents: 'Voir tous les événements',
    invitation: {
      eyebrow: 'Un chemin de service',
      heading: 'Un chemin de service, ouvert à tous',
      body: "Espérez-vous accompagner de jeunes personnes dans la découverte de leur pouvoir de servir, contribuer à l'éducation morale et spirituelle des enfants, explorer des idées qui peuvent transformer l'individu et la société, ou vous rapprocher de Dieu par le culte collectif? Venez vous joindre à un chemin de service emprunté par un nombre croissant de personnes de toutes origines.",
      link: 'Nous rejoindre',
    },
  },
  home: {
    hero: mergeCms({
      eyebrow: "Communauté bahá'íe de Winnipeg",
      heading: "Là où les rivières se rencontrent, les cœurs s'unissent",
      subheading: "Une communauté accueillante dédiée à l'unité de l'humanité, réunie sur le Territoire du Traité no 1 au cœur des prairies.",
      ctaActivities: 'Activités',
      ctaContact: 'Nous contacter',
    }, cms.hero),
    activities: mergeCms({
      heading: 'Développer des communautés dynamiques',
      intro: "Dans nos communautés, nous apprenons à créer des espaces où les personnes de tous âges peuvent se réunir pour réfléchir à des enseignements spirituels, renforcer leurs liens d'amitié, se consulter, s'accompagner mutuellement et contribuer au bien-être de leur quartier. La communauté bahá'íe de Winnipeg participe à des activités qui comprennent des rencontres de prière, des classes pour enfants, des groupes de jeunes adolescents, des cercles d'étude, des visites à domicile et des actes de service. Tout comme les rivières qui se rencontrent à la Fourche, les bahá'ís et leurs amis se réunissent, venant de divers milieux, et unis par une vision commune d'une communauté paisible et épanouie.",
      link: 'En savoir plus',
      items: [
        { title: "Classes d'enfants", description: "Nourrir le développement spirituel des jeunes cœurs par des histoires, des chants, de l'art et une éducation fondée sur les vertus." },
        { title: 'Les préjeunes', description: "Accompagner les jeunes de 12 à 15 ans dans le développement de leurs capacités d'expression, de leur raisonnement moral et de leur aptitude au service communautaire." },
        { title: 'Réunions dévotionnelles', description: "Se rassembler pour le culte collectif — prières, lectures sacrées et réflexion tranquille — dans un cadre accueillant ouvert à tous." },
        { title: "Cercles d'étude", description: "Explorer les principes spirituels et sociaux en petits groupes, tout en développant une capacité de service à la société." },
      ],
    }, cms.activities),
    community: mergeCms({
      eyebrow: 'À Winnipeg',
      heading: 'Là où les rivières se rencontrent',
      body: [
        "Deux rivières convergent au site de la Fourche en un courant uni — la vision de Bahá'u'lláh rassemble des personnes de diverses origines en une seule communauté, œuvrant vers un monde plus juste et plus paisible.",
        "L'Assemblée spirituelle locale a été établie en 1953, des Bahá'ís étant déjà présents à Winnipeg depuis des décennies, cherchant à promouvoir le progrès spirituel et matériel de la communauté.",
        "À Winnipeg, les bahá'ís et leurs amis participent à un ensemble croissant d'activités de développement communautaire qui rassemble les gens pour prier, réfléchir, apprendre, servir et contribuer au bien-être de toute la communauté. Ce qui se déroule ici fait partie d'un effort mondial – des communautés partout au monde apprennent à bâtir l'unité, à engager les jeunes, à renforcer les familles et les quartiers, et à travailler pour l'amélioration de la société. Tous sont chaleureusement invités à se joindre à cette communauté grandissante.",
      ],
      link: 'En savoir plus',
    }, cms.community),
    news: {
      eyebrow: 'Nouvelles',
      heading: "Du monde bahá'í",
      intro: "Des récits de la communauté bahá'íe mondiale, tirés du Service mondial des nouvelles bahá'íes.",
      link: 'Voir toutes les nouvelles',
    },
  },
  about: {
    eyebrow: 'À propos',
    heading: "La foi bahá'íe",
    intro: "Le but fondamental animant la foi bahá'íe est de sauvegarder les intérêts et de promouvoir l'unité du genre humain, et de favoriser l'esprit d'amour et de fraternité entre tous les peuples.",
    body: [
      "Fondée par Bahá'u'lláh au XIXe siècle, la foi bahá'íe s'est répandue dans pratiquement tous les pays et territoires du monde, réunissant des personnes de plus de 2 100 origines ethniques et culturelles diverses. Au cœur de la foi se trouve la conviction que l'humanité est une seule famille et que le moment est venu de son unification en une société mondiale pacifique.",
      "Les bahá'ís se consacrent à un double effort : s'occuper de la vie intérieure de l'individu et contribuer à la transformation de la société. Ce ne sont pas des objectifs distincts. Par l'entremise de réunions dévotionnelles, de cercles d'étude et de programmes pour les enfants et jeunes, les bahá'ís et leurs amis s'efforcent à développer des communautés qui reflètent les principes de justice, d'unité et de l'unité de l'humanité.",
    ],
    corePrinciples: {
      eyebrow: 'Principes fondamentaux',
      heading: "L'unité de l'humanité — le pivot autour duquel tout le reste tourne.",
      intro: "Les bahá'ís croient que l'humanité est une seule famille. Tout le reste découle de cette conviction : l'égalité des femmes et des hommes, l'élimination des préjugés, l'harmonie entre la science et la religion.",
      items: [
        { title: "Unité de l'humanité", body: "Tous les peuples appartiennent à une seule famille humaine. Ce n'est pas simplement un idéal, mais le fondement d'une civilisation juste et pacifique." },
        { title: 'Égalité des femmes et des hommes', body: "Comme l'oiseau, l'humanité possède deux ailes — l'une mâle, l'autre femelle. Si les deux ailes ne sont pas également fortes et mues par une force commune, l'oiseau ne peut s'envoler vers le ciel." },
        { title: 'Élimination des préjugés', body: "De toutes les formes de préjugés, le préjugé racial est le plus destructeur. Les bahá'ís s'efforcent activement de créer des liens par-delà toute ligne de division." },
        { title: 'Harmonie entre la science et la religion', body: "La religion sans la science est superstition, et la science sans la religion est matérialisme. Toutes deux sont nécessaires au progrès de la civilisation." },
        { title: 'Recherche indépendante de la vérité', body: "Chaque personne a le droit et la responsabilité de chercher la vérité de manière indépendante — affranchie de la tradition, de la superstition ou de l'imitation des autres." },
        { title: 'Éducation universelle', body: "Considérez l'homme comme une mine riche en gemmes d'une valeur inestimable. Seule l'éducation peut lui faire révéler ses trésors et permettre à l'humanité d'en profiter." },
      ],
    },
    localCommunity: {
      eyebrow: 'À Winnipeg',
      heading: "Les bahá'ís de Winnipeg",
      intro: "Deux rivières convergent au site de la Fourche en un courant uni — la vision de Bahá'u'lláh rassemble des personnes de diverses origines en une seule communauté, œuvrant vers un monde plus juste et plus paisible.",
      body: [
        "La communauté bahá'íe de Winnipeg est présente depuis plus d'un siècle, passant d'une poignée de premiers croyants à une communauté dynamique qui reflète le riche patrimoine multiculturel de la ville. Des membres de dizaines de milieux culturels se réunissent dans un esprit d'unité et d'objectif commun.",
        "Les bahá'ís et leurs amis sont profondément engagés dans la vie des quartiers de Winnipeg au travers des réunions dévotionnelles, des cercles d'étude, des classes pour enfants et des programmes pour les jeunes adolescents. Ils travaillent aux côtés de leurs voisins et de tous ceux qui partagent le désir de cultiver l'espoir et de favoriser des efforts constructifs dans le monde.",
        "Chaque personne a une contribution à apporter. Que vous découvrez la foi bahá'íe pour la première fois ou que vous cherchiez simplement à participer à quelque chose de significatif, il y a une place pour vous.",
      ],
    },
  },
  communityLife: {
    eyebrow: 'Vie communautaire',
    heading: "Grandir ensemble dans l'esprit et le service",
    intro: "À Winnipeg, les bahá'ís et leurs amis sont engagés dans un mouvement croissant d'activités de développement communautaire qui rassemble les gens pour prier, réfléchir, apprendre, servir et contribuer au bien-être de l'ensemble de la collectivité. Ce qui se déroule ici fait partie d'un effort mondial, alors que des communautés du monde entier apprennent à bâtir l'unité, à engager les jeunes, à renforcer les familles et les quartiers, et à œuvrer pour l'amélioration de la société. Tous sont chaleureusement invités à cheminer sur cette voie du service.",
    devotional: {
      title: 'Réunions dévotionnelles',
      body: [
        "Les réunions de dévotion rassemblent les gens dans un culte collectif — pour lire et méditer sur les écrits sacrés, réciter des prières et cultiver la sensibilité spirituelle qui soutient une vie de service. Elles ont lieu dans des foyers, des espaces communautaires ou tout autre endroit où les gens choisissent de se réunir.",
        "Ces rassemblements sont ouverts à tous, quelle que soit leur origine ou leur croyance. Il n'y a aucune obligation de parler ou de se produire — vous pouvez venir simplement pour écouter, réfléchir ou ajouter votre voix à celles des autres.",
      ],
      writings: [
        { label: 'Vertus', slug: 'virtues' },
        { label: 'Une prière pour l\'unité', slug: 'unity-prayer' },
        { label: 'L\'unité de l\'humanité', slug: 'oneness' },
        { label: 'Prière pour les enfants', slug: 'children' },
      ],
    },
    studyCircles: {
      title: "Cercles d'étude",
      body: [
        "Un cercle d'étude est un petit groupe de personnes qui se réunit avec un tuteur pour travailler sur la séquence principale de cours de l'Institut Ruhi. L'atmosphère est une de joie, de calme et de sérénité méditative — un espace pour lire, réfléchir, échanger et acquérir la compréhension qui soutient un service significatif.",
        "Les cours explorent des thèmes tels que la vie de l'esprit, le service aux autres et les forces qui façonnent les individus et les communautés. Ils sont conçus pour renforcer la capacité des jeunes et des adultes à contribuer au bien-être de leurs communautés. Amis et voisins de toutes origines culturelles et sociales sont les bienvenus.",
      ],
    },
    childrensClasses: {
      title: "Classes d'enfants",
      body: [
        "Les classes d'enfants se concentrent sur le développement des qualités spirituelles — les croyances, les habitudes et les modes de conduite qui constituent une vie digne et significative. Par des histoires, des chants, des prières, de l'art et des jeux coopératifs, les enfants sont encouragés à découvrir et à renforcer des qualités spirituelles telles que l'honnêteté, la gentillesse, la générosité et l'amour de l'apprentissage.",
        "Les classes sont ouvertes à tous les enfants du quartier âgés de 5 à 11 ans. Le programme est mis en œuvre par des enseignants formés qui eux-mêmes marchent sur une voie de service.",
      ],
      programHighlights: 'Points forts du programme',
      tags: ['Histoires', 'Chants', 'Prières', 'Art', 'Jeux coopératifs', 'Âge de 5 à 11 ans'],
    },
    juniorYouth: {
      title: 'Autonomisation spirituelle des jeunes adolescents',
      body: [
        "Les années entre 12 et 15 ans sont une période cruciale de développement — un moment où les jeunes forment leur identité et décident de quel type de personne ils veulent être. Le programme d'autonomisation spirituelle des jeunes les accompagne à travers cette étape, les aidant à orienter leurs énergies et leurs talents vers le progrès de leur communauté.",
        "De petits groupes de jeunes se réunissent régulièrement avec un animateur plus âgé pour étudier des textes qui développent leurs pouvoirs d'expression, leur raisonnement moral et leur capacité de service. Le programme est ouvert à tous les jeunes du quartier, quelles que soient leurs diverses origines.",
      ],
    },
    service: {
      eyebrow: "L'esprit animateur",
      heading: 'Le service',
      body: [
        "Les bahá'ís comprennent le service comme une expression de l'amour pour l'humanité et comme le moyen par lequel les qualités spirituelles se développent. De telles qualités ne s'acquièrent pas en se concentrant sur soi-même — elles grandissent dans l'acte de donner. La dévotion soutient cette impulsion ; le service lui donne forme. Ensemble, ils donnent naissance à un mode de vie communautaire imprégné de l'esprit de dévotion.",
        "Cette compréhension harmonise l'être et le faire, ainsi que la transformation individuelle et collective. Servir sa communauté, c'est participer à la construction d'un monde meilleur — et, ce faisant, transformer son propre caractère.",
      ],
    },
    values: {
      eyebrow: 'Principes en action',
      heading: "Deux dimensions d'un processus en cours",
      intro: "La communauté bahá'íe poursuit un double objectif : veiller à la vie intérieure de l'individu et contribuer à la transformation de la société. Ce ne sont pas des objectifs distincts — ils sont indissociables.",
      items: [
        { title: "L'unité de l'humanité", body: "Le principe selon lequel tous les êtres humains appartiennent à une même famille est le pivot autour duquel tournent les enseignements de la Foi bahá'íe — non pas comme un simple idéal, mais comme le fondement de toute action communautaire." },
        { title: 'Transformation individuelle et collective', body: "Les qualités spirituelles ne s'acquièrent pas en se concentrant sur soi-même ; elles se développent dans le service aux autres. La croissance personnelle et le développement communautaire sont indissociables et se renforcent mutuellement." },
        { title: 'La prière et le service de concert', body: "Le culte éveille les sensibilités spirituelles ; le service leur donne expression. Ensemble, ils donnent naissance à un mode de vie communautaire empreint d'un esprit de dévotion." },
        { title: "Apprentissage par l'action", body: "Le développement communautaire est abordé comme un processus d'apprentissage. L'examen théorique, et la réflexion sur l'expérience vécue guident les ajustements de parcours et la croissance personnelle qui vient du travail lui-même." },
        { title: 'Participation universelle', body: "Chaque personne a une contribution à apporter. Nos activités sont ouvertes à tous, et chaque voix est valorisée dans la réflexion sur l'édification d'un monde meilleur." },
        { title: 'Civilisation matérielle et spirituelle', body: "Pour la communauté bahá'íe, la vie intérieure et l'action pratique sont profondément liées. Construire un monde juste est en soi une entreprise spirituelle." },
      ],
    },
  },
  learnMore: {
    eyebrow: 'En savoir plus',
    heading: "Explorer la foi bahá'íe",
    intro: "La foi bahá'íe aborde à la fois la vie spirituelle de l'individu et les structures de la société humaine — offrant une vision cohérente de la justice, de l'unité et de l'unité de l'humanité.",
    body: "Fondée au XIXe siècle, la foi s'est répandue dans pratiquement tous les pays et territoires du monde. Sa conviction centrale est que l'humanité est une seule famille, que toutes les grandes religions du monde proviennent de la même source divine et que l'ère de paix promise de longue date est maintenant à la portée de l'humanité.",
    centralFigures: {
      eyebrow: 'Figures centrales',
      heading: "Les fondateurs et l'exemple parfait de la foi bahá'íe",
      intro: "La foi bahá'íe est centrée sur la vie et les écrits de trois figures — le Báb, Bahá'u'lláh et 'Abdu'l-Bahá — dont la vision de l'unité de l'humanité continue à inspirer des millions de personnes partout au monde.",
      items: [
        { title: "Bahá'u'lláh (1817–1892)", body: "Fondateur de la Foi bahá'íe et sa figure centrale, Bahá'u'lláh est né à Téhéran. Il a subi quarante ans d'exil et d'emprisonnement pour avoir proclamé Son message : l'humanité forme une seule famille et le moment tant attendu de son unification est venu. Ses écrits comptent plus de 100 volumes et constituent les Écritures saintes de la Foi." },
        { title: 'Le Báb (1819–1850)', body: "Le Héraut de la Foi bahá'íe. En 1844, le Báb a déclaré Sa mission et appelé l'humanité au renouveau spirituel, annonçant la venue du Promis attendu par les religions du monde entier." },
        { title: "'Abdu'l-Bahá (1844–1921)", body: "Fils de Bahá'u'lláh et Centre de Son Alliance, 'Abdu'l-Bahá a été désigné par Bahá'u'lláh comme le seul interprète autorisé de Ses enseignements. Il est considéré comme l'exemple parfait de la vie bahá'íe : celui en qui toutes les vertus spirituelles et humanitaires de la foi ont trouvé leur expression complète." },
      ],
    },
    coreTeachings: {
      eyebrow: 'Enseignements fondamentaux',
      heading: "L'unité de Dieu, de la religion et de l'humanité",
      intro: "Au cœur de la Foi bahá'íe se trouvent les enseignements sur l'unicité de Dieu et de la religion, l'unité de l'humanité et l'affranchissement des préjugés, ainsi que l'harmonie entre la science et la religion. Ce ne sont pas des idéaux abstraits — ce sont des principes pour l'organisation de la vie humaine et l'édification de la civilisation.",
      items: [
        { title: 'Unité de Dieu', body: "Il n'y a qu'un seul Dieu — inconnaissable dans Son essence, mais révélé à l'humanité à travers une succession de Messagers divins. Toutes les grandes religions du monde découlent de cette unique source." },
        { title: 'Révélation progressive', body: "La vérité religieuse est révélée de manière progressive. Les Manifestations de Dieu — Abraham, Moïse, Bouddha, le Christ, Mahomet, Bahá'u'lláh — ont chacune apporté des enseignements adaptés aux besoins et à la capacité de l'époque à laquelle elles sont apparues." },
        { title: "Unité de l'humanité", body: "La diversité de la race humaine n'est pas une source de division, mais une cause d'amour et d'harmonie. Tous les préjugés — de race, de classe, de nationalité ou de religion — doivent être surmontés." },
        { title: 'Noblesse inhérente', body: "Chaque être humain est \"une mine riche en gemmes d'une valeur inestimable\". Le but de l'éducation, tant spirituelle que matérielle, est de révéler ces capacités intérieures au service les uns des autres et de la civilisation." },
        { title: 'Harmonie entre la science et la religion', body: "La science et la religion sont deux systèmes complémentaires de connaissances. La religion sans la science mène à la superstition ; la science sans la religion mène au matérialisme. Toutes deux sont essentielles au progrès humain." },
        { title: 'Justice', body: "À mes yeux, ce que j'aime par-dessus tout est la justice, et la centralité de la justice dans toutes les entreprises humaines est une pierre angulaire de l'enseignement social bahá'í. Une société juste défend les droits et la dignité de chaque personne." },
      ],
    },
    writingsAndPrayer: {
      eyebrow: 'Écritures et prières',
      heading: 'Textes sacrés',
      intro: "Pendant quatre décennies, des milliers de versets, lettres et livres ont coulé de la plume de Bahá'u'lláh, formant environ 100 volumes d'Écrits sacrés. Ces passages forment une partie centrale des écrits bahá'ís, offerts ici comme aliment pour la réflexion et la prière.",
    },
    officialResources: {
      eyebrow: 'Ressources officielles',
      heading: 'Approfondissez votre exploration',
      intro: "Ces sites web bahá'ís officiels offrent une mine d'informations, des textes sacrés, des récits d'actualité et des ressources pour une étude plus approfondie.",
    },
  },
  events: {
    eyebrow: 'Événements',
    heading: 'Rassemblements à venir',
    intro: "Que vous soyez parent, jeune personne ou quelqu'un qui s'intéresse à son quartier, il y a une place pour vous. Nous parcourons ce chemin ensemble — localement et globalement — et vous êtes chaleureusement invité à participer à un rassemblement, à rencontrer d'autres personnes et à participer au développement d'une communauté où chacun a sa place et peut contribuer.",
    invitation: {
      eyebrow: 'Un chemin de service',
      heading: 'Un chemin de service, ouvert à tous',
      body: "Espérez-vous accompagner de jeunes personnes dans la découverte de leur pouvoir de servir, contribuer à l'éducation morale et spirituelle des enfants, explorer des idées qui peuvent transformer l'individu et la société, ou vous rapprocher de Dieu par le culte collectif? Venez vous joindre à un chemin de service emprunté par un nombre croissant de personnes de toutes origines.",
      link: 'Nous rejoindre',
    },
    alwaysGathering: 'Toujours ensemble',
    evergreenBody: "Au-delà de ces événements répertoriés, la communauté se réunit régulièrement pour la dévotion, l'étude et le service.",
    evergreenLink: 'Nous contacter',
  },
  news: {
    eyebrow: 'Nouvelles',
    heading: "Nouvelles bahá'íes mondiales",
    intro: "Des récits de la communauté bahá'íe mondiale, tirés du Service mondial des nouvelles bahá'íes.",
    visitMore: 'Visitez news.bahai.org pour plus de récits',
  },
  contact: {
    eyebrow: 'Nous contacter',
    heading: 'Contactez-nous',
    intro: 'Toute question et toute conversation sont les bienvenues.',
    form: {
      heading: 'Contactez-nous',
      name: 'Nom', email: 'Courriel', phone: 'Téléphone',
      subject: 'Sujet',
      message: 'Message', button: 'Envoyer le message',
    },
    visiting: {
      heading: 'Visites',
      body: "Les visiteurs et ceux qui s'intéressent à la foi bahá'íe sont chaleureusement accueillis. N'hésitez pas à nous contacter ou à passer nous voir.",
    },
    email: { heading: 'Courriel', generalInquiries: 'Demandes générales' },
    follow: { heading: 'Suivez-nous' },
  },
  meta: {
    home: { title: 'Accueil', description: "Le site officiel de la communauté bahá'íe de Winnipeg, Manitoba. Découvrez la foi bahá'íe, les activités communautaires et les événements à venir." },
    about: { title: 'À propos', description: "En savoir plus sur la foi bahá'íe et la communauté bahá'íe de Winnipeg, Manitoba." },
    communityLife: { title: 'Vie communautaire', description: "Découvrez les activités de la communauté bahá'íe de Winnipeg — réunions dévotionnelles, cercles d'étude, classes d'enfants, groupes de jeunes et bien plus encore." },
    learnMore: { title: 'En savoir plus', description: "Découvrez les figures centrales, les enseignements fondamentaux et les principes de la foi bahá'íe." },
    events: { title: 'Événements', description: "Événements et rassemblements à venir de la communauté bahá'íe de Winnipeg." },
    news: { title: 'Nouvelles', description: "Les dernières nouvelles du Service mondial des nouvelles bahá'íes et de la communauté bahá'íe mondiale." },
    contact: { title: 'Contact', description: "Communiquez avec la communauté bahá'íe de Winnipeg." },
  },
}

export default fr
