import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Button
} from '@material-ui/core';
import { AddCircleOutlineIcon } from 'src/assets/icons/icons';
import { ADMIN_PATHS } from 'src/utils/paths';

const ChooseCreateOrView = ({
  onAdd,
  onView
}) => (
  <>
    <Button
      color="primary"
      variant="contained"
      startIcon={<AddCircleOutlineIcon />}
      onClick={onAdd}
    >
      Create new invoice
    </Button>
    &nbsp;
    <Button
      color="primary"
      variant="outlined"
      onClick={onView}
    >
      View invoice list
    </Button>
  </>
);

ChooseCreateOrView.propTypes = {
  onAdd: PropTypes.func,
  onView: PropTypes.func
};

const Invoices = () => {
  const navigate = useNavigate();
  const onAdd = () => {
    navigate(ADMIN_PATHS.invoice_create);
  };
  const onView = () => {
    navigate(ADMIN_PATHS.invoice_list);
  };
  return (
    <>
      <Helmet>
        <title>Invoices | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ pt: 3 }} className="text-align-center">
            <ChooseCreateOrView onAdd={onAdd} onView={onView} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Invoices;
