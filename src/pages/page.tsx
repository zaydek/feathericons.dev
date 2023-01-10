import { Navbar } from "../navbar"
import { Transition } from "../transition"

export function Page({ name }: { name: string }) {
	return <>
		<Navbar />
		<Transition>
			<div>
				Hello /{name}
			</div>
		</Transition>
	</>
}
