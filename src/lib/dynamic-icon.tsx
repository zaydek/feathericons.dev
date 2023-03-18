export type Icon = (_: JSX.IntrinsicElements["svg"]) => JSX.Element

// eslint-disable-next-line destructuring/no-rename
export function DynamicIcon({ icon: Icon, ...props }: { icon: Icon } & JSX.IntrinsicElements["svg"]) {
	return <Icon {...props} />
}
