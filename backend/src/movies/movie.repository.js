const Actor = require('../actors/Actor');
const Format = require('../formats/Format');
const Movie = require('./Movie');

const getMovies = async ({ page = 1, search = '' }) => {
    const limit = 10 * page;
    const offset = (page - 1) * 10

    return await Movie.findAll({
        limit,
        offset,
        order: [
            ['name', 'ASC']
        ],
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
    const dateValue = year ? new Date(`${year}-01-01`) : null;
    const movie = await Movie.create({
        name,
        year: dateValue
    });

    if(actorsIds && actorsIds.length > 0 && Array.isArray(actorsIds)){
        movie.addActors([...actorsIds]);
    }

    if(formatsIds && formatsIds.length > 0 && Array.isArray(formatsIds)){
        movie.addFormats([...formatsIds]);
    }

    console.log(newActors);
    if(newActors && newActors.length){
        movie.addActors([...newActors]);
    }

    return movie;
}

const updateMovie = async (data) => {

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
    updateMovie,
    deleteMovie
}