import { Helmet } from 'react-helmet';
import {
  Box,
  Container
} from '@material-ui/core';
import InvoiceToolbar from 'src/components/invoices/InvoiceToolbar';
import InvoiceForm from 'src/components/invoices/InvoiceForm';

const InvoiceCreate = () => (
  <>
    <Helmet>
      <title>Create Invoice | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <InvoiceToolbar fromPage="invoice-create" />
        <Box sx={{ pt: 3 }} className="text-align-center">
          <InvoiceForm />
        </Box>
      </Container>
    </Box>
  </>
);

export default InvoiceCreate;
