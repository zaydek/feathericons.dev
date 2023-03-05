export type Icon = (_: JSX.IntrinsicElements["svg"]) => JSX.Element

export function DynamicIcon({ icon: Icon, ...props }: { icon: Icon } & JSX.IntrinsicElements["svg"]) {
	return <Icon {...props} />
}
