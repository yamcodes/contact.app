import path from "node:path";
import { Eta } from "eta";
import type { MiddlewareHandler } from "hono";

// Initialize Eta with views directory
const eta = new Eta({
	views: path.join(import.meta.dir, "../features"),
	cache: process.env.NODE_ENV === "production", // Cache in production only
});

// Type declaration for the custom render method
declare module "hono" {
	interface ContextRenderer {
		// biome-ignore lint/style/useShorthandFunctionType: required for module augmentation
		(template: string, data?: Record<string, unknown>): Response;
	}
}

/**
 * Middleware that adds c.render() for Eta templates
 */
export function etaRenderer(): MiddlewareHandler {
	return async (c, next) => {
		c.setRenderer((template, data) => {
			const html = eta.render(template, data ?? {});
			return c.html(html);
		});
		await next();
	};
}
