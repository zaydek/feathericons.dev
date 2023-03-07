import { Icon } from "@/lib"
import { Figma, Github, Twitter } from "@icons/wolfkit/social/original/tsx"

export type Resource = { name: string; icon: Icon; href: string }

export const resources: Resource[] = [
	{
		name: "Icons",
		icon: Github,
		href: "TODO",
	},
	{
		name: "Website",
		icon: Github,
		href: "TODO",
	},
	{
		name: "Social & payments files",
		icon: Figma,
		href: "TODO",
	},
	{
		name: "Share on Twitter",
		icon: Twitter,
		href: "TODO",
	},
]
