import * as wkBrandsOriginal from "@icons/wolfkit/brands/original/tsx"

import { Icon } from "@/lib"

export type Resource = { name: string; icon: Icon; href: string }

export const resources: Resource[] = [
	{
		name: "Icons",
		icon: wkBrandsOriginal.Github,
		href: "TODO",
	},
	{
		name: "Website",
		icon: wkBrandsOriginal.Github,
		href: "TODO",
	},
	{
		name: "Social & payments files",
		icon: wkBrandsOriginal.Figma,
		href: "TODO",
	},
	{
		name: "Share on Twitter",
		icon: wkBrandsOriginal.Twitter,
		href: "TODO",
	},
]
