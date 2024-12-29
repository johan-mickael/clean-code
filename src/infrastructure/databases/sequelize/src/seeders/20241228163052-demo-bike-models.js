'use strict';

const TABLE_NAME = 'bike_models';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(TABLE_NAME, [
      {
        name: 'Street Triple',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Tiger Sport 660',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(TABLE_NAME, {});
  },
};
