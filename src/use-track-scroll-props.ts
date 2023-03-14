import React from "react"

export function useTrackScrollProps() {
	const [scroll, setScroll] = React.useState(false)
	const props = {
		onScroll(e: React.UIEvent<HTMLElement>) {
			setScroll(e.currentTarget.scrollTop > 0)
		},
		"data-scroll": JSON.stringify(scroll),
	}
	return props
}
