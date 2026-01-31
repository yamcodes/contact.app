import type { FC, PropsWithChildren } from "hono/jsx";

type LayoutProps = {
	title?: string;
	flash?: string;
};

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({
	children,
	title,
	flash,
}) => (
	<html lang="en">
		<head>
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>{title || "Contact App"}</title>
			<link rel="stylesheet" href="/static/styles.css" />
			<script src="/htmx.js" />
		</head>
		<body>
			<main>
				<header>
					<h1>
						<a href="/">
							<all-caps>contact.app</all-caps>
						</a>
						<sub-title>A Demo Contacts Application</sub-title>
					</h1>
				</header>
				{flash && <div class="flash">{flash}</div>}
				{children}
			</main>
		</body>
	</html>
);
