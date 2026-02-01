import { Hono } from "hono";
import { StatusCodes } from "http-status-codes";
import * as Contact from "./model";
import {
	ContactEdit,
	ContactList,
	ContactNew,
	ContactView,
	NotFound,
} from "./views/pages";

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
	const contact = {
		first: form.get("first")?.toString() || "",
		last: form.get("last")?.toString() || "",
		email: form.get("email")?.toString() || "",
		phone: form.get("phone")?.toString() || "",
	};

	if (!Contact.add(contact)) {
		return c.render(<ContactNew contact={contact} />, { title: "New Contact" });
	}

	c.flash(`Contact "${contact.first} ${contact.last}" created successfully.`);
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
	return c.render(<ContactEdit contact={contact} slug={slug} />, {
		title: "Edit Contact",
	});
});

router.post("/contacts/:slug/edit", async (c) => {
	const slug = c.req.param("slug");
	const existing = slug && Contact.findBySlug(slug);
	if (!existing) {
		c.status(StatusCodes.NOT_FOUND);
		return c.render(<NotFound message="Contact not found." />, {
			title: "Not Found",
		});
	}

	const form = await c.req.formData();
	const contact = {
		first: form.get("first")?.toString() || "",
		last: form.get("last")?.toString() || "",
		email: form.get("email")?.toString() || "",
		phone: form.get("phone")?.toString() || "",
	};

	if (!Contact.update(slug, contact)) {
		return c.render(<ContactEdit contact={contact} slug={slug} />, {
			title: "Edit Contact",
		});
	}

	c.flash(`Contact "${contact.first} ${contact.last}" updated successfully.`);
	// Re-fetch to get the potentially updated slug
	const updated = Contact.findBySlug(slug) || Contact.find(existing.id);
	return c.redirect(`/contacts/${updated?.slug || slug}`);
});

router.delete("/contacts/:slug", (c) => {
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
	// We use "See Other" to ensure redirection with GET method, not DELETE.
	// This is to stay true to a Delete/Redirect/Get pattern.
	return c.redirect("/contacts", StatusCodes.SEE_OTHER);
});

export const setupRouter = (app: Hono) => {
	app.route("/", router);
};

export default router;
