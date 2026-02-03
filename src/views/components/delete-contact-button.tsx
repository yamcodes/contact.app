import type { JSX } from "hono/jsx";

type DeleteContactButtonProps = {
	slug: string;
	as?: "button" | "a";
} & JSX.IntrinsicElements["button"] &
	JSX.IntrinsicElements["a"];

export const DeleteContactButton = ({
	slug,
	as: Tag = "button",
	...rest
}: DeleteContactButtonProps) => (
	<Tag
		hx-delete={`/contacts/${slug}`}
		hx-confirm="Are you sure you want to delete this contact?"
		hx-target="body"
		hx-push-url="true"
		{...rest}
	>
		Delete Contact
	</Tag>
);
