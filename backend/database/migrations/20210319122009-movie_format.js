'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('movie_format', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            movieId: {
                type: Sequelize.INTEGER,
                references: { model: 'movies', key: 'id' },
                onDelete: 'CASCADE'
            },
            formatId: {
                type: Sequelize.INTEGER,
                references: { model: 'formats', key: 'id' }
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
        await queryInterface.dropTable('movie_format');
    }
};
