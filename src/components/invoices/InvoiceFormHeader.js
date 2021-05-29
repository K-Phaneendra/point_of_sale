import React from 'react';
// eslint-disable-next-line
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import CustomerModalForm from '../customer/CustomerModalForm';

import TAX from '../../__mocks__/tax.json';

import customers from 'src/__mocks__/customers';

function InvoiceFormHeader() {
  const [selectedCustomerId, setSelectedCustomerId] = React.useState('');
  const [showAddCustomerForm, setShowAddCustomerForm] = React.useState(false);

  // get list of customers
  const getCustomersLit = () => {
    const customersList = customers;
    return customersList;
  };
  // get customer by id
  const getCustomerById = (id) => {
    try {
      console.log('id==', id);
      if (id !== '') {
        return customers.find((each) => each.id === id);
      }
      throw new Error('Customer ID was not given');
    } catch (err) {
      return null;
    }
  };
  // get the value by element ID
  const getExistingCustomerValueByElementID = (elementID) => {
    try {
      const { value } = document.getElementById(elementID);
      const requiredObj = getCustomersLit().find((each) => each.name === value);
      return { target: { value: requiredObj.id } };
    } catch (err) {
      return { target: { value: '' } };
    }
  };

  console.log('selectedCustomerId', selectedCustomerId);

  const chooseExistingCustomer = () => (
    <Autocomplete
      id="choose-existing-customer"
      options={getCustomersLit()}
      getOptionLabel={(option) => option.name}
      value={getCustomerById(selectedCustomerId)}
      renderInput={(params) => (
        <TextField
          {...params}
          className="mt-0"
          label="Existing customer"
          variant="outlined"
          error={selectedCustomerId === '' && true}
          fullWidth
          helperText={selectedCustomerId === '' && 'Please choose a customer'}
          margin="normal"
          name="Existing customer"
          onBlur={() => {
            const eventObject = getExistingCustomerValueByElementID(
              'choose-existing-customer'
            );
            setSelectedCustomerId(eventObject.target.value);
          }}
          type="text"
          value={selectedCustomerId}
        />
      )}
    />
  );

  const selectedCustomer = getCustomerById(selectedCustomerId) || {};
  console.log('selectedCustomer', selectedCustomer);

  const toggleAddCustomerForm = () => {
    setShowAddCustomerForm((prev) => !prev);
  };

  // clicked on add customer
  const onAddCustomer = () => {
    toggleAddCustomerForm();
  };

  return (
    <Box>
      <Box sx={{ mt: 3, mb: 3 }}>
        <Card>
          <CardContent
            classes={{
              root: 'padding-bottom-16'
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={6} className="text-align-left">
                <div>
                  <Grid container spacing={3}>
                    <Grid item xs={8}>
                      {chooseExistingCustomer()}
                    </Grid>
                    <Grid item xs={4}>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={onAddCustomer}
                      >
                        Add customer
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid container spacing={3} style={{ fontSize: 'x-large' }}>
                    <Grid item xs={6}>
                      <b>Name :</b>
                    </Grid>
                    <Grid item xs={6}>
                      {selectedCustomer.name}
                    </Grid>
                    <Grid item xs={6}>
                      <b>Address :</b>
                    </Grid>
                    <Grid item xs={6}>
                      {selectedCustomer.address && selectedCustomer.address.street}
                    </Grid>
                    <Grid item xs={6}>
                      <b>City &amp; State :</b>
                    </Grid>
                    <Grid item xs={6}>
                      {selectedCustomer.address && `${selectedCustomer.address.city} & ${selectedCustomer.address.state}`}
                    </Grid>
                    <Grid item xs={6}>
                      <b>Phone :</b>
                    </Grid>
                    <Grid item xs={6}>
                      {selectedCustomer.phone}
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid item xs={6} className="text-align-right">
                <div>
                  <div>
                    <b>TAX INVOICE</b>
                  </div>
                  <Grid container spacing={3} style={{ fontSize: 'x-large' }}>
                    <Grid item xs={6}>
                      <b>GST No. :</b>
                    </Grid>
                    <Grid item xs={6}>
                      {TAX[0].GSTNumber}
                    </Grid>
                    <Grid item xs={6}>
                      <b>GST Type :</b>
                    </Grid>
                    <Grid item xs={6}>
                      SGST + CGST
                    </Grid>
                    <Grid item xs={6}>
                      <b>Invoice No. :</b>
                    </Grid>
                    <Grid item xs={6}>
                      abcd-efgh
                    </Grid>
                    <Grid item xs={6}>
                      <b>Date :</b>
                    </Grid>
                    <Grid item xs={6}>
                      {new Date().toDateString()}
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>

      <CustomerModalForm
        visible={showAddCustomerForm}
        handleCancel={toggleAddCustomerForm}
        title="Add customer"
        record={{}}
      />
    </Box>
  );
}

export default InvoiceFormHeader;
