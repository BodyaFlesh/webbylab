import { FETCH_MOVIES_ERROR, FETCH_MOVIES_REQUEST, FETCH_MOVIES_SUCCESS } from '../actions-type';

const initialState = {
    load: true,
    error: false,
    items: []
}

const reducer = (state = initialState, action) => {

    switch(action.type){
        case FETCH_MOVIES_REQUEST:
            return{
                load: true,
                error: false,
                items: []
            }
        case FETCH_MOVIES_SUCCESS:
            return{
                ...state,
                load: false,
                error: false,
                items: action.payload
            }
        case FETCH_MOVIES_ERROR:
            return{
                ...state,
                load: false,
                error: true,
                items: []
            }
        default:
            return state;
    }

}

export default reducer;