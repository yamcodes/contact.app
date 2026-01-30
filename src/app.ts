import { Hono } from "hono";
import { eta } from "./middleware/eta";
import { flash } from "./middleware/flash";
import router from "./router";
import { setupHmr } from "./utils/hmr";
import { setupStatic } from "./utils/static";

const app = new Hono();

setupStatic(app);
app.use(flash());
app.use(eta());
setupHmr(app);

app.route("/", router);

export default app;
