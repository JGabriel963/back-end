'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const [ clubs ] = await queryInterface.sequelize.query("SELECT id FROM clubs;")

    await queryInterface.bulkInsert('desbravadores', [
      {
        name: "Mariane",
        cpf: "023.389.983-89",
        date_birth: "2002-03-13",
        email: "marine@gmail.com",
        phone: "(39) 98892-8983",
        active: true,
        club_id: clubs[2].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Delane",
        cpf: "023.389.983-89",
        date_birth: "2003-05-17",
        email: "delane@gmail.com",
        phone: "(39) 98892-8983",
        active: false,
        club_id: clubs[2].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Emanuel",
        cpf: "023.389.983-89",
        date_birth: "2002-03-13",
        email: "emanuel@gmail.com",
        phone: "(39) 98892-8983",
        active: true,
        club_id: clubs[0].id,
        created_at: new Date(),
        updated_at: new Date()
      }
    ])


  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("desbravadores", null, {})
  }
};
