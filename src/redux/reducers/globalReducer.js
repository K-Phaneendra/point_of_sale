import { LOADING, PRINT } from "../reducerActions/actionType";

const initialState = {
  isLoading: false,
  printableContent: "",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOADING.SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case LOADING.RESET_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case PRINT.CONTENT:
      return {
        ...state,
        printableContent: action.payload,
      };
    default:
      return state;
  }
}
