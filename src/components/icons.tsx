export type Icon = (_: JSX.IntrinsicElements["svg"]) => JSX.Element

const STROKE_WIDTH = 2.5

// eslint-disable-next-line destructuring/no-rename
export function DynamicIcon({ icon: Icon, ...props }: { icon: Icon } & JSX.IntrinsicElements["svg"]) {
	return <Icon {...props} />
}

export function StrokeIcon({ icon, ...props }: { icon: Icon } & JSX.IntrinsicElements["svg"]) {
	return <DynamicIcon {...props} icon={icon} strokeWidth={STROKE_WIDTH} />
}
