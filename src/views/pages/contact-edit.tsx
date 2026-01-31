import type { Contact } from "../../model";
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

		<form action={`/contacts/${contact.slug}/delete`} method="post">
			<button
				type="submit"
				onclick="return confirm('Are you sure you want to delete this contact?');"
			>
				Delete Contact
			</button>
		</form>

		<p>
			<a href="/contacts/">Back</a>
		</p>
	</>
);
