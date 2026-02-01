import type { ContactData } from "@/model";
import { ContactFields } from "../partials/contact-fields";

type ContactEditProps = {
	contact: ContactData;
	slug: string;
};

export const ContactEdit = ({ contact, slug }: ContactEditProps) => (
	<>
		<h2>Edit Contact</h2>

		<form action={`/contacts/${slug}/edit`} method="post">
			<ContactFields contact={contact} />
			<button type="submit">Save</button>
		</form>

		<button
			type="submit"
			hx-delete={`/contacts/${slug}`}
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
