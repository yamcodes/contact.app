# contact.app

A simple contacts app built with Bun and Hono.

## Branches

| Branch | Description |
|--------|-------------|
| **[`main`](https://github.com/yamcodes/contact.app/tree/main)** (You're here!) | **Web 1.0 — full page reloads, classic form submissions** |
| [`htmx`](https://github.com/yamcodes/contact.app/tree/htmx) | HTMX — partial updates, no full page reloads |

There are also temporary feature branches but these are the 2 stable branches.

## Overview

This app follows the architecture from [Hypermedia Systems](https://hypermedia.systems/part/htmx/) — same ideas, different tech stack (Bun + Hono instead of Python + Flask).

This branch (`main`) uses classic Web 1.0 patterns:
- HTML is rendered on the server using Hono JSX
- Full page reloads for all navigation
- Standard HTML form submissions
- No client-side JavaScript required

Think "Web 1.0" — pure server-rendered HTML with traditional request/response cycles.

> Check out the [`htmx`](https://github.com/yamcodes/contact.app/tree/htmx) branch for the HTMX-enhanced version with partial page updates.

## Features

- List and search contacts
- Add, edit, and delete contact details
- Flash messages (cookie-based)
- Server-rendered HTML with Hono JSX
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
│   │   └── flash.ts        # Flash messages
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

> **Barrel files:** Allowed only in leaf directories that export multiple related modules and are consumed from the outside. Never barrel directories that contain subdirectories or sit in the middle of the dependency graph.

## Tech stack

| Layer | Technology |
|-------|------------|
| Runtime | [Bun](https://bun.sh) |
| Web Framework | [Hono](https://hono.dev) |
| Templating | [Hono JSX](https://hono.dev/docs/guides/jsx) |
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

Templates use standard HTML form elements:

```html
<form action="/contacts/new" method="POST">
  <input name="name" placeholder="Name" />
  <button type="submit">Add</button>
</form>
```

The server renders full HTML pages — classic request/response, no JavaScript required.

## License

MIT
