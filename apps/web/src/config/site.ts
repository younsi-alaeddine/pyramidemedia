export const siteConfig = {
  name: "Pyramide Media",
  tagline: "Your Trusted Digital Partner",
  description:
    "Pyramide Media is a full-service digital agency specializing in web development, e-commerce, custom software, mobile apps, UI/UX design, SEO, digital marketing, branding, and business consulting.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://pyramidemedia.com",
  ogImage: "/images/og-default.jpg",
  contact: {
    email: "marketing@pyramidemedia.com",
    phone: "514-213-3140",
    phoneHref: "+15142133140",
    address: "Montréal, Canada",
  },
  social: {
    linkedin: "https://ca.linkedin.com/company/pyramide-m%C3%A9dia",
    facebook: "https://www.facebook.com/profile.php?id=100083508332839",
  },
  keywords: [
    "digital agency",
    "web development",
    "e-commerce",
    "custom software",
    "mobile applications",
    "UI/UX design",
    "SEO",
    "digital marketing",
    "branding",
    "business consulting",
  ],
} as const;
