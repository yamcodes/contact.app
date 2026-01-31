import { createMiddleware } from "hono/factory";

declare module "hono" {
	interface ContextVariableMap {
		htmx: boolean;
	}
}

/**
 * Middleware that detects HTMX requests and sets a context variable.
 *
 * Sets `c.get("htmx")` to `true` when the request includes the `HX-Request` header,
 * indicating it was made by HTMX. This enables conditional rendering logic—
 * returning partial HTML for HTMX requests vs full page layouts for regular requests.
 *
 * @example
 * ```ts
 * app.use(htmx());
 *
 * app.get("/contacts", (c) => {
 *   if (c.get("htmx")) {
 *     // Return partial HTML fragment
 *   }
 *   // Return full page with layout
 * });
 * ```
 */
export const htmx = () =>
	createMiddleware(async (c, next) => {
		c.set("htmx", c.req.header("HX-Request") === "true");
		await next();
	});
