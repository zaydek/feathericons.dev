import react from "react"

export function useTrackScrollProps() {
	const [scroll, setScroll] = react.useState(false)
	const props = {
		onScroll(e: react.UIEvent<HTMLElement>) {
			setScroll(e.currentTarget.scrollTop > 0)
		},
		"data-scroll": scroll.toString(),
	}
	return props
}
