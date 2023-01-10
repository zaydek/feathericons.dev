import { Navbar } from "../navbar"

export function Page({ name }: { name: string }) {
	return <>
		<Navbar />
		<div>Welcome to /{name}</div>
	</>
}
