import express from "express"
import { candidatesController } from "./controllers/candidates-controller"
import { companiesController } from "./controllers/companies-cotroller"

const router = express.Router()

router.get("/", (req, res) => res.json({ hello: "Hello, world!" }))

// Área dos candidatos
router.get("/candidates", candidatesController.index)
router.get("/candidates/:id", candidatesController.show)
router.post("/candidates", candidatesController.save)
router.put("/candidates/:id", candidatesController.update)
router.delete("/candidates/:id", candidatesController.delete)

// Área das companias
router.get('/companies', companiesController.index)
router.get('/companies/:id', companiesController.show)
router.post('/companies', companiesController.save)
router.put('/companies/:id', companiesController.update)
router.delete('/companies/:id', companiesController.delete)


export { router }