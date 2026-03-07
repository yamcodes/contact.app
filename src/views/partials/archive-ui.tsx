import type { ArchiveStatus } from "@/models/archiver";

type ArchiveUiProps = {
	status: ArchiveStatus;
	progress: number;
};

export const ArchiveUi = ({ status, progress }: ArchiveUiProps) => {
	const pct = Math.round(progress * 100);
	return (
		<div id="archive-ui" hx-target="this" hx-swap="outerHTML">
			{status === "Waiting" && (
				<button type="button" hx-post="/contacts/archive">
					Download Contact Archive
				</button>
			)}
			{status === "Running" && (
				<div hx-get="/contacts/archive" hx-trigger="load delay:500ms">
					Creating Archive...
					<div class="progress">
						<div
							class="progress-bar"
							role="progressbar"
							aria-valuenow={pct}
							style={`width:${pct}%`}
						></div>
					</div>
				</div>
			)}
			{status === "Complete" && (
				<a href="/contacts/archive/file" hx-boost="false">
					Archive Ready! Click here to download. &downarrow;
				</a>
			)}
		</div>
	);
};
