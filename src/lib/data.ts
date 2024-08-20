// navbar items
export const navItems = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Projects',
    href: '/#projects',
  },
  {
    name: 'Speaking',
    href: '/#speaking',
  },
  {
    name: 'Blog',
    href: '/blog',
  },
  {
    name: 'Uses',
    href: '/uses',
  },
] as const

export const socialLinks = [
  {
    name: 'Linkedin',
    URL: 'https://www.linkedin.com/in/chris-nowicki/',
    icon: 'linkedin',
  },
  {
    name: 'GitHub',
    URL: 'https://github.com/chris-nowicki',
    icon: 'github',
  },
  {
    name: 'Twitter',
    URL: 'https://twitter.com/iamwix',
    icon: 'twitter',
  },
  {
    name: 'DEV',
    URL: 'https://dev.to/chrisnowicki',
    icon: 'devto',
  },
] as const

export const contactInfo = {
  Contact: {
    text: 'Contact',
    icon: 'ph:envelope-simple',
    style: 'w-6',
  },
  DownloadCV: {
    text: 'Download CV',
    icon: 'bi:download',
    style: 'w-6 transition-all group-hover:translate-y-1 sm:hidden md:block',
  },
} as const
