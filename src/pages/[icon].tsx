import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { manifest } from "../data/react-feather-manifest"
import { toKebabCase, toTitleCase } from "../lib/cases"

export interface IconParams extends ParsedUrlQuery {
	icon: string
}

export type IconProps = {
	name: string
}

// Generate a URL parameter
export const getStaticPaths: GetStaticPaths<IconParams> = async () => {
	return {
		paths: Object.keys(manifest).map(name => ({
			params: {
				icon: toKebabCase(name),
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
			name: toTitleCase(params.icon),
		},
	}
}

// Defer to shared-app.tsx
export default function Component() {}
