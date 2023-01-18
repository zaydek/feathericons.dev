import "the-new-css-reset"

import "./css/base.scss"
import "./css/vars.scss"

import "uno.css"

import { createRoot } from "react-dom/client"
import { ProvidedApp } from "./search-app"
//// import { App } from "./app"

//// const MICRO_TIMEOUT = 10
////
//// export type TransitionProps = PropsWithChildren<{
//// 	when:     boolean
//// 	unmount?: "start" | "end"
//// 	start:    CSSProperties
//// 	end:      CSSProperties
//// 	duration: number
//// 	ease?:    string | readonly [number, number, number, number]
//// 	delay?:   number
//// }>
////
//// function Transition({ when, unmount, start, end, duration, ease = "ease", delay = 0, children }: TransitionProps) {
//// 	const [show, setShow] = useState(!(
//// 		 (when && unmount === "end") ||
//// 		(!when && unmount === "start")
//// 	))
//// 	const [state, setState] = useState<"start" | "end">(when ? "end" : "start")
////
//// 	const transitionProperty = useMemo(() => {
//// 		return [
//// 			...new Set([
//// 				...Object.keys(start).map(key => toKebabCase(key)),
//// 				...Object.keys(end).map(key => toKebabCase(key)),
//// 			]),
//// 		].join(", ")
//// 	}, [end, start])
////
//// 	const onceRef = useRef(false)
//// 	useEffect(() => {
//// 		if (!onceRef.current) {
//// 			onceRef.current = true
//// 			return
//// 		}
//// 		const ds: number[] = []
//// 		const d = window.setTimeout(() => {
//// 			setShow(true)
//// 			const d = window.setTimeout(() => {
//// 				setState(when ? "end" : "start")
//// 				const d = window.setTimeout(() => {
//// 					setShow(!(
//// 						(when && unmount === "end") ||
//// 						(!when && unmount === "start")
//// 					))
//// 				}, Math.max(MICRO_TIMEOUT, duration))
//// 				ds.push(d)
//// 			}, MICRO_TIMEOUT)
//// 			ds.push(d)
//// 		}, Math.max(MICRO_TIMEOUT, delay))
//// 		ds.push(d)
//// 		return () => {
//// 			ds
//// 				.reverse()
//// 				.forEach(tid => window.clearTimeout(tid))
//// 		}
//// 	}, [delay, duration, when, unmount])
////
//// 	return <>
//// 		{show && <>
//// 			{cloneElement(children as ReactElement, {
//// 				//// ref,
//// 				style: {
//// 					...state === "start"
//// 						? start
//// 						: end,
//// 					transitionProperty,
//// 					transitionDuration: `${duration}ms`,
//// 					transitionTimingFunction: typeof ease === "string"
//// 						? ease
//// 						: `cubic-bezier(${ease.join(", ")})`,
//// 					transitionDelay: `${delay ?? 0}ms`,
//// 				},
//// 			})}
//// 		</>}
//// 	</>
//// }
////
//// function Idea() {
//// 	const [on, setOn] = useState(false)
////
//// 	//// useEffect(() => {
//// 	//// 	console.log({ on })
//// 	//// }, [on])
////
//// 	return <>
//// 		<button className="fixed tl-8 z-100" onClick={e => setOn(curr => !curr)}>
//// 			Hello
//// 		</button>
//// 		<div className="flex flex-center h-100vh">
//// 			<Transition
//// 				when={on}
//// 				unmount="start"
//// 				start={{
//// 					transform: "scale(0.9)",
//// 					opacity: 0,
//// 				}}
//// 				end={{
//// 					transform: "scale(1)",
//// 					opacity: 1,
//// 				}}
//// 				duration={200}
//// 				ease={[0, 1, 1, 1.125]}
//// 			>
//// 				<div className="h-160 w-320 rounded-32 [background-color]-#fff [box-shadow]-$shadow-6"></div>
//// 			</Transition>
//// 		</div>
//// 	</>
//// }

const root = document.getElementById("root")!
if (import.meta.env.DEV) {
	console.log("[DEBUG] createRoot")
	//// createRoot(root).render(<App initialPath={window.location.pathname} />)
	createRoot(root).render(<ProvidedApp />)
} else {
	console.log("[DEBUG] hydrateRoot")
	//// hydrateRoot(root, <App initialPath={window.location.pathname} />)
	//// hydrateRoot(root, <ProvidedApp />)
	createRoot(root).render(<ProvidedApp />)
}
