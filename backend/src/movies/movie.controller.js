const movieService = require('./movie.service');

//all
const getMovies = async (req, res) => {
    try{
        const { search, page } = req.query;
        const posts = await movieService.getMovies({ search, page });
        return res.json({'posts' : posts});
    }catch(error){
        console.error(error);
        return res.json({'status' : 'Error', error}).status(400);
    }
};

//get one movie
const getMovie = async (req, res) => {
    try{
        const { id } = req.params;
        const post = await movieService.getMovie(id);
        return res.json({'post' : post});
    }catch(error){
        return res.json({'status' : 'Error', error}).status(400);
    }
};

//create movie
const createMovie = async (req, res) => {
    try{
        const post = await movieService.createMovie(req.body);
        return res.json({'status' : 'success', post}).status(201);
    }catch(error){
        return res.json({'status' : 'Error', error}).status(400);
    }
}

//TODO update method
const updateMovie = async (req, res) => {

}

//delete movie
const deleteMovie = async (req, res) => {
    try{
        const { id } = req.params;
        await movieService.deleteMovie(id);
        return res.status(204).send();
    }catch(error){
        return res.json({'status' : 'Error', error}).status(400);
    }
};


module.exports = {
    getMovies,
    getMovie,
    createMovie,
    deleteMovie,
    updateMovie
};