import * as feather from "@icons/feather"

import { cx } from "@/lib"
import { useState } from "react"

export function Banner() {
	const [show, setShow] = useState(true)

	return (
		// @ts-expect-error
		<div className={cx("banner", !show && "is-hidden")} inert={show ? null : "true"}>
			<div className="container">
				<div className="icon-frame">
					<feather.Feather className="icon" strokeWidth={2.5} />
				</div>
				<div className="type u-flex-1">
					Simply beautiful open source icons, designed by&nbsp;<a href="TODO">@colebemis</a>
				</div>
				<div className="x-button" onClick={e => setShow(false)}>
					<feather.X className="icon" strokeWidth={4} />
				</div>
			</div>
		</div>
	)
}
