// Add URL persistence
// MVP demo

import { useEffect, useState } from "react"
import * as z from "zod"

const SIZE_MIN = 16
const SIZE_MAX = 48
const SIZE_STEP = 1

const STROKE_WIDTH_MIN = 0.5
const STROKE_WIDTH_MAX = 3.5
const STROKE_WIDTH_STEP = 0.125

const DEFAULT_SEARCH = ""
const DEFAULT_SHOW_FEATHER = true
const DEFAULT_FOLD_BRANDS = false
const DEFAULT_SHOW_BRANDS_ORIGINAL = true
const DEFAULT_SHOW_BRANDS_ORIGINAL_CIRCLE = false
const DEFAULT_SHOW_BRANDS_ORIGINAL_SQUARE = false
const DEFAULT_SHOW_BRANDS_MONO = true
const DEFAULT_SHOW_BRANDS_MONO_CIRCLE = false
const DEFAULT_SHOW_BRANDS_MONO_SQUARE = false
const DEFAULT_FOLD_PAYMENTS = false
const DEFAULT_SHOW_PAYMENTS_ORIGINAL = false
const DEFAULT_SHOW_PAYMENTS_ORIGINAL_FILLED = true
const DEFAULT_SHOW_PAYMENTS_MONO = false
const DEFAULT_SHOW_PAYMENTS_MONO_FILLED = true
const DEFAULT_SIZE = 24
const DEFAULT_STROKE_WIDTH = 2


const searchSchema = z.string().optional().default(DEFAULT_SEARCH)
const showFeatherSchema = z.boolean().optional().default(DEFAULT_SHOW_FEATHER)
const foldBrandsSchema = z.boolean().optional().default(DEFAULT_FOLD_BRANDS)
const showBrandsOriginalSchema = z.boolean().optional().default(DEFAULT_SHOW_BRANDS_ORIGINAL)
const showBrandsOriginalCircleSchema = z.boolean().optional().default(DEFAULT_SHOW_BRANDS_ORIGINAL_CIRCLE)
const showBrandsOriginalSquareSchema = z.boolean().optional().default(DEFAULT_SHOW_BRANDS_ORIGINAL_SQUARE)
const showBrandsMonoSchema = z.boolean().optional().default(DEFAULT_SHOW_BRANDS_MONO)
const showBrandsMonoCircleSchema = z.boolean().optional().default(DEFAULT_SHOW_BRANDS_MONO_CIRCLE)
const showBrandsMonoSquareSchema = z.boolean().optional().default(DEFAULT_SHOW_BRANDS_MONO_SQUARE)
const foldPaymentsSchema = z.boolean().optional().default(DEFAULT_FOLD_PAYMENTS)
const showPaymentsOriginalSchema = z.boolean().optional().default(DEFAULT_SHOW_PAYMENTS_ORIGINAL)
const showPaymentsOriginalFilledSchema = z.boolean().optional().default(DEFAULT_SHOW_PAYMENTS_ORIGINAL_FILLED)
const showPaymentsMonoSchema = z.boolean().optional().default(DEFAULT_SHOW_PAYMENTS_MONO)
const showPaymentsMonoFilledSchema = z.boolean().optional().default(DEFAULT_SHOW_PAYMENTS_MONO_FILLED)

// prettier-ignore
const sizeSchema = z
	.number()
	.min(SIZE_MIN)
	.max(SIZE_MAX)
	.step(SIZE_STEP)
	.default(DEFAULT_SIZE)

// prettier-ignore
const strokeWidthSchema = z
	.number()
	.min(STROKE_WIDTH_MIN)
	.max(STROKE_WIDTH_MAX)
	.step(STROKE_WIDTH_STEP)
	.default(DEFAULT_STROKE_WIDTH)

export function StateProvider() {
	const [search, setSearch] = useState(DEFAULT_SEARCH)
	const [showFeather, setShowFeather] = useState(DEFAULT_SHOW_FEATHER)
	const [foldBrands, setFoldBrands] = useState(DEFAULT_FOLD_BRANDS)
	const [showBrandsOriginal, setShowBrandsOriginal] = useState(DEFAULT_SHOW_BRANDS_ORIGINAL)
	const [showBrandsOriginalCircle, setShowBrandsOriginalCircle] = useState(DEFAULT_SHOW_BRANDS_ORIGINAL_CIRCLE)
	const [showBrandsOriginalSquare, setShowBrandsOriginalSquare] = useState(DEFAULT_SHOW_BRANDS_ORIGINAL_SQUARE)
	const [showBrandsMono, setShowBrandsMono] = useState(DEFAULT_SHOW_BRANDS_MONO)
	const [showBrandsMonoCircle, setShowBrandsMonoCircle] = useState(DEFAULT_SHOW_BRANDS_MONO_CIRCLE)
	const [showBrandsMonoSquare, setShowBrandsMonoSquare] = useState(DEFAULT_SHOW_BRANDS_MONO_SQUARE)
	const [foldPayments, setFoldPayments] = useState(DEFAULT_FOLD_PAYMENTS)
	const [showPaymentsOriginal, setShowPaymentsOriginal] = useState(DEFAULT_SHOW_PAYMENTS_ORIGINAL)
	const [showPaymentsOriginalFilled, setShowPaymentsOriginalFilled] = useState(DEFAULT_SHOW_PAYMENTS_ORIGINAL_FILLED)
	const [showPaymentsMono, setShowPaymentsMono] = useState(DEFAULT_SHOW_PAYMENTS_MONO)
	const [showPaymentsMonoFilled, setShowPaymentsMonoFilled] = useState(DEFAULT_SHOW_PAYMENTS_MONO_FILLED)
	const [size, setSize] = useState(DEFAULT_SIZE)
	const [strokeWidth, setStrokeWidth] = useState(DEFAULT_STROKE_WIDTH)

	useEffect(() => {
	const searchParams = new URLSearchParams(window.location.search);

  if (searchSchema.safeParse(searchParams.get('search') || DEFAULT_SEARCH).
  if (showFeatherSchema.safeParse(searchParams.get('showFeather') || DEFAULT_SHOW_FEATHER).
  if (foldBrandsSchema.safeParse(searchParams.get('foldBrands') || DEFAULT_FOLD_BRANDS).
  if (showBrandsOriginalSchema.safeParse(searchParams.get('showBrandsOriginal') || DEFAULT_SHOW_BRANDS_ORIGINAL).
  if (showBrandsOriginalCircleSchema.safeParse(searchParams.get('showBrandsOriginalCircle') || DEFAULT_SHOW_BRANDS_ORIGINAL_CIRCLE).
  if (showBrandsOriginalSquareSchema.safeParse(searchParams.get('showBrandsOriginalSquare') || DEFAULT_SHOW_BRANDS_ORIGINAL_SQUARE).
  if (showBrandsMonoSchema.safeParse(searchParams.get('showBrandsMono') || DEFAULT_SHOW_BRANDS_MONO).
  if (showBrandsMonoCircleSchema.safeParse(searchParams.get('showBrandsMonoCircle') || DEFAULT_SHOW_BRANDS_MONO_CIRCLE).
  if (showBrandsMonoSquareSchema.safeParse(searchParams.get('showBrandsMonoSquare') || DEFAULT_SHOW_BRANDS_MONO_SQUARE).
  if (foldPaymentsSchema.safeParse(searchParams.get('foldPayments') || DEFAULT_FOLD_PAYMENTS).
  if (showPaymentsOriginalSchema.safeParse(searchParams.get('showPaymentsOriginal') || DEFAULT_SHOW_PAYMENTS_ORIGINAL).
  if (showPaymentsOriginalFilledSchema.safeParse(searchParams.get('showPaymentsOriginalFilled') || DEFAULT_SHOW_PAYMENTS_ORIGINAL_FILLED).
  if (showPaymentsMonoSchema.safeParse(searchParams.get('showPaymentsMono') || DEFAULT_SHOW_PAYMENTS_MONO).
  if (showPaymentsMonoFilledSchema.safeParse(searchParams.get('showPaymentsMonoFilled') || DEFAULT_SHOW_PAYMENTS_MONO_FILLED).
  if (sizeSchema.safeParse(searchParams.get('size') || DEFAULT_SIZE).
  if (strokeWidthSchema.safeParse(searchParams.get('strokeWidth') || DEFAULT_STROKE_WIDTH).

  setSearch(search);
  setShowFeather(showFeather);
  setFoldBrands(foldBrands);
  setShowBrandsOriginal(showBrandsOriginal);
  setShowBrandsOriginalCircle(showBrandsOriginalCircle);
  setShowBrandsOriginalSquare(showBrandsOriginalSquare);
  setShowBrandsMono(showBrandsMono);
  setShowBrandsMonoCircle(showBrandsMonoCircle);
  setShowBrandsMonoSquare(showBrandsMonoSquare);
  setFoldPayments(foldPayments);
  setShowPaymentsOriginal(showPaymentsOriginal);
  setShowPaymentsOriginalFilled(showPaymentsOriginalFilled);
  setShowPaymentsMono(showPaymentsMono);
  setShowPaymentsMonoFilled(showPaymentsMonoFilled);
  setSize(size);
  setStrokeWidth(strokeWidth);
}, []);
	return <></>
}
