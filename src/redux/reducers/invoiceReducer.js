import { v4 as uuid } from 'uuid';
import { INVOICE } from '../reducerActions/actionType';

const initialState = {
  currentTaxRates: { // get this data from API
    CGST: '1.5',
    SGST: '1.5',
    IGST: ''
  },
  invoiceForm: {
    id: uuid(),
    customer_details: {
      name: 'Ekaterina Tankova',
      phone: '304-428-3097'
    },
    customer_address: {
      country: 'USA',
      state: 'West Virginia',
      city: 'Parkersburg',
      stateCode: 'TG', // this feild which should have the state code
      cityCode: 132132, // this feild which should have the city code
      street: '2849 Fulton Street'
    },
    products: [
      {
        id: 'product ID 1',
        HSNcode: '7113',
        name: 'Platinum ring',
        quantity: 2,
        grossWeight: '20',
        netWeight: '10',
        va: '2',
        unitRate: '20',
        amount: '440' // (unit rate * (net weight + VA))
      },
      {
        id: 'product ID 3',
        HSNcode: '7113',
        name: 'Silver ring',
        quantity: 3,
        grossWeight: '20',
        netWeight: '10',
        va: '1',
        unitRate: '10',
        amount: '110' // (unit rate * (net weight + VA))
      }
    ],
    tax: {
      CGST: '15', // in Rs
      SGST: '15', // in Rs
      IGST: '' // in Rs
    },
    exchangeValue: '340',
    netPayable: '1326.5', // (Amount + (Amount * CGST% + Amount * SGST% + Amount * IGST%) - Exchange value)
    cash: '',
    card: '',
    cheque: '',
    'RTGS/NEFT': '',
    UPI_Transaction_ID: '',
    createdAt: 1555016400000
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INVOICE.SET_FORM:
      return {
        ...state,
        invoiceForm: action.payload
      };
    case INVOICE.UPDATE_CUSTOMER_DETAILS: {
      const invoiceFormClone = state.invoiceForm;
      invoiceFormClone.customer_details = action.payload.customer_details;
      invoiceFormClone.customer_address = action.payload.customer_address;
      return {
        ...state,
        invoiceForm: invoiceFormClone
      };
    }
    case INVOICE.UPDATE_PRODUCTS: {
      const invoiceFormClone = state.invoiceForm;
      invoiceFormClone.products = action.payload.products;
      return {
        ...state,
        invoiceForm: invoiceFormClone
      };
    }
    case INVOICE.UPDATE_TAX_DETAILS: {
      const invoiceFormClone = state.invoiceForm;
      invoiceFormClone.tax = action.payload.tax;
      invoiceFormClone.exchangeValue = action.payload.exchangeValue;
      invoiceFormClone.netPayable = action.payload.netPayable;
      return {
        ...state,
        invoiceForm: invoiceFormClone
      };
    }
    default:
      return state;
  }
}
