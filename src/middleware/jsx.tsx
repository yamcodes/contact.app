import type { MiddlewareHandler } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";
import { Layout } from "@/views/layout";

// Type declaration for the custom render method
declare module "hono" {
	interface ContextRenderer {
		// biome-ignore lint/style/useShorthandFunctionType: required for module augmentation
		(content: string | Promise<string>, props?: { title?: string }): Response;
	}
}

/**
 * Middleware to add `c.render()` for JSX components
 * Wraps content in <Layout /> for all requests
 */
export function jsx(): MiddlewareHandler {
	return jsxRenderer(
		({ children, title }, c) => {
			return (
				<Layout title={title} flash={c.get("flash")}>
					{children}
				</Layout>
			);
		},
		{ docType: false },
	);
}
