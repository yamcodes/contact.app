type DeleteContactButtonProps = {
	slug: string;
};

export const DeleteContactButton = ({ slug }: DeleteContactButtonProps) => (
	<button
		type="submit"
		hx-delete={`/contacts/${slug}`}
		hx-confirm="Are you sure you want to delete this contact?"
		hx-target="body"
		hx-push-url="true"
	>
		Delete Contact
	</button>
);
