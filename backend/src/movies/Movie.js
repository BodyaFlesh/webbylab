const Sequelize = require('sequelize');
const sequelize = require('../general/database');
const Format = require('../formats/Format');
const Actor = require('../actors/Actor');
const { Op } = Sequelize;

const Model = Sequelize.Model;

class Movie extends Model{}

Movie.init(
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        }, 
        name: {
            type: Sequelize.STRING
        },
        year: {
            type: Sequelize.DATE
        }
    },
    {
        sequelize,
        tableName: 'movies',
        modelName: 'movie',
        scopes: {
            actors: function(string) {
                return {
                    where: {
                        [Op.or]: [
                            {
                                name: {
                                    [Op.like] : `%${string}%`
                                },
                            },
                            {
                                id: {
                                    [Op.in] : sequelize.literal(`(
                                        SELECT movieId
                                        FROM movie_actor 
                                        WHERE actorId IN (
                                            SELECT id FROM actors 
                                            WHERE first_name LIKE '%${string}%'
                                    ))`)
                                }
                            }
                        ]
                    }
                };
            }
        }
    }
);

Movie.belongsToMany(Format, { as: 'formats', through: 'movie_format', foreignKey: 'movieId', otherKey: 'formatId' });
Movie.belongsToMany(Actor, { as: 'actors', through: 'movie_actor', foreignKey: 'movieId', otherKey: 'actorId' });

module.exports = Movie;