'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        //const Movie = 
        await queryInterface.createTable('movies', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            year: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            }
        });

        await queryInterface.addIndex('movies', ['name']);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('movies');
    }
};
