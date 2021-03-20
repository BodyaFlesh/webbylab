const movieRepository = require('./movie.repository');
const actorRepository = require('../actors/actor.repository');

const getMovies = async(query) => {
    return await movieRepository.getMovies(query);
}

const getMovie = async (id) => {
    return await movieRepository.getMovie(id);
}

const createMovie = async (data) => {
    const { name, year, actorsIds, formatsIds, actors } = data;
    const newActors = [];

    //check all actor and create new in DB or get
    if(actors && actors.length > 0 && Array.isArray(actors)){
        actors.forEach(async (el) => {
            let [first_name, last_name] = el.split(' ');
            if(first_name, last_name){
                const [ actor ] = await actorRepository.findOrCreate({ first_name, last_name });
                newActors.push(actor.id);
            }
        });
    }

    const movie = await movieRepository.createMovie({ name, year, actorsIds, formatsIds, newActors });

    return movie;

}

//TODO dev
const updateMovie = async (data) => {

}

const deleteMovie = async (id) => {
    return await movieRepository.deleteMovie(id);
}

module.exports = {
    getMovie,
    getMovies,
    createMovie,
    updateMovie,
    deleteMovie
}