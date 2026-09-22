import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";

import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "Martin's Blog",
	subtitle: "Security & Development",
	lang: "ko",

	themeColor: {
		hue: 210,
		fixed: true,
	},

	banner: {
		enable: false,
		src: "assets/images/demo-banner.png",
		position: "center",

		credit: {
			enable: false,
			text: "",
			url: "",
		},
	},

	toc: {
		enable: false,
		depth: 2,
	},

	favicon: [],
};

export const navBarConfig: NavBarConfig = {
	links: [
		{
			name: "진로",
			url: "/career/",
		},
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,

		{
			name: "GitHub",
			url: "https://github.com/mellonmusk1010-design",
			external: true,
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/martin-avatar.png",

	name: "Martin",

	bio: "Network · Pwnable · Web",

	links: [
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/mellonmusk1010-design",
		},
		{
			name: "Dreamhack",
			icon: "fa6-solid:flag",
			url: "https://dreamhack.io/users/93667",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,

	name: "CC BY-NC-SA 4.0",

	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	theme: "github-dark",
};
