import { Hono } from "hono";
import { render } from "./lib/template";
import * as Contact from "./models/contact";

const app = new Hono();

// Redirect / to /contacts
app.get("/", (c) => {
	return c.redirect("/contacts");
});

// /contacts with optional search
app.get("/contacts", ({ req, html }) => {
	const q = req.query("q");
	const contacts = q ? Contact.search(q) : Contact.all();
	return html(render("contacts.eta", { contacts, q }));
});

export default app;
