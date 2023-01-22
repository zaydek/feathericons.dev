import { manifest } from "./data/react-feather-manifest"
import { Route, Router, RouterProvider } from "./router"
import { RouteTransitionProvider } from "./router-transition"
import { Home } from "./routes/home"
import { Page as IconRoute } from "./routes/icon-route"
import { StateProvider } from "./state"

export function App({ initialPath }: { initialPath: string }) {
	return (
		<StateProvider>
			<RouterProvider initialPath={initialPath}>
				<RouteTransitionProvider>
					<Router>
						<Route path="/" component={Home} />
						{Object.keys(manifest).map(name => (
							<Route key={name} path={`/${name}`} component={IconRoute} componentProps={{ name }} />
						))}
					</Router>
				</RouteTransitionProvider>
			</RouterProvider>
		</StateProvider>
	)
}
