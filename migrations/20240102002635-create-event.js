'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
      event_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        timestamps: false,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      genre: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      event_start_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      event_end_time: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Events');
  }
};