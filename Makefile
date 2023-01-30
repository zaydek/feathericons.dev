feather:
	npx tsx scripts/feather.ts
format-feather:
	npx tsx scripts/format-feather.ts

build:
	npx next build
	npx next export
	npx tsx scripts/sitemap.ts
serve:
	npx serve out -l 3000
