import type { ArchiveStatus } from "@/models/archiver";

type ArchiveUiProps = {
	status: ArchiveStatus;
};

export const ArchiveUi = ({ status }: ArchiveUiProps) => {
	return (
		<div id="archive-ui" hx-target="this" hx-swap="outerHTML">
			{status === "Waiting" && (
				<button type="button" hx-post="/contacts/archive">
					Download Contact Archive
				</button>
			)}
			{status === "Running" && <div>Running...</div>}
		</div>
	);
};
