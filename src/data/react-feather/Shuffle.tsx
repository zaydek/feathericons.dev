// https://feathericons.dev/shuffle
export function Shuffle(props: JSX.IntrinsicElements["svg"]) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" {...props}>
			<polyline points="16 3 21 3 21 8" />
			<line x1="4" x2="21" y1="20" y2="3" />
			<polyline points="21 16 21 21 16 21" />
			<line x1="15" x2="21" y1="15" y2="21" />
			<line x1="4" x2="9" y1="4" y2="9" />
		</svg>
	);
}
