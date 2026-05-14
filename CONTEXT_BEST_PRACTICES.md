# Context Best Practices

## What's in the System Prompt

The system prompt is a layered stack of instructions from multiple sources:

**Anthropic-controlled (~60% of tokens):**

- *Claude behavior rules* — tone, formatting, refusal handling, wellbeing
  guidelines, evenhandedness on political topics, knowledge cutoff behavior,
  product information
- *Cowork product instructions* — file creation triggers, artifact rules,
  computer-use tiering (read/click/full), scheduled tasks, web content
  restrictions, sharing/linking conventions
- *Memory system instructions* — the full schema for the 4 memory types
  (user/feedback/project/reference), when to save/not save, frontmatter
  format, MEMORY.md index rules
- *Skills instructions* — when and how to invoke skills, the full
  `<available_skills>` block listing every installed skill with name,
  description, and path
- *Tool guidance* — when to spawn agents, when to use
  AskUserQuestion/TodoList, computer-use tier rules (repeated in two
  places), MCP server instructions injected at runtime

**Your configuration (~40% of tokens):**

- *Global CLAUDE.md* — git commit message rules, PROMPTS.md append
  convention, CLAUDE.md formatting rules
- *Project CLAUDE.md* — full architecture doc for this repo (commands,
  routes, components, conventions, deployment) — the largest single chunk
  you control
- *User preferences* — language expertise declaration
- *MEMORY.md index* — currently just 3 short entries

---

## Compression Opportunities

**Things you can act on directly:**

1. **Project CLAUDE.md is the biggest lever.** It's comprehensive but
   includes a lot of stable reference material (Fly.io deploy details,
   Prettier config, CSS variable names, Shoelace theming) that Claude can
   derive by reading the files. Trim to: conventions that aren't in the
   code, non-obvious gotchas, and decision rationale. Cut "here's what the
   file does" descriptions that duplicate `grep`-able source truth.

2. **Available skills list.** You have ~30 skills installed. The
   `<available_skills>` block includes full descriptions and filesystem
   paths for all of them. Uninstalling plugins you don't use (the data
   analytics suite, the AWS marketplace connector) would trim this
   meaningfully.

3. **Memory index stays lean.** You only have 3 entries now — no action
   needed, but avoid letting it balloon past ~20 entries. Prefer broader
   rules over per-incident facts.

**Things Anthropic controls (informational only):**

4. **Memory system instructions are verbose.** The instructions for *how*
   the memory system works (4 type schemas, frontmatter format,
   when-not-to-save list, sensitive data rules) account for a significant
   chunk. This is fixed unless Anthropic changes it.

5. **Computer-use rules are duplicated.** The tiering rules
   (read/click/full, link safety, financial action prohibition) appear both
   in the main system prompt and again as an injected MCP server
   instruction. This is architectural duplication you can't collapse.

6. **Behavior guidelines are comprehensive.** The tone, refusal, wellbeing,
   legal-advice, and evenhandedness sections are thorough. Fixed.

---

## Practical Recommendation

The highest-ROI change is **auditing your project `CLAUDE.md`**. Go through
it and ask for each section: *"Would Claude get this right by reading the
source files?"* If yes, cut it. The architecture section in particular —
routes, template names, JS component behavior — is almost entirely
re-derivable from the code and adds tokens every conversation whether
relevant or not.
