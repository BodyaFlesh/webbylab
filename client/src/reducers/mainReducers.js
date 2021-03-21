import { CHANGE_TITLE, FETCH_ACTORS_SUCCESS, FETCH_FORMATS_SUCCESS } from '../actions-type';

const initialState = {
    title: '',
    actors: [],
    formats: []
}

const reducer = (state = initialState, action) => {

    const { type, payload } = action;
    switch(type){
        case CHANGE_TITLE:
            return{
                ...state,
                title: payload
            }
        case FETCH_ACTORS_SUCCESS:
            return{
                ...state,
                actors: payload
            }
        case FETCH_FORMATS_SUCCESS:
            return{
                ...state,
                formats: payload
            }
        default:
            return state;
    }

}

export default reducer;