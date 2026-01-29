import { Hono } from "hono";
import { render } from "../../core/template";
import * as Contact from "./model";

const contacts = new Hono();

// /contacts with optional search
contacts.get("/", ({ req, html }) => {
	const search = req.query("q");
	const contactList = search ? Contact.search(search) : Contact.all();
	return html(render("contacts/views/index.eta", { contacts: contactList, search }));
});

export default contacts;
