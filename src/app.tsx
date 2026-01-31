import { Hono } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";
import { trimTrailingSlash } from "hono/trailing-slash";
import { StatusCodes } from "http-status-codes";
import { Layout, NotFound } from "./components";
import { flash } from "./middleware/flash";
import { htmx } from "./middleware/htmx";
import router from "./router";
import { setupHmr } from "./utils/hmr";
import { setupStatic } from "./utils/static";

declare module "hono" {
	type ContextRenderer = (
		content: string | Promise<string>,
		props?: { title?: string },
	) => Response | Promise<Response>;
}

const app = new Hono();

app.use(trimTrailingSlash());
setupStatic(app);
app.use(flash());
app.use(htmx());
setupHmr(app);

app.get(
	"*",
	jsxRenderer(
		({ children, title }, c) => {
			if (c.get("htmx")) {
				return <>{children}</>;
			}
			return Layout({ title, flash: c.get("flash"), children });
		},
		{ docType: false },
	),
);

app.route("/", router);

app.notFound((c) => {
	c.status(StatusCodes.NOT_FOUND);
	return c.render(<NotFound message="Page not found." />, {
		title: "Not Found",
	});
});

export default app;
