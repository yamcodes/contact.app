import type { Hono } from "hono";
import { StatusCodes } from "http-status-codes";
import { NotFound } from "../views";

/**
 * Sets up the 404 Not Found handler for the application.
 *
 * Renders the NotFound page with appropriate status code when no routes match.
 */
export function setupNotFound(app: Hono) {
	app.notFound((c) => {
		c.status(StatusCodes.NOT_FOUND);
		return c.render(<NotFound message="Page not found." />, {
			title: "Not Found",
		});
	});
}
