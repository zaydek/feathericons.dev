export type IconComponent = (_: JSX.IntrinsicElements["svg"]) => JSX.Element

//// export type DynamicIconProps = { icon: Icon } & JSX.IntrinsicElements["svg"]
////
//// export function DynamicIcon({ icon, ...props }: { icon: IconComponent } & JSX.IntrinsicElements["svg"]) {
//// 	return createElement(icon, props)
//// }
