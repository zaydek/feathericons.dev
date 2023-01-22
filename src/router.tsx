import {
	createContext,
	Dispatch,
	LazyExoticComponent,
	PropsWithChildren,
	ReactElement,
	SetStateAction,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react"

// prettier-ignore
export const PathContext =
	createContext<{
		path:    string
		setPath: Dispatch<SetStateAction<string>>
	} | null>(null)

// Container component
//
// prettier-ignore
export function Route<Props>(_: {
	path:            string
	component:       ((_: Props) => JSX.Element) | LazyExoticComponent<any>
	componentProps?: Props
}) {
	return <></>
}

export function Router({ children }: PropsWithChildren) {
	const { path } = useContext(PathContext)!

	const [Component, componentProps] = useMemo(() => {
		// TODO: Ew...
		type RouteElement = ReactElement<
			{ path: string; component: (() => JSX.Element) | LazyExoticComponent<any>; componentProps?: Record<string, any> },
			typeof Route
		>
		const route = (children as RouteElement[]).flat().find(jsx => jsx.props.path === path)
		if (route === undefined) {
			return [() => <div>/404</div>, {}] // E.g. fallback
		} else {
			return [route.props.component, route.props.componentProps]
		}
	}, [children, path])

	return <Component {...componentProps} />
}

export function RouterProvider({ initialPath, children }: PropsWithChildren<{ initialPath: string }>) {
	const [path, setPath] = useState(initialPath)

	useEffect(() => {
		window.addEventListener(
			"popstate",
			e => {
				setPath(window.location.pathname)
			},
			false
		)
	}, [])

	return (
		<PathContext.Provider
			value={useMemo(
				() => ({
					path,
					setPath,
				}),
				[path]
			)}
		>
			{children}
		</PathContext.Provider>
	)
}

// Make href required
export type LinkProps = { href: string } & JSX.IntrinsicElements["a"]

export function Link({ href, children, ...props }: LinkProps) {
	const { setPath } = useContext(PathContext)!

	return (
		<a
			href={href}
			onClick={e => {
				e.preventDefault()
				setPath(href)
				window.history.pushState(null, "", href)
			}}
			{...props}
		>
			{children}
		</a>
	)
}
