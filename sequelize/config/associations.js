const Cap = require("../models/Cap");
const Planet = require("../models/Planet");
const Satelite = require("../models/Satelite");
const Spaceship = require("../models/Spaceship");

// Planet.hasOne(Satelite, { onDelete: "CASCADE", onUpdate: "CASCADE" });
// Satelite.belongsTo(Planet, { foreingKey: "planetId", as: "planet" });

Planet.hasMany(Satelite, { onDelete: "CASCADE", onUpdate: "CASCADE" });
Satelite.belongsTo(Planet, { foreingKey: "planetId", as: "planet" });

Cap.belongsToMany(Spaceship, {
    foreingKey: "capId",
    through: "capSpaceships",
    as: "spaceships",
})

Spaceship.belongsToMany(Cap, {
    foreingKey: "spaceshipId",
    through: "capSpaceships",
    as: "caps"
})

module.exports = { Planet, Satelite };
