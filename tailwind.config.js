const sizes = {
	   0:    "0px",    1:    "1px",    2:    "2px",    3:    "3px",    4:    "4px",
	   5:    "5px",    6:    "6px",    7:    "7px",    8:    "8px",    9:    "9px",
	  10:   "10px",   12:   "12px",   14:   "14px",   16:   "16px",   18:   "18px",
	  20:   "20px",   24:   "24px",   28:   "28px",   32:   "32px",   36:   "36px",
	  40:   "40px",   48:   "48px",   56:   "56px",   64:   "64px",   72:   "72px",
	  80:   "80px",   96:   "96px",  112:  "112px",  128:  "128px",  144:  "144px",
	 160:  "160px",  192:  "192px",  224:  "224px",  256:  "256px",  288:  "288px",
	 320:  "320px",  384:  "384px",  448:  "448px",  512:  "512px",  576:  "576px",
	 640:  "640px",  768:  "768px",  896:  "896px", 1024: "1024px", 1152: "1152px",
	1280: "1280px", 1536: "1536px", 1792: "1792px", 2048: "2048px", 2304: "2304px",
	2560: "2560px", 3072: "3072px", 3584: "3584px", 4096: "4096px",

	"1e3": "1e3px",
	"2e3": "2e3px",
}

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.tsx"],
	theme: {
		borderRadius: sizes,
		borderWidth:  sizes,
		maxHeight:    sizes,
		maxWidth:     sizes,
		minHeight:    sizes,
		minWidth:     sizes,
		spacing:      sizes,
	},
	plugins: [],
}
