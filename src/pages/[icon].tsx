import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { data, dataKeys } from "../data/data"

export type IconProps = {
	name: string
	data: string
}

export interface IconParams extends ParsedUrlQuery {
	icon: string
}

// Generate a URL parameter
export const getStaticPaths: GetStaticPaths<IconParams> = async () => {
	return {
		paths: dataKeys.map(path => ({ params: { icon: path } })),
		fallback: false,
	}
}

// Generate props from a URL parameter
export const getStaticProps: GetStaticProps<IconProps, IconParams> = context => {
	const params = context.params!

	// TODO
	const d = data[params.icon as keyof typeof data].data
	return {
		props: {
			name: params.icon,
			data: d,
		},
	}
}

// Defer to shared-app.tsx
export default function Component() {}
