// Unitless CSS properties as described by Vanilla Extract
//
// https://github.com/vanilla-extract-css/vanilla-extract/blob/6068246343ceb58a04006f4ce9d9ff7ecc7a6c09/packages/css/src/transformCss.ts#L25
export const unitless: Record<string, boolean> = {
	aspectRatio:             true, // Added
	animationIterationCount: true,
	borderImage:             true,
	borderImageOutset:       true,
	borderImageSlice:        true,
	borderImageWidth:        true,
	boxFlex:                 true,
	boxFlexGroup:            true,
	columnCount:             true,
	columns:                 true,
	flex:                    true,
	flexGrow:                true,
	flexShrink:              true,
	fontWeight:              true,
	gridArea:                true,
	gridColumn:              true,
	gridColumnEnd:           true,
	gridColumnStart:         true,
	gridRow:                 true,
	gridRowEnd:              true,
	gridRowStart:            true,
	initialLetter:           true,
	lineClamp:               true,
	lineHeight:              true,
	maxLines:                true,
	opacity:                 true,
	order:                   true,
	orphans:                 true,
	scale:                   true, // Added
	tabSize:                 true,
	WebkitLineClamp:         true,
	widows:                  true,
	zIndex:                  true,
	zoom:                    true,

	// SVG
	fillOpacity:             true,
	floodOpacity:            true,
	maskBorder:              true,
	maskBorderOutset:        true,
	maskBorderSlice:         true,
	maskBorderWidth:         true,
	shapeImageThreshold:     true,
	stopOpacity:             true,
	strokeDashoffset:        true,
	strokeMiterlimit:        true,
	strokeOpacity:           true,
	strokeWidth:             true,
}
