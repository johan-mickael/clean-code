'use strict';

// @ts-ignore
const { UUIDV4 } = require('sequelize');

const TABLE_NAME = 'partners';

module.exports = {
  // @ts-ignore
  up: async (queryInterface, Sequelize) => {
    // Find all dealers and randomly assign them to partners
    const dealerIds = await queryInterface.sequelize.query('SELECT id FROM dealers', {
      type: Sequelize.QueryTypes.SELECT,
    });

    await queryInterface.bulkInsert(TABLE_NAME, [
      {
        name: 'Uber Eats',
        email: 'uber.eats@email.com',
        dealer_id: dealerIds[Math.floor(Math.random() * dealerIds.length)].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Deliveroo',
        email: 'deliveroo@email.com',
        dealer_id: dealerIds[Math.floor(Math.random() * dealerIds.length)].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  // @ts-ignore
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(TABLE_NAME, {});
  },
};
