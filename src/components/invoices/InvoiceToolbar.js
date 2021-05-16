import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { ArrowBackIcon, SearchIcon, EditIcon } from 'src/assets/icons/icons';

const TopRow = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start' // to align content on the left
      }}
    >
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<ArrowBackIcon />}
        onClick={goBack}
        type="button"
      >
        Back
      </Button>
    </Box>
  );
};

const SearchAndOptions = () => (
  <Box
    sx={{
      mt: 3
    }}
  >
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
              placeholder="Search"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6} className="text-align-right">
            <IconButton
              color="inherit"
              title="Edit invoice"
              // disabled={isEditDisabled()}
              // onClick={onEdit}
            >
              <EditIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </Box>
);

const InvoiceToolbar = ({ fromPage }) => (
  <>
    <TopRow />
    {fromPage === 'invoice-list' && <SearchAndOptions />}
  </>
);

InvoiceToolbar.propTypes = {
  fromPage: PropTypes.string
};

InvoiceToolbar.propTypes = {
  fromPage: 'invoice-create'
};

export default InvoiceToolbar;
