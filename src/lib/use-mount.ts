import React from "react"

// A dependency free hook that runs once on mount
export function useMount(fn: () => void) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	React.useEffect(fn, [])
	return void 0
}
