import { Hono } from "hono";

import { devReload, sseHandler, triggerReload } from "./core/dev-reload";
import contacts from "./features/contacts/routes";

const app = new Hono();

// Middleware
app.use(devReload());
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
