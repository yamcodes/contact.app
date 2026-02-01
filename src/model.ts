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

export type ContactErrors = {
	email?: string;
	first?: string;
	last?: string;
	phone?: string;
};

/** Contact data with mutable errors for form handling */
export type ContactData = Partial<NewContact> & { errors?: ContactErrors };

/**
 * Validate contact data, returns errors object (empty if valid)
 */
function validate(data: Partial<NewContact>, excludeSlug?: string): ContactErrors {
	const errors: ContactErrors = {};

	if (!data.email?.trim()) {
		errors.email = "Email is required";
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
		errors.email = "Invalid email format";
	} else {
		// Check for duplicate email
		const existing = contacts.find(
			(c) => c.email === data.email && c.slug !== excludeSlug,
		);
		if (existing) {
			errors.email = "Email already in use";
		}
	}

	if (!data.first?.trim()) {
		errors.first = "First name is required";
	}

	if (!data.last?.trim()) {
		errors.last = "Last name is required";
	}

	return errors;
}

/**
 * Check if errors object has any errors
 */
function hasErrors(errors: ContactErrors): boolean {
	return Object.keys(errors).length > 0;
}

/**
 * Generate a unique slug for a contact, appending UUID suffix if needed
 */
function generateUniqueSlug(first: string, last: string, id: string): string {
	const baseSlug = generateSlug(`${first} ${last}`) || "contact";
	const existing = contacts.find((c) => c.slug === baseSlug);
	if (!existing) return baseSlug;
	// Append short UUID suffix for duplicates
	return `${baseSlug}-${id.slice(-4)}`;
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
 * Add a new contact. Returns true on success, false if validation fails.
 * On failure, populates contact.errors with validation messages.
 */
export function add(contact: ContactData): boolean {
	const errors = validate(contact);
	if (hasErrors(errors)) {
		contact.errors = errors;
		return false;
	}

	const id = uuid();
	const slug = generateUniqueSlug(contact.first!, contact.last!, id);
	const newContact: Contact = {
		id,
		slug,
		first: contact.first!,
		last: contact.last!,
		email: contact.email!,
		phone: contact.phone,
	};
	contacts.push(newContact);
	return true;
}

/**
 * Update a contact. Returns true on success, false if validation fails.
 * On failure, populates updates.errors with validation messages.
 * Returns undefined if contact not found.
 */
export function update(slug: string, updates: ContactData): boolean | undefined {
	const contact = findBySlug(slug);
	if (!contact) return undefined;

	const errors = validate(updates, slug);
	if (hasErrors(errors)) {
		updates.errors = errors;
		return false;
	}

	if (updates.first !== undefined) contact.first = updates.first;
	if (updates.last !== undefined) contact.last = updates.last;
	if (updates.email !== undefined) contact.email = updates.email;
	if (updates.phone !== undefined) contact.phone = updates.phone;

	// Regenerate slug if name changed
	if (updates.first || updates.last) {
		contact.slug = generateUniqueSlug(contact.first, contact.last, contact.id);
	}

	return true;
}

export function remove(slug: string): boolean {
	const index = contacts.findIndex((c) => c.slug === slug);
	if (index === -1) return false;
	contacts.splice(index, 1);
	return true;
}
