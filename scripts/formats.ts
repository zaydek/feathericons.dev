import { detab, tab } from "../src/lib/format"

export function formatAsSvg(name: string, code: string, { LICENSE, comment }: { LICENSE: string, comment: string }) {
	return detab(`
		${LICENSE}

		<!-- ${comment} -->
		${tab(code.replace(/<svg ([^>]+)>/, `<svg class="feather feather-${name}" $1>`), 2, { omitStart: true })}
	`)
}

export function formatAsTsx(name: string, code: string, { LICENSE, comment }: { LICENSE: string, comment: string }) {
	return detab(`
		${LICENSE}

		import { SVGAttributes } from "react"

		// ${comment}
		export function ${name}(props: SVGAttributes<SVGElement>) {
			return (
				${tab(code.replace(/<svg ([^>]+)>/, "<svg $1 {...props}>"), 4, { omitStart: true })}
			)
		}
	`)
}
