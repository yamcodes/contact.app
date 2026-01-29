import path from "node:path";
import { Eta } from "eta";

// Initialize Eta with views directory
const eta = new Eta({
	views: path.join(import.meta.dir, "../views"),
	cache: process.env.NODE_ENV === "production", // Cache in production only
});

/**
 * Render a template with data (Flask-style render_template)
 * @param template - Template filename (e.g., "index.eta" or "contacts/list.eta")
 * @param data - Data to pass to the template
 */
export function render(
	template: string,
	data: Record<string, unknown> = {},
): string {
	return eta.render(template, data);
}
