"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("clubs", [
      {
        name: "Celestiais",
        director: "Pedro Henrique",
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Conquistadores da Fé",
        director: "Bruna Carla",
        active: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Gideões",
        director: "Luíz Felipe",
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("clubs", null, {});
  },
};
