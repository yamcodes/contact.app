import { Hono } from "hono";
import * as Contact from "./model";
import { etaRenderer } from "@/core/template";

const contacts = new Hono();

contacts.use(etaRenderer(`${import.meta.dir}/views`));

// /contacts with optional search
contacts.get("/", (c) => {
	const search = c.req.query("q");
	const contactList = search ? Contact.search(search) : Contact.all();
	return c.render("index.eta", { contacts: contactList, search });
});

export default contacts;
