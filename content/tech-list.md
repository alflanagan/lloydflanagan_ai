# Third-Party Software

- [FastAPI](https://fastapi.tiangolo.com) —
  Modern Python web framework chosen for its async-native design,
  automatic validation via Pydantic, and clean decorator-based routing.

- [Uvicorn](https://www.uvicorn.org") —
  Lightweight ASGI server that pairs naturally with FastAPI and
  supports hot-reload during development.

- [Jinja2](https://jinja.palletsprojects.com) —
  Templating engine integrated directly into FastAPI; allows HTML
  pages to be composed from a shared base layout with named blocks.

- [Shoelace](https://shoelace.style") —
  Web-components UI library that provides polished, accessible
  elements (cards, badges, buttons) without locking the project into a
  JavaScript framework.

- [Lit](https://lit.dev) —
  Minimal library used to build the custom components, including `site-header`
  and `markdown-card`. Chosen because it compiles down to standard custom
  elements with no runtime overhead beyond the small Lit core.

- [Google Fonts](https://fonts.google.com) —
  Supplies the **Playwrite New Zealand Basic** typeface used in the site
  heading, loaded via CDN for zero self-hosting complexity.

- [uv](https://docs.astral.sh/uv/) —
  Fast Python package and project manager used to install dependencies and run
  scripts, replacing the traditional pip/virtualenv workflow.

- [Fly.io](https://fly.io) —
  Deployment platform that hosts the containerised app globally; chosen for its
  simple CLI, free tier, and built-in HTTPS.
