import { all as allContacts } from "./contact";

export type ArchiveStatus = "Waiting" | "Running" | "Complete" | "Error";

// Module-level state (mirrors Python's static class vars)
let archiveStatus: ArchiveStatus = "Waiting";
let archiveProgress = 0;

export function status(): ArchiveStatus {
	return archiveStatus;
}

export function progress(): number {
	return archiveProgress;
}

export function archiveFile(): string {
	return "contacts.json";
}

export function reset(): void {
	archiveStatus = "Waiting";
	archiveProgress = 0;
}

async function runImpl(): Promise<void> {
	try {
		for (let i = 0; i < 10; i++) {
			await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
			if (archiveStatus !== "Running") return;
			archiveProgress = (i + 1) / 10;
		}
		await new Promise((resolve) => setTimeout(resolve, 1000));
		if (archiveStatus !== "Running") return;
		await Bun.write(archiveFile(), JSON.stringify(allContacts(), null, 2));
		archiveStatus = "Complete";
	} catch (err) {
		archiveStatus = "Error";
		console.error("Archive failed:", err);
	}
}

export function run(): void {
	if (archiveStatus === "Waiting") {
		archiveStatus = "Running";
		archiveProgress = 0;
		void runImpl(); // fire-and-forget, mirrors Python's Thread
	}
}
