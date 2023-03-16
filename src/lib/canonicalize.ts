// prettier-ignore
export function canonicalize(str: string) {
	return str.replace(/([a-z\d])([A-Z])/g, "$1-$2")
	          .replace(/\s+|_+|-+/g, "-")
	          .toLowerCase()
	          .replace(/(^-+|-+$)/g, "");
}
