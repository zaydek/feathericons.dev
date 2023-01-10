import { Navbar } from "../navbar"
import { Transition } from "../transition"

export function Home() {
	return <>
		<Navbar />
		<Transition>
			<div>
				Hello /
			</div>
		</Transition>
	</>
}
