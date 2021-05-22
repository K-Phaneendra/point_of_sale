import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CustomerDetailsForm from './CustomerDetailsForm';
import ProductDetailsForm from './ProductDetailsForm';
import NetPayable from './NetPayable';

import Wizard from 'src/assets/components/Wizard';

// eslint-disable-next-line
const InvoiceForm = ({ customer_details, customer_address, invoiceFormProducts, currentTaxRates }) => {
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const generateCustomerDetailsFormBody = () => {
    const formBody = {
      name: '',
      email: '',
      address: {
        state: '',
        city: '',
        street: ''
      },
      phone: ''
    };
    try {
      formBody.name = customer_details.name;
      formBody.phone = customer_details.phone;
      formBody.address.state = customer_address.stateCode;
      formBody.address.city = customer_address.cityCode;
      formBody.address.street = customer_address.street;
      return formBody;
    } catch (err) {
      return formBody;
    }
  };

  const generateSteps = () => {
    const totalSteps = 4;
    const customerDetailsFormBody = generateCustomerDetailsFormBody();
    const stepsForm = [
      {
        title: 'Customer details',
        content: (
          <CustomerDetailsForm
            next={next}
            totalSteps={totalSteps}
            currentStep={0}
            record={customerDetailsFormBody}
          />
        )
      },
      {
        title: 'Product details',
        content: (
          <ProductDetailsForm
            next={next}
            prev={prev}
            totalSteps={totalSteps}
            currentStep={1}
            invoiceFormProducts={invoiceFormProducts}
          />
        )
      },
      {
        title: 'Net payable',
        content: (
          <NetPayable
            next={next}
            prev={prev}
            totalSteps={totalSteps}
            currentStep={2}
            products={invoiceFormProducts}
            currentTaxRates={currentTaxRates}
          />
        )
      },
      {
        title: 'Summary and print',
        content: <>This is invoice summary last step</>
      }
    ];
    setSteps(stepsForm);
  };

  useEffect(() => {
    generateSteps();
    // eslint-disable-next-line
  }, [customer_details, customer_address, currentStep]);

  return (
    <Wizard steps={steps} showPreviousNext={false} currentStep={currentStep} />
  );
};

InvoiceForm.propTypes = {
  customer_details: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string
  }),
  customer_address: PropTypes.shape({
    country: PropTypes.string,
    state: PropTypes.string,
    city: PropTypes.string,
    street: PropTypes.string,
    stateCode: PropTypes.string,
    cityCode: PropTypes.number
  }),
  invoiceFormProducts: PropTypes.array,
  currentTaxRates: PropTypes.shape({
    CGST: PropTypes.string,
    SGST: PropTypes.string,
    IGST: PropTypes.string
  })
};
InvoiceForm.defaultProps = {
  customer_details: {
    name: 'abcd',
    phone: '1234'
  },
  customer_address: {
    country: 'Canada',
    state: 'Toronto',
    city: 'abcd city',
    street: '33333 Fulton Street',
    stateCode: 'TG',
    cityCode: 132132
  },
  invoiceFormProducts: [],
  currentTaxRates: {
    CGST: '1.5',
    SGST: '1.5',
    IGST: ''
  },
};

const mapStateToProps = (state) => ({
  customer_details: state.invoiceReducer.invoiceForm.customer_details,
  customer_address: state.invoiceReducer.invoiceForm.customer_address,
  invoiceFormProducts: state.invoiceReducer.invoiceForm.products,
  currentTaxRates: state.invoiceReducer.currentTaxRates
});

export default connect(mapStateToProps)(InvoiceForm);
