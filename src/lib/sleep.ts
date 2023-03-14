export function sleep(durationMs: number) {
	return new Promise(resolve => window.setTimeout(resolve, durationMs))
}
