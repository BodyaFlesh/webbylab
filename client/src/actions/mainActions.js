import { CHANGE_TITLE } from '../actions-type';

const changeMainTitle = (newtitle) => {
    return{
        type: CHANGE_TITLE,
        payload: newtitle
    }
}

export{
    changeMainTitle
}