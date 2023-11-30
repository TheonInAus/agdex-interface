export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name:'0XX',
  description:
    "0XX",
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
