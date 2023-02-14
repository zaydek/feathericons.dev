import { useState } from "react"

export function StateProvider() {
	//////////////////////////////////////////////////////////////////////////////
	// Primary

	// Sidebar 1
	const [showFeatherIcons, setShowFeatherIcons] = useState(false)
	const [showSocialMediaIcons, setShowSocialMediaIcons] = useState(false)
	const [showPaymentServicesIcons, setShowPaymentServicesIcons] = useState(false)

	// Search bar
	const [search, setSearch] = useState<string[]>([])
	const [iconOnlyMode, setIconOnlyMode] = useState(false)

	// Search grid
	// TODO: Add favorites, selected here
	//
	//// const [favorites, setFavorites] = useState<Record ...>({})
	//// const [selected, setSelected] = useState<Record ...>({})

	// Sidebar 2
	const [size, setSize] = useState(32)
	const [strokeWidth, setStrokeWidth] = useState(2)

	//////////////////////////////////////////////////////////////////////////////

	return <></>
}
