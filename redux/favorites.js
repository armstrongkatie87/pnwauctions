import * as ActionTypes from './ActionTypes';

export const favorites = (state = { errMess: null, favorites: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITES:
            return {...state, errMess: null, favorites: action.payload};

        case ActionTypes.FAVORITES_FAILED:
            return {...state, errMess: action.payload};

        default:
            return state;
    }
};