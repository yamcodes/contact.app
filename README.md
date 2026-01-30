# contact.app

A simple contacts management app built with [Bun](https://bun.sh), [Hono](https://hono.dev), and [Eta](https://eta.js.org) templates.

## Architecture

This is a **server-rendered multi-page application (MPA)** — sometimes called a "traditional" or "Web 1.0" style app.

| Term | What it means here |
|------|-------------------|
| **SSR** | HTML is rendered on the server, not in the browser |
| **MPA** | Each page is a full HTML document. Navigation reloads the page |
| **Hypermedia** | The server returns HTML (not JSON). Forms and links drive interaction |
| **RESTful** | Follows [Roy Fielding's original REST](https://web.archive.org/web/20210513160155/https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm) — hypermedia (HTML) as the engine of application state, not JSON APIs |
| **No JavaScript** | The browser receives plain HTML + CSS. No client-side JS framework |

### How is this different from SPAs?

| | This app (MPA) | Single-Page App (SPA) |
|--|----------------|----------------------|
| Rendering | Server | Browser |
| Data format | HTML | JSON |
| Navigation | Full page reload | Client-side routing |
| JS required | No | Yes |
| Complexity | Low | Higher |

> 💡 This architecture is making a comeback with tools like [HTMX](https://htmx.org), [Hotwire](https://hotwired.dev), and [Unpoly](https://unpoly.com) — which enhance MPAs with partial page updates while keeping the server-rendered model.

## Features

- 📋 List all contacts
- 🔍 Search by name or email
- ➕ Add new contacts
- 👁️ View contact details
- 🔄 Hot reload for templates and CSS

## Quick Start

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

## Project Structure

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

## Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | [Bun](https://bun.sh) |
| Web Framework | [Hono](https://hono.dev) |
| Templating | [Eta](https://eta.js.org) |
| Styling | Plain CSS |
| Linting | [Biome](https://biomejs.dev) |

## How It Works

### Routing

Routes are defined in `router.ts` using Hono:

```ts
router.get("/contacts", (c) => {
  const contacts = Contact.all();
  return c.render("index", { contacts });
});
```

### Templates

Templates use Eta syntax. Layouts are supported via `layout()`:

```eta
<% layout("layout", { title: "Page Title" }) %>

<h1>Content goes here</h1>
```

### Data

Contacts are stored in memory (see `model.ts`). The model exports simple functions:

- `Contact.all()` – Get all contacts
- `Contact.search(query)` – Search contacts
- `Contact.find(id)` – Find by ID
- `Contact.add(data)` – Create new contact

## License

MIT
