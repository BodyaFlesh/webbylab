'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('movie_actor', {
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
            actorId: {
                type: Sequelize.INTEGER,
                references: { model: 'actors', key: 'id' }
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
