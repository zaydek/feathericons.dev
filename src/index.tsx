import "the-new-css-reset"

import "./css/base.scss"
import "./css/vars.scss"

import "uno.css"

import { ButtonHTMLAttributes, HTMLAttributes, PropsWithChildren } from "react"
import { createRoot } from "react-dom/client"
import { JSXIcon, SVGIcon, TSXIcon } from "./icon-config"
import { cx } from "./lib/cx"
import { Icon } from "./lib/react/icon"
//// import { App } from "./app"

//// type Position = "start" | "center" | "end"
////
//// function Tooltip({ pos, icon, text, children }: PropsWithChildren<{ pos: Position, icon?: IconComponent, text: ReactNode, data?: any }>) {
//// 	const [hover, setHover] = useState(false)
////
//// 	return <>
//// 		{/* Use flex flex-col to preserve width */}
//// 		<div className="relative flex flex-col" onMouseEnter={e => setHover(true)} onMouseLeave={e => setHover(false)}>
//// 			{children}
//// 			<Transition
//// 				when={hover}
//// 				unmount="start"
//// 				start={{
//// 					transform: pos === "center"
//// 						? "translateY(8px) translateX(-50%)"
//// 						: "translateY(8px)",
//// 					opacity: 0,
//// 				}}
//// 				end={{
//// 					transform: pos === "center"
//// 						? "translateY(0px) translateX(-50%)"
//// 						: "translateY(0px)",
//// 					opacity: 1,
//// 				}}
//// 				duration={100}
//// 				easing={[0, 1, 1, 1]}
//// 				delay={hover ? 10 : 0}
//// 			>
//// 				<div className={{
//// 					"start":  cx("absolute t-calc(100%_+_10px) l-0   z-10 [pointer-events]-none"),
//// 					"center": cx("absolute t-calc(100%_+_10px) l-50% z-10 [pointer-events]-none"),
//// 					"end":    cx("absolute t-calc(100%_+_10px) r-0   z-10 [pointer-events]-none"),
//// 				}[pos]}>
//// 					<div className="px-12 flex align-center gap-8 h-32 rounded-12 [background-color]-hsl(0,_0%,_99%) [box-shadow]-$shadow-6,_$raw-shadow-6">
//// 						{icon !== undefined && <Icon className="h-16 w-16 [color]-#333" icon={icon} />}
//// 						<TypeCaps>
//// 							{text}
//// 						</TypeCaps>
//// 					</div>
//// 				</div>
//// 			</Transition>
//// 		</div>
//// 	</>
//// }

function TypeCaps({
	className,
	children,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return <>
		{/* Surprisingly, use +1px font-size here */}
		<div className={cx("[white-space]-pre [font]-600_11px_/_normal_$sans [font-feature-settings]-'tnum' [letter-spacing]-0.0625em [color]-#333", className)} {...props}>
			{children}
		</div>
	</>
}

function TypeInvertedCaps({
	className,
	children,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return <>
		{/* Surprisingly, use +1px font-size here */}
		<div className={cx("[white-space]-pre [font]-600_11px_/_normal_$sans [font-feature-settings]-'tnum' [letter-spacing]-0.0625em [color]-#fff", className)} {...props}>
			{children}
		</div>
	</>
}

function SelectItem({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
	return <>
		<button className="px-12 flex align-center gap-8 h-32 [&:first-child]:rounded-t-12 [&:last-child]:rounded-b-12 [&:hover]:[background-color]-hsl($base-h,_$base-s,_$base-l,_0.1)" {...props}>
			{children}
		</button>
	</>
}

function SelectMenu({ children }: PropsWithChildren) {
	return <>
		{/* Use [white-space]-pre to prevent text from wrapping */}
		<div className="absolute t-calc(100%_+_10px) r-0 z-10 [white-space]-pre">
			{/* Use flex flex-col for <button> */}
			<div className="flex flex-col rounded-12 [background-color]-hsl(0,_0%,_99%) [box-shadow]-$shadow-6">
				{children}
			</div>
		</div>
	</>
}

function Idea() {
	return <>
		<div className="flex flex-center h-100vh">
			<div className="relative flex flex-col">
				<div className="flex flex-center h-48 w-96 rounded-16 [background-color]-orange">
					<div>Hello</div>
				</div>
				<SelectMenu>
					<SelectItem>
						<Icon className="h-16 w-16 [color]-$svg-color" icon={SVGIcon} />
						<TypeCaps>
							SVG
						</TypeCaps>
					</SelectItem>
					<SelectItem>
						<Icon className="h-16 w-16 [color]-$jsx-color" icon={JSXIcon} />
						<TypeCaps>
							REACT
						</TypeCaps>
					</SelectItem>
					<SelectItem>
						<Icon className="h-16 w-16 [color]-$tsx-color" icon={TSXIcon} />
						<TypeCaps>
							TYPESCRIPT REACT
						</TypeCaps>
					</SelectItem>
				</SelectMenu>
			</div>
		</div>
	</>
}

const root = document.getElementById("root")!
if (import.meta.env.DEV) {
	console.log("[DEBUG] createRoot")
	//// createRoot(root).render(<App initialPath={window.location.pathname} />)
	//// createRoot(root).render(<ProvidedApp />)
	createRoot(root).render(<Idea />)
} else {
	console.log("[DEBUG] hydrateRoot")
	//// hydrateRoot(root, <App initialPath={window.location.pathname} />)
	//// hydrateRoot(root, <ProvidedApp />)
	//// createRoot(root).render(<ProvidedApp />)
	createRoot(root).render(<Idea />)
}
