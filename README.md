# contact.app

A simple contacts app built with Bun, Hono, and Eta.

## Overview

This is a server-rendered web app using a traditional multi-page approach:
- HTML is rendered on the server
- Pages reload on navigation
- Forms and links drive all interactions
- No client-side JavaScript framework

Think “classic web app”, but written in TypeScript.
It deliberately avoids the SPA model (JSON APIs, client-side routing, hydration) in favor of a simpler, HTML-first design.

> Inspired by hypermedia-driven systems (HTML as the API), rather than JSON-first SPAs.

## Features

- List and search contacts
- Add and view contact details
- Server-rendered pages
- Hot reload for templates and CSS

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
│   │   └── eta.ts          # Template rendering (c.render)
│   ├── utils/
│   │   ├── setup-hmr.ts    # Hot reload setup
│   │   └── setup-static.ts # Static file serving
│   └── views/
│       ├── layout.eta      # Base layout
│       ├── index.eta       # Contact list page
│       └── new.eta         # New contact form
├── static/
│   └── styles.css          # Stylesheet
└── package.json
```

## Tech stack

| Layer | Technology |
|-------|------------|
| Runtime | [Bun](https://bun.sh) |
| Web Framework | [Hono](https://hono.dev) |
| Templating | [Eta](https://eta.js.org) |
| Styling | Plain CSS |
| Linting | [Biome](https://biomejs.dev) |

## How it works

### Routing

Routes are defined with Hono and render Eta templates directly:

```ts
router.get("/contacts", (c) => {
  const contacts = Contact.all();
  return c.render("index", { contacts });
});
```

Templates are standard Eta files with a shared layout.

## License

MIT
