////////////////////////////////////////////////////////////////////////////////

export function SidebarHead({ children }: React.PropsWithChildren) {
	return <header className="sidebar-head">{children}</header>
}

export function SidebarBody({ children }: React.PropsWithChildren) {
	return <div className="sidebar-body">{children}</div>
}

export function SidebarFoot({ children }: React.PropsWithChildren) {
	return <footer className="sidebar-foot">{children}</footer>
}

////////////////////////////////////////////////////////////////////////////////

export function SectionHead({ children }: React.PropsWithChildren) {
	return <header className="section-head">{children}</header>
}

export function SectionBody({ children }: React.PropsWithChildren) {
	return <div className="section-body">{children}</div>
}

export function SectionFoot({ children }: React.PropsWithChildren) {
	return <footer className="section-foot">{children}</footer>
}
