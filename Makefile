feather:
	npx tsx scripts/feather.ts

feather-format:
	npx tsx scripts/feather-format.ts

build:
	npx next build
	npx next export
	npx tsx scripts/sitemap.ts

serve:
	npx serve out -l 3000
