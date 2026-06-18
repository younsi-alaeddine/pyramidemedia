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
    title: "Website Development",
    shortDescription:
      "High-performance, conversion-focused websites built with modern technologies.",
    description:
      "We craft bespoke websites that combine stunning design with blazing-fast performance. From corporate sites to complex web applications, our development team delivers solutions that scale with your business and captivate your audience.",
    icon: "globe",
    features: [
      "Responsive, mobile-first design",
      "Next.js & React development",
      "CMS integration",
      "Performance optimization",
      "Accessibility compliance (WCAG)",
      "Ongoing maintenance & support",
    ],
    order: 1,
  },
  {
    slug: "e-commerce",
    title: "E-commerce Solutions",
    shortDescription:
      "Scalable online stores engineered for seamless shopping experiences and growth.",
    description:
      "Transform your retail vision into a powerful e-commerce platform. We build online stores with intuitive checkout flows, inventory management, and integrations that drive sales and customer loyalty.",
    icon: "shopping-cart",
    features: [
      "Custom storefront design",
      "Shopify, WooCommerce & headless commerce",
      "Payment gateway integration",
      "Inventory & order management",
      "Conversion rate optimization",
      "Multi-currency & multi-language support",
    ],
    order: 2,
  },
  {
    slug: "custom-software",
    title: "Custom Software Development",
    shortDescription:
      "Tailored software solutions that solve your unique business challenges.",
    description:
      "When off-the-shelf software falls short, we build custom applications designed around your workflows. Our engineering team delivers robust, maintainable software that gives you a competitive edge.",
    icon: "code",
    features: [
      "Requirements analysis & architecture",
      "Full-stack development",
      "API design & integration",
      "Cloud-native applications",
      "Legacy system modernization",
      "DevOps & CI/CD pipelines",
    ],
    order: 3,
  },
  {
    slug: "mobile-applications",
    title: "Mobile Applications",
    shortDescription:
      "Native and cross-platform mobile apps with exceptional user experiences.",
    description:
      "Reach your customers wherever they are with mobile applications that deliver intuitive, engaging experiences. We develop for iOS, Android, and cross-platform using React Native and Flutter.",
    icon: "smartphone",
    features: [
      "iOS & Android development",
      "Cross-platform with React Native",
      "UI/UX optimized for mobile",
      "Push notifications & analytics",
      "App Store optimization",
      "Maintenance & feature updates",
    ],
    order: 4,
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    shortDescription:
      "Beautiful, intuitive interfaces that delight users and drive engagement.",
    description:
      "Great design is the foundation of every successful digital product. Our design team creates user-centered experiences through research, wireframing, prototyping, and pixel-perfect visual design.",
    icon: "palette",
    features: [
      "User research & personas",
      "Wireframing & prototyping",
      "Visual design systems",
      "Usability testing",
      "Design handoff & documentation",
      "Accessibility-focused design",
    ],
    order: 5,
  },
  {
    slug: "seo",
    title: "SEO",
    shortDescription:
      "Data-driven strategies to dominate search rankings and organic traffic.",
    description:
      "Get found by the customers searching for your services. Our SEO experts combine technical optimization, content strategy, and link building to improve your visibility and drive qualified organic traffic.",
    icon: "search",
    features: [
      "Technical SEO audits",
      "Keyword research & strategy",
      "On-page optimization",
      "Content optimization",
      "Link building campaigns",
      "Monthly reporting & analytics",
    ],
    order: 6,
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    shortDescription:
      "Campaigns that amplify your brand and deliver measurable results.",
    description:
      "From social media to paid advertising, we create integrated digital marketing strategies that reach your target audience, build brand awareness, and generate leads that convert.",
    icon: "megaphone",
    features: [
      "Social media management",
      "PPC & paid advertising",
      "Email marketing campaigns",
      "Content marketing strategy",
      "Analytics & performance tracking",
      "Marketing automation",
    ],
    order: 7,
  },
  {
    slug: "branding",
    title: "Branding",
    shortDescription:
      "Distinctive brand identities that resonate with your target audience.",
    description:
      "Your brand is more than a logo — it's the promise you make to your customers. We develop comprehensive brand strategies and visual identities that communicate your values and differentiate you in the market.",
    icon: "brush",
    features: [
      "Brand strategy & positioning",
      "Logo design & visual identity",
      "Brand guidelines",
      "Tone of voice development",
      "Brand collateral design",
      "Rebranding & refresh",
    ],
    order: 8,
  },
  {
    slug: "graphic-design",
    title: "Graphic Design",
    shortDescription:
      "Visual assets that communicate your message with clarity and impact.",
    description:
      "From marketing materials to digital assets, our graphic designers create compelling visuals that strengthen your brand presence across every touchpoint.",
    icon: "image",
    features: [
      "Marketing collateral",
      "Social media graphics",
      "Presentation design",
      "Infographics & data visualization",
      "Print design",
      "Digital ad creatives",
    ],
    order: 9,
  },
  {
    slug: "hosting",
    title: "Hosting Solutions",
    shortDescription:
      "Reliable, secure hosting infrastructure you can depend on 24/7.",
    description:
      "Keep your digital assets running smoothly with enterprise-grade hosting solutions. We provide managed hosting, SSL certificates, backups, and monitoring so you can focus on your business.",
    icon: "server",
    features: [
      "Managed cloud hosting",
      "SSL & security hardening",
      "Automated backups",
      "CDN integration",
      "24/7 uptime monitoring",
      "Scalable infrastructure",
    ],
    order: 10,
  },
  {
    slug: "business-consulting",
    title: "Business Consulting",
    shortDescription:
      "Strategic guidance to accelerate your digital transformation.",
    description:
      "Navigate the complexities of digital transformation with expert guidance. We help you define technology roadmaps, optimize processes, and make informed decisions that drive business growth.",
    icon: "briefcase",
    features: [
      "Digital strategy consulting",
      "Technology assessment",
      "Process optimization",
      "Vendor selection & management",
      "Change management",
      "ROI analysis & reporting",
    ],
    order: 11,
  },
];

export const portfolioItems: PortfolioItem[] = [
  {
    slug: "snack-simple",
    title: "Snack Simple E-commerce",
    client: "Snack Simple",
    category: "E-commerce",
    description:
      "Bilingual online store for healthy snack products featuring rich product pages, store locator, shopping cart, and a modern brand experience built for growth across Quebec and Canada.",
    technologies: ["Shopify", "E-commerce", "Bilingual FR/EN", "UX Design"],
    images: ["/images/portfolio/snack-simple.png"],
    featured: true,
    caseStudyUrl: "/case-studies/snack-simple",
  },
  {
    slug: "lartisan-residence",
    title: "L'Artisan Résidence avec Soins",
    client: "L'Artisan Résidence avec Soins",
    category: "Website Development",
    description:
      "Warm and accessible website for a senior residence with care services — highlighting promotions, residence life, care offerings, and easy contact for families in Quebec.",
    technologies: ["WordPress", "Responsive Design", "SEO", "Lead Generation"],
    images: ["/images/portfolio/lartisan-residence.png"],
    featured: true,
    caseStudyUrl: "/case-studies/lartisan-residence",
  },
  {
    slug: "multi-prets",
    title: "Multi-Prêts Hypothèques",
    client: "Multi-Prêts Hypothèques",
    category: "Website Development",
    description:
      "Professional mortgage broker website with dedicated sections for purchase, renewal, and refinancing — designed to build trust and convert visitors into qualified leads.",
    technologies: ["WordPress", "Lead Forms", "SEO", "Responsive Design"],
    images: ["/images/portfolio/multi-prets.png"],
    featured: true,
    caseStudyUrl: "/case-studies/multi-prets",
  },
  {
    slug: "dr-elzoghbi",
    title: "Dr. André Elzoghbi — Orthodontics Clinic",
    client: "Dr. André Elzoghbi",
    category: "Website Development",
    description:
      "Modern orthodontic clinic website with patient portal access, online appointment booking, aligner information, FAQ, and emergency contact — optimized for patient experience.",
    technologies: ["WordPress", "Patient Portal", "Booking", "SEO"],
    images: ["/images/portfolio/dr-elzoghbi.png"],
    featured: true,
    caseStudyUrl: "/case-studies/dr-elzoghbi",
  },
  {
    slug: "friperie-deluxe",
    title: "Friperie Deluxe En ligne",
    client: "Friperie Deluxe En ligne",
    category: "E-commerce",
    description:
      "Premium online thrift boutique with membership program, wishlist, express shipping, tax-inclusive pricing, and a polished shopping experience for fashion-conscious customers.",
    technologies: ["Shopify", "E-commerce", "Membership", "Bilingual"],
    images: ["/images/portfolio/friperie-deluxe.png"],
    featured: true,
    caseStudyUrl: "/case-studies/friperie-deluxe",
  },
  {
    slug: "salon-tammam",
    title: "Salon Tammam Style",
    client: "Salon Tammam Style",
    category: "Website Development",
    description:
      "Elegant bilingual hair salon website showcasing services, stylist portfolio, and brand identity — with seamless contact integration and a premium visual presentation.",
    technologies: ["WordPress", "Bilingual FR/EN", "Responsive Design", "SEO"],
    images: ["/images/portfolio/salon-tammam.png"],
    featured: true,
    caseStudyUrl: "/case-studies/salon-tammam",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Nadia Tremblay",
    role: "Director",
    company: "L'Artisan Résidence avec Soins",
    quote:
      "Pyramide Media understood our residents and their families. The new website reflects the warmth of our residence and has significantly increased our inquiry calls.",
    rating: 5,
  },
  {
    id: "2",
    name: "Karim Mansouri",
    role: "Mortgage Broker",
    company: "Multi-Prêts Hypothèques",
    quote:
      "Our website now conveys professionalism and trust. Lead generation improved from day one, and the team at Pyramide Media was responsive throughout the entire project.",
    rating: 5,
  },
  {
    id: "3",
    name: "Sophie Lavoie",
    role: "Founder",
    company: "Snack Simple",
    quote:
      "From product pages to the store locator, every detail was handled with care. Our online sales grew steadily after launch thanks to a fast, beautiful e-commerce experience.",
    rating: 5,
  },
  {
    id: "4",
    name: "Tammam H.",
    role: "Owner",
    company: "Salon Tammam Style",
    quote:
      "The bilingual website perfectly represents our salon's identity. Clients find us easily online and our appointment requests have never been higher.",
    rating: 5,
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Tarek Boumessouer",
    role: "Founder & CEO",
    bio: "Entrepreneur and digital leader with over 12 years of experience in web development, e-commerce, and growth strategy. As CEO of Pyramide Media, Tarek guides a Montreal-based team that builds high-impact digital experiences for businesses across Quebec and North America — combining technical excellence with a deep understanding of client goals.",
    social: { linkedin: "https://ca.linkedin.com/company/pyramide-m%C3%A9dia" },
  },
];

export const stats: Stat[] = [
  { value: 150, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 12, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "+", label: "Happy Clients" },
];

export const faqs: FaqItem[] = [
  {
    question: "What services does Pyramide Media offer?",
    answer:
      "We offer a comprehensive range of digital services including website development, e-commerce solutions, custom software, mobile applications, UI/UX design, SEO, digital marketing, branding, graphic design, hosting, and business consulting.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on scope and complexity. A standard website takes 6-10 weeks, while custom software projects may take 3-6 months. We provide detailed timelines during our discovery phase.",
  },
  {
    question: "Do you work with clients internationally?",
    answer:
      "Yes, we work with clients worldwide. Our team operates across multiple time zones and has experience delivering projects for businesses in Europe, North America, and beyond.",
  },
  {
    question: "What is your project process?",
    answer:
      "We follow a proven four-phase process: Discovery (understanding your goals), Strategy (planning the solution), Execution (design and development), and Launch (deployment and optimization).",
  },
  {
    question: "Do you provide ongoing support after launch?",
    answer:
      "Absolutely. We offer maintenance packages, hosting solutions, and ongoing optimization services to ensure your digital products continue to perform at their best.",
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "future-of-web-development-2026",
    title: "The Future of Web Development in 2026",
    excerpt:
      "Explore the trends shaping modern web development — from server components to edge computing and beyond.",
    content: `
## The Evolution Continues

Web development is evolving at an unprecedented pace. In 2026, we're seeing a convergence of performance, developer experience, and user-centric design that's reshaping how we build for the web.

### Server Components & Edge Rendering

The shift toward server-first architectures continues to accelerate. Frameworks like Next.js have made server components the default, reducing client-side JavaScript and improving Core Web Vitals scores across the board.

### AI-Assisted Development (Not AI-Generated Products)

While AI tools assist developers in writing code faster, the emphasis remains on human-crafted, thoughtful solutions. The best agencies leverage AI for productivity while maintaining the strategic thinking that drives real business results.

### Performance as a Feature

With Google's continued emphasis on Core Web Vitals, performance optimization is no longer optional. Lazy loading, image optimization, and code splitting are baseline expectations for any professional website.

## What This Means for Your Business

Partnering with an agency that stays ahead of these trends ensures your digital presence remains competitive, fast, and future-proof.
    `,
    tags: ["Web Development", "Technology", "Trends"],
    publishedAt: "2026-03-15",
    author: { name: "Tarek Boumessouer" },
  },
  {
    slug: "ecommerce-conversion-optimization",
    title: "10 E-commerce Conversion Optimization Strategies That Work",
    excerpt:
      "Proven tactics to turn more visitors into paying customers and increase your average order value.",
    content: `
## Maximize Your Store's Potential

Conversion rate optimization is the highest-ROI activity for any e-commerce business. Here are ten strategies we've used to drive measurable results for our clients.

### 1. Streamline Your Checkout

Every additional step in checkout costs you sales. Implement guest checkout, auto-fill, and multiple payment options.

### 2. Optimize Product Pages

High-quality images, detailed descriptions, social proof, and clear CTAs are non-negotiable for converting browsers into buyers.

### 3. Leverage Social Proof

Customer reviews, trust badges, and real-time purchase notifications build confidence and reduce purchase anxiety.

## The Bottom Line

Small improvements compound. A 1% increase in conversion rate can mean hundreds of thousands in additional revenue for established stores.
    `,
    tags: ["E-commerce", "Marketing", "Conversion"],
    publishedAt: "2026-02-28",
    author: { name: "Tarek Boumessouer" },
  },
  {
    slug: "brand-identity-digital-age",
    title: "Building a Brand Identity That Stands Out in the Digital Age",
    excerpt:
      "How to create a cohesive brand presence that resonates across all digital touchpoints.",
    content: `
## Beyond the Logo

In today's crowded digital landscape, a strong brand identity is your most valuable asset. It's not just about looking good — it's about being instantly recognizable and emotionally resonant.

### Consistency Across Channels

Your brand should feel cohesive whether a customer encounters you on your website, social media, email, or in person. This requires a comprehensive brand system, not just a logo file.

### Digital-First Design Thinking

Modern brand identities must work at favicon size and on billboard scale. They need to adapt to dark mode, animated contexts, and responsive layouts.

### Story-Driven Branding

The most memorable brands tell a story. Your visual identity should reflect your values, mission, and the transformation you offer your customers.
    `,
    tags: ["Branding", "Design", "Strategy"],
    publishedAt: "2026-01-20",
    author: { name: "Tarek Boumessouer" },
  },
];
