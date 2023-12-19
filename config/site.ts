export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name:'Bronzes',
  description:
    "Bronzes",
  mainNav: [
    {
      name: 'Home',
      title: "Home",
      href: "/",
    },
    {
      name: 'Trade',
      title: "Trade",
      href: "/trade",
    },
    {
      name: 'Pools',
      title: "Pools",
      href: "/pools",
    },
    {
      name: 'Earn',
      title: "Earn",
      href: "/earn",
    },
    {
      name: 'Referrals',
      title: "Referrals",
      href: "/referrals",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
    discord: "",
    telegram: "",
    medium: "",
  },
}
