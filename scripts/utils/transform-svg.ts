import { detab, tab } from "@/lib"

export function transformSvg(_: string, code: string, { banner }: { banner: string }) {
	return detab(`
		${banner}
		${tab(code.trim().replace(/<svg ([^>]+)>/, `<svg $1>`), 2, { omitStart: true })}
	`)
}

export function transformJsx(name: string, code: string, { banner }: { banner: string }) {
	return detab(`
		${banner}
		export function ${name}(props) {
			return (
				${tab(code.trim().replace(/<svg ([^>]+)>/, "<svg $1 {...props}>"), 4, { omitStart: true })}
			);
		}
	`)
}

export function transformTsx(name: string, code: string, { banner }: { banner: string }) {
	return detab(`
		${banner}
		export function ${name}(props: JSX.IntrinsicElements["svg"]) {
			return (
				${tab(code.trim().replace(/<svg ([^>]+)>/, "<svg $1 {...props}>"), 4, { omitStart: true })}
			);
		}
	`)
}
