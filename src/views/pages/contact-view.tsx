import type { Contact } from "@/model";

type ContactViewProps = {
	contact: Contact;
};

export const ContactView = ({ contact }: ContactViewProps) => (
	<>
		<h1>
			{contact.first} {contact.last}
		</h1>

		<div>
			<div>Phone: {contact.phone || ""}</div>
			<div>Email: {contact.email}</div>
		</div>

		<p>
			<a href={`/contacts/${contact.slug}/edit`}>Edit</a>
			<a href="/contacts">Back</a>
		</p>
	</>
);
