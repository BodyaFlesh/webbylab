const Sequelize = require('sequelize');
const sequelize = require('../general/database');

const Model = Sequelize.Model;

class Format extends Model{}

Format.init(
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING
        }
    },
    {
        sequelize,
        modelName: 'format'
    }
)

module.exports = Format;
