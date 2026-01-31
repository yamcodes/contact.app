import { Hono } from "hono";
import { StatusCodes } from "http-status-codes";
import {
	Layout,
	ContactList,
	ContactView,
	ContactNew,
	ContactEdit,
	NotFound,
} from "./components";
import "./middleware/flash";
import * as Contact from "./model";

const router = new Hono();

router.get("/", (c) => c.redirect("/contacts"));

router.get("/contacts", (c) => {
	const search = c.req.query("q");
	const contacts = search ? Contact.search(search) : Contact.all();
	const content = <ContactList contacts={contacts} search={search} />;

	if (c.get("htmx")) {
		return c.html(content);
	}
	return c.html(
		<Layout title="Contacts" flash={c.get("flash")}>
			{content}
		</Layout>,
	);
});

router.get("/contacts/new", (c) => {
	const content = <ContactNew />;

	if (c.get("htmx")) {
		return c.html(content);
	}
	return c.html(
		<Layout title="New Contact" flash={c.get("flash")}>
			{content}
		</Layout>,
	);
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
		const content = <NotFound message="Contact not found." />;
		if (c.get("htmx")) {
			return c.html(content);
		}
		return c.html(
			<Layout title="Not Found" flash={c.get("flash")}>
				{content}
			</Layout>,
		);
	}

	const content = <ContactView contact={contact} />;
	if (c.get("htmx")) {
		return c.html(content);
	}
	return c.html(
		<Layout title="Contact" flash={c.get("flash")}>
			{content}
		</Layout>,
	);
});

router.get("/contacts/:slug/edit", (c) => {
	const slug = c.req.param("slug");
	const contact = slug && Contact.findBySlug(slug);
	if (!contact) {
		c.status(StatusCodes.NOT_FOUND);
		const content = <NotFound message="Contact not found." />;
		if (c.get("htmx")) {
			return c.html(content);
		}
		return c.html(
			<Layout title="Not Found" flash={c.get("flash")}>
				{content}
			</Layout>,
		);
	}

	const content = <ContactEdit contact={contact} />;
	if (c.get("htmx")) {
		return c.html(content);
	}
	return c.html(
		<Layout title="Edit Contact" flash={c.get("flash")}>
			{content}
		</Layout>,
	);
});

router.post("/contacts/:slug/edit", async (c) => {
	const slug = c.req.param("slug");
	const contact = slug && Contact.findBySlug(slug);
	if (!contact) {
		c.status(StatusCodes.NOT_FOUND);
		const content = <NotFound message="Contact not found." />;
		if (c.get("htmx")) {
			return c.html(content);
		}
		return c.html(
			<Layout title="Not Found" flash={c.get("flash")}>
				{content}
			</Layout>,
		);
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
		const content = <NotFound message="Contact not found." />;
		if (c.get("htmx")) {
			return c.html(content);
		}
		return c.html(
			<Layout title="Not Found" flash={c.get("flash")}>
				{content}
			</Layout>,
		);
	}

	Contact.remove(slug);

	c.flash(`Contact "${contact.first} ${contact.last}" deleted successfully.`);
	return c.redirect("/contacts");
});

export default router;
