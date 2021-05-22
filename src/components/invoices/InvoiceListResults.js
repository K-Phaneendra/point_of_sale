import { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton,
  Collapse
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { setSelectedCustomerRow } from 'src/redux/reducerActions';
import {
  KeyboardArrowDownIcon,
  KeyboardArrowUpIcon
} from 'src/assets/icons/icons';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const {
    row,
    updateSelectedCustomerRow,
    invoices,
    selectedIds,
    setSelectedIds
  } = props;

  const [open, setOpen] = useState(false);
  const classes = useRowStyles();

  const checkAndUpdateTheSelectedRow = (newSelectedCustomerIds) => {
    if (newSelectedCustomerIds.length === 1) {
      // as there are no multiple rows selected, we add value to the reducer
      // get row details by id and update the reducer
      const selectedRecord = invoices.find(
        (each) => each.id === newSelectedCustomerIds[0]
      );
      updateSelectedCustomerRow(selectedRecord);
    } else {
      // as there are multiple rows selected, we remove value from reducer
      updateSelectedCustomerRow({});
    }
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      // one record selected
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedIds,
        id
      );
      checkAndUpdateTheSelectedRow(newSelectedCustomerIds);
    } else if (selectedIndex === 0) {
      // deselected all
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedIds.slice(1)
      );
      checkAndUpdateTheSelectedRow(newSelectedCustomerIds);
    } else if (selectedIndex === selectedIds.length - 1) {
      // deselected last record
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedIds.slice(0, -1)
      );
      checkAndUpdateTheSelectedRow(newSelectedCustomerIds);
    } else if (selectedIndex > 0) {
      // one row deselected
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedIds.slice(0, selectedIndex),
        selectedIds.slice(selectedIndex + 1)
      );
      checkAndUpdateTheSelectedRow(newSelectedCustomerIds);
    }
    setSelectedIds(newSelectedCustomerIds);
  };

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell padding="checkbox">
          <Checkbox
            checked={selectedIds.indexOf(row.id) !== -1}
            onChange={(event) => handleSelectOne(event, row.id)}
            value="true"
          />
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell>
          {moment(row.createdAt).format('DD/MM/YYYY')}
        </TableCell>
        <TableCell>{row.customer_details.name}</TableCell>
        <TableCell>{row.customer_details.phone}</TableCell>
        <TableCell align="right">{row.exchangeValue}</TableCell>
        <TableCell align="right">{row.netPayable}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Products
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Product name</TableCell>
                    <TableCell align="right">Gross weight (gm)</TableCell>
                    <TableCell align="right">Net weight (gm)</TableCell>
                    <TableCell align="right">V.A. (gm)</TableCell>
                    <TableCell align="right">Unit rate (gm)</TableCell>
                    <TableCell align="right">Amount (Rs)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((product) => (
                    <TableRow key={product.name}>
                      <TableCell>
                        {product.name}
                      </TableCell>
                      <TableCell align="right">
                        {product.grossWeight}
                      </TableCell>
                      <TableCell align="right">{product.netWeight}</TableCell>
                      <TableCell align="right">{product.va}</TableCell>
                      <TableCell align="right">{product.unitRate}</TableCell>
                      <TableCell align="right">{product.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.object,
  updateSelectedCustomerRow: PropTypes.func,
  invoices: PropTypes.array.isRequired,
  selectedIds: PropTypes.array,
  setSelectedIds: PropTypes.func
};

const InvoiceListResults = ({
  invoices,
  updateSelectedCustomerRow,
  ...rest
}) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [selectedIds, setSelectedIds] = useState([]);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = invoices.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }
    setSelectedIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedIds.length === invoices.length}
                    color="primary"
                    indeterminate={
                      selectedIds.length > 0
                      && selectedIds.length < invoices.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell padding="checkbox">
                  &nbsp;
                  {/* expand option */}
                </TableCell>
                <TableCell>Invoice ID</TableCell>
                <TableCell>Created date</TableCell>
                <TableCell>Customer name</TableCell>
                <TableCell>Customer phone</TableCell>
                <TableCell align="right">Exchange value</TableCell>
                <TableCell align="right">Net payable</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.slice(0, limit).map((each) => (
                <Row key={each.id} row={each} invoices={invoices} selectedIds={selectedIds} setSelectedIds={setSelectedIds} updateSelectedCustomerRow={updateSelectedCustomerRow} />
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={invoices.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

InvoiceListResults.propTypes = {
  invoices: PropTypes.array.isRequired,
  updateSelectedCustomerRow: PropTypes.func
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  updateSelectedCustomerRow: (body) => dispatch(setSelectedCustomerRow(body))
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceListResults);
