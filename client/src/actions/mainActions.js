import { CHANGE_TITLE, FETCH_FORMATS_SUCCESS, FETCH_ACTORS_SUCCESS } from '../actions-type';

const changeMainTitle = (newtitle) => {
    return{
        type: CHANGE_TITLE,
        payload: newtitle
    }
}

const formatsLoaded = (newFormats) => {
    return{
        type: FETCH_FORMATS_SUCCESS,
        payload: newFormats
    }
}

const actorsLoaded = (newActors) => {
    return{
        type: FETCH_ACTORS_SUCCESS,
        payload: newActors
    }
}

export{
    changeMainTitle,
    formatsLoaded,
    actorsLoaded
}