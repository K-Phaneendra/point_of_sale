import { CUSTOMER, LOADING, ROUTES } from './actionType';

export const setLoading = () => ({ type: LOADING.SET_LOADING });
export const resetLoading = () => ({ type: LOADING.RESET_LOADING });

// set application routes
export const setApplicationRoutes = (payload) => ({
  type: ROUTES.SET_ROUTES,
  payload
});

// set selected row of customers
export const setSelectedCustomerRow = (payload) => ({
  type: CUSTOMER.SET_SELECTED_ROW,
  payload
});
