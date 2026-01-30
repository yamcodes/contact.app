import { Hono } from "hono";
import * as Contact from "./model";

const router = new Hono();

router.get("/", (c) => c.redirect("/contacts"));

router.get("/contacts", (c) => {
	const search = c.req.query("q");
	const contactList = search ? Contact.search(search) : Contact.all();
	return c.render("index", { contacts: contactList, search });
});

router.get("/contacts/new", (c) => {
	return c.render("new");
});

router.post("/contacts", async (c) => {
	const form = await c.req.formData();
	const first = form.get("first")?.toString() || "";
	const last = form.get("last")?.toString() || "";
	const email = form.get("email")?.toString() || "";
	const phone = form.get("phone")?.toString() || "";

	Contact.add({ first, last, email, phone });

	return c.redirect("/contacts");
});

router.get("/contacts/:id", (c) => {
	const id = c.req.param("id");
	const contact = Contact.find(id);
	if (!contact) {
		return c.text("Contact not found", 404);
	}
	return c.render("contact", { contact });
});

export default router;
