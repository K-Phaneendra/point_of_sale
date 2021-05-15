import { CUSTOMER } from '../reducerActions/actionType';

const initialState = {
  selectedRow: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CUSTOMER.SET_SELECTED_ROW:
      return {
        ...state,
        selectedRow: action.payload
      };
    default:
      return state;
  }
}
