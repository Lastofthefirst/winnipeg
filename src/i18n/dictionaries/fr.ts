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
    learnMore: 'En savoir plus', events: 'Événements', news: 'Nouvelles', contact: 'Contact',
  },
  footer: { explore: 'Explorer', officialResources: 'Ressources officielles', connect: 'Connexion' },
  contactSection: { heading: "Rejoignez la communauté bahá'íe", button: 'Nous contacter' },
  eventsPreview: {
    eyebrow: 'Événements',
    heading: 'Rassemblements à venir',
    intro: "Les bahá'ís et leurs amis se rassemblent pour la prière, l'étude, la célébration et le service. Tous sont les bienvenus.",
    seeAllEvents: 'Voir tous les événements',
    invitation: {
      eyebrow: 'Un chemin de service',
      heading: 'Un chemin de service, ouvert à tous',
      body: "Espérez-vous accompagner de jeunes personnes dans la découverte de leur pouvoir de servir, contribuer à l'éducation morale et spirituelle des enfants, explorer des idées qui peuvent transformer l'individu et la société, ou vous rapprocher de Dieu par le culte collectif? Venez vous joindre à un chemin de service emprunté par un nombre croissant de personnes de tous horizons.",
      link: 'Nous rejoindre',
    },
  },
  home: {
    hero: mergeCms({
      eyebrow: "Communauté bahá'íe de Winnipeg",
      heading: "Là où les rivières se rejoignent, les cœurs s'unissent",
      subheading: "Une communauté accueillante dédiée à l'unité de l'humanité, réunie sur le Territoire du Traité no 1 au cœur des Prairies.",
      ctaActivities: 'Activités',
      ctaContact: 'Contact',
    }, cms.hero),
    activities: mergeCms({
      heading: 'Construire des communautés vibrantes',
      intro: "Dans nos communautés, nous apprenons à créer des espaces où des personnes de tous âges peuvent se rassembler pour réfléchir sur des enseignements spirituels, renforcer l'amitié, consulter ensemble, s'accompagner mutuellement et contribuer au bien-être de leurs quartiers. La communauté bahá'íe de Winnipeg est engagée dans des activités qui comprennent des rassemblements dévotionnels, des classes pour enfants, des groupes de jeunes, des cercles d'étude, des visites à domicile et des actes de service. Comme les rivières qui se rejoignent aux Forks, les bahá'ís et leurs amis se réunissent depuis toutes origines, unis par une vision commune d'une communauté pacifique et florissante.",
      link: 'En savoir plus',
      items: [
        { title: "Classes d'enfants", description: "Nourrir le développement spirituel des jeunes cœurs par des histoires, des chants, de l'art et une éducation fondée sur les vertus." },
        { title: "Jeunes d'aujourd'hui", description: "Accompagner les jeunes de 12 à 15 ans dans le développement de leurs capacités d'expression, de leur raisonnement moral et de leur aptitude au service communautaire." },
        { title: 'Réunions dévotionnelles', description: "Se rassembler pour le culte collectif — prières, lectures sacrées et réflexion tranquille — dans un cadre accueillant ouvert à tous." },
        { title: "Cercles d'étude", description: "Explorer les principes spirituels et sociaux en petits groupes, en développant une capacité de service à la société." },
      ],
    }, cms.activities),
    community: mergeCms({
      eyebrow: 'À Winnipeg',
      heading: 'Là où les rivières se rencontrent',
      body: [
        "Les deux rivières convergent aux Forks en un courant uni — la vision de Bahá'u'lláh rassemble des personnes de toutes origines en une seule communauté, œuvrant vers un monde plus juste et plus pacifique.",
        "L'assemblée spirituelle locale fut constituée en 1953, mais des bahá'ís étaient présents à Winnipeg depuis des décennies auparavant, cherchant à promouvoir le progrès spirituel et matériel de la communauté.",
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
      "Les bahá'ís se consacrent à un double effort : prendre soin de la vie intérieure de l'individu et contribuer à la transformation de la société. Ces buts ne sont pas séparés. Par des réunions dévotionnelles, des cercles d'étude et des programmes pour les enfants et les jeunes, les bahá'ís et leurs amis s'efforcent de bâtir des communautés qui reflètent les principes de justice, d'unité et de l'unité de l'humanité.",
    ],
    stats: { bahaisWorldwide: "Bahá'ís dans le monde", localitiesGlobally: 'Localités dans le monde', yearsInWinnipeg: 'Ans à Winnipeg' },
    corePrinciples: {
      eyebrow: 'Principes fondamentaux',
      heading: "L'unité de l'humanité — le pivot autour duquel tout tourne.",
      intro: "Les bahá'ís croient que l'humanité est une seule famille. Tout le reste découle de cette conviction : l'égalité des femmes et des hommes, l'élimination des préjugés, l'harmonie entre la science et la religion.",
      items: [
        { title: "Unité de l'humanité", body: "Tous les peuples appartiennent à une seule famille humaine. Ce n'est pas simplement un idéal, mais le fondement sur lequel une civilisation juste et pacifique peut être bâtie." },
        { title: 'Égalité des femmes et des hommes', body: "L'humanité est comme un oiseau : une aile est les femmes, l'autre les hommes. Ce n'est que lorsque les deux ailes sont également fortes que l'oiseau peut voler." },
        { title: 'Élimination des préjugés', body: "De toutes les formes de préjugés, le préjugé racial est le plus destructeur. Les bahá'ís s'efforcent activement de tisser des liens au-delà de toutes les lignes de division." },
        { title: 'Harmonie entre la science et la religion', body: "La religion sans la science est superstition ; la science sans la religion est matérialisme. Les deux sont nécessaires au progrès de la civilisation." },
        { title: 'Recherche indépendante de la vérité', body: "Chaque personne a le droit et la responsabilité de chercher la vérité de manière indépendante — sans être entravée par la tradition, la superstition ou l'imitation des autres." },
        { title: 'Éducation universelle', body: "Considérez chaque être humain comme une mine riche en pierres précieuses. L'éducation seule peut en révéler les trésors et permettre à toute l'humanité d'en bénéficier." },
      ],
    },
    localCommunity: {
      eyebrow: 'À Winnipeg',
      heading: "Les bahá'ís de Winnipeg",
      intro: "Les deux rivières convergent aux Forks en un courant uni — la vision de Bahá'u'lláh rassemble des personnes de toutes origines en une seule communauté, œuvrant vers un monde plus juste et plus pacifique.",
      body: [
        "La communauté bahá'íe de Winnipeg est présente depuis plus d'un siècle, passant d'une poignée de premiers croyants à une communauté dynamique qui reflète le riche patrimoine multiculturel de la ville. Des membres de dizaines de milieux culturels se réunissent dans un esprit d'unité et d'objectif commun.",
        "Les bahá'ís et leurs amis sont profondément engagés dans la vie des quartiers de Winnipeg — par des réunions dévotionnelles, des cercles d'étude, des classes d'enfants et des programmes pour les jeunes. Ils travaillent aux côtés de leurs voisins et de tous ceux qui partagent le désir de cultiver l'espoir et de promouvoir l'effort délibéré dans le monde.",
        "Chaque personne a une contribution à apporter. Que vous exploriez la foi bahá'íe pour la première fois ou que vous cherchiez simplement à participer à quelque chose de significatif, il y a une place ici.",
      ],
    },
  },
  communityLife: {
    eyebrow: 'Vie communautaire',
    heading: "Grandir ensemble dans l'esprit et le service",
    intro: "À Winnipeg, les bahá'ís et leurs amis sont engagés dans un modèle croissant d'activités de construction communautaire qui rassemblent des personnes pour prier, réfléchir, apprendre, servir et contribuer au bien-être de la communauté plus large. Ce qui se déroule ici fait partie d'un effort mondial, car des communautés partout dans le monde apprennent à bâtir l'unité, à autonomiser les jeunes, à renforcer les familles et les quartiers, et à œuvrer pour l'amélioration de la société. Tous sont chaleureusement invités à se joindre et à faire partie de cette communauté en croissance. (Tous sont les bienvenus).",
    devotional: {
      title: 'Réunions dévotionnelles',
      body: [
        "Les réunions dévotionnelles rassemblent des personnes pour le culte collectif — lire et réfléchir sur des écrits sacrés, offrir des prières et cultiver les sensibilités spirituelles qui soutiennent une vie de service. Elles se tiennent dans des maisons, des espaces communautaires et partout où les gens choisissent de se réunir.",
        "Ces rassemblements sont ouverts à tous, quel que soit leur milieu ou leur croyance. Il n'y a aucune obligation de parler ou de se produire — vous pouvez venir simplement pour écouter, réfléchir ou ajouter votre voix à celles des autres.",
      ],
      whatToExpect: "À quoi s'attendre",
      tags: ['Prières et lectures sacrées', 'Musique et chants dévotionnels', 'Réflexion tranquille', 'Ouvert à toutes les confessions'],
    },
    studyCircles: {
      title: "Cercles d'étude",
      body: [
        "Un cercle d'étude est un petit groupe de personnes qui se réunit avec un tuteur pour travailler sur la séquence principale de cours de l'Institut Ruhi. L'atmosphère est celle de la joie, du calme et de la sérénité méditative — un espace pour lire, réfléchir, discuter et construire la compréhension qui soutient un service significatif.",
        "Les cours explorent des thèmes tels que la vie de l'esprit, le service aux autres et les forces qui façonnent les individus et les communautés. Ils sont conçus pour renforcer la capacité des jeunes et des adultes à contribuer au bien-être de leurs communautés. Les amis et les voisins de tout milieu sont les bienvenus.",
      ],
    },
    childrensClasses: {
      title: "Classes d'enfants",
      body: [
        "Les classes d'enfants se concentrent sur le développement des qualités spirituelles — les croyances, les habitudes et les modes de conduite qui constituent une vie digne et significative. Par des histoires, des chants, des prières, de l'art et des jeux coopératifs, les enfants sont aidés à découvrir et à renforcer des vertus telles que l'honnêteté, la gentillesse, la générosité et l'amour de l'apprentissage.",
        "Les classes sont ouvertes à tous les enfants du quartier âgés de 5 à 11 ans. Le programme est mis en œuvre par des enseignants formés qui eux-mêmes marchent sur un chemin de service.",
      ],
      programHighlights: 'Points forts du programme',
      tags: ['Histoires', 'Chants', 'Prières', 'Art', 'Jeux coopératifs', 'Âges 5 à 11 ans'],
    },
    juniorYouth: {
      title: 'Autonomisation spirituelle des jeunes',
      body: [
        "Les années entre 12 et 15 ans sont une période cruciale de développement — un moment où les jeunes forment leur identité et décident quel type de personne ils veulent être. Le programme d'autonomisation spirituelle des jeunes les accompagne à travers cette étape, les aidant à orienter leurs énergies et leurs talents vers l'avancement de leurs communautés.",
        "De petits groupes de jeunes se réunissent régulièrement avec un animateur plus âgé pour travailler sur des textes qui développent leurs pouvoirs d'expression, leur raisonnement moral et leur capacité de service. Le programme est ouvert à tous les jeunes du quartier, quel que soit leur milieu.",
      ],
    },
    service: {
      eyebrow: "L'esprit animateur",
      heading: 'Le service',
      body: [
        "Les bahá'ís comprennent le service comme une expression de l'amour pour l'humanité et comme le moyen par lequel les qualités spirituelles se développent. De telles qualités ne s'acquièrent pas en se concentrant sur soi-même — elles grandissent dans l'acte de donner. La dévotion soutient cette impulsion ; le service lui donne forme. Ensemble, ils donnent naissance à un mode de vie communautaire imprégné de l'esprit d'adoration.",
        "Cette compréhension harmonise l'être et le faire, et la transformation individuelle et collective. Servir sa communauté, c'est participer à la construction d'un monde meilleur — et ce faisant, transformer son propre caractère.",
      ],
    },
    values: {
      eyebrow: 'Principes en action',
      heading: "Deux dimensions d'un processus en cours",
      intro: "La communauté bahá'íe est engagée dans un double effort : prendre soin de la vie intérieure de l'individu et contribuer à la transformation de la société. Ce ne sont pas des buts séparés — ils sont inséparables.",
      items: [
        { title: "Unité de l'humanité", body: "Le principe que tous les peuples appartiennent à une seule famille humaine est le pivot autour duquel tournent les enseignements de la foi bahá'íe — non pas simplement un idéal, mais le fondement de toute action communautaire." },
        { title: 'Transformation individuelle et collective', body: "Les qualités spirituelles ne s'acquièrent pas en se concentrant sur soi-même ; elles se développent dans le service aux autres. La croissance personnelle et communautaire sont inséparables et mutuellement enrichissantes." },
        { title: 'Dévotion et service en harmonie', body: "L'adoration éveille les sensibilités spirituelles ; le service leur donne expression. Ensemble, ils donnent naissance à un mode de vie communautaire imprégné de l'esprit de dévotion." },
        { title: "Apprentissage par l'action", body: "La construction communautaire est abordée comme un processus d'apprentissage — non pas seulement une étude théorique, mais une réflexion sur l'expérience vécue, un ajustement de cap et une croissance à travers le travail lui-même." },
        { title: 'Participation universelle', body: "Chaque personne a une contribution à apporter. Nos activités sont ouvertes à tous et chaque voix est précieuse dans la conversation sur la construction d'un monde meilleur." },
        { title: 'Civilisation matérielle et spirituelle', body: "Pour la communauté bahá'íe, la vie intérieure et l'action pratique sont profondément liées. Construire un monde juste est en soi une entreprise spirituelle." },
      ],
    },
  },
  learnMore: {
    eyebrow: 'En savoir plus',
    heading: "Explorer la foi bahá'íe",
    intro: "La foi bahá'íe aborde à la fois la vie spirituelle de l'individu et les structures de la société humaine — offrant une vision cohérente de la justice, de l'unité et de l'unité de l'humanité.",
    body: "Fondée au XIXe siècle, la foi s'est répandue dans pratiquement tous les pays et territoires du monde. Sa conviction centrale est que l'humanité est une seule famille, que toutes les grandes religions du monde proviennent de la même source divine et que l'ère de paix promise est maintenant à la portée de l'humanité.",
    centralFigures: {
      eyebrow: 'Figures centrales',
      heading: "Les fondateurs et l'exemplaire de la foi bahá'íe",
      intro: "La foi bahá'íe est centrée sur la vie et les écrits de trois figures — le Báb, Bahá'u'lláh et 'Abdu'l-Bahá — dont la vision de l'unité de l'humanité continue d'inspirer des millions de personnes dans le monde.",
      items: [
        { title: "Bahá'u'lláh (1817–1892)", body: "Le Fondateur de la foi bahá'íe et sa figure centrale. Né à Téhéran, Bahá'u'lláh a enduré quarante ans d'exil et d'emprisonnement pour avoir proclamé Son message que l'humanité est une seule famille et que le moment tant attendu de son unification est arrivé. Ses écrits comprennent plus de 100 volumes et constituent les écritures sacrées de la foi." },
        { title: 'Le Báb (1819–1850)', body: "Le Héraut de la foi bahá'íe. En 1844, le Báb a déclaré Sa mission et a appelé l'humanité au renouveau spirituel, annonçant la venue du Promis attendu par les religions du monde." },
        { title: "'Abdu'l-Bahá (1844–1921)", body: "Le fils de Bahá'u'lláh et le Centre de Son Alliance — désigné par Bahá'u'lláh comme le seul interprète autorisé de Ses enseignements. 'Abdu'l-Bahá est considéré comme l'exemplaire parfait de la vie bahá'íe : celui en qui toutes les vertus spirituelles et humanitaires de la foi ont trouvé leur expression complète." },
      ],
    },
    coreTeachings: {
      eyebrow: 'Enseignements fondamentaux',
      heading: "L'unité de Dieu, de la religion et de l'humanité",
      intro: "Au cœur de la foi bahá'íe se trouvent des enseignements sur l'unité de Dieu et de la religion, l'unité de l'humanité et la libération des préjugés, et l'harmonie entre la science et la religion. Ce ne sont pas des idéaux abstraits — ce sont des principes pour l'organisation de la vie humaine et la construction de la civilisation.",
      items: [
        { title: 'Unité de Dieu', body: "Il n'y a qu'un seul Dieu — inconnaissable dans Son essence, mais rendu connu à l'humanité par une succession de Messagers divins. Toutes les grandes religions du monde découlent de cette seule source." },
        { title: 'Révélation progressive', body: "La vérité religieuse est révélée progressivement. Les Manifestations de Dieu — Abraham, Moïse, Bouddha, le Christ, Muhammad, Bahá'u'lláh — ont chacun apporté des enseignements adaptés aux besoins et à la capacité de l'époque dans laquelle ils sont apparus." },
        { title: "Unité de l'humanité", body: "La diversité du genre humain n'est pas une source de division mais une cause d'amour et d'harmonie. Tous les préjugés — de race, de classe, de nationalité ou de religion — doivent être surmontés." },
        { title: 'Noblesse inhérente', body: "Chaque être humain est \"une mine riche en gemmes d'une valeur inestimable\". Le but de l'éducation, spirituelle et matérielle, est de révéler ces capacités intérieures au service les uns des autres et de la civilisation." },
        { title: 'Harmonie entre la science et la religion', body: "La science et la religion sont deux systèmes de connaissance complémentaires. La religion sans la science conduit à la superstition ; la science sans la religion conduit au matérialisme. Les deux sont essentielles au progrès humain." },
        { title: 'Justice', body: "La justice est ce qu'il y a de plus aimé aux yeux de Dieu et la centralité de la justice dans toutes les entreprises humaines est une pierre angulaire de l'enseignement social bahá'í. Une société juste défend les droits et la dignité de chaque personne." },
      ],
    },
    officialResources: {
      eyebrow: 'Ressources officielles',
      heading: 'Approfondissez votre exploration',
      intro: "Ces sites web bahá'ís officiels offrent une mine d'informations, de textes sacrés, de récits d'actualité et de ressources pour une étude approfondie.",
    },
  },
  events: {
    eyebrow: 'Événements',
    heading: 'Rassemblements à venir',
    intro: "Que vous soyez parent, jeune personne ou simplement quelqu'un qui s'intéresse à son quartier, il y a une place pour vous. Nous parcourons ce chemin ensemble — localement et globalement — et vous êtes chaleureusement invité à participer : rejoignez un rassemblement, entrez en contact avec d'autres et aidez à bâtir une communauté où tous peuvent se sentir chez eux et contribuer.",
    invitation: {
      eyebrow: 'Un chemin de service',
      heading: 'Un chemin de service, ouvert à tous',
      body: "Espérez-vous accompagner de jeunes personnes dans la découverte de leur pouvoir de servir, contribuer à l'éducation morale et spirituelle des enfants, explorer des idées qui peuvent transformer l'individu et la société, ou vous rapprocher de Dieu par le culte collectif? Venez vous joindre à un chemin de service emprunté par un nombre croissant de personnes de tous horizons.",
      link: 'Nous rejoindre',
    },
    alwaysGathering: 'Toujours ensemble',
    evergreenBody: "Au-delà de ces événements répertoriés, la communauté se réunit continuellement pour la dévotion, l'étude et le service.",
    evergreenLink: 'Nous contacter',
  },
  news: {
    eyebrow: 'Nouvelles',
    heading: "Nouvelles bahá'íes mondiales",
    intro: "Des récits de la communauté bahá'íe mondiale, tirés du Service mondial des nouvelles bahá'íes.",
    visitMore: 'Visitez news.bahai.org pour plus de récits',
  },
  contact: {
    eyebrow: 'Contact',
    heading: 'Nous joindre',
    intro: 'Toute question et toute conversation sont les bienvenues.',
    form: {
      heading: 'Nous joindre',
      name: 'Nom', email: 'Courriel', phone: 'Téléphone',
      subject: 'Sujet', subjectPlaceholder: 'Sélectionnez une raison',
      subjectOptions: ["Demande générale", "Participer à un événement", "En savoir plus sur la foi", "Activités communautaires", "Location de salle", "Autre"],
      message: 'Message', button: 'Envoyer le message',
    },
    visiting: {
      heading: 'Visites',
      body: "Les visiteurs et ceux qui s'intéressent à la foi bahá'íe sont chaleureusement accueillis. N'hésitez pas à nous contacter ou à passer.",
    },
    email: { heading: 'Courriel', generalInquiries: 'Demandes générales', information: 'Information' },
    follow: { heading: 'Suivez-nous' },
  },
  meta: {
    home: { title: 'Accueil', description: "Le site officiel de la communauté bahá'íe de Winnipeg, Manitoba. Découvrez la foi bahá'íe, les activités communautaires et les événements à venir." },
    about: { title: 'À propos', description: "En savoir plus sur la foi bahá'íe et la communauté bahá'íe de Winnipeg, Manitoba." },
    communityLife: { title: 'Vie communautaire', description: "Découvrez les activités de la communauté bahá'íe de Winnipeg — réunions dévotionnelles, cercles d'étude, classes d'enfants, groupes de jeunes et bien plus encore." },
    learnMore: { title: 'En savoir plus', description: "Renseignez-vous sur les figures centrales, les enseignements et les principes de la foi bahá'íe." },
    events: { title: 'Événements', description: "Événements et rassemblements à venir de la communauté bahá'íe de Winnipeg." },
    news: { title: 'Nouvelles', description: "Les dernières nouvelles du Service mondial des nouvelles bahá'íes et de la communauté bahá'íe mondiale." },
    contact: { title: 'Contact', description: "Communiquez avec la communauté bahá'íe de Winnipeg." },
  },
}

export default fr
