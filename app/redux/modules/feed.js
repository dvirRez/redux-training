/**
 * Created by Dvir on 1/15/2018.
 */
import { listenToFeed } from 'helpers/api';
import { addListener } from 'redux/modules/listeners';
import { addMultipleDucks } from 'redux/modules/ducks';
import { fromJS, List } from 'immutable';

const SETTING_FEED_LISTENER = 'SETTING_FEED_LISTENER';
const SETTING_FEED_LISTENER_ERROR = 'SETTING_FEED_LISTENER_ERROR';
const SETTING_FEED_LISTENER_SUCCESS = 'SETTING_FEED_LISTENER_SUCCESS';
const ADD_NEW_DUCK_ID_TO_FEED = 'ADD_NEW_DUCK_ID_TO_FEED';
const RESET_NEW_DUCKS_AVAILABLE = 'RESET_NEW_DUCKS_AVAILABLE';

function settingFeedListener() {
    return {
        type: SETTING_FEED_LISTENER,
    };
}

function settingFeedListenerError(error) {
    return {
        type: SETTING_FEED_LISTENER_ERROR,
        error: error,
    };
}

function settingFeedListenerSuccess(duckIds) {
    return {
        type: SETTING_FEED_LISTENER_SUCCESS,
        duckIds,
    };
}

function addNewDuckIdToFeed(duckId) {
    return {
        type: ADD_NEW_DUCK_ID_TO_FEED,
        duckId,
    };
}

export function resetNewDucksAvailable() {
    return {
        type: RESET_NEW_DUCKS_AVAILABLE,
    };
}

export function setAndHandleFeedListener() {
    return function(dispatch, getState) {
        if(getState().listeners.feed)  {
            return;
        }

        dispatch(addListener('feed'));
        dispatch(settingFeedListener());
        listenToFeed(({feed, sortedIds}, numberOfFetches) => {
            dispatch(addMultipleDucks(feed));
            numberOfFetches === 1
            ? dispatch(settingFeedListenerSuccess(sortedIds))
            : dispatch(addNewDuckIdToFeed(sortedIds[0]));

        }, (error) => {
            dispatch(settingFeedListenerError(error));
        });
    }
}

const initialState = fromJS({
    newDucksAvailable: false,
    newDucksToAdd: [],
    isFetching: false,
    error: '',
    duckIds: [],
});

export default function feed (state = initialState, action) {
    switch (action.type) {
        case SETTING_FEED_LISTENER :
            return state.merge({
                isFetching: true,
            });
        case SETTING_FEED_LISTENER_ERROR :
            return state.merge({
                isFetching: false,
                error: action.error,
            });
        case SETTING_FEED_LISTENER_SUCCESS :
            return state.merge({
                isFetching: false,
                error: '',
                duckIds: action.duckIds,
                newDucksAvailable: false,
            });
        case ADD_NEW_DUCK_ID_TO_FEED :
            return state.merge({
                newDucksToAdd: state.get('newDucksToAdd').unshift(action.duckId),
                newDucksAvailable: true,
            });
            // return {
            //     ...state,
            //     newDucksToAdd: [action.duckId, ...state.newDucksToAdd],
            //     newDucksAvailable: true,
            // };
        case RESET_NEW_DUCKS_AVAILABLE :
            return state.merge({
                duckIds: state.get('newDucksToAdd').concat(state.get('duckIds')),
                newDucksToAdd: [],
                newDucksAvailable: false,
            });
            // return {
            //     ...state,
            //     duckIds: [...state.newDucksToAdd, ...state.duckIds],
            //     newDucksToAdd: [],
            //     newDucksAvailable: false,
            // };
        default :
            return state
    }
}

