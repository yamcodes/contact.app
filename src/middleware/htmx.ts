import { createMiddleware } from "hono/factory";

declare module "hono" {
	interface ContextVariableMap {
		htmx: boolean;
	}
}

export const htmx = () =>
	createMiddleware(async (c, next) => {
		c.set("htmx", c.req.header("HX-Request") === "true");
		await next();
	});
