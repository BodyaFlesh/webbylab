const Movie = require('../../src/movies/Movie');
const movieRepository = require('../../src/movies/movie.repository');

const MovieModel = {
    id: 1,
    name: 'Movie',
    year: 2020
};

Movie.findOne = jest.fn().mockImplementation(() => MovieModel);
Movie.create = jest.fn().mockImplementation(() => MovieModel);
Movie.findAll = jest.fn();
Movie.count = jest.fn();
Movie.destroy = jest.fn();


describe('movieRepository', () => {
    describe('getMovies', () => {
        it('return array with 1 element', async () => {
            await movieRepository.getMovies({page: 1, search: ''});
            expect(Movie.count).toHaveBeenCalled();
            expect(Movie.findAll).toHaveBeenCalled();
        })
    })

    describe('getMovie', () => {
        it('return element', async () => {
            expect(await movieRepository.getMovie()).toBe(MovieModel);
            expect(Movie.findOne).toHaveBeenCalled();
        })
    })

    describe('createMovie', () => {
        it('return new model element', async () => {
            expect(await movieRepository.createMovie({name: '', year: ''})).toBe(MovieModel);
            expect(Movie.create).toHaveBeenCalled();
        })
    })

    // describe('deleteMovie', () => {
    //     it('return element', async () => {
    //         await movieRepository.deleteMovie();
    //         expect(Movie.findOne).toHaveBeenCalled();
    //         expect(Movie.destroy).toHaveBeenCalled();
    //     })
    // })
})