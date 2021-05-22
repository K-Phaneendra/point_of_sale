import { Formik } from 'formik';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import CustomModal from 'src/assets/components/CustomModal';
import states from 'src/__mocks__/states.json';
import cities from 'src/__mocks__/cities.json';

// country code is currently considered as static. That is "India"
const COUNTRY_CODE = 'IN';

const CustomerModalForm = ({
  visible,
  handleCancel,
  title,
  record
}) => {
  const initialValues = {
    name: record.name,
    email: record.email,
    state: !record.address ? '' : record.address.state,
    city: !record.address ? '' : record.address.city,
    street: !record.address ? '' : record.address.street,
    phone: record.phone
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Must be a valid email')
      .max(255)
      .required('Email is required'),
    name: Yup.string().max(255).required('Name is required'),
    state: Yup.string().max(255).required('State is required'),
    city: Yup.string().max(255).required('City is required'),
    street: Yup.string().max(255).required('Street is required'),
    phone: Yup.string().max(255).required('Phone is required')
  });
  const submit = () => {
    console.log('in subm');
  };
  if (visible) {
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
            const statesByCountry = states.filter((each) => each.country_code === COUNTRY_CODE);
            return statesByCountry;
          };
          // get state value by element ID
          const getStateValueByElementID = (elementID) => {
            try {
              const { value } = document.getElementById(elementID);
              const state = getStatesByCountry().find((each) => each.name === value);
              return { target: { value: state.state_code } };
            } catch (err) {
              return { target: { value: '' } };
            }
          };
          // get list of cities by state
          const getCitiesByState = () => {
            const citiesByState = cities.filter((each) => each.state_code === values.state);
            return citiesByState;
          };
          // get city value by element ID
          const getCityValueByElementID = (elementID) => {
            try {
              const { value } = document.getElementById(elementID);
              const city = getCitiesByState().find((each) => each.name === value);
              return { target: { value: city.id } };
            } catch (err) {
              return { target: { value: '' } };
            }
          };
          return (
            <CustomModal
              visible={visible}
              title={title}
              handleCancel={handleCancel}
              handleOk={handleSubmit}
            >
              <form>
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
                  autoComplete
                  autoSelect
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
                        const eventObject = getStateValueByElementID('choose-state');
                        handleBlur('state')(eventObject);
                        handleChange('state')(eventObject);
                      }}
                      onChange={() => {
                        const eventObject = getStateValueByElementID('choose-state');
                        handleChange('state')(eventObject);
                      }}
                      type="text"
                      value={values.state}
                    />
                  )}
                />
                <Autocomplete
                  id="choose-city"
                  options={getCitiesByState()}
                  getOptionLabel={(option) => option.name}
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
                        const eventObject = getCityValueByElementID('choose-city');
                        handleBlur('city')(eventObject);
                        handleChange('city')(eventObject);
                      }}
                      onChange={() => {
                        const eventObject = getCityValueByElementID('choose-city');
                        handleChange('city')(eventObject);
                      }}
                      type="text"
                      value={values.city}
                      variant="outlined"
                    />
                  )}
                />
                <TextField
                  error={Boolean(touched.street && errors.street)}
                  fullWidth
                  helperText={touched.street && errors.street}
                  label="Street"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.street}
                  variant="outlined"
                />
              </form>
            </CustomModal>
          );
        }}
      </Formik>
    );
  }
  return <></>;
};

CustomerModalForm.propTypes = {
  title: PropTypes.string,
  handleCancel: PropTypes.func,
  visible: PropTypes.bool,
  record: PropTypes.object
};

export default CustomerModalForm;
