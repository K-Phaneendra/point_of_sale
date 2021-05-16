import { Formik } from 'formik';
import { TextField } from '@material-ui/core';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import CustomModal from 'src/assets/components/CustomModal';

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
        }) => (
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
              <TextField
                error={Boolean(touched.state && errors.state)}
                fullWidth
                helperText={touched.state && errors.state}
                label="State"
                margin="normal"
                name="state"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.state}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.city && errors.city)}
                fullWidth
                helperText={touched.city && errors.city}
                label="city"
                margin="normal"
                name="city"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.city}
                variant="outlined"
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
        )}
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
