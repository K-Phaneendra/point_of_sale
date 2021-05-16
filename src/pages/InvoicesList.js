import { Helmet } from 'react-helmet';
import {
  Box,
  Container
} from '@material-ui/core';
import InvoiceToolbar from 'src/components/invoices/InvoiceToolbar';
import InvoiceListResults from 'src/components/invoices/InvoiceListResults';
import invoices from 'src/__mocks__/invoices';

const InvoiceList = () => (
  <>
    <Helmet>
      <title>Invoice List | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <InvoiceToolbar fromPage="invoice-list" />
        <Box sx={{ pt: 3 }} className="text-align-center">
          <InvoiceListResults invoices={invoices} />
        </Box>
      </Container>
    </Box>
  </>
);

export default InvoiceList;
