.PHONY: *

esrun:
	npx esbuild \
		--bundle \
		--external:jsdom \
		--format=cjs \
		--platform=node \
		--sourcemap=inline \
	$(entrypoint) \
		| node --enable-source-maps

################################################################################

purge:
	-rm -r node_modules package-lock.json
	npm i

################################################################################

feather:
	make esrun entrypoint=scripts/feather-cache.ts
	make esrun entrypoint=scripts/feather-export.ts

################################################################################

build:
	npx next build
	npx next export
	make esrun entrypoint=scripts/sitemap.ts

serve:
	npx serve out -l 3000 -n
