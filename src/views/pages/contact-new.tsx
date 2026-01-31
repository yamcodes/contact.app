import { ContactFields } from "../partials";

export const ContactNew = () => (
	<>
		<h2>New Contact</h2>

		<form action="/contacts" method="post">
			<ContactFields />
			<button type="submit">Save</button>
		</form>

		<p>
			<a href="/contacts">Back</a>
		</p>
	</>
);
