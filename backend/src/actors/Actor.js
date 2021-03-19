const Sequelize = require('sequelize');
const sequelize = require('../general/database');

const Model = Sequelize.Model;

class Actor extends Model{}

Actor.init(
    {
        id: {
            type: Sequelize.INTEGER
        },
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        }
    },
    {
        sequelize,
        modelName: 'actor'
    }
);

module.exports = Actor;