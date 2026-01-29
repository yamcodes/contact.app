import { Hono } from "hono";
import * as Contact from "./model";

const router = new Hono();

router.get("/", (c) => c.redirect("/contacts"));

// /contacts with optional search
router.get("/contacts", (c) => {
	const search = c.req.query("q");
	const contactList = search ? Contact.search(search) : Contact.all();
	return c.render("index", { contacts: contactList, search });
});

export default router;
