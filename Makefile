# Generate Feather assets
feather:
	npx tsx scripts/feather.ts
feather-format:
	npx tsx scripts/feather-format.ts

# Generate out and out/sitemap.xml
static:
	npx next build
	npx next export
	npx tsx scripts/sitemap.ts

# Serve out
serve:
	npx serve out -l 3000
