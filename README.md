# contact.app

A simple contacts app built with Bun and Hono.

## Branches

| Branch | Description |
|--------|-------------|
| [`main`](https://github.com/yamcodes/contact.app/tree/htmx) | Web 1.0 — full page reloads, classic form submissions |
| [`htmx`](https://github.com/yamcodes/contact.app/tree/htmx) (you're here!) | **HTMX — partial updates, no full page reloads** |

There are also temporary feature branches but these are the 2 stable branches.

## Overview

This app follows the architecture from [Hypermedia Systems](https://hypermedia.systems/part/htmx/) — same ideas, different tech stack (Bun + Hono instead of Python + Flask).

This branch (`htmx`) uses [HTMX](https://htmx.org) for a modern hypermedia-driven experience:
- HTML is rendered on the server
- HTMX handles partial page updates via AJAX
- No full page reloads for most interactions
- No client-side JavaScript framework (just HTMX attributes)

Think "Web 1.0 upgraded" — server-rendered HTML with seamless partial updates.

> HTMX extends HTML with attributes like `hx-get`, `hx-post`, and `hx-swap` to enable dynamic behavior without writing JavaScript.

## Features

- List and search contacts (with instant filtering via HTMX)
- Add, edit, and delete contact details
- Flash messages (cookie-based)
- Server-rendered HTML partials
- Partial page updates (no full reloads)
- Hot reload for templates and CSS
- Templates and partials for views
- Not found page

## Quickstart

```bash
# Install dependencies
bun install

# Start dev server (with hot reload)
bun run dev

# Open in browser
open http://localhost:3000
```

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start dev server with hot reload |
| `bun run start` | Start production server |
| `bun run check` | Run linter |
| `bun run fix` | Fix lint issues |
| `bun run typecheck` | Check TypeScript types |

## Project structure

```
├── src/
│   ├── app.ts              # App entry point
│   ├── router.ts           # Route definitions
│   ├── model.ts            # Contact data model
│   ├── middleware/
│   │   ├── jsx.tsx         # JSX renderer (c.render)
│   │   ├── flash.ts        # Flash messages
│   │   └── htmx.ts         # HTMX request detection
│   ├── utils/
│   │   ├── hmr.ts          # Hot reload setup
│   │   └── static.ts       # Static file serving
│   └── views/
│       ├── layout.tsx      # Base layout
│       └── pages/          # Page components
├── static/
│   └── styles.css          # Stylesheet
└── package.json
```

## Tech stack

| Layer | Technology |
|-------|------------|
| Runtime | [Bun](https://bun.sh) |
| Web Framework | [Hono](https://hono.dev) |
| Templating | [Hono JSX](https://hono.dev/docs/guides/jsx) |
| Hypermedia | [HTMX](https://htmx.org) |
| Styling | CSS |
| Linting | [Biome](https://biomejs.dev) |

## How it works

Routes are defined with Hono and render JSX components:

```tsx
router.get("/contacts", (c) => {
  const contacts = Contact.all();
  return c.render(<ContactList contacts={contacts} />);
});
```

Templates use HTMX attributes for dynamic behavior:

```html
<form hx-post="/contacts/new" hx-target="#contact-list" hx-swap="beforeend">
  <input name="name" placeholder="Name" />
  <button type="submit">Add</button>
</form>
```

The server returns HTML partials that HTMX swaps into the page — no JSON, no client-side rendering.

## License

MIT
