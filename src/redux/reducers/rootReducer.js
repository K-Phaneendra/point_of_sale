import { combineReducers } from 'redux';
import globalReducer from './globalReducer';
import customerReducer from './customerReducer';
import invoiceReducer from './invoiceReducer';

export default combineReducers({
  globalReducer,
  customerReducer,
  invoiceReducer
});
