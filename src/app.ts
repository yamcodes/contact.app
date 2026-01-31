import { Hono } from "hono";
import { trimTrailingSlash } from "hono/trailing-slash";
import { flash, htmx, jsx } from "./middleware";
import { setupRouter } from "./router";
import { setupHmr, setupNotFound, setupStatic } from "./utils";

const app = new Hono();

app.use(trimTrailingSlash());
setupStatic(app);
app.use(flash());
app.use(htmx());
app.use(jsx());
setupHmr(app);
setupRouter(app);
setupNotFound(app);

export default app;
