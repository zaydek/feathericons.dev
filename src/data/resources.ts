import * as wkBrandsMono from "@icons/wk/brands/mono/tsx"
import * as wkBrandsOriginal from "@icons/wk/brands/original/tsx"

import { IconComponent } from "@/lib"

export const resources: { Icon: IconComponent; name: string; href: string }[] = [
	{
		Icon: wkBrandsMono.BrandGithub,
		name: "Icons",
		href: "https://github.com/feathericons/feather",
	},
	//// {
	//// 	Icon: wkBrandsMono.BrandGithub,
	//// 	name: "Original Feather website",
	//// 	href: "https://github.com/feathericons/feather",
	//// },
	{
		Icon: wkBrandsMono.BrandGithub,
		name: "Website",
		href: "https://github.com/zaydek/feathericons.dev",
	},
	{
		Icon: wkBrandsOriginal.BrandFigma,
		name: "Wolf Kit resources",
		href: "https://figma.com/@thewolfkit",
	},
	{
		Icon: wkBrandsOriginal.BrandTwitter,
		name: "Share on Twitter",
		href: `http://twitter.com/intent/tweet?text=${encodeURI(
			"Check out Feather 🪶\n\nThanks @colebemis for designing Feather and @username_ZAYDEK for feathericons.dev",
		)}`,
	},
]
