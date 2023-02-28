import { detab, tab } from "@/lib"

export function transformSvg(_: string, icon: string, { banner }: { banner: string }) {
	// Remove empty lines
	icon = icon.trim().replace(/<svg ([^>]+)>/, `<svg $1>`) // No-op
	// prettier-ignore
	return detab(`
		${banner}
		${tab(icon, 2)}
	`, { spaces: true })
}

export function transformJsx(name: string, icon: string, { banner }: { banner: string }) {
	// Remove empty lines
	icon = icon.trim().replace(/<svg ([^>]+)>/, "<svg $1 {...props}>")
	// prettier-ignore
	return detab(`
		${banner}
		export function ${name}(props) {
			return (
				${tab(icon, 4)}
			);
		}
	`, { spaces: true })
}

export function transformTsx(name: string, icon: string, { banner }: { banner: string }) {
	// Remove empty lines
	icon = icon
		.trim()
		// Remove the class attribute
		.replace(/ class="[^"]+"/, "")
		.replace(/<svg ([^>]+)>/, "<svg $1 {...props}>")
	// prettier-ignore
	return detab(`
		${banner}
		export function ${name}(props: JSX.IntrinsicElements["svg"]) {
			return (
				${tab(icon, 4)}
			);
		}
	`, { spaces: true })
}
