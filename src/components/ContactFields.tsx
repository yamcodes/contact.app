import type { FC } from "hono/jsx";
import type { Contact } from "../model";

type ContactFieldsProps = {
	contact?: Partial<Contact> & {
		errors?: {
			email?: string;
			first?: string;
			last?: string;
			phone?: string;
		};
	};
};

export const ContactFields: FC<ContactFieldsProps> = ({ contact }) => (
	<fieldset>
		<legend>Contact Values</legend>
		<p>
			<label for="email">Email</label>
			<input
				name="email"
				id="email"
				type="email"
				placeholder="Email"
				value={contact?.email || ""}
			/>
			{contact?.errors?.email && (
				<span class="error">{contact.errors.email}</span>
			)}
		</p>
		<p>
			<label for="first">First Name</label>
			<input
				name="first"
				id="first"
				type="text"
				placeholder="First Name"
				value={contact?.first || ""}
			/>
			{contact?.errors?.first && (
				<span class="error">{contact.errors.first}</span>
			)}
		</p>
		<p>
			<label for="last">Last Name</label>
			<input
				name="last"
				id="last"
				type="text"
				placeholder="Last Name"
				value={contact?.last || ""}
			/>
			{contact?.errors?.last && (
				<span class="error">{contact.errors.last}</span>
			)}
		</p>
		<p>
			<label for="phone">Phone</label>
			<input
				name="phone"
				id="phone"
				type="tel"
				placeholder="Phone"
				value={contact?.phone || ""}
			/>
			{contact?.errors?.phone && (
				<span class="error">{contact.errors.phone}</span>
			)}
		</p>
	</fieldset>
);
