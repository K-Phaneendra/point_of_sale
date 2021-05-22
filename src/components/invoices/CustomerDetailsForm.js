import { connect } from 'react-redux';
// eslint-disable-next-line
import { Box, Card, CardContent, TextField, Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as Yup from 'yup';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

import customerImage from '../../assets/images/customer.jpg';
import PreviousNext from './PreviousNext';

import states from 'src/__mocks__/states.json';
import cities from 'src/__mocks__/cities.json';
import { updateInvoiceFormCustomerDetails } from 'src/redux/reducerActions';

// country code is currently considered as static. That is "India"
const COUNTRY_CODE = 'IN';

const CustomerDetailsForm = ({
  record,
  next,
  currentStep,
  totalSteps,
  updateFormDetailsOnReducer
}) => {
  const initialValues = {
    name: record.name || '',
    email: record.email || '',
    state: !record.address ? '' : record.address.state,
    city: !record.address ? 0 : record.address.city,
    street: !record.address ? '' : record.address.street,
    phone: record.phone || ''
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Must be a valid email').max(255),
    name: Yup.string().max(255).required('Name is required'),
    state: Yup.string().max(255).required('State is required'),
    city: Yup.number().required('City is required'),
    street: Yup.string().max(255).required('Street is required'),
    phone: Yup.string().max(255).required('Phone is required')
  });

  // get state object by state code
  const getStateById = (stateCode) => {
    try {
      const state = states.find((each) => each.state_code === stateCode);
      return state;
    } catch (err) {
      return {};
    }
  };

  // get city object by city id
  const getCityById = (cityID) => {
    try {
      const city = cities.find((each) => each.id === cityID);
      if (!city) {
        throw new Error('City is empty');
      }
      return city;
    } catch (err) {
      return null;
    }
  };

  const submit = (values) => {
    // pass body to the reducer
    const body = {
      customer_details: {
        name: values.name,
        phone: values.phone
      },
      customer_address: {
        country: 'India',
        state: getStateById(values.state).name,
        city: getCityById(values.city).name,
        stateCode: values.state,
        cityCode: values.city,
        street: values.street
      }
    };
    updateFormDetailsOnReducer(body);
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
        handleSubmit,
        touched,
        values
      }) => {
        // get list of states by country
        const getStatesByCountry = () => {
          const statesByCountry = states.filter(
            (each) => each.country_code === COUNTRY_CODE
          );
          return statesByCountry;
        };
        // get state value by element ID
        const getStateValueByElementID = (elementID) => {
          try {
            const { value } = document.getElementById(elementID);
            const state = getStatesByCountry().find(
              (each) => each.name === value
            );
            return { target: { value: state.state_code } };
          } catch (err) {
            return { target: { value: '' } };
          }
        };
        // get list of cities by state
        const getCitiesByState = () => {
          const citiesByState = cities.filter(
            (each) => each.state_code === values.state
          );
          return citiesByState;
        };
        // get city value by element ID
        const getCityValueByElementID = (elementID) => {
          try {
            const { value } = document.getElementById(elementID);
            const city = getCitiesByState().find((each) => each.name === value);
            return { target: { value: city.id } };
          } catch (err) {
            return { target: { value: null } };
          }
        };

        return (
          <form>
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
                          src={customerImage}
                          alt="customer"
                          width="100%"
                        />
                      </Grid>
                      <Grid item xs={6} className="text-align-right">
                        <>
                          <TextField
                            error={Boolean(touched.name && errors.name)}
                            fullWidth
                            helperText={touched.name && errors.name}
                            label="name"
                            margin="normal"
                            name="name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            value={values.name}
                            variant="outlined"
                          />
                          <TextField
                            error={Boolean(touched.phone && errors.phone)}
                            fullWidth
                            helperText={touched.phone && errors.phone}
                            label="phone"
                            margin="normal"
                            name="phone"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            value={values.phone}
                            variant="outlined"
                          />
                          <TextField
                            error={Boolean(touched.email && errors.email)}
                            fullWidth
                            helperText={touched.email && errors.email}
                            label="Email Address"
                            margin="normal"
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="email"
                            value={values.email}
                            variant="outlined"
                          />
                          <Autocomplete
                            id="choose-state"
                            options={getStatesByCountry()}
                            getOptionLabel={(option) => option.name}
                            // autoComplete
                            // autoSelect
                            value={getStateById(values.state)}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="State"
                                variant="outlined"
                                error={Boolean(touched.state && errors.state)}
                                fullWidth
                                helperText={touched.state && errors.state}
                                margin="normal"
                                name="state"
                                onBlur={() => {
                                  // eslint-disable-next-line
                                  const eventObject =
                                    getStateValueByElementID('choose-state');
                                  // handleBlur('state')(eventObject);
                                  handleChange('state')(eventObject);
                                }}
                                onChange={() => {
                                  // eslint-disable-next-line
                                  const eventObject =
                                    getStateValueByElementID('choose-state');
                                  handleChange('state')(eventObject);
                                  // when state gets changed, then city field should become empty
                                  handleChange('city')({
                                    e: { target: { value: null } }
                                  });
                                }}
                                type="text"
                                value={values.state}
                              />
                            )}
                          />
                          {/* display disabled cities field if state is not given */}
                          {!values.state && (
                            <Autocomplete
                              disabled
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  error={Boolean(touched.city && errors.city)}
                                  fullWidth
                                  helperText={touched.city && errors.city}
                                  label="city"
                                  margin="normal"
                                  name="city"
                                  type="text"
                                  variant="outlined"
                                />
                              )}
                            />
                          )}
                          {/* display cities only if state is given */}
                          {values.state && (
                            <Autocomplete
                              id="choose-city"
                              options={getCitiesByState()}
                              getOptionLabel={(option) => option.name}
                              value={getCityById(values.city)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  error={Boolean(touched.city && errors.city)}
                                  fullWidth
                                  helperText={touched.city && errors.city}
                                  label="city"
                                  margin="normal"
                                  name="city"
                                  onBlur={() => {
                                    // eslint-disable-next-line
                                    const eventObject =
                                      getCityValueByElementID('choose-city');
                                    // handleBlur('city')(eventObject);
                                    handleChange('city')(eventObject);
                                  }}
                                  onChange={() => {
                                    // eslint-disable-next-line
                                    const eventObject =
                                      getCityValueByElementID('choose-city');
                                    handleChange('city')(eventObject);
                                  }}
                                  type="text"
                                  value={values.city}
                                  variant="outlined"
                                />
                              )}
                            />
                          )}
                          <TextField
                            error={Boolean(touched.street && errors.street)}
                            fullWidth
                            helperText={touched.street && errors.street}
                            label="Street"
                            margin="normal"
                            name="street"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            value={values.street}
                            variant="outlined"
                          />
                        </>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
            </Box>

            <PreviousNext
              current={currentStep}
              next={handleSubmit}
              totalSteps={totalSteps}
            />
          </form>
        );
      }}
    </Formik>
  );
};

CustomerDetailsForm.propTypes = {
  record: PropTypes.object,
  next: PropTypes.func,
  currentStep: PropTypes.number,
  totalSteps: PropTypes.number,
  updateFormDetailsOnReducer: PropTypes.func
};

CustomerDetailsForm.defaultProps = {
  record:
    process.env.NODE_ENV === 'development' ? {
      name: 'abcd',
      email: 'abcd@ef.com',
      address: {
        state: 'TG',
        city: 132132,
        street: 'random street'
      },
      phone: '12345'
    } : {},
  currentStep: 0,
  totalSteps: 4
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  updateFormDetailsOnReducer: (body) =>
  // eslint-disable-next-line
    dispatch(updateInvoiceFormCustomerDetails(body))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerDetailsForm);
