//// unction negative(values) {
//// 	const nvalues = {}
//// 	for (const [k, v] of Object.entries(values)){
//// 		nvalues[`-${k}`] = `-${v}`
//// 	}
//// 	return nvalues
////
////
//// ////////////////////////////////////////////////////////////////////////////////

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

	  100:  "100px",
	  200:  "200px",
	  300:  "300px",
	  400:  "400px",
	  500:  "500px",
	  600:  "600px",
	  700:  "700px",
	  800:  "800px",
	  900:  "900px",
	"1e3": "1000px",
	 1100: "1100px",
	 1200: "1200px",
	 1300: "1300px",
	 1400: "1400px",
	 1500: "1500px",
	 1600: "1600px",
	 1700: "1700px",
	 1800: "1800px",
	 1900: "1900px",
	"2e3": "2000px",
}

const percents = {
	  "0%":   "0%",
	 "25%":  "25%",
	 "50%":  "50%",
	 "75%":  "75%",
	"100%": "100%",
}

const zIndexes = {
	    0:   0,
	   10:  10,
	   20:  20,
	   30:  30,
	   40:  40,
	   50:  50,
	   60:  60,
	   70:  70,
	   80:  80,
	   90:  90,
	  100: 100,
	"1e3": 1e3,
}

const defaultTheme = {
	borderRadius: { ...sizes, ...percents },
	maxHeight:    { ...sizes, ...percents },
	maxWidth:     { ...sizes, ...percents },
	minHeight:    { ...sizes, ...percents },
	minWidth:     { ...sizes, ...percents },
	spacing:      { ...sizes, ...percents },
	zIndex:       zIndexes,
	fontFamily: {
		sans: "var(--sans)",
		code: "var(--code)",
	},
}

module.exports = defaultTheme
