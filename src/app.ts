import { Hono } from "hono";
import { StatusCodes } from "http-status-codes";
import { eta } from "./middleware/eta";
import { flash } from "./middleware/flash";
import router from "./router";
import { setupHmr } from "./utils/hmr";
import { setupStatic } from "./utils/static";

const app = new Hono();

setupStatic(app);
app.use(flash());
app.use(eta());
setupHmr(app);

app.route("/", router);

app.notFound((c) => {
	c.status(StatusCodes.NOT_FOUND);
	return c.render("notfound", { message: "Page not found." });
});

export default app;
