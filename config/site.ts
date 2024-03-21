export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'ABEx',
  description:
    "ABEx",
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
      href: "/abPools",
    },
    {
      name: 'Referrals',
      title: "Referrals",
      href: "/abReferral",
    },
    // {
    //   name: 'Earn',
    //   title: "Earn",
    //   href: "/earn",
    // },
    {
      name: 'Bridge',
      title: "Bridge",
      href: "/abBridge",
    },
    {
      name: 'Stats',
      title: "Stats",
      href: "/Stats",
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
