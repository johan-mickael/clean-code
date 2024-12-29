'use strict';

const TABLE_NAME = 'dealers';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(TABLE_NAME, [
      {
        name: 'Triumph Montparnasse',
        address: 'Rue de la Gaîté, Paris',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Triumph Bastille',
        address: 'Rue de la Roquette, Paris',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(TABLE_NAME, {});
  },
};
