export type ArchiveStatus = "Waiting" | "Running" | "Complete";

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
}

async function runImpl(): Promise<void> {
	for (let i = 0; i < 10; i++) {
		await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
		if (archiveStatus !== "Running") return;
		archiveProgress = (i + 1) / 10;
		console.log("Here... " + archiveProgress);
	}
	await new Promise((resolve) => setTimeout(resolve, 1000));
	if (archiveStatus !== "Running") return;
	archiveStatus = "Complete";
}

export function run(): void {
	if (archiveStatus === "Waiting") {
		archiveStatus = "Running";
		archiveProgress = 0;
		void runImpl(); // fire-and-forget, mirrors Python's Thread
	}
}
