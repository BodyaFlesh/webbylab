import { FETCH_MOVIES_ERROR, FETCH_MOVIES_REQUEST, FETCH_MOVIES_SUCCESS } from '../actions-type';

const moviesLoaded = (newMovies) => {
    return{
        type: FETCH_MOVIES_SUCCESS,
        payload: newMovies
    }
}

const moviesRequested = () => {
    return {
        type: FETCH_MOVIES_REQUEST
    }
}

const moviesError = () => {
    return {
        type: FETCH_MOVIES_ERROR
    }
}

export {
    moviesLoaded,
    moviesRequested,
    moviesError
}