install:
	npm ci

publish:
	npm publish --dry-run

gendiff:
	node bin/gendiff.js

getDiff:
	node bin/diff.js

lint:
	npx eslint .