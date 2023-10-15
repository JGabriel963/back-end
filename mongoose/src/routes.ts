import { Router } from "express";
import multer from "multer";
import uploadConfig  from './config/upload'
import { SessionController } from "./controllers/session/session-controller";
import { HouseController } from "./controllers/house/house-controller";
import { DashboardController } from "./controllers/dashboard/dashboard-controller";
import { ReserveController } from "./controllers/reserve/reserve-controller";

const router = Router()
const upload = multer(uploadConfig)

router.post("/session", SessionController.save)
router.get("/session", SessionController.index)

router.post("/house", upload.single('thumbnail'), HouseController.save)
router.get("/house", HouseController.index)
router.put("/house/:house_id", upload.single("thumbnail"), HouseController.update)
router.put("/house/", HouseController.destroy)

router.get("/dashboard", DashboardController.show)

router.post("/houses/:house_id/reserve", ReserveController.store)
router.get('/reserves', ReserveController.index)
router.delete('/reserves/cancel', ReserveController.destroy)


export { router }