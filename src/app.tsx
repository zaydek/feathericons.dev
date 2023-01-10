import { manifest } from "./data/manifest"
import { Layout } from "./layout"
import { Home } from "./pages/home"
import { Page } from "./pages/page"
import { Route, Router, RouterProvider } from "./router"

export function App({ initialPath }: { initialPath: string }) {
	return <>
		<RouterProvider initialPath={initialPath}>
			<Layout>
				<Router>
					<Route path="/" component={Home} />
					{manifest.map(name =>
						<Route
							key={name}
							path={`/${name}`}
							component={() => <Page name={name} />}
						/>
					)}
				</Router>
			</Layout>
		</RouterProvider>
	</>
}
