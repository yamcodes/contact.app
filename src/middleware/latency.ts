import { createMiddleware } from "hono/factory";
import { SIMULATED_LATENCY_MS } from "@/constants";

/**
 * Middleware that adds simulated latency to all requests.
 *
 * Useful during development to test loading states, spinners, and
 * other async UI behaviors. Configure the delay via `SIMULATED_LATENCY_MS`
 * in `src/constants.ts`. Set to `0` to disable.
 */
export const latency = () =>
	createMiddleware(async (_, next) => {
		if (SIMULATED_LATENCY_MS > 0) {
			await Bun.sleep(SIMULATED_LATENCY_MS);
		}
		await next();
	});
