import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { mainReducer, moviesReducer } from './reducers';

const reducer = combineReducers({
    movies: moviesReducer,
    main: mainReducer,
});

const store = createStore(reducer, {}, composeWithDevTools(applyMiddleware()));

export default store;