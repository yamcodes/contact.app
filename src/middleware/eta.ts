import path from "node:path";
import { Eta } from "eta";
import type { MiddlewareHandler } from "hono";

// Initialize Eta with views directory
const etaInstance = new Eta({
	views: path.join(import.meta.dir, "../views"),
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
 */
export function eta(): MiddlewareHandler {
	return async (c, next) => {
		c.setRenderer((viewName, data) => {
			const viewFile = `${viewName}.eta`;
			// Include flash message in template data
			const templateData = {
				...data,
				flash: c.get("flash"),
			};
			const html = etaInstance.render(viewFile, templateData);
			return c.html(html);
		});
		await next();
	};
}
