import { Hono } from "hono";
import "./middleware/flash"; // Extends Context with c.flash()
import { StatusCodes } from "http-status-codes";
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

/**
 * This handler implements a common strategy in web 1.0-style development called the Post/Redirect/Get or PRG pattern. By issuing an HTTP redirect once a contact has been created and forwarding the browser on to another location, we ensure that the POST does not end up in the browsers request cache.
 * This means that if the user accidentally (or intentionally) refreshes the page, the browser will not submit another POST, potentially creating another contact. Instead, it will issue the GET that we redirect to, which should be side-effect free.
 */
router.post("/contacts", async (c) => {
	const form = await c.req.formData();
	const first = form.get("first")?.toString() || "";
	const last = form.get("last")?.toString() || "";
	const email = form.get("email")?.toString() || "";
	const phone = form.get("phone")?.toString() || "";

	Contact.add({ first, last, email, phone });

	c.flash(`Contact "${first} ${last}" created successfully.`);
	return c.redirect(`/contacts`);
});

router.get("/contacts/:slug", (c) => {
	const slug = c.req.param("slug");
	const contact = slug && Contact.findBySlug(slug);
	if (!contact) {
		c.status(StatusCodes.NOT_FOUND);
		return c.render("notfound", { message: "Contact not found." });
	}
	return c.render("contact", { contact });
});

router.get("/contacts/:slug/edit", (c) => {
	const slug = c.req.param("slug");
	const contact = slug && Contact.findBySlug(slug);
	if (!contact) {
		c.status(StatusCodes.NOT_FOUND);
		return c.render("notfound", { message: "Contact not found." });
	}
	return c.render("edit", { contact });
});

router.post("/contacts/:slug/edit", async (c) => {
	const slug = c.req.param("slug");
	const contact = slug && Contact.findBySlug(slug);
	if (!contact) {
		c.status(StatusCodes.NOT_FOUND);
		return c.render("notfound", { message: "Contact not found." });
	}

	const form = await c.req.formData();
	const first = form.get("first")?.toString() || "";
	const last = form.get("last")?.toString() || "";
	const email = form.get("email")?.toString() || "";
	const phone = form.get("phone")?.toString() || "";

	Contact.update(slug, { first, last, email, phone });

	c.flash(`Contact "${first} ${last}" updated successfully.`);
	return c.redirect(`/contacts/${contact.slug}`);
});

router.post("/contacts/:slug/delete", (c) => {
	const slug = c.req.param("slug");
	const contact = slug && Contact.findBySlug(slug);
	if (!contact) {
		c.status(StatusCodes.NOT_FOUND);
		return c.render("notfound", { message: "Contact not found." });
	}

	Contact.remove(slug);

	c.flash(`Contact "${contact.first} ${contact.last}" deleted successfully.`);
	return c.redirect("/contacts");
});

export const setupRouter = (app: Hono) => {
	app.route("/", router);
};

export default router;
