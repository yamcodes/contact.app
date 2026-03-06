import { Hono } from "hono";
import { trimTrailingSlash } from "hono/trailing-slash";
import { flash, htmx, jsx, latency } from "./middleware";
import { setupRouter } from "./router";
import { setupHmr } from "./utils/hmr";
import { setupNotFound } from "./utils/not-found";
import { setupStatic } from "./utils/static";

const app = new Hono();

app.use(trimTrailingSlash());
setupStatic(app);
app.use(latency());
app.use(flash());
app.use(htmx());
app.use(jsx());
setupHmr(app);
setupRouter(app);
setupNotFound(app);

const portArgIndex = process.argv.indexOf("--port");
const port =
	portArgIndex !== -1 ? Number(process.argv[portArgIndex + 1]) : 3000;

export default { port, fetch: app.fetch };
