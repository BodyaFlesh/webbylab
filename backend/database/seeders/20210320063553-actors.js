'use strict';
const faker = require('faker');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const actors = [];
        for (let i = 0; i < 15; i++) {
            actors.push({
                first_name: faker.name.firstName(),
                last_name: faker.name.lastName(),
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
        
        await queryInterface.bulkInsert('actors', actors, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkdDelete('actors', null, {});
    }
};
