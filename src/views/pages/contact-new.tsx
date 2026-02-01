import type { ContactData } from "@/model";
import { ContactFields } from "../partials/contact-fields";

type ContactNewProps = {
	contact?: ContactData;
};

export const ContactNew = ({ contact }: ContactNewProps) => (
	<>
		<h2>New Contact</h2>

		<form action="/contacts" method="post">
			<ContactFields contact={contact} />
			<button type="submit">Save</button>
		</form>

		<p>
			<a href="/contacts">Back</a>
		</p>
	</>
);
