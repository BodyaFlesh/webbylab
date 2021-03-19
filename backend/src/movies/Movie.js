const Sequelize = require('sequelize');
const sequelize = require('../general/database');

const Model = Sequelize.Model;

class Movie extends Model{}

Movie.init(
    {
        id: {
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING
        },
        year: {
            type: Sequelize.DATE
        }
        //format
        //list actors
    },
    {
        sequelize,
        modelName: 'movie'
    }
)

module.exports = Movie;