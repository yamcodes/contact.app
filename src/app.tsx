import { Hono } from "hono";
import { trimTrailingSlash } from "hono/trailing-slash";
import { flash } from "./middleware/flash";
import { htmx } from "./middleware/htmx";
import { jsx } from "./middleware/jsx";
import router from "./router";
import { setupHmr } from "./utils/hmr";
import { setupNotFound } from "./utils/not-found";
import { setupStatic } from "./utils/static";

const app = new Hono();

app.use(trimTrailingSlash());
setupStatic(app);
app.use(flash());
app.use(htmx());
app.use(jsx());
setupHmr(app);

app.route("/", router);

setupNotFound(app);

export default app;
