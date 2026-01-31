import { ContactFields } from "../partials/contact-fields";

export const ContactNew = () => (
	<>
		<h2>New Contact</h2>

		<form action="/contacts" method="post" hx-boost="true">
			<ContactFields />
			<button type="submit">Save</button>
		</form>

		<p>
			<a href="/contacts" hx-boost="true">
				Back
			</a>
		</p>
	</>
);
