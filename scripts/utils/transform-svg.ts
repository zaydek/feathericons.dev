import { detab, tab } from "@/lib"

// prettier-ignore
export function transformSvg(name: string, code: string, { banner: __banner__ }: { banner: string }) {
	code = code.trim()
	return detab(`
		${__banner__}
		${tab(code.replace(/<svg ([^>]+)>/, `<svg class="feather feather-${name}" $1>`), 2, { omitStart: true })}
	`) + "\n" // EOF
}

// prettier-ignore
export function transformJsx(name: string, code: string, { banner: __banner__ }: { banner: string }) {
	code = code.trim()
	return detab(`
		${__banner__}
		export function ${name}(props) {
			return (
				${tab(code.replace(/<svg ([^>]+)>/, "<svg $1 {...props}>"), 4, { omitStart: true })}
			);
		}
	`) + "\n" // EOF
}

// prettier-ignore
export function transformTsx(name: string, code: string, { banner: __banner__ }: { banner: string }) {
	code = code.trim()
	return detab(`
		${__banner__}
		export function ${name}(props: JSX.IntrinsicElements["svg"]) {
			return (
				${tab(code.replace(/<svg ([^>]+)>/, "<svg $1 {...props}>"), 4, { omitStart: true })}
			);
		}
	`) + "\n" // EOF
}
