'use strict';
const faker = require('faker');

const randomIntFromInterval = (min, max) => { 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const movies = [];
        for (let i = 0; i < 50; i++) {
            movies.push({
                name: faker.random.word(),
                year: randomIntFromInterval(1888, 2030),
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
        
        await queryInterface.bulkInsert('movies', movies, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkdDelete('movies', {}, {});
    }
};
