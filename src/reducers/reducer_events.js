import { FETCH_EVENTS, FETCH_EVENT, FETCH_LOOKUP_PARTICIPATING_DEPARTMENTS } from '../actions/index';

const INITIAL_STATE = { all: [], event: null, lupartdepts: null };

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
    case FETCH_EVENTS:          
        return { ...state, all: action.payload.data };
    case FETCH_EVENT:
        console.log(action.payload.data);
        return { ...state, event: action.payload.data };
    case FETCH_LOOKUP_PARTICIPATING_DEPARTMENTS:
        return { ...state, lupartdepts: action.payload.data };
    default:
        return state;
    }
}
