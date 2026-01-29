import { Hono } from "hono";
import { render } from "./lib/template";

const app = new Hono();

// Redirect / to /contacts
app.get("/", (c) => {
	return c.redirect("/contacts");
});

// /contacts
app.get("/contacts", ({ req, html }) => {
	const search = req.query('q');
	if (search) {
		// In a real application, you would filter contacts based on the search query.
		return html(`<h1>Search Results for "${search}"</h1><p>No results found.</p>`);
	}
	const contacts = [
		{ name: "Alice", email: "alice@example.com" },
		{ name: "Bob", email: "bob@example.com" },
	];
	return html(render("contacts.eta", { contacts }));
});

export default app;
