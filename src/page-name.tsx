import { Navbar } from "./navbar"

export default function PageName({ name }: { name: string }) {
	return <>
		<Navbar />
		<div>{name}</div>
	</>
}
