import { v4 as uuid } from 'uuid';

export default [
  {
    id: uuid(),
    customer_details: {
      name: 'Ekaterina Tankova',
      phone: '304-428-3097'
    },
    customer_address: {
      country: 'USA',
      state: 'West Virginia',
      city: 'Parkersburg',
      street: '2849 Fulton Street'
    },
    products: [
      {
        id: 'product ID 1',
        name: 'gold necklace',
        quantity: 2,
        grossWeight: '20',
        netWeight: '10',
        va: '2',
        unitRate: '20',
        amount: '440' // (unit rate * (net weight + VA))
      },
      {
        id: 'product ID 2',
        name: 'silver necklace',
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
      IGST: ''
    },
    exchangeValue: '340',
    netPayable: '1326.5', // (Amount + (Amount * CGST% + Amount * SGST% + Amount * IGST%) - Exchange value)
    cash: '',
    card: '',
    cheque: '',
    'RTGS/NEFT': '',
    UPI_Transaction_ID: '',
    createdAt: 1555016400000
  },
  {
    id: uuid(),
    customer_details: {
      name: 'Akati Konibia',
      phone: '304-428-3097'
    },
    customer_address: {
      country: 'USA',
      state: 'West Virginia',
      city: 'Parkersburg',
      street: '2849 Fulton Street'
    },
    products: [
      {
        id: 'product ID 3',
        name: 'diamond necklace',
        quantity: 1,
        grossWeight: '20',
        netWeight: '10',
        va: '2',
        unitRate: '20',
        amount: '440' // (unit rate * (net weight + VA))
      },
      {
        id: 'product ID 4',
        name: 'platinum necklace',
        quantity: 3,
        grossWeight: '20',
        netWeight: '10',
        va: '1',
        unitRate: '10',
        amount: '110' // (unit rate * (net weight + VA))
      }
    ],
    tax: {
      CGST: '1.5',
      SGST: '1.5',
      IGST: ''
    },
    exchangeValue: '340',
    netPayable: '', // (Amount + (Amount * CGST% + Amount * SGST% + Amount * IGST%) - Exchange value)
    cash: '',
    card: '',
    cheque: '',
    'RTGS/NEFT': '',
    UPI_Transaction_ID: '',
    createdAt: 1555016400000
  }
];
