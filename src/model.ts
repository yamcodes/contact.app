import { v7 as uuid } from "uuid";

export interface Contact {
	id: string;
	first: string;
	last: string;
	email: string;
	phone?: string;
}

// In-memory store (replace with database later)
const contacts: Contact[] = [
	{
		id: uuid(),
		first: "Alice",
		last: "Smith",
		email: "alice@example.com",
		phone: "555-1234",
	},
	{
		id: uuid(),
		first: "Bob",
		last: "Johnson",
		email: "bob@example.com",
		phone: "555-5678",
	},
	{ id: uuid(), first: "Carol", last: "Williams", email: "carol@example.com" },
	{
		id: uuid(),
		first: "David",
		last: "Brown",
		email: "david@example.com",
		phone: "555-9999",
	},
];

/**
 * Get all contacts
 */
export function all(): Contact[] {
	return contacts;
}

/**
 * Search contacts by name or email
 */
export function search(query: string): Contact[] {
	const q = query.toLowerCase();
	return contacts.filter(
		(c) =>
			c.first.toLowerCase().includes(q) ||
			c.last.toLowerCase().includes(q) ||
			c.email.toLowerCase().includes(q),
	);
}

/**
 * Find a contact by ID
 */
export function find(id: string): Contact | undefined {
	return contacts.find((c) => c.id === id);
}

/**
 * Add a new contact
 */
export function add(contact: Omit<Contact, "id">): Contact {
	const newContact: Contact = {
		id: uuid(),
		...contact,
	};
	contacts.push(newContact);
	return newContact;
}

