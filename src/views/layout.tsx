import { html } from "hono/html";
import type { PropsWithChildren } from "hono/jsx";

type LayoutProps = PropsWithChildren<{
	title?: string;
	flash?: string;
}>;

export const Layout = ({ children, title, flash }: LayoutProps) => html`
	<!doctype html>
	<html lang="en">
		<head>
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>${title || "Contact App"}</title>
			<link rel="stylesheet" href="/static/styles.css" />
			<script src="/htmx.js"></script>
		</head>
		<body>
			<main>
				<header>
					<h1>
						<a href="/" hx-boost="true">
							<all-caps>contact.app</all-caps>
						</a>
						<sub-title>A Demo Contacts Application</sub-title>
					</h1>
				</header>
				${flash ? html`<div class="flash">${flash}</div>` : ""}
				${children}
			</main>
		</body>
	</html>
`;
