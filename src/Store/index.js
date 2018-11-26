import {applyMiddleware, createStore, combineReducers, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {default as synonyms} from './synonyms/reducer';

const rootReducer = combineReducers({
    synonyms
});
// Create store
const configureStore = (initialState = {}) => {
    return createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(
                thunkMiddleware
            )
        )
    );
};

export {configureStore};