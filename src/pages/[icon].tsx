import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { keys } from "../data/keys"
import { toTitleCase } from "../lib/cases"

export interface IconParams extends ParsedUrlQuery {
	icon: string
}

export type IconProps = {
	kebabCase: string
	titleCase: string
}

// Generate a URL parameter
export const getStaticPaths: GetStaticPaths<IconParams> = async () => {
	return {
		paths: keys.map(name => ({
			params: {
				icon: name,
			},
		})),
		fallback: false,
	}
}

// Generate props from a URL parameter
export const getStaticProps: GetStaticProps<IconProps, IconParams> = context => {
	const params = context.params!

	return {
		props: {
			kebabCase: params.icon,
			titleCase: toTitleCase(params.icon),
		},
	}
}

// Defer to shared-app.tsx
export default function Component() {}
