import type { MiddlewareHandler } from "hono";

type SendFileOptions = {
	/** If true, sets Content-Disposition to "attachment", triggering a browser download dialog. Defaults to false (inline). */
	asAttachment?: boolean;
};

declare module "hono" {
	interface Context {
		/**
		 * Send a file as a response.
		 * @param filePath - Path to the file on disk
		 * @param downloadName - Filename shown in the browser or download dialog
		 * @param options - Optional configuration
		 * @example return c.sendFile(manager.archiveFile(), "archive.json", { asAttachment: true });
		 */
		sendFile: (
			filePath: string,
			downloadName: string,
			options?: SendFileOptions,
		) => Promise<Response>;
	}
}

export function sendFile(): MiddlewareHandler {
	return async (c, next) => {
		c.sendFile = async (
			filePath: string,
			downloadName: string,
			{ asAttachment = false }: SendFileOptions = {},
		) => {
			const file = Bun.file(filePath);
			const disposition = asAttachment ? "attachment" : "inline";
			c.header(
				"Content-Disposition",
				`${disposition}; filename="${downloadName}"`,
			);
			c.header("Content-Type", "application/octet-stream");
			return c.body(await file.arrayBuffer());
		};

		await next();
	};
}
