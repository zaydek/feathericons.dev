// https://feathericons.dev/image
export function Image(props: JSX.IntrinsicElements["svg"]) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" {...props}>
		  <rect height="18" rx="2" ry="2" width="18" x="3" y="3" />
		  <circle cx="8.5" cy="8.5" r="1.5" />
		  <polyline points="21 15 16 10 5 21" />
		</svg>
	);
}
