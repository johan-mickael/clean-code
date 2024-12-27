'use strict';

const TABLE_NAME = 'occupations';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(TABLE_NAME, [
      { name: 'Chauffeur UBER', created_at: new Date(), updated_at: new Date() },
      { name: 'Livreur DELIVEROO', created_at: new Date(), updated_at: new Date() },
      { name: 'Livreur UBER EATS', created_at: new Date(), updated_at: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(TABLE_NAME, {});
  },
};
