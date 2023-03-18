import { detab, tab } from "../../src/lib"

// prettier-ignore
export function transformSvg(code: string, { banner = "" }: { banner?: string } = {}) {
	code = code
		.trim()
		.replace(/<svg ([^>]+)>/, `<svg $1>`) // No-op
	return detab(`
		${banner}
		${tab(code, 2)}
	`, { spaces: true })
}

// prettier-ignore
export function transformJsx(code: string, icon: string, { banner = "" }: { banner?: string } = {}) {
	icon = icon
		.trim()
		.replace(/<svg ([^>]+)>/, "<svg $1 {...props}>")
	return detab(`
		${banner}
		export function ${code}(props) {
			return (
				${tab(icon, 4)}
			);
		}
	`, { spaces: true })
}

// prettier-ignore
export function transformTsx(code: string, icon: string, { banner = "" }: { banner?: string } = {}) {
	icon = icon
		.trim()
		// Remove the class attribute
		.replace(/ class="[^"]+"/, "")
		.replace(/<svg ([^>]+)>/, "<svg $1 {...props}>")
	return detab(`
		${banner}
		export function ${code}(props: JSX.IntrinsicElements["svg"]) {
			return (
				${tab(icon, 4)}
			);
		}
	`, { spaces: true })
}
