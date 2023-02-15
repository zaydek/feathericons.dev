import { useState } from "react"

// Add URL persistence
// MVP demo

export function StateProvider() {
	//////////////////////////////////////////////////////////////////////////////
	// Sidebar 1

	const [showFeather, setShowFeather] = useState(false)
	const [showWolfKitSocialMedia, setShowWolfKitSocialMedia] = useState(false)
	const [showWolfKitPayment, setShowWolfKitPayment] = useState(false)

	//////////////////////////////////////////////////////////////////////////////
	// Search bar

	const [search, setSearch] = useState<string[]>([])
	const [showIconsNames, setShowIconsNames] = useState(true)

	const [favorited, setFavorited] = useState(() => new Set<string>())
	const [selection, setSelection] = useState(() => new Set<string>())

	//////////////////////////////////////////////////////////////////////////////
	// Sidebar 2

	const [previewSize, setPreviewSize] = useState(32)
	const [previewStrokeWidth, setPreviewStrokeWidth] = useState(2)
	const [previewColor, setPreviewColor] = useState("#333")

	//////////////////////////////////////////////////////////////////////////////

	return <></>
}
