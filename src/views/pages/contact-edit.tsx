import type { ContactData } from "@/model";
import { ContactFields, DeleteContactButton } from "../components";

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

		<DeleteContactButton slug={slug} />

		<p>
			<a href="/contacts/">Back</a>
		</p>
	</>
);
