import { CHANGE_TITLE } from '../actions-type';

const initialState = {
    title: ''
}

const reducer = (state = initialState, action) => {

    const { type, payload } = action;
    switch(type){
        case CHANGE_TITLE:
            return{
                ...state,
                title: payload
            }
        default:
            return state;
    }

}

export default reducer;