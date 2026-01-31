import type { MiddlewareHandler } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";
import { Layout } from "../views";

// Type declaration for the custom render method
declare module "hono" {
	interface ContextRenderer {
		// biome-ignore lint/style/useShorthandFunctionType: required for module augmentation
		(content: string | Promise<string>, props?: { title?: string }): Response;
	}
}

/**
 * Middleware to add `c.render()` for JSX components
 * - Wrap content in <Layout /> for regular requests
 * - Return bare content for HTMX requests
 */
export function jsx(): MiddlewareHandler {
	return jsxRenderer(
		({ children, title }, c) => {
			if (c.get("htmx")) {
				return <>{children}</>;
			}
			return (
				<Layout title={title} flash={c.get("flash")}>
					{children}
				</Layout>
			);
		},
		{ docType: false },
	);
}
