/**
 * Generate a URL-safe slug from text
 */
export function generateSlug(text: string): string {
	return text
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "") // Remove accents
		.replace(/[^a-z0-9\s-]/g, "") // Remove special chars
		.trim()
		.replace(/\s+/g, "-") // Spaces → hyphens
		.replace(/-+/g, "-"); // Collapse multiple hyphens
}
