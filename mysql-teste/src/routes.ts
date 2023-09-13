import { Router } from "express";
import { ClubController } from "./controllers/club-controller";
import { DesbravadorController } from "./controllers/desbravador-controller";

const router = Router()

// ROUTER -- CLUB  
router.get("/clubs", ClubController.index)
router.get("/clubs/:id", ClubController.show) 
router.post("/clubs", ClubController.save)

// ROUTER -- DESBRAVADOR
router.post("/desbravadores", DesbravadorController.save)


export { router }