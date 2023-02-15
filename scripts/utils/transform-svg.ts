import { detab, tab } from "@/lib"

// prettier-ignore
export function transformSvg(name: string, code: string, { comment }: { comment: string }) {
	code = code.trim()
	return detab(`
		<!-- ${comment} -->
		${tab(code.replace(/<svg ([^>]+)>/, `<svg $1>`), 2, { omitStart: true })}
	`) + "\n"
}

// prettier-ignore
export function transformJsx(name: string, code: string, { comment }: { comment: string }) {
	code = code.trim()
	return detab(`
		// ${comment}
		export function ${name}(props) {
			return (
				${tab(code.replace(/<svg ([^>]+)>/, "<svg $1 {...props}>"), 4, { omitStart: true })}
			);
		}
	`) + "\n"
}

// prettier-ignore
export function transformTsx(name: string, code: string, { comment }: { comment: string }) {
	code = code.trim()
	return detab(`
		// ${comment}
		export function ${name}(props: JSX.IntrinsicElements["svg"]) {
			return (
				${tab(code.replace(/<svg ([^>]+)>/, "<svg $1 {...props}>"), 4, { omitStart: true })}
			);
		}
	`) + "\n"
}
