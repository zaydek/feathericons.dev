import { UIEvent, useState } from "react"

export function useTrackScrollProps() {
	const [scroll, setScroll] = useState(false)
	const props = {
		onScroll(e: UIEvent<HTMLElement>) {
			setScroll(e.currentTarget.scrollTop > 0)
		},
		"data-scroll": scroll.toString(),
	}
	return props
}
