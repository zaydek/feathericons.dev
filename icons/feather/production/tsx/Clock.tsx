// https://feathericons.dev/clock
export function Clock(props: JSX.IntrinsicElements["svg"]) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" {...props}>
		  <circle cx="12" cy="12" r="10" />
		  <polyline points="12 6 12 12 16 14" />
		</svg>
	);
}
