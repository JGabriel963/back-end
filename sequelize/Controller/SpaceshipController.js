const Cap = require("../models/Cap");
const Spaceship = require("../models/Spaceship");

module.exports = {
  async store(req, res) {
    const { capId } = req.params;
    const { name, capacity } = req.body;
    const cap = await Cap.findByPk(capId);
    if (!cap) {
      return res.status(404).json({ error: "Capitão não localizado!" });
    }

    const [spaceships] = await Spaceship.findOrCreate({
      where: { name, capacity },
    });


    return res.json(spaceships)
  },

  async index(req, res) {
    const { capId } = req.params;

    const cap = await Cap.findByPk(capId, {
      include: { association: "spaceships" },
    });

    return res.json(cap)
  },
};
