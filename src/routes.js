import Router from "@koa/router";

import { list, create, update, remove } from "./modules/users";

export const router = new Router();

router.get("/users", list);
router.post("/users", create);
router.put("/users/:id", update);
router.delete("/users/:id", remove);
