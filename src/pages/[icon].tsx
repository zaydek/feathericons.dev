import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { data } from "../data/data"

export type IconProps = {
	name: string
	data: string
}

export interface IconParams extends ParsedUrlQuery {
	icon: string
}

export const getStaticPaths: GetStaticPaths<IconParams> = async () => {
	return {
		paths: Object.keys(data).map(key => ({ params: { icon: key } })),
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps<IconProps, IconParams> = context => {
	const params = context.params!

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
