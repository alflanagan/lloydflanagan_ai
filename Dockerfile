# Stage 1: builder — install production dependencies into a venv
FROM python:3.14 AS builder

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev --no-install-project

COPY src/ src/

# Stage 2: runtime — lean image with only what's needed to serve
FROM python:3.14-slim

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

COPY --from=builder /app/.venv .venv/
COPY --from=builder /app/src src/
COPY static/ static/
COPY templates/ templates/
COPY content/ content/
COPY PROMPTS.md ./

EXPOSE 8000
CMD ["/app/.venv/bin/fastapi", "run", "src/lloydflanagan/app.py", "--host", "0.0.0.0", "--port", "8000"]
