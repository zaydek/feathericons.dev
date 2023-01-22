import { Navigation } from "../navigation"
import { RouterTransition } from "../router-transition"

export function Home() {
	return (
		<>
			<Navigation />
			<RouterTransition>
				<div>Hello /</div>
			</RouterTransition>
		</>
	)
}
