import { Hono } from "hono";
import { trimTrailingSlash } from "hono/trailing-slash";
import { flash, jsx } from "./middleware";
import { setupRouter } from "./router";
import { setupHmr } from "./utils/hmr";
import { setupNotFound } from "./utils/not-found";
import { setupStatic } from "./utils/static";

const app = new Hono();

app.use(trimTrailingSlash());
setupStatic(app);
app.use(flash());
app.use(jsx());
setupHmr(app);
setupRouter(app);
setupNotFound(app);

export default app;
