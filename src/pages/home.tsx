import { Navbar } from "../navbar"
import { RouterTransition } from "../router-transition"

export function Home() {
	return <>
		<Navbar />
		<RouterTransition>
			<div>
				Hello /
			</div>
		</RouterTransition>
	</>
}
