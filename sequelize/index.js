(async () => {
  const Planet = require("./models/Planet");

/*
  const newPlanet = await Planet.create({
    name: "Marte",
    position: 6,
  });

  const seePlanets = await Planet.findAll({
    where: {
        name: "Terra",
    }
  });

  const updatePlanets = await Planet.findByPk(1);
  updatePlanets.name = "Terra";
  await updatePlanets.save();
*/
  const deletePlanets = await Planet.findByPk(2)

  console.log(deletePlanets)

  await deletePlanets.destroy()

})();
