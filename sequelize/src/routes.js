const express = require("express");
const PlanetController = require("../Controller/PlanetController");
const SateliteController = require("../Controller/SateliteController");
const CapController = require("../Controller/CapController");
const SpaceshipController = require("../Controller/SpaceshipController");
const routes = express.Router();

routes.get("/planets", PlanetController.index);
routes.post("/planets", PlanetController.store);
routes.put("/planets/:id", PlanetController.update)
routes.delete("/planets/:id", PlanetController.delete)

routes.post("/planets/:planetId/satelites", SateliteController.store)
routes.get("/planets/:planetId/satelites", SateliteController.index)

routes.post("/caps", CapController.store)
routes.get("/caps", CapController.index)

routes.post("/caps/:capId/spaceships", SpaceshipController.store)
routes.get("/caps/:capId/spaceships", SpaceshipController.index)

module.exports = routes;