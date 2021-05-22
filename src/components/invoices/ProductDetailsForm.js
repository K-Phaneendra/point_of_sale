import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Grid,
  IconButton
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as Yup from 'yup';
import { Formik, Form, FieldArray } from 'formik';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import products from '../../__mocks__/products';

import PreviousNext from './PreviousNext';

import { RemoveCircleIcon } from 'src/assets/icons/icons';
import { updateInvoiceFormProducts } from 'src/redux/reducerActions';

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

const calculateSubTotal = (productsForm) => {
  let amount = 0;
  productsForm.forEach((each) => {
    amount += each.amount;
  });
  return amount;
};

const PRODUCT_ROW = {
  id: '',
  name: '',
  grossWeight: '',
  netWeight: '',
  va: '',
  unitRate: '',
  quantity: '',
  amount: 0
};

const ActionBar = ({ onAdd }) => (
  <Box>
    <Box sx={{ mt: 3, mb: 3 }}>
      <Card>
        <CardContent
          classes={{
            root: 'padding-bottom-16'
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={6} />
            <Grid item xs={6} className="text-align-right">
              <Button color="primary" variant="contained" onClick={onAdd}>
                New product
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  </Box>
);

ActionBar.propTypes = {
  onAdd: PropTypes.func
};

const ProductDetailsForm = ({
  next,
  prev,
  totalSteps,
  currentStep,
  invoiceFormProducts,
  updateFormDetailsOnReducer
}) => {
  // In the next step give an option to add tax rates, exchange value, net payable
  const classes = useStyles();

  const getProducts = () => {
    try {
      return invoiceFormProducts;
    } catch (err) {
      return [PRODUCT_ROW];
    }
  };

  const initialValues = {
    products: getProducts()
  };
  const validationSchema = Yup.object().shape({
    products: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().max(255).required('Name is required'),
        grossWeight: Yup.number().required('Gross weight is required'),
        netWeight: Yup.number().required('Net weight is required'),
        va: Yup.number().required('V.A. is required'),
        unitRate: Yup.number().required('Unit rate is required'),
        quantity: Yup.number().min(0).required('Quantity is required'),
        amount: Yup.number()
      })
    )
  });

  const submit = (values) => {
    // pass body to the reducer
    updateFormDetailsOnReducer(values);
    next();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submit}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        touched,
        values
      }) => {
        const getTouchedRow = (index) => {
          try {
            const touchedRow = touched.products[index];
            if (touchedRow) {
              return touchedRow;
            }
            throw new Error('Touched row was not found');
          } catch (err) {
            return {};
          }
        };
        const getErrorRow = (index) => {
          try {
            const errorRow = errors.products[index];
            if (errorRow) {
              return errorRow;
            }
            throw new Error('Error row was not found');
          } catch (err) {
            return {};
          }
        };
        return (
          <>
            <Form>
              {/* create a FieldArray based on the values present in initalValues of the form */}
              <FieldArray name="products">
                {/* eslint-disable-next-line */}
                {({ insert, remove, push }) => {
                  // get product object by product id
                  const getProductById = (productId) => {
                    try {
                      const product = products.find((each) => each.id === productId);
                      return product;
                    } catch (err) {
                      return {};
                    }
                  };
                  // get product value by element ID
                  const getProductValueByElementID = (elementID) => {
                    try {
                      const { value } = document.getElementById(elementID);
                      const product = products.find(
                        (each) => each.name === value
                      );
                      return product;
                    } catch (err) {
                      return {};
                    }
                  };
                  return (
                    <>
                      <ActionBar onAdd={() => push(PRODUCT_ROW)} />
                      <TableContainer component={Paper}>
                        <Table
                          className={classes.table}
                          aria-label="spanning table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell>Product name</TableCell>
                              <TableCell>Gross weight (gm)</TableCell>
                              <TableCell>Net weight (gm)</TableCell>
                              <TableCell>V.A. (gm)</TableCell>
                              <TableCell>Unit rate (per gram)</TableCell>
                              <TableCell>Quantity</TableCell>
                              <TableCell align="right">Amount</TableCell>
                              <TableCell>Actions</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {values.products.map((row, index) => {
                              const touchedRow = getTouchedRow(index);
                              const errorRow = getErrorRow(index);
                              const calculateAmountAndDisplay = (productRow) => {
                                // Amount = (quantity * unit rate) * (net weight + VA)
                                const amount = `${
                                  (productRow.quantity * productRow.unitRate)
                                  * (productRow.netWeight + productRow.va)
                                }`;
                                // change the amount value in the initalvalues only if amount value gets changed
                                if (Number(productRow.amount) !== Number(amount)) {
                                  handleChange(`products.${index}.amount`)({ target: { value: Number(amount) } });
                                }
                                return amount;
                              };
                              return (
                                <TableRow key={`row_${index + 1}`}>
                                  <TableCell>
                                    {/* product name field */}
                                    <Autocomplete
                                      id={`products.${index}.choose-product`}
                                      options={products}
                                      getOptionLabel={(option) => option.name}
                                      // autoComplete
                                      // autoSelect
                                      value={getProductById(row.id)}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="Product name"
                                          variant="outlined"
                                          error={Boolean(touchedRow.name && errorRow.name)}
                                          fullWidth
                                          helperText={touchedRow.name && errorRow.name}
                                          margin="normal"
                                          name={`products.${index}.name`}
                                          onBlur={() => {
                                            const productObject = getProductValueByElementID(`products.${index}.choose-product`);
                                            const eventObject = { target: { value: productObject.name } };
                                            handleChange(`products.${index}.name`)(eventObject);
                                            handleChange(`products.${index}.id`)(productObject.id);
                                          }}
                                          onChange={() => {
                                            const productObject = getProductValueByElementID(`products.${index}.choose-product`);
                                            const eventObject = { target: { value: productObject.name } };
                                            handleChange(`products.${index}.name`)(eventObject);
                                            handleChange(`products.${index}.id`)(productObject.id);
                                          }}
                                          type="text"
                                          value={row.name}
                                        />
                                      )}
                                    />
                                  </TableCell>
                                  <TableCell width="150px">
                                    {/* gross weight field */}
                                    <TextField
                                      error={Boolean(
                                        touchedRow.grossWeight && errorRow.grossWeight
                                      )}
                                      fullWidth
                                      helperText={
                                        touchedRow.grossWeight && errorRow.grossWeight
                                      }
                                      label="Gross weight"
                                      margin="normal"
                                      name={`products.${index}.grossWeight`}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      type="number"
                                      value={row.grossWeight}
                                      variant="outlined"
                                      size="small"
                                    />
                                  </TableCell>
                                  <TableCell width="150px">
                                    {/* net weight field */}
                                    <TextField
                                      error={Boolean(
                                        touchedRow.netWeight && errorRow.netWeight
                                      )}
                                      fullWidth
                                      helperText={
                                        touchedRow.netWeight && errorRow.netWeight
                                      }
                                      label="Net weight"
                                      margin="normal"
                                      name={`products.${index}.netWeight`}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      type="number"
                                      value={row.netWeight}
                                      variant="outlined"
                                      size="small"
                                    />
                                  </TableCell>
                                  <TableCell width="150px">
                                    {/* va field */}
                                    <TextField
                                      error={Boolean(touchedRow.va && errorRow.va)}
                                      fullWidth
                                      helperText={touchedRow.va && errorRow.va}
                                      label="V.A."
                                      margin="normal"
                                      name={`products.${index}.va`}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      type="number"
                                      value={row.va}
                                      variant="outlined"
                                      size="small"
                                    />
                                  </TableCell>
                                  <TableCell width="150px">
                                    {/* unit rate field */}
                                    <TextField
                                      error={Boolean(
                                        touchedRow.unitRate && errorRow.unitRate
                                      )}
                                      fullWidth
                                      helperText={
                                        touchedRow.unitRate && errorRow.unitRate
                                      }
                                      label="Unit rate"
                                      margin="normal"
                                      name={`products.${index}.unitRate`}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      type="number"
                                      value={row.unitRate}
                                      variant="outlined"
                                      size="small"
                                    />
                                  </TableCell>
                                  <TableCell width="150px">
                                    {/* quantity field */}
                                    <TextField
                                      error={Boolean(
                                        touchedRow.quantity && errorRow.quantity
                                      )}
                                      fullWidth
                                      helperText={
                                        touchedRow.quantity && errorRow.quantity
                                      }
                                      label="Quantity"
                                      margin="normal"
                                      name={`products.${index}.quantity`}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      type="number"
                                      value={row.quantity}
                                      variant="outlined"
                                      size="small"
                                    />
                                  </TableCell>
                                  <TableCell align="right">
                                    {/* display amount */}
                                    {calculateAmountAndDisplay(
                                      values.products[index]
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    {/* display actions */}
                                    <IconButton
                                      aria-label="delete"
                                      color="secondary"
                                      title="Delete"
                                      onClick={() => remove(index)}
                                    >
                                      <RemoveCircleIcon />
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              );
                            })}

                            <TableRow>
                              <TableCell rowSpan={1} colSpan={5} />
                              <TableCell>Sub total</TableCell>
                              <TableCell align="right">{calculateSubTotal(values.products)}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </>
                  );
                }}
              </FieldArray>

              <div className="mt-3">
                <PreviousNext
                  current={currentStep}
                  nextButtonType="submit"
                  totalSteps={totalSteps}
                  prev={prev}
                />
              </div>
            </Form>
          </>
        );
      }}
    </Formik>
  );
};

ProductDetailsForm.propTypes = {
  next: PropTypes.func,
  prev: PropTypes.func,
  currentStep: PropTypes.number,
  totalSteps: PropTypes.number,
  invoiceFormProducts: PropTypes.array,
  updateFormDetailsOnReducer: PropTypes.func
};

ProductDetailsForm.defaultProps = {
  currentStep: 1,
  totalSteps: 4,
  invoiceFormProducts: []
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  updateFormDetailsOnReducer: (body) => dispatch(updateInvoiceFormProducts(body))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsForm);
