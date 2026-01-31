import { Hono } from "hono";
import { trimTrailingSlash } from "hono/trailing-slash";
import { StatusCodes } from "http-status-codes";
import { Layout, NotFound } from "./components";
import { flash } from "./middleware/flash";
import { htmx } from "./middleware/htmx";
import router from "./router";
import { setupHmr } from "./utils/hmr";
import { setupStatic } from "./utils/static";

const app = new Hono();

app.use(trimTrailingSlash());
setupStatic(app);
app.use(flash());
app.use(htmx());
setupHmr(app);

app.route("/", router);

app.notFound((c) => {
	c.status(StatusCodes.NOT_FOUND);
	const content = <NotFound message="Page not found." />;
	if (c.get("htmx")) {
		return c.html(content);
	}
	return c.html(
		<Layout title="Not Found" flash={c.get("flash")}>
			{content}
		</Layout>,
	);
});

export default app;
