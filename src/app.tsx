import { Hono } from "hono";
import { trimTrailingSlash } from "hono/trailing-slash";
import { StatusCodes } from "http-status-codes";
import { NotFound } from "./components";
import { flash } from "./middleware/flash";
import { htmx } from "./middleware/htmx";
import { jsx } from "./middleware/jsx";
import router from "./router";
import { setupHmr } from "./utils/hmr";
import { setupStatic } from "./utils/static";

const app = new Hono();

app.use(trimTrailingSlash());
setupStatic(app);
app.use(flash());
app.use(htmx());
app.use(jsx());
setupHmr(app);

app.route("/", router);

app.notFound((c) => {
	c.status(StatusCodes.NOT_FOUND);
	return c.render(<NotFound message="Page not found." />, {
		title: "Not Found",
	});
});

export default app;
