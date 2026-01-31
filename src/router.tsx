import { Hono } from "hono";
import { StatusCodes } from "http-status-codes";
import {
	ContactEdit,
	ContactList,
	ContactNew,
	ContactView,
	NotFound,
} from "./views";
import "./middleware/flash";
import * as Contact from "./model";

const router = new Hono();

router.get("/", (c) => c.redirect("/contacts"));

router.get("/contacts", (c) => {
	const search = c.req.query("q");
	const contacts = search ? Contact.search(search) : Contact.all();
	return c.render(<ContactList contacts={contacts} search={search} />, {
		title: "Contacts",
	});
});

router.get("/contacts/new", (c) => {
	return c.render(<ContactNew />, { title: "New Contact" });
});

router.post("/contacts", async (c) => {
	const form = await c.req.formData();
	const first = form.get("first")?.toString() || "";
	const last = form.get("last")?.toString() || "";
	const email = form.get("email")?.toString() || "";
	const phone = form.get("phone")?.toString() || "";

	Contact.add({ first, last, email, phone });

	c.flash(`Contact "${first} ${last}" created successfully.`);
	return c.redirect("/contacts");
});

router.get("/contacts/:slug", (c) => {
	const slug = c.req.param("slug");
	const contact = slug && Contact.findBySlug(slug);
	if (!contact) {
		c.status(StatusCodes.NOT_FOUND);
		return c.render(<NotFound message="Contact not found." />, {
			title: "Not Found",
		});
	}
	return c.render(<ContactView contact={contact} />, { title: "Contact" });
});

router.get("/contacts/:slug/edit", (c) => {
	const slug = c.req.param("slug");
	const contact = slug && Contact.findBySlug(slug);
	if (!contact) {
		c.status(StatusCodes.NOT_FOUND);
		return c.render(<NotFound message="Contact not found." />, {
			title: "Not Found",
		});
	}
	return c.render(<ContactEdit contact={contact} />, { title: "Edit Contact" });
});

router.post("/contacts/:slug/edit", async (c) => {
	const slug = c.req.param("slug");
	const contact = slug && Contact.findBySlug(slug);
	if (!contact) {
		c.status(StatusCodes.NOT_FOUND);
		return c.render(<NotFound message="Contact not found." />, {
			title: "Not Found",
		});
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
		return c.render(<NotFound message="Contact not found." />, {
			title: "Not Found",
		});
	}

	Contact.remove(slug);

	c.flash(`Contact "${contact.first} ${contact.last}" deleted successfully.`);
	return c.redirect("/contacts");
});

export default router;
