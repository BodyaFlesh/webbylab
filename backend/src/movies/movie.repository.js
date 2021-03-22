const { Op } = require('sequelize');
const Actor = require('../actors/Actor');
const Format = require('../formats/Format');
const Movie = require('./Movie');

const getMovies = async ({ page = 1, search = '' }) => {
    const limit = 8;
    const offset = (page - 1) * 8;
    const scope = [{method: ['actors', search]}];

    const props = {
        limit,
        offset,
        order: [
            ['name', 'ASC']
        ]
    };

    const posts = await Movie.scope(scope).findAll(props);

    const count = await Movie.scope(scope).count(props);

    return{
        posts,
        count
    }
}

const getMovie = async (id) => {
    return await Movie.findOne({ 
        where: { id },
        include: [
            {
                model: Format,
                as: 'formats',
                through: {
                    attributes: []
                }
            },
            {
                model: Actor,
                as: 'actors',
                through: {
                    attributes: []
                }
            }
        ] 
    });
}

const createMovie = async (data) => {
    const { name, year, actorsIds, formatsIds, newActors } = data;
    const movie = await Movie.create({
        name,
        year
    });

    if(actorsIds && actorsIds.length > 0 && Array.isArray(actorsIds)){
        movie.addActors([...actorsIds]);
    }

    if(formatsIds && formatsIds.length > 0 && Array.isArray(formatsIds)){
        movie.addFormats([...formatsIds]);
    }

    if(newActors && newActors.length){
        movie.addActors([...newActors]);
    }

    return movie;
}

const updateMovie = async (id, data) => {
    const { name, year, actorsIds, formatsIds, newActors } = data;
    const movie = await Movie.findOne({ 
        where: { id }
    });
    await movie.update({
        name,
        year
    });

    if(actorsIds && actorsIds.length > 0 && Array.isArray(actorsIds)){
        movie.setActors([...actorsIds]);
    }

    if(formatsIds && formatsIds.length > 0 && Array.isArray(formatsIds)){
        movie.setFormats([...formatsIds]);
    }

    if(newActors && newActors.length){
        movie.addActors([...newActors]);
    }

    return movie;
}

const deleteMovie = async (id) => {
    const movie = await Movie.findOne({ where: { id }});
    //TODO check exists

    return await movie.destroy();
}

module.exports = {
    getMovies,
    getMovie,
    createMovie,
    deleteMovie,
    updateMovie
}