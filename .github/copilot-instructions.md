Purpose

This guidance file is for Copilot/assistant sessions working in the lloydflanagan repository. It focuses on repository‑specific commands, architecture notes, and conventions an assistant needs to act usefully and safely.

Quick commands (install / build / run / single test)

- Install dependencies (uv package manager):
  - uv sync
- Run development server:
  - make run
  - (equivalently) uv run python ./main.py
- Run tests:
  - uv run pytest
  - Run a single test: uv run pytest tests/<file>::<test_name>  (example: uv run pytest tests/test_views.py::test_home)
- Lint / format (Python):
  - uv run ruff check .
  - uv run ruff format .
- Type checking:
  - make mypy
- Jinja template formatting:
  - make djhtml
  - (djhtml can also be run directly: uv run djhtml templates)
- JS formatting (Prettier / Yarn):
  - make fmtjs  # runs `yarn run prettier --write static/js/*.js`
  - Install JS deps with `yarn` (repo uses Yarn v4 per package.json)
- Docker image build targets (Makefile):
  - make dbuild
  - make context

Where to look for commands and config

- Makefile: run, djhtml, fmtjs, mypy, dbuild, context
- pyproject.toml: Python dependencies, dev dependency group (djhtml, mypy, pytest, ruff) and ruff/mypy configuration
- package.json: JS deps (lit, marked, shoelace) and prettier (dev)

High-level architecture (big picture)

- Backend: FastAPI + Jinja2 templates. The FastAPI app is defined in src/lloydflanagan/app.py and the app entrypoint is run via main.py (make run / uv run python ./main.py).
- Templates: All pages extend templates/base.html and populate {% block content %}.
- Static frontend: Lit web components live in static/js/ (site-header.js, blog-card.js, markdown-card.js). Shoelace is used as the UI library.
- Content model: Markdown content is stored in content/ and served as static files via app.mount("/content", StaticFiles(...)). Blog posts live in content/blog/.
- Prompts: PROMPTS.md holds the prompt history; the /prompts route parses and renders numbered prompts.

Key repository conventions (must-follow)

- Adding a new page:
  1. Add a route (handler) in src/lloydflanagan/app.py.
  2. Create a matching template in templates/ extending base.html.
  3. Add a navigation link in static/js/site-header.js (then run make fmtjs).
  4. Run make djhtml after editing templates to normalize markup.

- Blog posts:
  - Filenames follow: YYMMDD[-YYMMDD]-Post_Title.md
  - Drafts are named ending in -draft.md and are excluded by the app's _published_posts() helper.

- PROMPTS.md edits:
  - Append each new prompt as the next numbered list item.
  - Wrap lines at column 80; continuation lines should be indented three spaces to align with the text after the number.

- Lint/test/typing:
  - After Python edits run: uv run ruff check . ; run uv run ruff format . only when formatting is needed.
  - Use make mypy for type checking (mypy config in pyproject.toml).

- Styles and CSS:
  - Use CSS variables defined in static/css/variables.css rather than hard-coded colors.

- JS component edits:
  - Update static/js site components and run make fmtjs (prettier via yarn).

Repository AI assistant artifacts and rules

- CLAUDE.md: contains the repository-specific assistant guidelines — consult it for behavioral rules and surgical-change expectations.
- PROMPTS.md: canonical record of prompts used to build the site. When generating or changing pages with AI, append new prompts here per the convention above.

Other local notes useful to an assistant

- pyproject.toml sets ruff line-length=88 and target-version=py314 — adhere to these when producing Python code.
- The app mounts /static and /content; static content (JS/CSS/images) lives under static/, markdown lives under content/.
- TrustedHostMiddleware in app.py lists allowed hosts; include these hostnames when generating deployment or integration examples.

Files consulted while producing this guidance

- README.md, CLAUDE.md, Makefile, pyproject.toml, package.json, src/lloydflanagan/app.py, static/js/site-header.js, templates/base.html, PROMPTS.md

If helpful, update this file with more automation shortcuts (Makefile targets or scripts) or add example test commands for particular tests.  

--
Generated for Copilot sessions to make future assistant runs productive and respectful of repository constraints.
