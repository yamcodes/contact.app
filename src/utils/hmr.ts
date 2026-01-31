import { watch } from "node:fs";
import path from "node:path";
import type { Hono } from "hono";

// Track connected clients
const clients = new Set<ReadableStreamDefaultController>();

// Notify all clients to reload
function triggerReload() {
	for (const controller of clients) {
		try {
			controller.enqueue("data: reload\n\n");
		} catch {
			clients.delete(controller);
		}
	}
}

// Watch components directory for .tsx file changes
const componentsDir = path.join(import.meta.dir, "../components");
watch(componentsDir, { recursive: true }, (_event, filename) => {
	if (filename?.endsWith(".tsx")) {
		console.log(`[hmr] Component changed: ${filename}`);
		triggerReload();
	}
});

// Watch static directory for .css file changes
const staticDir = path.join(import.meta.dir, "../../static");
watch(staticDir, { recursive: true }, (_event, filename) => {
	if (filename?.endsWith(".css")) {
		console.log(`[hmr] Stylesheet changed: ${filename}`);
		triggerReload();
	}
});

// SSE endpoint handler
function sseHandler(): Response {
	const stream = new ReadableStream({
		start(controller) {
			clients.add(controller);
			controller.enqueue("data: connected\n\n");
		},
		cancel(controller) {
			clients.delete(controller);
		},
	});

	return new Response(stream, {
		headers: {
			"Content-Type": "text/event-stream",
			"Cache-Control": "no-cache",
			Connection: "keep-alive",
		},
	});
}

// Script to inject into HTML pages
const reloadScript = `
<script>
(function() {
  const es = new EventSource('/__dev/reload');
  es.onmessage = (e) => {
    if (e.data === 'reload') location.reload();
  };
  es.onerror = () => setTimeout(() => location.reload(), 1000);
})();
</script>
`;

/**
 * Set up HMR (hot module reload) for development
 * - Inject reload script into HTML responses
 * - Watch .tsx and .css files for changes
 * - Set up SSE endpoint for browser communication
 */
export function setupHmr(app: Hono) {
	// SSE endpoint for browser to connect
	app.get("/__dev/reload", () => sseHandler());

	// Middleware to inject reload script
	app.use(async (c, next) => {
		await next();

		const contentType = c.res.headers.get("content-type");
		if (contentType?.includes("text/html")) {
			const html = await c.res.text();
			const injected = html.replace("</body>", `${reloadScript}</body>`);
			c.res = new Response(injected, c.res);
		}
	});

	// Trigger reload on Bun's hot module replacement
	if (import.meta.hot) {
		import.meta.hot.accept(() => triggerReload());
	}
}
