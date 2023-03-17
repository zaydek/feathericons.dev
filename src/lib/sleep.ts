export function sleep(durationMs: number) {
	// Omit window because of Node.js
	return new Promise(resolve => setTimeout(resolve, durationMs))
}
