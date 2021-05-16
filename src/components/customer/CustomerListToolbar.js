import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  IconButton
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CustomerModalForm from './CustomerModalForm';

import { EditIcon, SearchIcon } from 'src/assets/icons/icons';

const SearchAndOptions = ({ onEdit, isEditDisabled, onAdd }) => (
  <Box>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <Button>Import</Button>
      <Button sx={{ mx: 1 }}>Export</Button>
      <Button color="primary" variant="contained" onClick={onAdd}>
        Add customer
      </Button>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search customer"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6} className="text-align-right">
              <IconButton
                color="inherit"
                title="Edit customer"
                disabled={isEditDisabled()}
                onClick={onEdit}
              >
                <EditIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  </Box>
);

SearchAndOptions.propTypes = {
  onAdd: PropTypes.func,
  onEdit: PropTypes.func,
  isEditDisabled: PropTypes.func // it is a function which returns a boolean in it
};
SearchAndOptions.defaulProps = {
  isEditDisabled: () => true
};

const CustomerListToolbar = ({ selectedRow }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  // toggle showEditForm
  const toggleShowEditForm = () => {
    setShowEditForm((prev) => !prev);
  };
  // clicked on edit customer
  const onEdit = () => {
    toggleShowEditForm();
  };
  // toggle showAddForm
  const toggleShowAddForm = () => {
    setShowAddForm((prev) => !prev);
  };
  // clicked on add customer
  const onAdd = () => {
    toggleShowAddForm();
  };
  // check if edit button is disabled or not
  const isEditDisabled = () => {
    let isDisabled = true;
    if (Object.keys(selectedRow).length > 0) {
      isDisabled = false;
    }
    return isDisabled;
  };

  return (
    <>
      <SearchAndOptions
        onEdit={onEdit}
        onAdd={onAdd}
        isEditDisabled={isEditDisabled}
      />
      {/* display add form in modal */}
      <CustomerModalForm
        visible={showAddForm}
        handleCancel={toggleShowAddForm}
        title="Add customer"
        record={{}}
      />
      {/* display edit form in modal */}
      <CustomerModalForm
        visible={showEditForm}
        handleCancel={toggleShowEditForm}
        title="Edit customer"
        record={selectedRow}
      />
    </>
  );
};

CustomerListToolbar.propTypes = {
  selectedRow: PropTypes.object
};

const mapStateToProps = (state) => ({
  selectedRow: state.customerReducer.selectedRow
});

export default connect(mapStateToProps)(CustomerListToolbar);
