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
        name: 'gold necklace',
        grossWeight: '20',
        netWeight: '10',
        va: '2',
        unitRate: '20',
        amount: '440' // (unit rate * (net weight + VA))
      },
      {
        name: 'silver necklace',
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
        name: 'diamond necklace',
        grossWeight: '20',
        netWeight: '10',
        va: '2',
        unitRate: '20',
        amount: '440' // (unit rate * (net weight + VA))
      },
      {
        name: 'platinum necklace',
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
