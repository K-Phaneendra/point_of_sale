import { LOADING, ROUTES } from '../reducerActions/actionType';

const initialState = {
  isLoading: false,
  applicationRoutes: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOADING.SET_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case LOADING.RESET_LOADING:
      return {
        ...state,
        isLoading: false
      };
    case ROUTES.SET_ROUTES:
      return {
        ...state,
        applicationRoutes: action.payload
      };
    default:
      return state;
  }
}
