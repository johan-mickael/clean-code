'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('occupations', [
      { name: 'Software Engineer', created_at: new Date(), updated_at: new Date() },
      { name: 'Data Scientist', created_at: new Date(), updated_at: new Date() },
      { name: 'Product Manager', created_at: new Date(), updated_at: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('occupations', {});
  },
};
