import * as t from "./star-type"

import { PropsWithChildren, ReactNode, useState } from "react"
import { cx } from "../lib/cx"
import { Transition } from "./transition"

// TODO: Convert to using Framer Motion and deprecate <Transition>?
export function Hoverable({
	pos,
	content,
	children,
}: PropsWithChildren<{
	pos:     "start" | "center" | "end" // prettier-ignore
	content: ReactNode
}>) {
	const [hover, setHover] = useState(false)

	return (
		<div className="relative flex flex-col" onMouseEnter={e => setHover(true)} onMouseLeave={e => setHover(false)}>
			{children}
			<Transition
				when={hover}
				unmount="start"
				s1={{
					// prettier-ignore
					transform: pos === "center"
						? "translateY(8px) translateX(-50%)"
						: "translateY(8px)",
					opacity: 0,
				}}
				s2={{
					// prettier-ignore
					transform: pos === "center"
						? "translateY(0px) translateX(-50%)"
						: "translateY(0px)",
					opacity: 1,
				}}
				duration={100}
				ease={[0, 1, 1, 1]}
				delay={hover ? 10 : 0}
			>
				<div
					className={
						// prettier-ignore
						{
							start:  cx("pointer-events-none absolute top-[calc(100%_+_10px)] left-0     z-10"),
							center: cx("pointer-events-none absolute top-[calc(100%_+_10px)] left-[50%] z-10"),
							end:    cx("pointer-events-none absolute top-[calc(100%_+_10px)] right-0    z-10"),
						}[pos]
					}
				>
					<div className="flex h-32 items-center gap-8 rounded-12 bg-white px-12 shadow-[var(--shadow-6),_var(--base-shadow-6)]">
						<t.Caps className="text-gray-700">{content}</t.Caps>
					</div>
				</div>
			</Transition>
		</div>
	)
}
