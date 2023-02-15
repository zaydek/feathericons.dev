import { detab, tab } from "../../src/lib/format"

export function formatAsSvg(name: string, code: string, { comment }: { comment: string }) {
	return detab(`
		<!-- ${comment} -->
		${tab(code.replace(/<svg ([^>]+)>/, `<svg class="feather feather-${name}" $1>`), 2, { omitStart: true })}
	`)
}

export function formatAsJsx(name: string, code: string, { comment }: { comment: string }) {
	return detab(`
		// ${comment}
		export function ${name}(props) {
			return (
				${tab(code.replace(/<svg ([^>]+)>/, "<svg $1 {...props}>"), 4, { omitStart: true })}
			);
		}
	`)
}

export function formatAsTsx(name: string, code: string, { comment }: { comment: string }) {
	return detab(`
		// ${comment}
		export function ${name}(props: JSX.IntrinsicElements["svg"]) {
			return (
				${tab(code.replace(/<svg ([^>]+)>/, "<svg $1 {...props}>"), 4, { omitStart: true })}
			);
		}
	`)
}
