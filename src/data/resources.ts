import * as wkBrandsMono from "@icons/wk/brands/mono/tsx"
import * as wkBrandsOriginal from "@icons/wk/brands/original/tsx"

import { IconComponent } from "@/lib"

export const resources: { name: string; Icon: IconComponent; href: string }[] = [
	{
		name: "Icons",
		Icon: wkBrandsMono.BrandGithub,
		href: "https://github.com/feathericons/feather",
	},
	//// {
	//// 	name: "Original Feather website",
	//// 	Icon: wkBrandsMono.BrandGithub,
	//// 	href: "https://github.com/feathericons/feather",
	//// },
	{
		name: "Website",
		Icon: wkBrandsMono.BrandGithub,
		href: "https://github.com/zaydek/feathericons.dev",
	},
	{
		name: "Wolf Kit resources",
		Icon: wkBrandsOriginal.BrandFigma,
		href: "https://figma.com/@thewolfkit",
	},
	{
		name: "Share on Twitter",
		Icon: wkBrandsOriginal.BrandTwitter,
		href: `http://twitter.com/intent/tweet?text=${encodeURI(
			"Check out Feather 🪶\n\nThanks @colebemis for designing Feather and @username_ZAYDEK for feathericons.dev",
		)}`,
	},
]
