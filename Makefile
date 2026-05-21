# -*- mode: makefile-gmake; mode: indent-tabs -*-

.PHONY: dbuild context run strfind filefind jinja-fmt

dbuild:
	docker build . --tag=lloydflanagan-ai

context:
	docker build . --tag=lloydflanagan-context -f context.Dockerfile

run:
	uv run python ./main.py

djhtml:
	uv run djhtml templates

fmtjs:
	yarn run prettier --write static/js/*.js

mypy:
	cd src && mypy .

strfind:
# prints error message from Makefile. I suspect I need a shell function to prevent
	fd . . -t f -E 'uv.lock' --show-errors -x grep -iI ${ARGS} || true

filefind:
	fd . . -t f -E 'uv.lock' --show-errors -x grep -ilI ${ARGS} && echo $?
