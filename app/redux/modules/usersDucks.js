/**
 * Created by Dvir on 1/15/2018.
 */
import { addMultipleDucks } from 'redux/modules/ducks';
import { fetchUsersDucks } from "helpers/api";

const FETCHING_USERS_DUCKS = 'FETCHING_USERS_DUCKS';
const FETCHING_USERS_DUCKS_ERROR = 'FETCHING_USERS_DUCKS_ERROR';
const FETCHING_USERS_DUCKS_SUCCESS = 'FETCHING_USERS_DUCKS_SUCCESS';
const ADD_SINGLE_USERS_DUCK = 'ADD_SINGLE_USERS_DUCK';

function fetchingUsersDucks(uid) {
    return {
        type: FETCHING_USERS_DUCKS,
        uid,
    };
}
function fetchingUsersDucksError(error) {
    console.warn(error);
    return {
        type: FETCHING_USERS_DUCKS_ERROR,
        error: 'Error fetching Users Duck Ids',
    };
}

function fetchingUsersDucksSuccess(uid, ducksIds, lastUpdated) {
    return {
        type: FETCHING_USERS_DUCKS_SUCCESS,
        uid,
        ducksIds,
        lastUpdated,
    };
}

export function addSingleUsersDuck(uid, duckId) {
    return {
        type: ADD_SINGLE_USERS_DUCK,
        uid,
        duckId,
    };
}

export function fetchAndHandleUsersDucks(uid) {
    return function(dispatch, getState) {
        dispatch(fetchingUsersDucks(uid));
        fetchUsersDucks(uid)
            .then((ducks) => dispatch(addMultipleDucks(ducks)))
            .then(({ducks}) => {
                const sortedDucks = Object.keys(ducks).sort((a, b) => ducks[b].timestamp - ducks[a].timestamp);
                return dispatch(fetchingUsersDucksSuccess(uid, sortedDucks, Date.now()));
            })
            .catch((error) => dispatch(fetchingUsersDucksError(error)));
    };
}


const initialUsersDuckState = {
    lastUpdated: 0,
    duckIds: [],
};

function usersDuck (state = initialUsersDuckState, action) {
    switch (action.type) {
        case ADD_SINGLE_USERS_DUCK :
            return {
                ...state,
                duckIds: state.duckIds.concat([action.duckId]),
            };
        default :
            return state;
    }
}

const initialState = {
    isFetching: true,
    error: '',
};

export default function usersDucks (state = initialState, action) {
    switch (action.type) {
        case FETCHING_USERS_DUCKS :
            return {
                ...state,
                isFetching: true,
            };
        case FETCHING_USERS_DUCKS_ERROR :
            return {
                ...state,
                isFetching: false,
                error: action.error,
            };
        case FETCHING_USERS_DUCKS_SUCCESS :
            return {
                ...state,
                isFetching: false,
                error: '',
                [action.uid]: {
                    lastUpdated: action.lastUpdated,
                    duckIds: action.ducksIds,
                },
            };
        case ADD_SINGLE_USERS_DUCK :
            return typeof state[action.uid] === 'undefined'
                ? state
                : {
                    ...state,
                    isFetching: false,
                    error: '',
                    [action.uid]: usersDuck(state[action.uid], action),
                };
        default :
            return state;
    }
}



