export function SidebarChildren({
	head,
	body,
	foot,
}: {
	head?: React.ReactNode
	body?: React.ReactNode
	foot?: React.ReactNode
}) {
	return (
		// prettier-ignore
		<>
			{head &&
				<header className="sidebar__head">
					{head}
				</header>
			}
			{body &&
				<div className="sidebar__body">
					{body}
				</div>
			}
			{foot &&
				<footer className="sidebar__foot">
					{foot}
				</footer>
			}
		</>
	)
}

//// export function Section({
//// 	head,
//// 	body,
//// 	foot,
//// }: {
//// 	head?: React.ReactNode
//// 	body?: React.ReactNode
//// 	foot?: React.ReactNode
//// }) {
//// 	return (
//// 		// prettier-ignore
//// 		<div className="section">
//// 			{head &&
//// 				<header className="section__head">
//// 					{head}
//// 				</header>
//// 			}
//// 			{body &&
//// 				<div className="section__body">
//// 					{body}
//// 				</div>
//// 			}
//// 			{foot &&
//// 				<footer className="section__foot">
//// 					{foot}
//// 				</footer>
//// 			}
//// 		</div>
//// 	)
//// }
