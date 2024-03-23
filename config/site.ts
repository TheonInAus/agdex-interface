export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'AGDEX',
  description:
    "AGDEX",
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
      name: 'Referrals',
      title: "Referrals",
      href: "/referral",
    },
    // {
    //   name: 'Earn',
    //   title: "Earn",
    //   href: "/earn",
    // },
    {
      name: 'Bridge',
      title: "Bridge",
      href: "/bridge",
    },
    {
      name: 'Stats',
      title: "Stats",
      href: "/stats",
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
