import { DynamicIcon, IconComponent } from "@/lib"

const STROKE_WIDTH = 2.5

export function StrokeIcon({ icon, ...props }: { icon: IconComponent } & JSX.IntrinsicElements["svg"]) {
	return <DynamicIcon {...props} icon={icon} strokeWidth={STROKE_WIDTH} />
}
