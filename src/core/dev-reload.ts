import { watch } from "node:fs";
import path from "node:path";
import type { MiddlewareHandler } from "hono";

// Track connected clients
const clients = new Set<ReadableStreamDefaultController>();

// Notify all clients to reload
export function triggerReload() {
  for (const controller of clients) {
    try {
      controller.enqueue("data: reload\n\n");
    } catch {
      clients.delete(controller);
    }
  }
}

// Watch features directory for .eta file changes
const featuresDir = path.join(import.meta.dir, "../features");
watch(featuresDir, { recursive: true }, (_event, filename) => {
  if (filename?.endsWith(".eta")) {
    console.log(`[dev] Template changed: ${filename}`);
    triggerReload();
  }
});

// SSE endpoint handler
export function sseHandler(): Response {
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

// Middleware that injects reload script into HTML responses
export function devReload(): MiddlewareHandler {
  return async (c, next) => {
    await next();

    // Only inject into HTML responses in development
    const contentType = c.res.headers.get("content-type");
    if (contentType?.includes("text/html")) {
      const html = await c.res.text();
      const injected = html.replace("</body>", `${reloadScript}</body>`);
      c.res = new Response(injected, c.res);
    }
  };
}
