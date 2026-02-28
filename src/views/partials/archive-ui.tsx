type ArchiveUiProps = {};

export const ArchiveUi = ({}: ArchiveUiProps) => {
	return (
		<div id="archive-ui" hx-target="this" hx-swap="outerHTML">
			<button type="button" hx-post="/contacts/archive">
				Download Contact Archive
			</button>
		</div>
	);
};
