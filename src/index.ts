import { Hono } from "hono";

import { etaRenderer } from "./middleware/eta";
import { hmr, sseHandler, triggerReload } from "./middleware/hmr";
import contacts from "./routes";

const app = new Hono();

// Middleware
app.use(etaRenderer());
app.use(hmr());
app.get("/__dev/reload", () => sseHandler());

// Trigger reload when Bun hot-reloads this module
if (import.meta.hot) {
	import.meta.hot.accept(() => triggerReload());
}

// Redirect / to /contacts
app.get("/", (c) => c.redirect("/contacts"));

// Mount feature routes
app.route("/contacts", contacts);

export default app;
