import { Hono } from "hono";
import { etaRenderer } from "@/core/template";
import * as Contact from "./model";

const contacts = new Hono();
contacts.use(etaRenderer("contacts"));

// /contacts with optional search
contacts.get("/", (c) => {
	const search = c.req.query("q");
	const contactList = search ? Contact.search(search) : Contact.all();
	return c.render("views/index.eta", { contacts: contactList, search });
});

export default contacts;
