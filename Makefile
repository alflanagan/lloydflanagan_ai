# -*- mode: makefile-gmake; mode: indent-tabs -*-

.PHONY: dbuild context run strfind filefind jinja-fmt

dbuild:
	docker build . --tag=lloydflanagan-ai

context:
	docker build . --tag=lloydflanagan-context -f context.Dockerfile

run:
	uv run python ./main.py

jinja-fmt:
	./node_modules/.bin/prettier --plugin prettier-plugin-jinja-template --write templates/*.html

strfind:
# TODO: maybe there's a cleaner way to do this
	find . -name '\.pnp*' -prune \
               -o -name 'uv.lock' -prune \
               -o -name '\.mypy_cache' -prune \
               -o -name '\.playwright-mcp' -prune \
               -o -name '\.venv' -prune \
               -o -name '\.git' -prune \
               -o -name '\.root' -prune \
               -o -type f -exec grep -i $(ARGS) '{}' + | less

filefind:
	find . -name '\.pnp*' -prune \
               -o -name 'uv.lock' -prune \
               -o -name '\.mypy_cache' -prune \
               -o -name '\.playwright-mcp' -prune \
               -o -name '\.venv' -prune \
               -o -name '\.git' -prune \
               -o -name '\.root' -prune \
               -o -type f -exec grep -il $(ARGS) '{}' + | less
