'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const formats = [
            {
                name: 'VHS',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'DVD',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Blu-Ray',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ];
        
        await queryInterface.bulkInsert('formats', formats, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkdDelete('formats', null, {});
    }
};
