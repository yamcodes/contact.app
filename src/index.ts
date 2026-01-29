import { Hono } from "hono";

import { devReload, sseHandler, triggerReload } from "./lib/dev-reload";
import { render } from "./lib/template";
import * as Contact from "./models/contact";

const app = new Hono();

// Dev reload middleware (only affects HTML responses)
app.use(devReload());
app.get("/__dev/reload", () => sseHandler());

// Trigger reload when Bun hot-reloads this module
if (import.meta.hot) {
	import.meta.hot.accept(() => triggerReload());
}

// Redirect / to /contacts
app.get("/", (c) => {
	return c.redirect("/contacts");
});

// /contacts with optional search
app.get("/contacts", ({ req, html }) => {
	const search = req.query("q");
	const contacts = search ? Contact.search(search) : Contact.all();
	return html(render("index.eta", { contacts, search }));
});

export default app;
