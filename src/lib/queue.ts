// 1x setTimeout doesn't always work and Safari doesn't support
// requestIdleCallback so YOLO
export function queue(fn: () => void) {
	window.setTimeout(() => {
		window.setTimeout(() => {
			fn()
		}, 0)
	}, 0)
}
