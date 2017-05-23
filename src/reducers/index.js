import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import EventReducer from './reducer_events';

const rootReducer = combineReducers({
  events: EventReducer,
  form: formReducer  
});

export default rootReducer;
