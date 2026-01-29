import { Hono } from "hono";
import * as Contact from "./model";

const contacts = new Hono();

// /contacts with optional search
contacts.get("/", (c) => {
	const search = c.req.query("q");
	const contactList = search ? Contact.search(search) : Contact.all();
	return c.render("index", { contacts: contactList, search });
});

export default contacts;
