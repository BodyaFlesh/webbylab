const Sequelize = require('sequelize');
const sequelize = require('../general/database');
const Format = require('../formats/Format');
const Actor = require('../actors/Actor');

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
);

Movie.belongsToMany(Format, { as: 'formats', through: movie_format, foreignKey: 'movieId', otherKey: 'formatId' });
Movie.belongsToMany(Actor, { as: 'actors', through: movie_actor, foreignKey: 'movieId', otherKey: 'actorId' });

module.exports = Movie;