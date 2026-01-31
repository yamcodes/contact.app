# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Branches

| Branch | Description |
|--------|-------------|
| `main` | Web 1.0 — full page reloads, classic form submissions (Hono JSX templating) |
| `htmx` | htmx — partial updates, no full page reloads |

## Development Commands

```bash
bun install          # Install dependencies
bun run dev          # Start dev server with hot reload (http://localhost:3000)
bun test             # Run tests
bun test <file>      # Run a single test file
```

## Architecture

This is a **Hono** web application running on **Bun** with **Hono JSX** templating.

- **Entry point**: `src/app.ts` - Hono app exported as default (Bun auto-serves on port 3000)
- **Framework**: Hono (not Express) - lightweight web framework
- **Templating**: Hono JSX for server-side templates (see `tsconfig.json`)

## Bun-Specific Guidelines

**Always use Bun instead of Node.js tooling:**
- `bun <file>` not `node` or `ts-node`
- `bun test` not `jest` or `vitest`
- `bun install` not `npm/yarn/pnpm install`
- Bun auto-loads `.env` files - don't use `dotenv`

**Prefer Bun built-ins over npm packages:**
- `Bun.serve()` for HTTP servers (supports WebSockets, routes)
- `bun:sqlite` not `better-sqlite3`
- `Bun.file()` over `node:fs` readFile/writeFile
- Built-in `WebSocket` not `ws` package

## Testing

```ts
import { test, expect } from "bun:test";

test("example", () => {
  expect(1).toBe(1);
});
```

## Hono Documentation
When helping with Hono questions, fetch https://hono.dev/llms-small.txt for reference.
