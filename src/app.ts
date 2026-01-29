import { Hono } from "hono";
import { eta } from "./middleware/eta";
import router from "./router";
import { setupHmr } from "./utils/setup-hmr";
import { setupStatic } from "./utils/setup-static";

const app = new Hono();

setupStatic(app);
app.use(eta());
setupHmr(app);

app.route("/", router);

export default app;
