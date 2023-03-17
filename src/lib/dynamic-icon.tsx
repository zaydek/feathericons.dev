export type IconComponent = (_: JSX.IntrinsicElements["svg"]) => JSX.Element

// eslint-disable-next-line destructuring/no-rename
export function DynamicIcon({ icon: Icon, ...props }: { icon: IconComponent } & JSX.IntrinsicElements["svg"]) {
	return <Icon {...props} />
}
