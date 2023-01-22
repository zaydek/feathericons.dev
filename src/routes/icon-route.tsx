import { Navigation } from "../navigation"
import { RouterTransition } from "../router-transition"

export function Page({ name }: { name: string }) {
	return (
		<>
			<Navigation />
			<RouterTransition>
				<div>Hello /{name}</div>
			</RouterTransition>
		</>
	)
}
