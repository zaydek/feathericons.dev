import * as wkBrandsMono from "@icons/wk/brands/mono/tsx"
import * as wkBrandsOriginal from "@icons/wk/brands/original/tsx"

import { IconComponent } from "@/lib"

export const resources: { name: string; icon: IconComponent; href: string }[] = [
	{
		name: "Icons",
		icon: wkBrandsMono.Github,
		href: "https://github.com/feathericons/feather",
	},
	{
		name: "Website",
		icon: wkBrandsMono.Github,
		href: "https://github.com/zaydek/feathericons.dev",
	},
	{
		name: "Wolf Kit resources",
		icon: wkBrandsOriginal.Figma,
		href: "https://figma.com/@thewolfkit",
	},
	{
		name: "Share on Twitter",
		icon: wkBrandsOriginal.Twitter,
		href: `http://twitter.com/intent/tweet?text=${encodeURI(
			"Check out Feather 🪶\n\nThanks @colebemis for designing Feather and @username_ZAYDEK for feathericons.dev",
		)}`,
	},
]
