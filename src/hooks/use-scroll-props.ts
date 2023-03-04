import { useState } from "react"

export function useScrollProps() {
	const [scroll, setScroll] = useState(false)

	const scrollProps = {
		onScroll(e: React.UIEvent<HTMLElement>) {
			setScroll(e.currentTarget.scrollTop > 0)
		},
		"data-scroll": scroll.toString(),
	}

	return { scrollProps }
}
