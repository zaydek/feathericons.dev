import { detab, tab } from "@/lib"

export function transformSvg(_: string, icon: string, { banner }: { banner: string }) {
	// prettier-ignore
	icon = icon
		.trim()
		.replace(/<svg ([^>]+)>/, `<svg $1>`)
	return detab(`
		${banner}
		${tab(icon, 2)}
	`).replaceAll("\t", "  ")
}

export function transformJsx(name: string, icon: string, { banner }: { banner: string }) {
	// prettier-ignore
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
	`).replaceAll("\t", "  ")
}

export function transformTsx(name: string, icon: string, { banner }: { banner: string }) {
	// prettier-ignore
	icon = icon
		.trim()
		.replace(/ class="[^"]+"/, "") // Remove class="feather feather-*"
		.replace(/<svg ([^>]+)>/, "<svg $1 {...props}>")
	return detab(`
		${banner}
		export function ${name}(props: JSX.IntrinsicElements["svg"]) {
			return (
				${tab(icon, 4)}
			);
		}
	`).replaceAll("\t", "  ")
}
