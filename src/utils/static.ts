import type { Hono } from "hono";
import { serveStatic } from "hono/bun";

/**
 * Set up static file serving from the `/static` directory
 */
export function setupStatic(app: Hono) {
	app.use("/static/*", serveStatic({ root: "./" }));
	app.get("/htmx.js", serveStatic({ path: "./node_modules/htmx.org/dist/htmx.min.js" }));
}
