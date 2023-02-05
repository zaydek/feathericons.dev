import * as feather from "../../data/react-feather"

import { PropsWithChildren, useState } from "react"
import { manifest } from "../../data/manifest"
import { cx } from "../../lib/cx"
import { Icon } from "../dynamic-icon"
import { ResizableIcon } from "../resizable-icon"
import { Container } from "./shared"

function IconContainer({ children }: PropsWithChildren) {
	return <div className="flex h-[var(--field-h)] w-[var(--field-h)] items-center justify-center">{children}</div>
}

function UsernameField({ icon }: { icon: Icon }) {
	return (
		<div className="flex items-center">
			{/* LHS */}
			<IconContainer>
				<ResizableIcon className="h-[var(--icon-size)] w-[var(--icon-size)] text-gray-800" icon={icon} />
			</IconContainer>
			<div className="grow">
				<div className="aspect-[16] h-6 rounded-1e3 bg-gray-300"></div>
			</div>
		</div>
	)
}

function PasswordField({ icon }: { icon: Icon }) {
	const [show, setShow] = useState(false)

	return (
		<div className="flex items-center">
			<IconContainer>
				<ResizableIcon className="h-[var(--icon-size)] w-[var(--icon-size)] text-gray-800" icon={icon} />
			</IconContainer>
			<div className="grow">
				<div className="aspect-[16] h-6 rounded-1e3 bg-gray-300"></div>
			</div>
			<IconContainer>
				<button
					className="group/button flex h-[var(--hover-icon-size)] w-[var(--hover-icon-size)] items-center justify-center rounded-1e3
						hover:bg-gray-100 hover:active:bg-gray-200"
					onClick={e => setShow(curr => !curr)}
					// prettier-ignore: aria-label
					aria-label="Toggle show password"
				>
					<ResizableIcon
						className="h-[var(--icon-size)] w-[var(--icon-size)] text-gray-300
							group-hover/button:text-gray-800"
						icon={show ? feather.Eye : feather.EyeOff}
					/>
				</button>
			</IconContainer>
		</div>
	)
}

export function DemoLogin({ name }: { name: keyof typeof manifest }) {
	return (
		<Container
			style={
				// prettier-ignore
				{
					"--field-h":         "48px",
					"--field-w":         "calc(var(--field-h) * 5)",
					"--icon-size":       "20px",
					"--hover-icon-size": "30px", // E.g. 1.5x
				} as any
			}
		>
			<div className="flex h-100% items-center justify-center">
				<div className="w-[var(--field-w)] rounded-[calc(var(--field-h)_*_0.375)] bg-white shadow-[var(--shadow-2)]">
					<UsernameField icon={feather[name]} />
					<hr />
					<PasswordField icon={({ className, ...props }) => <feather.Lock className={cx(className, "[&_>_rect]:fill-current")} {...props} />} />
				</div>
			</div>
		</Container>
	)
}
