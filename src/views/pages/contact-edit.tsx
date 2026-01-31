import type { Contact } from "@/model";
import { ContactFields } from "../partials/contact-fields";

type ContactEditProps = {
	contact: Contact;
};

export const ContactEdit = ({ contact }: ContactEditProps) => (
	<>
		<h2>Edit Contact</h2>

		<form action={`/contacts/${contact.slug}/edit`} method="post">
			<ContactFields contact={contact} />
			<button type="submit">Save</button>
		</form>

		<button
			type="submit"
			hx-delete={`/contacts/${contact.slug}`}
			hx-confirm="Are you sure you want to delete this contact?"
			hx-target="body"
			hx-push-url="true"
		>
			Delete Contact
		</button>

		<p>
			<a href="/contacts/">Back</a>
		</p>
	</>
);
