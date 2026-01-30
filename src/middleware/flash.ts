import type { MiddlewareHandler } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";

const FLASH_COOKIE = "flash";

/**
 * Flash message middleware
 * - Reads flash message from cookie and exposes it via c.get("flash")
 * - Clears the cookie after reading (one-time display)
 * - Use c.set("flash", "message") + redirect to set a flash
 */
export function flash(): MiddlewareHandler {
	return async (c, next) => {
		// Read and clear flash message from cookie
		const message = getCookie(c, FLASH_COOKIE);
		if (message) {
			c.set("flash", decodeURIComponent(message));
			deleteCookie(c, FLASH_COOKIE);
		}

		await next();

		// If flash was set during request, write it to cookie for next request
		const newFlash = c.get("flash_new");
		if (newFlash) {
			setCookie(c, FLASH_COOKIE, encodeURIComponent(newFlash), {
				path: "/",
				maxAge: 60, // 1 minute max
				httpOnly: true,
			});
		}
	};
}

/**
 * Helper to set a flash message (call before redirect)
 */
export function setFlash(c: { set: (key: string, value: string) => void }, message: string) {
	c.set("flash_new", message);
}
