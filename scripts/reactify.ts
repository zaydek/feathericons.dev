import { detab, tab } from "../src/lib/format"

export function reactify(name: string, code: string, { comment }: { comment: string }) {
	const codeProps = code.replace(/<svg ([^>]+)>/, "<svg $1 {...props}>")

	return detab(`
		import { SVGAttributes } from "react"

		// ${comment}
		export function ${name}(props: SVGAttributes<SVGElement>) {
			return (
				${tab(codeProps, 4, { omitStart: true })}
			)
		}
	`)
}
