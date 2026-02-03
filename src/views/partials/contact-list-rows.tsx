import type { Contact } from "@/model";

type ContactListRowsProps = {
	contacts: Contact[];
	page: number;
};

export const ContactListRows = ({ contacts, page }: ContactListRowsProps) => (
	<>
		{contacts.map((contact) => (
			<tr key={contact.id}>
				<td>
					<input
						type="checkbox"
						name="selected_contact_slugs"
						value={contact.slug}
					/>
				</td>
				<td>{contact.first}</td>
				<td>{contact.last}</td>
				<td>{contact.phone || ""}</td>
				<td>{contact.email}</td>
				<td>
					<a href={`/contacts/${contact.slug}/edit`}>Edit</a>
					<a href={`/contacts/${contact.slug}`}>View</a>
					<a
						// biome-ignore lint/a11y/useValidAnchor: As shown in the book
						href="#"
						hx-delete={`/contacts/${contact.slug}`}
						hx-swap="outerHTML swap:1s"
						hx-confirm="Are you sure you want to delete this contact?"
						hx-target="closest tr"
					>
						Delete
					</a>
				</td>
			</tr>
		))}
		{contacts.length >= 10 && (
			<tr>
				<td colspan={5} style="text-align: center">
					<span
						hx-target="closest tr"
						hx-trigger="revealed"
						hx-swap="outerHTML"
						hx-select="tbody > tr"
						hx-get={`/contacts?page=${page + 1}`}
					>
						Loading More...
					</span>
				</td>
			</tr>
		)}
	</>
);
