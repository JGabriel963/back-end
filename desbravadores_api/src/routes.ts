import express from 'express'
import { ClubsController } from './controllers/clubs-controllers'
import { DesbravadoresController } from './controllers/desbravadores.controllers'

const routers = express.Router()

routers.get("/clubs", ClubsController.index)
routers.get("/clubs/:id", ClubsController.show)
routers.post("/clubs", ClubsController.save)
routers.put("/clubs/:id", ClubsController.update)
routers.delete("/clubs/:id", ClubsController.delete)

routers.get("/desbravadores", DesbravadoresController.index)
routers.get("/desbravadores/:id", DesbravadoresController.show)
routers.post("/desbravadores", DesbravadoresController.save)
routers.put("/desbravadores/:id", DesbravadoresController.update)
routers.delete("/desbravadores/:id", DesbravadoresController.delete)


export { routers }