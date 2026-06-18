import { PrismaClient, PublishStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const portfolioItems = [
  {
    slug: 'snack-simple',
    title: 'Snack Simple E-commerce',
    client: 'Snack Simple',
    category: 'E-commerce',
    description:
      'Bilingual online store for healthy snack products featuring rich product pages, store locator, shopping cart, and a modern brand experience built for growth across Quebec and Canada.',
    technologies: ['Shopify', 'E-commerce', 'Bilingual FR/EN', 'UX Design'],
    images: ['/images/portfolio/snack-simple.png'],
    featured: true,
    caseStudyUrl: '/case-studies/snack-simple',
  },
  {
    slug: 'lartisan-residence',
    title: "L'Artisan Résidence avec Soins",
    client: "L'Artisan Résidence avec Soins",
    category: 'Website Development',
    description:
      'Warm and accessible website for a senior residence with care services — highlighting promotions, residence life, care offerings, and easy contact for families in Quebec.',
    technologies: ['WordPress', 'Responsive Design', 'SEO', 'Lead Generation'],
    images: ['/images/portfolio/lartisan-residence.png'],
    featured: true,
    caseStudyUrl: '/case-studies/lartisan-residence',
  },
  {
    slug: 'multi-prets',
    title: 'Multi-Prêts Hypothèques',
    client: 'Multi-Prêts Hypothèques',
    category: 'Website Development',
    description:
      'Professional mortgage broker website with dedicated sections for purchase, renewal, and refinancing — designed to build trust and convert visitors into qualified leads.',
    technologies: ['WordPress', 'Lead Forms', 'SEO', 'Responsive Design'],
    images: ['/images/portfolio/multi-prets.png'],
    featured: true,
    caseStudyUrl: '/case-studies/multi-prets',
  },
  {
    slug: 'dr-elzoghbi',
    title: 'Dr. André Elzoghbi — Orthodontics Clinic',
    client: 'Dr. André Elzoghbi',
    category: 'Website Development',
    description:
      'Modern orthodontic clinic website with patient portal access, online appointment booking, aligner information, FAQ, and emergency contact — optimized for patient experience.',
    technologies: ['WordPress', 'Patient Portal', 'Booking', 'SEO'],
    images: ['/images/portfolio/dr-elzoghbi.png'],
    featured: true,
    caseStudyUrl: '/case-studies/dr-elzoghbi',
  },
  {
    slug: 'friperie-deluxe',
    title: 'Friperie Deluxe En ligne',
    client: 'Friperie Deluxe En ligne',
    category: 'E-commerce',
    description:
      'Premium online thrift boutique with membership program, wishlist, express shipping, tax-inclusive pricing, and a polished shopping experience for fashion-conscious customers.',
    technologies: ['Shopify', 'E-commerce', 'Membership', 'Bilingual'],
    images: ['/images/portfolio/friperie-deluxe.png'],
    featured: true,
    caseStudyUrl: '/case-studies/friperie-deluxe',
  },
  {
    slug: 'salon-tammam',
    title: 'Salon Tammam Style',
    client: 'Salon Tammam Style',
    category: 'Website Development',
    description:
      'Elegant bilingual hair salon website showcasing services, stylist portfolio, and brand identity — with seamless contact integration and a premium visual presentation.',
    technologies: ['WordPress', 'Bilingual FR/EN', 'Responsive Design', 'SEO'],
    images: ['/images/portfolio/salon-tammam.png'],
    featured: true,
    caseStudyUrl: '/case-studies/salon-tammam',
  },
];

const testimonials = [
  {
    name: 'Nadia Tremblay',
    role: 'Director',
    company: "L'Artisan Résidence avec Soins",
    quote:
      "Pyramide Media understood our residents and their families. The new website reflects the warmth of our residence and has significantly increased our inquiry calls.",
    rating: 5,
    featured: true,
  },
  {
    name: 'Karim Mansouri',
    role: 'Mortgage Broker',
    company: 'Multi-Prêts Hypothèques',
    quote:
      'Our website now conveys professionalism and trust. Lead generation improved from day one, and the team at Pyramide Media was responsive throughout the entire project.',
    rating: 5,
    featured: true,
  },
  {
    name: 'Sophie Lavoie',
    role: 'Founder',
    company: 'Snack Simple',
    quote:
      'From product pages to the store locator, every detail was handled with care. Our online sales grew steadily after launch thanks to a fast, beautiful e-commerce experience.',
    rating: 5,
    featured: true,
  },
  {
    name: 'Tammam H.',
    role: 'Owner',
    company: 'Salon Tammam Style',
    quote:
      "The bilingual website perfectly represents our salon's identity. Clients find us easily online and our appointment requests have never been higher.",
    rating: 5,
    featured: true,
  },
];

async function main() {
  const email = process.env.ADMIN_EMAIL ?? 'marketing@pyramidemedia.com';
  const password = process.env.ADMIN_PASSWORD ?? 'Pyramide2026!';
  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: { passwordHash, name: 'Tarek Boumessouer', role: 'ADMIN' },
    create: {
      email,
      passwordHash,
      name: 'Tarek Boumessouer',
      role: 'ADMIN',
    },
  });

  for (const item of portfolioItems) {
    await prisma.portfolioItem.upsert({
      where: { slug: item.slug },
      update: {
        ...item,
        status: PublishStatus.PUBLISHED,
        authorId: admin.id,
      },
      create: {
        ...item,
        status: PublishStatus.PUBLISHED,
        authorId: admin.id,
      },
    });
  }

  await prisma.testimonial.deleteMany();
  for (const item of testimonials) {
    await prisma.testimonial.create({
      data: {
        ...item,
        status: PublishStatus.PUBLISHED,
        authorId: admin.id,
      },
    });
  }

  await prisma.teamMember.deleteMany();
  await prisma.teamMember.create({
    data: {
      name: 'Tarek Boumessouer',
      role: 'Founder & CEO',
      bio: 'Entrepreneur and digital leader with over 12 years of experience in web development, e-commerce, and growth strategy. As CEO of Pyramide Media, Tarek guides a Montreal-based team that builds high-impact digital experiences for businesses across Quebec and North America.',
      social: {
        linkedin: 'https://ca.linkedin.com/company/pyramide-m%C3%A9dia',
      },
      order: 0,
      status: PublishStatus.PUBLISHED,
      authorId: admin.id,
    },
  });

  await prisma.seoSetting.upsert({
    where: { id: 'global' },
    update: {},
    create: {
      id: 'global',
      siteTitle: 'Pyramide Media',
      siteDescription:
        'Pyramide Media is a full-service digital agency specializing in web development, e-commerce, and digital marketing.',
      ogImage: '/images/og-default.jpg',
    },
  });

  const services = [
    {
      slug: 'website-development',
      title: 'Website Development',
      shortDescription:
        'High-performance, conversion-focused websites built with modern technologies.',
      description:
        'We design and develop custom websites that combine stunning design with exceptional performance.',
      icon: 'globe',
      features: [
        'Responsive mobile-first design',
        'Next.js and React development',
        'CMS integration',
        'Performance optimization',
      ],
      order: 1,
    },
    {
      slug: 'e-commerce',
      title: 'E-commerce Solutions',
      shortDescription:
        'Scalable online stores designed for seamless shopping experiences.',
      description:
        'Transform your retail vision into a high-performing e-commerce platform.',
      icon: 'shopping-cart',
      features: ['Custom storefront design', 'Shopify and headless commerce', 'Payment integration'],
      order: 2,
    },
    {
      slug: 'custom-software',
      title: 'Custom Software Development',
      shortDescription: 'Tailored software solutions for unique business challenges.',
      description: 'When off-the-shelf software is not enough, we build around your workflows.',
      icon: 'code',
      features: ['Requirements analysis', 'Full-stack development', 'API design'],
      order: 3,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {
        ...service,
        status: PublishStatus.PUBLISHED,
        authorId: admin.id,
      },
      create: {
        ...service,
        status: PublishStatus.PUBLISHED,
        authorId: admin.id,
      },
    });
  }

  const blogPosts = [
    {
      slug: 'future-of-web-development-2026',
      title: 'The Future of Web Development in 2026',
      excerpt:
        'Explore the trends shaping modern web development — from server components to edge computing and beyond.',
      content:
        'Web development is evolving at an unprecedented pace. Server-first architectures, performance optimization, and thoughtful engineering remain central to building competitive digital products.',
      tags: ['Web Development', 'Technology', 'Trends'],
      publishedAt: new Date('2026-03-15'),
    },
    {
      slug: 'ecommerce-conversion-optimization',
      title: '10 E-commerce Conversion Optimization Strategies That Work',
      excerpt:
        'Proven tactics to turn more visitors into paying customers and increase your average order value.',
      content:
        'Conversion rate optimization is the highest-ROI activity for any e-commerce business. Streamline checkout, optimize product pages, and leverage social proof.',
      tags: ['E-commerce', 'Marketing', 'Conversion'],
      publishedAt: new Date('2026-02-28'),
    },
    {
      slug: 'brand-identity-digital-age',
      title: 'Building a Brand Identity That Stands Out in the Digital Age',
      excerpt:
        'How to create a cohesive brand presence that resonates across all digital touchpoints.',
      content:
        'A strong brand identity is your most valuable asset online. Consistency, digital-first design, and story-driven branding help you stand out.',
      tags: ['Branding', 'Design', 'Strategy'],
      publishedAt: new Date('2026-01-20'),
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        ...post,
        status: PublishStatus.PUBLISHED,
        authorId: admin.id,
      },
      create: {
        ...post,
        status: PublishStatus.PUBLISHED,
        authorId: admin.id,
      },
    });
  }

  console.log(`Seeded admin user: ${email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
