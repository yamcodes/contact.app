import type { Contact } from "@/model";

type ContactListProps = {
	contacts: Contact[];
	search?: string;
	page: number;
};

export const ContactList = ({ contacts, search, page }: ContactListProps) => (
	<>
		<form action="/contacts" method="get">
			<label for="search">Search contacts:</label>
			<input
				type="search"
				name="q"
				placeholder="Search contacts..."
				value={search || ""}
			/>
			<button type="submit">Search</button>
		</form>

		{search && <p>Results for "{search}":</p>}

		{contacts.length > 0 ? (
			<table>
				<thead>
					<tr>
						<th>First</th>
						<th>Last</th>
						<th>Phone</th>
						<th>Email</th>
						<th />
					</tr>
				</thead>
				<tbody>
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
					{contacts.length === 10 && (
						<tr>
							<td colspan={5} style="text-align: center">
								<button
									type="button"
									hx-target="closest tr"
									hx-swap="outerHTML"
									hx-select="tbody > tr"
									hx-get={`/contacts?page=${page + 1}`}
								>
									Load More
								</button>
							</td>
						</tr>
					)}
				</tbody>
			</table>
		) : (
			<p>No contacts found.</p>
		)}

		<div>
			<span style="float: right">
				{page > 1 && <a href={`/contacts?page=${page - 1}`}>Previous</a>}{" "}
				{contacts.length === 10 && (
					<a href={`/contacts?page=${page + 1}`}>Next</a>
				)}
			</span>
		</div>

		<p>
			<a href="/contacts/new">Add New Contact</a>
		</p>
	</>
);
