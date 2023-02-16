.PHONY: *

build:
	npx next build
	npx next export
	npx tsx scripts/sitemap.ts

build-s:
	make build
	make serve

serve:
	npx serve out -l 3000 -n
