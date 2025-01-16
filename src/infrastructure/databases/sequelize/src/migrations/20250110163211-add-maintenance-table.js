'use strict';

const { DataTypes } = require('sequelize');

const TABLE_NAME = 'maintenances';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(TABLE_NAME, {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.fn('gen_random_uuid'),
        primaryKey: true,
      },
      label: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bike_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'bikes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      last_maintenance_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      next_maintenance_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      maintenance_type: {
        type: DataTypes.ENUM('maintenance_type_1', 'maintenance_type_2'),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(TABLE_NAME);
  },
};
