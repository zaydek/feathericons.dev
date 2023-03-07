import * as wkSocialOriginal from "@icons/wolfkit/social/original/tsx"

import { Icon } from "@/lib"

export type Resource = { name: string; icon: Icon; href: string }

export const resources: Resource[] = [
	{
		name: "Icons",
		icon: wkSocialOriginal.Github,
		href: "TODO",
	},
	{
		name: "Website",
		icon: wkSocialOriginal.Github,
		href: "TODO",
	},
	{
		name: "Social & payments files",
		icon: wkSocialOriginal.Figma,
		href: "TODO",
	},
	{
		name: "Share on Twitter",
		icon: wkSocialOriginal.Twitter,
		href: "TODO",
	},
	//// {
	//// 	name: "Follow @colebemis",
	//// 	icon: wkSocialOriginal.Twitter,
	//// 	href: "TODO",
	//// },
	//// {
	//// 	name: "Follow @thewolfkit",
	//// 	icon: wkSocialOriginal.Twitter,
	//// 	href: "TODO",
	//// },
	//// {
	//// 	name: "Follow @username_ZAYDEK",
	//// 	icon: wkSocialOriginal.Twitter,
	//// 	href: "TODO",
	//// },
]
