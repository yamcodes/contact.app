import type { Contact } from "@/model";

type ContactListRowsProps = {
	contacts: Contact[];
	page: number;
	count?: number;
};

export const ContactListRows = ({
	contacts,
	page,
	count,
}: ContactListRowsProps) => (
	<>
		{contacts.map((contact) => (
			<tr key={contact.id}>
				<td>{contact.first}</td>
				<td>{contact.last}</td>
				<td>{contact.phone || ""}</td>
				<td>{contact.email}</td>
				<td>
					<a href={`/contacts/${contact.slug}/edit`}>Edit</a>
					<a href={`/contacts/${contact.slug}`}>View</a>
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
