import path from "node:path";
import { Eta } from "eta";
import type { MiddlewareHandler } from "hono";

// Initialize Eta with views directory
const eta = new Eta({
	views: path.join(import.meta.dir, "../features"),
	cache: process.env.NODE_ENV === "production",
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
 * @param basePath - Optional base path to prepend to template paths (e.g., "contacts")
 */
export function etaRenderer(basePath?: string): MiddlewareHandler {
	return async (c, next) => {
		c.setRenderer((template, data) => {
			const fullPath = basePath ? `${basePath}/${template}` : template;
			const html = eta.render(fullPath, data ?? {});
			return c.html(html);
		});
		await next();
	};
}
