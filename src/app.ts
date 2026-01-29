import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { eta } from "./middleware/eta";
import router from "./router";
import { setupHmr } from "./utils/setup-hmr";

const app = new Hono();

app.use("/static/*", serveStatic({ root: "./" }));
app.use(eta());
setupHmr(app);

app.route("/", router);

export default app;
