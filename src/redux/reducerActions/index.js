import {
  CUSTOMER,
  INVOICE,
  LOADING,
  ROUTES
} from './actionType';

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

// update customer details on invoice form
export const updateInvoiceFormCustomerDetails = (payload) => ({
  type: INVOICE.UPDATE_CUSTOMER_DETAILS,
  payload
});
// update product details on invoice form
export const updateInvoiceFormProducts = (payload) => ({
  type: INVOICE.UPDATE_PRODUCTS,
  payload
});
// update tax details on invoice form
export const updateInvoiceFormTaxDetails = (payload) => ({
  type: INVOICE.UPDATE_TAX_DETAILS,
  payload
});
