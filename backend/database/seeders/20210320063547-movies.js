'use strict';
const faker = require('faker');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const movies = [];
        for (let i = 0; i < 200; i++) {
            movies.push({
                name: faker.random.word(),
                year: faker.date.between('1970-01-01','2021-01-01'),
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
        
        await queryInterface.bulkInsert('movies', movies, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkdDelete('movies', null, {});
    }
};
