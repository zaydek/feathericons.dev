import * as WkBrandsOriginal from "@icons/wk/brands/original/tsx"

import { IconComponent } from "@/lib"

export type Resource = { name: string; icon: IconComponent; href: string }

export const resources: Resource[] = [
	{
		name: "Icons",
		icon: WkBrandsOriginal.BrandGithub,
		href: "TODO",
	},
	{
		name: "Website",
		icon: WkBrandsOriginal.BrandGithub,
		href: "TODO",
	},
	{
		name: "Brands & payments files",
		icon: WkBrandsOriginal.BrandFigma,
		href: "TODO",
	},
	{
		name: "Share on Twitter",
		icon: WkBrandsOriginal.BrandTwitter,
		href: "TODO",
	},
]
