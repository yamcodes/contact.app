import { v7 as uuid } from "uuid";

export interface Contact {
	id: string;
	slug: string;
	first: string;
	last: string;
	email: string;
	phone?: string;
}

/**
 * Generate a URL-safe slug from a name
 */
function generateBaseSlug(first: string, last: string): string {
	return `${first} ${last}`
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "") // Remove accents
		.replace(/[^a-z0-9\s-]/g, "") // Remove special chars
		.trim()
		.replace(/\s+/g, "-") // Spaces → hyphens
		.replace(/-+/g, "-"); // Collapse multiple hyphens
}

/**
 * Generate a unique slug, appending UUID suffix if needed
 */
function generateUniqueSlug(first: string, last: string, id: string): string {
	const baseSlug = generateBaseSlug(first, last) || "contact";
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
export function add(contact: Omit<Contact, "id" | "slug">): Contact {
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
