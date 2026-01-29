export interface Contact {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

// In-memory store (replace with database later)
const contacts: Contact[] = [
  { id: 1, name: "Alice Smith", email: "alice@example.com", phone: "555-1234" },
  { id: 2, name: "Bob Johnson", email: "bob@example.com", phone: "555-5678" },
  { id: 3, name: "Carol Williams", email: "carol@example.com" },
  { id: 4, name: "David Brown", email: "david@example.com", phone: "555-9999" },
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
    (c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
  );
}

/**
 * Find a contact by ID
 */
export function find(id: number): Contact | undefined {
  return contacts.find((c) => c.id === id);
}
