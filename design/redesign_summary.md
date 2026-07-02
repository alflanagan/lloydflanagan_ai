# Claude Code Output

## TODO rename file

This is a substantial redesign. Let me read the reference HTML and current
source files before planning the work.

Now I have everything I need. Let me set up tasks and implement the redesign.

Now update `blog-card.js` to add `preview` mode:

Now update the `render()` method to handle preview mode:

Update the home route to pass blogfiles, then update templates:

Now update `index.html` to add the "Recent writing" section:

Fix the `about.html` and `education.html` content paths:

Update `blog.html` to clean up styles and match the redesign card spacing:

Redesign `prompts.html` to match the spec:

Now update `markdown-card.js` styles to match the design (Georgia font, card
styling):

Also update `blog-card.js` styles for the full (non-preview) card to match the
design:

The sandbox can't run uv (no network access to download Python 3.14). Let me
verify with ruff which I can check inline:

Ruff isn't in the sandbox either. Let me append the prompt to PROMPTS.md and
note the manual steps needed:

Redesign is implemented. Here's what changed:

**`base.html`** — Added gradient lightening layer over the paper texture; column
  narrowed to 720px with `padding: 0 24px 70px`.

**`site-header.js`** — Full Classic Column masthead: art-deco crest (60×60,
  rounded, shadowed), "A. Lloyd Flanagan" brand in Playwrite NZ (40px), Georgia
  italic tagline, centered uppercase nav with gold active underline, gradient
  divider rule. GitHub pill fixed top-right. GitLab and Design links removed per
  spec. Mobile: hamburger + full-screen drawer.

**`blog-card.js`** — Added `preview` boolean property. In preview mode renders a
  title+date row, first-paragraph excerpt, and "Read more →" link (the home page
  "Recent writing" layout). Full mode updated to Georgia type, design-spec card
  styling.

**`markdown-card.js`** — Updated to Georgia serif, 16px/1.75 line-height,
  design-spec card border/shadow.

**`app.py`** — Home route now passes 3 most-recent posts (sorted newest-first)
  to the template.

**`templates/index.html`** — Added "Recent writing" section label + preview
  blog-cards.

**`templates/blog.html`** — Cleaned up, consistent `margin-top: 30px` between
  cards.

**`templates/prompts.html`** — Redesigned: intro card, numbered cards with
  Playwrite NZ number + Georgia text, footer count.

**`templates/about.html` + `education.html`** — Fixed relative content paths to
  absolute.

You'll need to run `make djhtml` and `make fmtjs` locally to reformat the
templates and JS.
