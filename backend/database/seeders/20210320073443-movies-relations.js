'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const movieFormats = [];
        for (let i = 1; i < 50; i++) {
            movieFormats.push({
                movieId: i,
                formatId: Math.floor(Math.random() * 3) || 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        
        const movieActors = [];
        for (let i = 1; i < 50; i++) {
            movieActors.push({
                movieId: i,
                actorId: Math.floor(Math.random() * 15) || 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        await queryInterface.bulkInsert('movie_format', movieFormats, {});
        await queryInterface.bulkInsert('movie_actor', movieActors, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkdDelete('movie_format', {}, {});
        await queryInterface.bulkdDelete('movie_actor', {}, {});
    }
};
