export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Sharder",
	description: "A GUI for Shamir's Secret Sharing.",
	navItems: [
    {
      label: "Split",
      href: "/split",
    },
    {
      label: "Combine",
      href: "/combine",
    },
    {
      label: "About",
      href: "/about",
    }
	],
	navMenuItems: [
		{
			label: "Split",
			href: "/split",
		},
		{
			label: "Combine",
			href: "/combine",
		},
		{
			label: "About",
			href: "/about",
		}
	],
	links: {
		github: "https://github.com/quartz-technology/sharder",
		twitter: "https://twitter.com/qu3rtz",
	},
};
