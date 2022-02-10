import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { products } from './products';
import { partners } from './partners';
import { favorites } from './favorites';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            products,
            partners,
            favorites
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}
