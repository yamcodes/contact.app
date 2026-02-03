import type { MiddlewareHandler } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";

const FLASH_COOKIE = "flash";

// Extend Hono's Context to include c.flash()
declare module "hono" {
	interface ContextVariableMap {
		flash: string | undefined;
		flash_new: string | undefined;
	}

	interface Context {
		/**
		 * Set a flash message to display on the next request.
		 * Call before redirecting.
		 * @param message - The message to display
		 * @example c.flash("Contact created successfully.");
		 */
		flash: (message: string) => void;
	}
}

/**
 * Flash message middleware
 * - Read flash message from cookie and expose it via `c.get("flash")`
 * - Clear the cookie after reading (one-time display)
 * - Use `c.flash("message")` before redirect to set a flash
 */
export function flash(): MiddlewareHandler {
	return async (c, next) => {
		// Read and clear flash message from cookie
		const message = getCookie(c, FLASH_COOKIE);
		if (message) {
			c.set("flash", decodeURIComponent(message));
			deleteCookie(c, FLASH_COOKIE, { path: "/" });
		}

		// Add c.flash() method to context
		c.flash = (msg: string) => {
			c.set("flash_new", msg);
		};

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
