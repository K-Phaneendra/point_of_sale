import { useState } from 'react';
import { connect } from 'react-redux';
// eslint-disable-next-line
import { Box, Card, CardContent, Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

import PreviousNext from './PreviousNext';
import ToastMessage from 'src/assets/components/ToastMessage';
import { updateInvoiceFormTaxDetails } from 'src/redux/reducerActions';

const calculateSubTotal = (products) => {
  try {
    let amount = 0;
    products.forEach((each) => {
      amount += each.amount;
    });
    return amount;
  } catch (err) {
    return 0;
  }
};

const NetPayable = ({
  next,
  prev,
  totalSteps,
  currentStep,
  currentTaxRates,
  products,
  updateFormDetailsOnReducer
}) => {
  const [exchangeValue, setExchangeValue] = useState(0);

  const subTotal = calculateSubTotal(products);

  const calculateNetPayable = () => {
    try {
      const validExchangeValue = exchangeValue < 0 ? 0 : exchangeValue;
      // Net payable = (Amount + (Amount * CGST% + Amount * SGST% + Amount * IGST%) - Exchange value)
      const taxableAmount = (
        subTotal * (currentTaxRates.CGST / 100)
        + subTotal * (currentTaxRates.SGST / 100)
        + subTotal * (currentTaxRates.IGST / 100)
      );
      const totalAmountWithTaxes = subTotal + taxableAmount;
      const netPayable = totalAmountWithTaxes - validExchangeValue;
      return netPayable;
    } catch (err) {
      return 0;
    }
  };

  const checkAndMoveNext = () => {
    try {
      let isScreenValid = true;
      if (exchangeValue < 0) {
        isScreenValid = false;
      }
      if (isScreenValid) {
        // save data to reducer
        const body = {
          tax: {
            CGST: Number((subTotal * currentTaxRates.CGST) / 100),
            SGST: Number((subTotal * currentTaxRates.SGST) / 100),
            IGST: Number((subTotal * currentTaxRates.IGST) / 100)
          },
          exchangeValue,
          netPayable: calculateNetPayable()
        };
        updateFormDetailsOnReducer(body);
        next();
      }
      if (!isScreenValid) {
        throw new Error('Errors observed');
      }
    } catch (err) {
      ToastMessage(
        'error',
        'Observed errors on the page',
        'Please clear the errors on this screen to proceed further'
      );
    }
  };

  return (
    <>
      <Box>
        <Box sx={{ mt: 3, mb: 3 }}>
          <Card>
            <CardContent
              classes={{
                root: 'padding-bottom-16'
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={6} className="m-auto">
                  <img
                    // eslint-disable-next-line
                    src={`https://image.freepik.com/free-vector/businessman-accountant-filling-financial-document-form-clipboard-payment-date-tax-form-income-tax-return-company-tax-payment-concept-illustration_335657-2320.jpg`}
                    alt="tax"
                    width="100%"
                  />
                </Grid>
                <Grid item xs={6} className="text-align-right">
                  <Grid container spacing={3}>
                    <Grid item xs={6} className="text-align-left" style={{ fontSize: 'x-large' }}>
                      Sub total (Rs)
                    </Grid>
                    <Grid item xs={6} className="text-align-right" style={{ fontSize: 'x-large' }}>
                      {Number(subTotal).toFixed('2')}
                    </Grid>
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item xs={6} className="text-align-left" style={{ fontSize: 'x-large' }}>
                      {`CGST (${currentTaxRates.CGST}%)`}
                    </Grid>
                    <Grid item xs={6} className="text-align-right" style={{ fontSize: 'x-large' }}>
                      {Number((subTotal * currentTaxRates.CGST) / 100).toFixed('2')}
                    </Grid>
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item xs={6} className="text-align-left" style={{ fontSize: 'x-large' }}>
                      {`SGST (${currentTaxRates.SGST}%)`}
                    </Grid>
                    <Grid item xs={6} className="text-align-right" style={{ fontSize: 'x-large' }}>
                      {Number((subTotal * currentTaxRates.SGST) / 100).toFixed('2')}
                    </Grid>
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item xs={6} className="text-align-left" style={{ fontSize: 'x-large' }}>
                      {`IGST (${currentTaxRates.IGST}%)`}
                    </Grid>
                    <Grid item xs={6} className="text-align-right" style={{ fontSize: 'x-large' }}>
                      {Number((subTotal * currentTaxRates.IGST) / 100).toFixed('2')}
                    </Grid>
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item xs={6} className="text-align-left m-auto" style={{ fontSize: 'x-large' }}>
                      Exchange value (Rs)
                    </Grid>
                    <Grid item xs={6} className="text-align-right" style={{ fontSize: 'x-large' }}>
                      <TextField
                        error={exchangeValue < 0}
                        fullWidth
                        helperText={exchangeValue < 0 && 'Incorrect entry'}
                        label="Exchange value"
                        margin="normal"
                        name="exchangeValue"
                        // onBlur={handleBlur}
                        onChange={(e) => setExchangeValue(e.target.value)}
                        type="number"
                        value={exchangeValue}
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item xs={6} className="text-align-left" style={{ fontSize: 'x-large' }}>
                      Net payable
                    </Grid>
                    <Grid item xs={6} className="text-align-right" style={{ fontSize: 'xx-large', fontWeight: 'bold' }}>
                      {Number(calculateNetPayable()).toFixed('2')}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <div className="mt-3">
        <PreviousNext
          current={currentStep}
          totalSteps={totalSteps}
          prev={prev}
          next={checkAndMoveNext}
        />
      </div>
    </>
  );
};

NetPayable.propTypes = {
  next: PropTypes.func,
  prev: PropTypes.func,
  currentStep: PropTypes.number,
  totalSteps: PropTypes.number,
  currentTaxRates: PropTypes.shape({
    CGST: PropTypes.string,
    SGST: PropTypes.string,
    IGST: PropTypes.string
  }),
  products: PropTypes.array,
  updateFormDetailsOnReducer: PropTypes.func
};

NetPayable.defaultProps = {
  currentStep: 1,
  totalSteps: 4,
  currentTaxRates: {
    CGST: '1.5',
    SGST: '1.5',
    IGST: ''
  },
  products: []
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  updateFormDetailsOnReducer: (body) =>
  // eslint-disable-next-line
    dispatch(updateInvoiceFormTaxDetails(body))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NetPayable);
