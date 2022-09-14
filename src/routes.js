import Router from "@koa/router";

import { list, create, update, remove, login } from "./modules/users";

export const router = new Router();

// Users
router.get("/users", list);
router.post("/users", create);
router.put("/users/:id", update);
router.delete("/users/:id", remove);

// Auth
router.post("/login", login);
