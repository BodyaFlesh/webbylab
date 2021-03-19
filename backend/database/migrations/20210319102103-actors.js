'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('actors', {
            id: {

            },
            first_name: {

            },
            last_name: {

            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('actors');
    }
};
