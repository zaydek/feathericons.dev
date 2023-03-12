import * as WkBrandsOriginal from "@icons/wk/brands/original/tsx"

import { IconComponent } from "@/lib"

export type Resource = { name: string; icon: IconComponent; href: string }

export const resources: Resource[] = [
	{
		name: "Icons",
		icon: WkBrandsOriginal.BrandGithub,
		href: "https://github.com/feathericons/feather",
	},
	{
		name: "Website",
		icon: WkBrandsOriginal.BrandGithub,
		href: "https://github.com/zaydek/app-feathericons",
	},
	{
		name: "Brands & payments files",
		icon: WkBrandsOriginal.BrandFigma,
		href: "https://figma.com/@thewolfkit",
	},
	{
		name: "Share on Twitter",
		icon: WkBrandsOriginal.BrandTwitter,
		href: `http://twitter.com/intent/tweet?text=${encodeURI(
			"Check out Feather 🪶\n\nThanks @colebemis for designing Feather and @username_ZAYDEK for feathericons.dev",
		)}`,
	},
]
