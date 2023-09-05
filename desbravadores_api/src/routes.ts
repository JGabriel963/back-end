import express from 'express'
import { ClubsController } from './controllers/clubs-controllers'

const routers = express.Router()

routers.get("/clubs", ClubsController.index)
routers.get("/clubs/:id", ClubsController.show)
routers.post("/clubs", ClubsController.save)
routers.put("/clubs/:id", ClubsController.update)
routers.delete("/clubs/:id", ClubsController.delete)

export { routers }