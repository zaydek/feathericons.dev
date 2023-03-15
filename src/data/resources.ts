import * as wkBrandsOriginal from "@icons/wk/brands/original/tsx"

import { IconComponent } from "@/lib"

export const resources: { name: string; icon: IconComponent; href: string }[] = [
	{
		name: "Icons",
		icon: wkBrandsOriginal.BrandGithub,
		href: "https://github.com/feathericons/feather",
	},
	//// {
	//// 	name: "Original Feather website",
	//// 	icon: wkBrandsOriginal.BrandGithub,
	//// 	href: "https://github.com/feathericons/feather",
	//// },
	{
		name: "Website",
		icon: wkBrandsOriginal.BrandGithub,
		href: "https://github.com/zaydek/feathericons.dev",
	},
	{
		name: "Wolf Kit resources",
		icon: wkBrandsOriginal.BrandFigma,
		href: "https://figma.com/@thewolfkit",
	},
	{
		name: "Share on Twitter",
		icon: wkBrandsOriginal.BrandTwitter,
		href: `http://twitter.com/intent/tweet?text=${encodeURI(
			"Check out Feather 🪶\n\nThanks @colebemis for designing Feather and @username_ZAYDEK for feathericons.dev",
		)}`,
	},
]
