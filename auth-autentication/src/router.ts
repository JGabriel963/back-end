import { Router } from "express";
import { CreateUserController } from "./controllers/user/create-user-controller";
import { AuthUserController } from "./controllers/user/auth-user-controller";
import { isAutenticated } from "./middlewares/is-authenticated";
import { DetailUserController } from "./controllers/user/me-user-controller";

const router = Router()

router.post("/signup", CreateUserController.hanlde)
router.post("/signin", AuthUserController.handle)
router.post("/me", isAutenticated, DetailUserController.handle)

export { router }