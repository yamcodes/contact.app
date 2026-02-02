import type { Contact } from "@/model";
import { ContactListRows } from "../partials/contact-list-rows";

/**
 * Props for ContactList component
 */
type ContactListProps = {
	/**
	 * Contacts to display
	 */
	contacts: Contact[];
	/**
	 * Current search term, if any
	 */
	search?: string;
	/**
	 * Current page number for pagination
	 */
	page: number;
};

export const ContactList = ({ contacts, search, page }: ContactListProps) => (
	<>
		<form action="/contacts" method="get" class="tool-bar">
			<label for="search">Search Term</label>
			<input
				id="search"
				type="search"
				name="q"
				placeholder="Search contacts..."
				value={search || ""}
				hx-get="/contacts"
				hx-trigger="search, keyup changed delay:200ms"
				hx-target="tbody"
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
					<ContactListRows contacts={contacts} page={page} />
				</tbody>
			</table>
		) : (
			<p>No contacts found.</p>
		)}
		<p>
			<a href="/contacts/new">Add New Contact</a>
		</p>
	</>
);
