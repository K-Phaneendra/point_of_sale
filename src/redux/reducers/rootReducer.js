import { combineReducers } from 'redux';
import globalReducer from './globalReducer';
import customerReducer from './customerReducer';

export default combineReducers({
  globalReducer,
  customerReducer
});
