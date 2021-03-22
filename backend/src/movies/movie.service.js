const movieRepository = require('./movie.repository');
const { findOrCreateListOfActors } = require('../actors/actor.repository');
const { findOneByName } = require('../formats/format.repository');

const getMovies = async(query) => {
    return await movieRepository.getMovies(query);
}

const getMovie = async (id) => {
    return await movieRepository.getMovie(id);
}

const createMovie = async (data) => {
    const { name, year, actorsIds, formatsIds, actors = [] } = data;
    
    const newActors = await findOrCreateListOfActors(actors); 

    const movie = await movieRepository.createMovie({ name, year, actorsIds, formatsIds, newActors });

    return movie;
}

const updateMovie = async (id, data) => {
    const { name, year, actorsIds, formatsIds, actors = [] } = data;
    
    const newActors = await findOrCreateListOfActors(actors); 

    const movie = await movieRepository.updateMovie(id, { name, year, actorsIds, formatsIds, newActors });

    return movie;
}

const importMovies = async ({ posts }) => {

    let result = [];
    for(const el of posts){
        let { name, year, formatsIds = [], actors = [], format } = el;
        let check = await movieRepository.findMovie({name, year});
        if(!check){
            let formatRecord = await findOneByName(format);
            //check format in DB
            if(formatRecord){
                formatsIds.push(formatRecord.id);
            }
            let newActors = await findOrCreateListOfActors(actors); 
            let movie = await movieRepository.createMovie({ name, year, formatsIds, newActors }); 
            result.push(movie);
        }
    }

    return result;
}

const deleteMovie = async (id) => {
    return await movieRepository.deleteMovie(id);
}

module.exports = {
    getMovie,
    getMovies,
    createMovie,
    deleteMovie,
    importMovies,
    updateMovie
}