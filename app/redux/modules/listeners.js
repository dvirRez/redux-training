/**
 * Created by Dvir on 1/17/2018.
 */
const ADD_LISTENER = 'ADD_LISTENER';

export function addListener(listenerId) {
    return {
        type: ADD_LISTENER,
        listenerId,
    };
}

export default function listeners (state = {}, action) {
    switch (action.type) {
        case ADD_LISTENER :
            return {
                ...state,
                [action.listenerId]: true,
            };
        default :
            return state;
    }
}