import { Navbar } from "../navbar"
import { RouterTransition } from "../router-transition"

export function Page({ name }: { name: string }) {
	return <>
		<Navbar />
		<RouterTransition>
			<div>
				Hello /{name}
			</div>
		</RouterTransition>
	</>
}
