import type { LucideIcon } from "lucide-react";
import {
  Globe,
  ShoppingCart,
  Code2,
  Smartphone,
  Palette,
  Search,
  Megaphone,
  Brush,
  Image,
  Server,
  Briefcase,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

export const mainNavigation: NavItem[] = [
  { title: "Home", href: "/" },
  {
    title: "Services",
    href: "/services",
    children: [
      {
        title: "Website Development",
        href: "/services/website-development",
        description: "High-performance websites that convert visitors into customers.",
      },
      {
        title: "E-commerce Solutions",
        href: "/services/e-commerce",
        description: "Scalable online stores built for growth and seamless shopping.",
      },
      {
        title: "Custom Software",
        href: "/services/custom-software",
        description: "Tailored software solutions that solve your unique challenges.",
      },
      {
        title: "Mobile Applications",
        href: "/services/mobile-applications",
        description: "Native and cross-platform apps with exceptional user experiences.",
      },
      {
        title: "UI/UX Design",
        href: "/services/ui-ux-design",
        description: "Beautiful, intuitive interfaces that delight your users.",
      },
      {
        title: "SEO",
        href: "/services/seo",
        description: "Data-driven strategies to dominate search rankings.",
      },
      {
        title: "Digital Marketing",
        href: "/services/digital-marketing",
        description: "Campaigns that amplify your brand and drive measurable results.",
      },
      {
        title: "Branding",
        href: "/services/branding",
        description: "Distinctive brand identities that resonate with your audience.",
      },
      {
        title: "Graphic Design",
        href: "/services/graphic-design",
        description: "Visual assets that communicate your message with impact.",
      },
      {
        title: "Hosting Solutions",
        href: "/services/hosting",
        description: "Reliable, secure hosting infrastructure you can depend on.",
      },
      {
        title: "Business Consulting",
        href: "/services/business-consulting",
        description: "Strategic guidance to accelerate your digital transformation.",
      },
    ],
  },
  { title: "Portfolio", href: "/portfolio" },
  { title: "Case Studies", href: "/case-studies" },
  { title: "About", href: "/about" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
];

export const footerNavigation = {
  services: [
    { title: "Web Development", href: "/services/website-development" },
    { title: "E-commerce", href: "/services/e-commerce" },
    { title: "Custom Software", href: "/services/custom-software" },
    { title: "Mobile Apps", href: "/services/mobile-applications" },
    { title: "UI/UX Design", href: "/services/ui-ux-design" },
    { title: "SEO & Marketing", href: "/services/seo" },
  ],
  company: [
    { title: "About Us", href: "/about" },
    { title: "Portfolio", href: "/portfolio" },
    { title: "Case Studies", href: "/case-studies" },
    { title: "Blog", href: "/blog" },
    { title: "Contact", href: "/contact" },
  ],
  legal: [
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms & Conditions", href: "/terms" },
  ],
};

export const serviceIconMap: Record<string, LucideIcon> = {
  globe: Globe,
  "shopping-cart": ShoppingCart,
  code: Code2,
  smartphone: Smartphone,
  palette: Palette,
  search: Search,
  megaphone: Megaphone,
  brush: Brush,
  image: Image,
  server: Server,
  briefcase: Briefcase,
};

export const serviceSlugIconMap: Record<string, keyof typeof serviceIconMap> = {
  "website-development": "globe",
  "e-commerce": "shopping-cart",
  "custom-software": "code",
  "mobile-applications": "smartphone",
  "ui-ux-design": "palette",
  seo: "search",
  "digital-marketing": "megaphone",
  branding: "brush",
  "graphic-design": "image",
  hosting: "server",
  "business-consulting": "briefcase",
};
