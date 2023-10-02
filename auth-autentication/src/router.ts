import { Router } from "express";
import { CreateUserController } from "./controllers/user/create-user-controller";
import { AuthUserController } from "./controllers/user/auth-user-controller";
import { isAutenticated } from "./middlewares/is-authenticated";
import { DetailUserController } from "./controllers/user/me-user-controller";
import { TaskController } from "./controllers/task/task-controller";

const router = Router()

router.post("/signup", CreateUserController.hanlde)
router.post("/signin", AuthUserController.handle)
router.post("/me", isAutenticated, DetailUserController.handle)

router.post("/tasks", isAutenticated, TaskController.create)
router.get("/tasks", isAutenticated, TaskController.findAll)
router.put("/tasks/:id", isAutenticated, TaskController.update)
router.delete("/tasks/:id", isAutenticated, TaskController.delete)

export { router }