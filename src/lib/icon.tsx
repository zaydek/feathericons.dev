export type IconComponent = (_: JSX.IntrinsicElements["svg"]) => JSX.Element

export function DynamicIcon({ Icon, ...props }: { Icon: IconComponent } & JSX.IntrinsicElements["svg"]) {
	return <Icon {...props} />
}
