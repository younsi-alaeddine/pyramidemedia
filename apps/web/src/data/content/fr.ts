import type {
  Service,
  PortfolioItem,
  BlogPost,
  Testimonial,
  TeamMember,
  Stat,
  FaqItem,
} from "@/types";

export const services: Service[] = [
  {
    slug: "website-development",
    title: "Développement web",
    shortDescription:
      "Des sites web performants et orientés conversion, bâtis avec des technologies modernes.",
    description:
      "Nous concevons des sites web sur mesure qui allient design remarquable et performance exceptionnelle. Des sites corporatifs aux applications web complexes, notre équipe de développement livre des solutions évolutives qui accompagnent votre croissance et captivent votre audience.",
    icon: "globe",
    features: [
      "Design responsive et mobile-first",
      "Développement Next.js et React",
      "Intégration de CMS",
      "Optimisation des performances",
      "Conformité à l'accessibilité (WCAG)",
      "Maintenance et support continus",
    ],
    order: 1,
  },
  {
    slug: "e-commerce",
    title: "Solutions e-commerce",
    shortDescription:
      "Des boutiques en ligne évolutives conçues pour des expériences d'achat fluides et une croissance durable.",
    description:
      "Transformez votre vision commerciale en une plateforme e-commerce performante. Nous bâtissons des boutiques en ligne avec des parcours de paiement intuitifs, une gestion d'inventaire efficace et des intégrations qui stimulent les ventes et la fidélisation.",
    icon: "shopping-cart",
    features: [
      "Design de vitrine personnalisé",
      "Shopify, WooCommerce et commerce headless",
      "Intégration de passerelles de paiement",
      "Gestion des stocks et des commandes",
      "Optimisation du taux de conversion",
      "Support multidevise et multilingue",
    ],
    order: 2,
  },
  {
    slug: "custom-software",
    title: "Développement de logiciels sur mesure",
    shortDescription:
      "Des solutions logicielles adaptées à vos défis d'affaires uniques.",
    description:
      "Lorsque les logiciels prêts à l'emploi ne suffisent plus, nous développons des applications personnalisées autour de vos processus. Notre équipe d'ingénierie livre des logiciels robustes et maintenables qui vous donnent un avantage compétitif.",
    icon: "code",
    features: [
      "Analyse des besoins et architecture",
      "Développement full-stack",
      "Conception et intégration d'API",
      "Applications cloud-native",
      "Modernisation de systèmes hérités",
      "DevOps et pipelines CI/CD",
    ],
    order: 3,
  },
  {
    slug: "mobile-applications",
    title: "Applications mobiles",
    shortDescription:
      "Des applications natives et multiplateformes offrant des expériences utilisateur exceptionnelles.",
    description:
      "Rejoignez vos clients où qu'ils soient grâce à des applications mobiles intuitives et engageantes. Nous développons pour iOS, Android et le multiplateforme avec React Native et Flutter.",
    icon: "smartphone",
    features: [
      "Développement iOS et Android",
      "Multiplateforme avec React Native",
      "UI/UX optimisée pour le mobile",
      "Notifications push et analytique",
      "Optimisation App Store",
      "Maintenance et mises à jour fonctionnelles",
    ],
    order: 4,
  },
  {
    slug: "ui-ux-design",
    title: "Conception UI/UX",
    shortDescription:
      "Des interfaces élégantes et intuitives qui enchantent les utilisateurs et stimulent l'engagement.",
    description:
      "Un design réussi est le fondement de tout produit numérique performant. Notre équipe crée des expériences centrées sur l'utilisateur grâce à la recherche, au wireframing, au prototypage et à un design visuel au pixel près.",
    icon: "palette",
    features: [
      "Recherche utilisateur et personas",
      "Wireframing et prototypage",
      "Systèmes de design visuel",
      "Tests d'utilisabilité",
      "Livraison et documentation design",
      "Design axé sur l'accessibilité",
    ],
    order: 5,
  },
  {
    slug: "seo",
    title: "SEO",
    shortDescription:
      "Des stratégies basées sur les données pour dominer les classements de recherche et le trafic organique.",
    description:
      "Soyez trouvé par les clients qui recherchent vos services. Nos experts SEO combinent optimisation technique, stratégie de contenu et netlinking pour améliorer votre visibilité et générer un trafic organique qualifié.",
    icon: "search",
    features: [
      "Audits SEO techniques",
      "Recherche et stratégie de mots-clés",
      "Optimisation on-page",
      "Optimisation de contenu",
      "Campagnes de netlinking",
      "Rapports et analytique mensuels",
    ],
    order: 6,
  },
  {
    slug: "digital-marketing",
    title: "Marketing numérique",
    shortDescription:
      "Des campagnes qui amplifient votre marque et produisent des résultats mesurables.",
    description:
      "Des médias sociaux à la publicité payante, nous créons des stratégies de marketing numérique intégrées qui touchent votre public cible, renforcent la notoriété de votre marque et génèrent des prospects convertibles.",
    icon: "megaphone",
    features: [
      "Gestion des médias sociaux",
      "PPC et publicité payante",
      "Campagnes de marketing par courriel",
      "Stratégie de marketing de contenu",
      "Analytique et suivi de performance",
      "Automatisation marketing",
    ],
    order: 7,
  },
  {
    slug: "branding",
    title: "Image de marque",
    shortDescription:
      "Des identités de marque distinctives qui résonnent avec votre public cible.",
    description:
      "Votre marque va bien au-delà d'un logo — c'est la promesse que vous faites à vos clients. Nous élaborons des stratégies de marque complètes et des identités visuelles qui communiquent vos valeurs et vous différencient sur le marché.",
    icon: "brush",
    features: [
      "Stratégie et positionnement de marque",
      "Conception de logo et identité visuelle",
      "Charte graphique",
      "Développement du ton de voix",
      "Design de supports de marque",
      "Rebranding et rafraîchissement",
    ],
    order: 8,
  },
  {
    slug: "graphic-design",
    title: "Design graphique",
    shortDescription:
      "Des visuels percutants qui transmettent votre message avec clarté et impact.",
    description:
      "Des supports marketing aux actifs numériques, nos designers graphiques créent des visuels convaincants qui renforcent votre présence de marque à chaque point de contact.",
    icon: "image",
    features: [
      "Supports marketing",
      "Visuels pour médias sociaux",
      "Conception de présentations",
      "Infographies et visualisation de données",
      "Design imprimé",
      "Créations publicitaires numériques",
    ],
    order: 9,
  },
  {
    slug: "hosting",
    title: "Solutions d'hébergement",
    shortDescription:
      "Une infrastructure d'hébergement fiable et sécurisée, disponible en tout temps.",
    description:
      "Assurez le bon fonctionnement de vos actifs numériques grâce à des solutions d'hébergement de calibre entreprise. Nous offrons l'hébergement géré, les certificats SSL, les sauvegardes et la surveillance pour que vous puissiez vous concentrer sur votre entreprise.",
    icon: "server",
    features: [
      "Hébergement cloud géré",
      "SSL et renforcement de la sécurité",
      "Sauvegardes automatisées",
      "Intégration CDN",
      "Surveillance de disponibilité 24/7",
      "Infrastructure évolutive",
    ],
    order: 10,
  },
  {
    slug: "business-consulting",
    title: "Conseil en affaires",
    shortDescription:
      "Un accompagnement stratégique pour accélérer votre transformation numérique.",
    description:
      "Naviguez les complexités de la transformation numérique avec l'appui d'experts. Nous vous aidons à définir des feuilles de route technologiques, à optimiser vos processus et à prendre des décisions éclairées qui stimulent la croissance.",
    icon: "briefcase",
    features: [
      "Conseil en stratégie numérique",
      "Évaluation technologique",
      "Optimisation des processus",
      "Sélection et gestion de fournisseurs",
      "Gestion du changement",
      "Analyse et rapports de ROI",
    ],
    order: 11,
  },
];

export const portfolioItems: PortfolioItem[] = [
  {
    slug: "snack-simple",
    title: "Snack Simple — Commerce en ligne",
    client: "Snack Simple",
    category: "Commerce en ligne",
    description:
      "Boutique en ligne bilingue pour produits collations santé — pages produits riches, localisateur de magasins, panier d'achat et expérience de marque moderne pour le marché québécois et canadien.",
    technologies: ["Shopify", "E-commerce", "Bilingue FR/EN", "Design UX"],
    images: ["/images/portfolio/snack-simple.png"],
    featured: true,
    caseStudyUrl: "/case-studies/snack-simple",
  },
  {
    slug: "lartisan-residence",
    title: "L'Artisan Résidence avec Soins",
    client: "L'Artisan Résidence avec Soins",
    category: "Développement web",
    description:
      "Site chaleureux et accessible pour une résidence pour aînés avec soins — mettant en valeur les promotions, la vie en résidence, les services de soins et un contact facile pour les familles.",
    technologies: ["WordPress", "Design responsive", "SEO", "Génération de leads"],
    images: ["/images/portfolio/lartisan-residence.png"],
    featured: true,
    caseStudyUrl: "/case-studies/lartisan-residence",
  },
  {
    slug: "multi-prets",
    title: "Multi-Prêts Hypothèques",
    client: "Multi-Prêts Hypothèques",
    category: "Développement web",
    description:
      "Site professionnel pour courtier hypothécaire avec sections dédiées à l'achat, le renouvellement et le refinancement — conçu pour inspirer confiance et convertir les visiteurs en prospects qualifiés.",
    technologies: ["WordPress", "Formulaires", "SEO", "Design responsive"],
    images: ["/images/portfolio/multi-prets.png"],
    featured: true,
    caseStudyUrl: "/case-studies/multi-prets",
  },
  {
    slug: "dr-elzoghbi",
    title: "Dr André Elzoghbi — Clinique d'orthodontie",
    client: "Dr André Elzoghbi",
    category: "Développement web",
    description:
      "Site moderne pour clinique d'orthodontie avec portail patient, prise de rendez-vous en ligne, information sur les aligneurs, FAQ et contact d'urgence — optimisé pour l'expérience patient.",
    technologies: ["WordPress", "Portail patient", "Réservation", "SEO"],
    images: ["/images/portfolio/dr-elzoghbi.png"],
    featured: true,
    caseStudyUrl: "/case-studies/dr-elzoghbi",
  },
  {
    slug: "friperie-deluxe",
    title: "Friperie Deluxe En ligne",
    client: "Friperie Deluxe En ligne",
    category: "Commerce en ligne",
    description:
      "Boutique en ligne haut de gamme de friperie avec programme de membership, liste de souhaits, livraison express, prix taxes incluses et expérience d'achat soignée.",
    technologies: ["Shopify", "E-commerce", "Membership", "Bilingue"],
    images: ["/images/portfolio/friperie-deluxe.png"],
    featured: true,
    caseStudyUrl: "/case-studies/friperie-deluxe",
  },
  {
    slug: "salon-tammam",
    title: "Salon Tammam Style",
    client: "Salon Tammam Style",
    category: "Développement web",
    description:
      "Site bilingue élégant pour salon de coiffure — présentation des services, portfolio de réalisations et identité de marque premium avec intégration contact fluide.",
    technologies: ["WordPress", "Bilingue FR/EN", "Design responsive", "SEO"],
    images: ["/images/portfolio/salon-tammam.png"],
    featured: true,
    caseStudyUrl: "/case-studies/salon-tammam",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Nadia Tremblay",
    role: "Directrice",
    company: "L'Artisan Résidence avec Soins",
    quote:
      "Pyramide Media a compris nos résidents et leurs familles. Le nouveau site reflète la chaleur de notre résidence et nos appels de renseignements ont nettement augmenté.",
    rating: 5,
  },
  {
    id: "2",
    name: "Karim Mansouri",
    role: "Courtier hypothécaire",
    company: "Multi-Prêts Hypothèques",
    quote:
      "Notre site transmet maintenant professionnalisme et confiance. La génération de leads s'est améliorée dès le lancement, et l'équipe de Pyramide Media a été réactive tout au long du projet.",
    rating: 5,
  },
  {
    id: "3",
    name: "Sophie Lavoie",
    role: "Fondatrice",
    company: "Snack Simple",
    quote:
      "Des pages produits au localisateur de magasins, chaque détail a été soigné. Nos ventes en ligne ont progressé régulièrement grâce à une expérience e-commerce rapide et élégante.",
    rating: 5,
  },
  {
    id: "4",
    name: "Tammam H.",
    role: "Propriétaire",
    company: "Salon Tammam Style",
    quote:
      "Le site bilingue représente parfaitement l'identité de notre salon. Les clients nous trouvent facilement en ligne et nos demandes de rendez-vous n'ont jamais été aussi élevées.",
    rating: 5,
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Tarek Boumessouer",
    role: "Fondateur et PDG",
    bio: "Entrepreneur et leader numérique avec plus de 12 ans d'expérience en développement web, commerce en ligne et stratégie de croissance. À titre de PDG de Pyramide Media, Tarek dirige une équipe montréalaise qui bâtit des expériences numériques à fort impact pour des entreprises du Québec et de l'Amérique du Nord — en combinant excellence technique et compréhension profonde des objectifs clients.",
    social: { linkedin: "https://ca.linkedin.com/company/pyramide-m%C3%A9dia" },
  },
];

export const stats: Stat[] = [
  { value: 150, suffix: "+", label: "Projets livrés" },
  { value: 98, suffix: "%", label: "Satisfaction client" },
  { value: 12, suffix: "+", label: "Années d'expérience" },
  { value: 50, suffix: "+", label: "Clients satisfaits" },
];

export const faqs: FaqItem[] = [
  {
    question: "Quels services Pyramide Media offre-t-elle?",
    answer:
      "Nous offrons une gamme complète de services numériques : développement web, solutions e-commerce, logiciels sur mesure, applications mobiles, conception UI/UX, SEO, marketing numérique, image de marque, design graphique, hébergement et conseil en affaires.",
  },
  {
    question: "Combien de temps dure un projet typique?",
    answer:
      "Les délais varient selon la portée et la complexité du projet. Un site web standard prend de 6 à 10 semaines, tandis qu'un logiciel sur mesure peut nécessiter de 3 à 6 mois. Nous fournissons un calendrier détaillé lors de la phase de découverte.",
  },
  {
    question: "Travaillez-vous avec des clients à l'international?",
    answer:
      "Oui, nous accompagnons des clients partout dans le monde. Notre équipe opère dans plusieurs fuseaux horaires et possède une solide expérience auprès d'entreprises en Europe, en Amérique du Nord et au-delà.",
  },
  {
    question: "Quel est votre processus de projet?",
    answer:
      "Nous suivons un processus éprouvé en quatre phases : Découverte (comprendre vos objectifs), Stratégie (planifier la solution), Exécution (design et développement), et Lancement (déploiement et optimisation).",
  },
  {
    question: "Offrez-vous un support continu après le lancement?",
    answer:
      "Absolument. Nous proposons des forfaits de maintenance, des solutions d'hébergement et des services d'optimisation continue pour que vos produits numériques maintiennent leurs performances optimales.",
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "future-of-web-development-2026",
    title: "L'avenir du développement web en 2026",
    excerpt:
      "Explorez les tendances qui façonnent le développement web moderne — des composants serveur à l'informatique en périphérie et au-delà.",
    content: `
## L'évolution se poursuit

Le développement web évolue à un rythme sans précédent. En 2026, nous observons une convergence entre performance, expérience développeur et design centré sur l'utilisateur qui redéfinit notre façon de bâtir pour le web.

### Composants serveur et rendu en périphérie

Le virage vers des architectures serveur-first continue de s'accélérer. Des frameworks comme Next.js ont fait des composants serveur la norme, réduisant le JavaScript côté client et améliorant les scores Core Web Vitals de façon générale.

### Développement assisté par l'IA (pas des produits générés par l'IA)

Si les outils d'IA aident les développeurs à coder plus rapidement, l'accent demeure sur des solutions réfléchies et conçues par des humains. Les meilleures agences tirent parti de l'IA pour la productivité tout en conservant la réflexion stratégique qui génère de vrais résultats d'affaires.

### La performance comme fonctionnalité

Avec l'importance continue accordée par Google aux Core Web Vitals, l'optimisation des performances n'est plus optionnelle. Le chargement différé, l'optimisation des images et le fractionnement du code sont des attentes de base pour tout site web professionnel.

## Ce que cela signifie pour votre entreprise

S'associer à une agence qui anticipe ces tendances garantit que votre présence numérique demeure compétitive, rapide et pérenne.
    `,
    tags: ["Développement web", "Technologie", "Tendances"],
    publishedAt: "2026-03-15",
    author: { name: "Tarek Boumessouer" },
  },
  {
    slug: "ecommerce-conversion-optimization",
    title: "10 stratégies d'optimisation de conversion e-commerce qui fonctionnent",
    excerpt:
      "Des tactiques éprouvées pour convertir davantage de visiteurs en clients payants et augmenter votre panier moyen.",
    content: `
## Maximisez le potentiel de votre boutique

L'optimisation du taux de conversion est l'activité au meilleur retour sur investissement pour toute entreprise e-commerce. Voici dix stratégies que nous avons utilisées pour obtenir des résultats mesurables pour nos clients.

### 1. Simplifiez votre processus de paiement

Chaque étape supplémentaire au paiement vous coûte des ventes. Mettez en place le paiement invité, le remplissage automatique et plusieurs options de paiement.

### 2. Optimisez vos pages produits

Des images de qualité, des descriptions détaillées, de la preuve sociale et des appels à l'action clairs sont indispensables pour convertir les visiteurs en acheteurs.

### 3. Exploitez la preuve sociale

Les avis clients, les badges de confiance et les notifications d'achat en temps réel renforcent la confiance et réduisent l'anxiété à l'achat.

## En résumé

Les petites améliorations s'accumulent. Une hausse de 1 % du taux de conversion peut représenter des centaines de milliers de dollars de revenus supplémentaires pour une boutique établie.
    `,
    tags: ["E-commerce", "Marketing", "Conversion"],
    publishedAt: "2026-02-28",
    author: { name: "Tarek Boumessouer" },
  },
  {
    slug: "brand-identity-digital-age",
    title: "Bâtir une identité de marque qui se démarque à l'ère numérique",
    excerpt:
      "Comment créer une présence de marque cohérente qui résonne à travers tous vos points de contact numériques.",
    content: `
## Au-delà du logo

Dans le paysage numérique saturé d'aujourd'hui, une identité de marque forte est votre atout le plus précieux. Il ne s'agit pas seulement d'être esthétique — il s'agit d'être instantanément reconnaissable et émotionnellement marquant.

### Cohérence sur tous les canaux

Votre marque doit offrir une expérience unifiée, que le client vous découvre sur votre site web, les médias sociaux, par courriel ou en personne. Cela exige un système de marque complet, pas seulement un fichier logo.

### Une pensée design numérique d'abord

Les identités de marque modernes doivent fonctionner à la taille d'un favicon comme sur un panneau publicitaire. Elles doivent s'adapter au mode sombre, aux contextes animés et aux mises en page responsives.

### Une image de marque portée par le récit

Les marques les plus mémorables racontent une histoire. Votre identité visuelle doit refléter vos valeurs, votre mission et la transformation que vous offrez à vos clients.
    `,
    tags: ["Image de marque", "Design", "Stratégie"],
    publishedAt: "2026-01-20",
    author: { name: "Tarek Boumessouer" },
  },
];
