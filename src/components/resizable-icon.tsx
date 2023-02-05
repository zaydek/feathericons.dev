import { cx } from "../lib/cx"
import { DynamicIcon, DynamicIconProps } from "./dynamic-icon"

// No JavaScript here 😋
export function ResizableIcon({ className, ...props }: DynamicIconProps) {
	return <DynamicIcon className={cx(className, `[transform:_scale(var(--icon-scale))] [stroke-width:_var(--icon-stroke-width)]`)} {...props} />
}
