import { Router } from "express";
import { CreateUserController } from "./useCases/createUser/createUserController";
import { AuthenticateUserController } from "./useCases/authenticateUser/AuthenticateUserController";
import { ensureAuthenticate } from "./middlewares/isAuthenticate";
import { RefreshTokenUserController } from "./useCases/refreshTokenUser/refreshTokenUserController";

const router = Router();

router.post('/user', CreateUserController.handle)
router.post('/sign', AuthenticateUserController.handle)
router.post('/refresh-token', RefreshTokenUserController.handle)

router.get("/courses", ensureAuthenticate, (request, response) => {
  return response.json([
    { id: 1, name: "NodeJS"},
    { id: 2, name: "ReactJS"},
    { id: 3, name: "ExpressJS"},
    { id: 4, name: "Bootstrap"},
    { id: 5, name: "SQL"},
    { id: 6, name: "Typescript"},
  ])
})

export { router }