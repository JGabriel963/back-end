const Planet = require("../models/Planet");

module.exports = {
  async index(req, res) {
    const planets = await Planet.findAll();

    return res.json(planets);
  },

  async store(req, res) {
    const { name, position } = req.body;

    const planet = await Planet.create({ name, position });

    return res.json(planet);
  },

  async update(req, res) {
    const { name, size, position } = req.body;

    await Planet.update(
      { name, size, position },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    return res.send("Planeta atualizado com sucesso!")
  },

  async delete(req, res) {
    const planet = await Planet.findByPk(req.params.id)

    if(!planet) {
      return res.status(404).json({ error: "Planeta não localizado!"})
    }

    await planet.destroy();

    return res.json({ message: "Excluido com sucesso"})
  }
};
