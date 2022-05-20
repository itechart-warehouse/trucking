import * as React from 'react';

import {
  Table, TableBody, TableRow, TableContainer, TableHead, Paper, Button,
  TablePagination, FormControlLabel, Switch, Box, CircularProgress, TableSortLabel,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

import { consignmentSortTable, consignmentTable } from '../../constants/consignmentFields';
import { StyledTableCell, StyledTableRow } from '../../utils/style';
import { Consignment, ConsignmentTableProps } from '../../common/interfaces_types';
import { getComparator, stableSort } from '../../utils/stableSort';
import { Order } from '../../mixins/initialValues/userList';

const ConsignmentTable: React.FC<ConsignmentTableProps> = (props: ConsignmentTableProps) => {
  const {
    consignments, setModalGoodsActive, setGoods, setConsID, setWayBillActive,
    currentUserRole, setCreateWaybillData, searchData, setWaybillStatus,
  } = props;

  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [dense, setDense] = React.useState<boolean>(false);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Consignment>('consignment_seria');

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - consignments.length) : 0;

  const handleGetGoods = (consignment: Consignment) => {
    setModalGoodsActive(true);
    setConsID(consignment.id);
    setGoods(consignment.goods);
    if (consignment.waybill) {
      setWaybillStatus(consignment.waybill);
    }
  };

  const openWaybillCreateModal = (consID: number) => {
    const consignment = consignments.find((cons) => cons.id === consID);
    setConsID(consID);
    setCreateWaybillData({ truckNumber: consignment.truck, driverFio: consignment.driver });
    setWayBillActive(true);
  };

  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const handleRequestSort = (event, property: keyof Consignment) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event: React.MouseEvent<unknown>) => {
    handleRequestSort(event, property);
  };

  let consignmentsData: any[];

  if (searchData) consignmentsData = searchData;
  else consignmentsData = consignments;

  // const consignmentsData = searchData || consignments;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: '700px', tableLayout: 'fixed', width: '100%' }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <TableHead>
              <TableRow>
                {consignmentSortTable.map((cell) => (
                  <StyledTableCell
                    align="center"
                    key={cell.id}
                    sortDirection={orderBy === cell.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === cell.id}
                      direction={orderBy === cell.id ? order : 'asc'}
                      onClick={createSortHandler(cell.id)}
                    >
                      {cell.title}
                      {orderBy === cell.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </StyledTableCell>
                ))}
                {consignmentTable.map((cell) => (
                  <StyledTableCell key={cell.id} align="center">{cell.title}</StyledTableCell>
                ))}
                {currentUserRole === 'manager'
                  ? <StyledTableCell align="center">Waybill</StyledTableCell>
                  : null}
              </TableRow>
            </TableHead>
            <TableBody>
              {!consignmentsData
                ? (
                  <TableRow>
                    <StyledTableCell><CircularProgress color="primary" /></StyledTableCell>
                  </TableRow>
                )
                : stableSort(consignmentsData, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((consignment: Consignment) => {
                    return (
                      <StyledTableRow key={consignment.id} tabIndex={-1}>
                        <StyledTableCell align="center">{consignment.consignment_seria}</StyledTableCell>
                        <StyledTableCell align="center">{consignment.consignment_number}</StyledTableCell>
                        <StyledTableCell align="center" style={{ fontWeight: 'bold' }}>{consignment.status}</StyledTableCell>
                        <StyledTableCell align="center">{consignment.bundle_seria}</StyledTableCell>
                        <StyledTableCell align="center">{consignment.bundle_number}</StyledTableCell>
                        <StyledTableCell align="center">{consignment.dispatcher}</StyledTableCell>
                        <StyledTableCell align="center">{consignment.manager ? consignment.manager : "Isn't checked"}</StyledTableCell>
                        <StyledTableCell align="center">
                          <Button variant="outlined" onClick={() => handleGetGoods(consignment)}>
                            Goods
                          </Button>
                        </StyledTableCell>
                        {currentUserRole === 'manager'
                          ? (
                            <StyledTableCell align="center">
                              <Button
                                variant="outlined"
                                disabled={!(consignment.status === 'checked' && !consignment.waybill)}
                                onClick={() => openWaybillCreateModal(+consignment.id)}
                              >
                                Create Waybill
                              </Button>
                            </StyledTableCell>
                          )
                          : null}
                      </StyledTableRow>
                    );
                  })}
              {emptyRows > 0 && (
                <StyledTableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <StyledTableCell colSpan={6} />
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={consignments.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <div>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
          sx={{ color: 'white', fontWeight: 'bolder' }}
        />
      </div>
    </Box>
  );
};

export default ConsignmentTable;
