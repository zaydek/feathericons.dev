import { cx } from "../lib/cx"
import { Icon, IconProps } from "./icon"

// No JavaScript here 😋
export function ResizableIcon({ className, ...props }: IconProps) {
	return <Icon className={cx(className, `[transform:_scale(var(--icon-scale))] [stroke-width:_var(--icon-stroke-width)]`)} {...props} />
}
