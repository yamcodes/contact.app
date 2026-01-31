type NotFoundProps = {
	message?: string;
};

export const NotFound = ({ message }: NotFoundProps) => (
	<>
		<h1>Not Found</h1>

		<p>{message || "The requested resource could not be found."}</p>

		<p>
			<a href="/contacts">Back to Contacts</a>
		</p>
	</>
);
