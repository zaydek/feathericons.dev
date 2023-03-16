//// // prettier-ignore
//// export function canonicalize(str: string) {
//// 	return str.replace(/([a-z\d])([A-Z])/g, "$1-$2")
//// 	          .replace(/\s+|_+|-+/g, "-")
//// 	          .toLowerCase()
//// 	          .replace(/(^-+|-+$)/g, "");
//// }

const re1 = /([a-z\d])([A-Z])|[\s_]+/g
const re2 = /^-+|-+$/g

// prettier-ignore
export function canonicalize(str: string) {
	return str.replace(re1, "$1-$2")
	          .toLowerCase()
	          .replace(re2, "");
}
