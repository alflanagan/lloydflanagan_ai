dbuild:
	docker build . --tag=lloydflanagan-ai

context:
	docker build . --tag=lloydflanagan-context -f context.Dockerfile

run:
	uv run python ./main.py
