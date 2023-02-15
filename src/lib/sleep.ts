// Omit window to make this isomorphic for Node.js and the browser
export function sleep(durationMs: number) {
	return new Promise(resolve => setTimeout(resolve, durationMs))
}
