import PageFoo from "./page-foo"
import PageFooBar from "./page-foo-bar"
import Homepage from "./page-homepage"

import { AnchorHTMLAttributes, createContext, Dispatch, LazyExoticComponent, ReactNode, SetStateAction, Suspense, useContext, useEffect, useMemo, useState } from "react"

const PathContext =
	createContext("")
const SetPathContext =
	createContext<Dispatch<SetStateAction<string>> | null>(null)
const RoutesContext =
	createContext(new Map<string, (() => JSX.Element) | LazyExoticComponent<any>>())
const SetRoutesContext =
	createContext<Dispatch<SetStateAction<Map<string, (() => JSX.Element) | LazyExoticComponent<any>>>> | null>(null)

// Container component
function Route({ path: href, component }: { path: string, component: (() => JSX.Element) | LazyExoticComponent<any> }) {
	const setRoutes = useContext(SetRoutesContext)!

	useEffect(() => {
		setRoutes(curr => curr.set(href, component))
	}, [component, href, setRoutes])

	return <></>
}

function Router({ initialPath, children }: { initialPath?: string, children?: ReactNode }) {
	const [path, setPath] = useState(typeof window === "undefined" ? initialPath ?? "/" : window.location.pathname)
	const [routes, setRoutes] = useState(new Map<string, (() => JSX.Element) | LazyExoticComponent<any>>())

	const Component = useMemo(() => {
		type RouteChildren = { props: { path: string, component: (() => JSX.Element) | LazyExoticComponent<any> } }[]

		const jsx = (children as RouteChildren).find(route => route.props.path === path)
		return jsx!.props.component // TODO: Add fallback or 404
	}, [children, path])

	return <>
		<PathContext.Provider value={path}>
			<SetPathContext.Provider value={setPath}>
				<RoutesContext.Provider value={routes}>
					<SetRoutesContext.Provider value={setRoutes}>
						<Component />
					</SetRoutesContext.Provider>
				</RoutesContext.Provider>
			</SetPathContext.Provider>
		</PathContext.Provider>
	</>
}

// Make href required
export function Anchor({ href, children, ...props }: { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
	const setPath = useContext(SetPathContext)!

	return <>
		<a href={href} onClick={e => {
			e.preventDefault()
			setPath(href)
			window.history.pushState(null, "", href)
		}} {...props}>
			{children}
		</a>
	</>
}

//// console.log(import.meta.env)

export function App({ initialPath }: { initialPath?: string }) {
	return <>
		<Suspense fallback="Loading...">
			<Router initialPath={initialPath}>
				<Route path="/"
					component={Homepage} />
				<Route path="/foo"
					component={PageFoo} />
				<Route path="/foo/bar"
					component={PageFooBar} />
			</Router>
		</Suspense>
	</>
}

//// {/* <Suspense fallback="Loading">
//// 	<nav className="flex justify-center align-center gap-16 h-100vh">
//// 		<Link className="flex justify-center align-center w-96 h-32 rounded-1e3 bg-color-orange [cursor]-pointer" href="/" /* href={`/${element}`} */>
//// 			App
//// 		</Link>
//// 		<Link className="flex justify-center align-center w-96 h-32 rounded-1e3 bg-color-orange [cursor]-pointer" href="/app-page" /* href={`/${element}`} */>
//// 			App Page
//// 		</Link>
//// 	</nav>
//// </Suspense> */}
