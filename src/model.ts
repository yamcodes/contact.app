import { v7 as uuid } from "uuid";
import { generateSlug } from "./utils/slug";

export interface Contact {
	id: string;
	slug: string;
	first: string;
	last: string;
	email: string;
	phone?: string;
}

type NewContact = Omit<Contact, "id" | "slug">;
type ContactUpdates = Partial<NewContact>;

/**
 * Generate a unique slug for a contact, appending UUID suffix if needed
 */
function generateUniqueSlug(first: string, last: string, id: string): string {
	const baseSlug = generateSlug(`${first} ${last}`) || "contact";
	const existing = contacts.find((c) => c.slug === baseSlug);
	if (!existing) return baseSlug;
	// Append short UUID suffix for duplicates
	return `${baseSlug}-${id.slice(-6)}`;
}

// In-memory store (replace with database later)
const contacts: Contact[] = [
	{
		id: uuid(),
		slug: "alice-smith",
		first: "Alice",
		last: "Smith",
		email: "alice@example.com",
		phone: "555-1234",
	},
	{
		id: uuid(),
		slug: "bob-johnson",
		first: "Bob",
		last: "Johnson",
		email: "bob@example.com",
		phone: "555-5678",
	},
	{
		id: uuid(),
		slug: "carol-williams",
		first: "Carol",
		last: "Williams",
		email: "carol@example.com",
	},
	{
		id: uuid(),
		slug: "david-brown",
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
 * Find a contact by slug
 */
export function findBySlug(slug: string): Contact | undefined {
	return contacts.find((c) => c.slug === slug);
}

/**
 * Add a new contact
 */
export function add(contact: NewContact): Contact {
	const id = uuid();
	const slug = generateUniqueSlug(contact.first, contact.last, id);
	const newContact: Contact = {
		id,
		slug,
		...contact,
	};
	contacts.push(newContact);
	return newContact;
}

export function update(
	slug: string,
	updates: ContactUpdates,
): Contact | undefined {
	const contact = findBySlug(slug);
	if (!contact) return undefined;

	if (updates.first !== undefined) contact.first = updates.first;
	if (updates.last !== undefined) contact.last = updates.last;
	if (updates.email !== undefined) contact.email = updates.email;
	if (updates.phone !== undefined) contact.phone = updates.phone;

	// Regenerate slug if name changed
	if (updates.first || updates.last) {
		contact.slug = generateUniqueSlug(contact.first, contact.last, contact.id);
	}

	return contact;
}
