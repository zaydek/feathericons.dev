import { detab, tab } from "../../src/lib"

// prettier-ignore
export function transformSvg(icon: string, { banner = "" }: { banner?: string } = {}) {
	icon = icon
		.trim()
		.replace(/<svg ([^>]+)>/, `<svg $1>`) // No-op
	return detab(`
		${banner}
		${tab(icon, 2)}
	`, { spaces: true })
}

// prettier-ignore
export function transformJsx(name: string, icon: string, { banner = "" }: { banner?: string } = {}) {
	icon = icon
		.trim()
		.replace(/<svg ([^>]+)>/, "<svg $1 {...props}>")
	return detab(`
		${banner}
		export function ${name}(props) {
			return (
				${tab(icon, 4)}
			);
		}
	`, { spaces: true })
}

// prettier-ignore
export function transformTsx(name: string, icon: string, { banner = "" }: { banner?: string } = {}) {
	icon = icon
		.trim()
		// Remove the class attribute
		.replace(/ class="[^"]+"/, "")
		.replace(/<svg ([^>]+)>/, "<svg $1 {...props}>")
	return detab(`
		${banner}
		export function ${name}(props: JSX.IntrinsicElements["svg"]) {
			return (
				${tab(icon, 4)}
			);
		}
	`, { spaces: true })
}
