import * as React from 'react';

import {
  Table, TableBody, TableRow, TableContainer, TableHead, Paper, TablePagination,
  FormControlLabel, Switch, Box, CircularProgress, TableSortLabel,
} from '@mui/material';

import { visuallyHidden } from '@mui/utils';
import { WriteOffAct, WriteOffActTableProps } from '../../common/interfaces_types';
import { StyledTableCell, StyledTableRow } from '../../utils/style';
import { writeOffActSortTableCell, writeOffActTableCell } from '../../constants/writeOffActFields';
import { Order } from '../../mixins/initialValues/userList';
import { getComparator, stableSort } from '../../utils/stableSort';
import httpClient from '../../api/httpClient';

const WriteOffActTable: React.FC<WriteOffActTableProps> = (props: WriteOffActTableProps) => {
  const {
    writeOffActs, writeOffActsCount, rowsPerPage, setRowsPerPage,
    setWriteOffActs, page, setPage,
  } = props;

  const [dense, setDense] = React.useState<boolean>(false);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof WriteOffAct>('good_name');

  const handleChangePage = (event: unknown, newPage: number) => {
    httpClient.writeOffActs.getAll(newPage, rowsPerPage.toString())
      .then((response) => {
        setWriteOffActs(JSON.parse(response.data.write_off_acts));
        setPage(newPage);
      });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    httpClient.writeOffActs.getAll(0, event.target.value)
      .then((response) => setWriteOffActs(JSON.parse(response.data.write_off_acts)))
      .then(() => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      });
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const handleRequestSort = (event, property: keyof WriteOffAct) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event: React.MouseEvent<unknown>) => {
    handleRequestSort(event, property);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer component={Paper}>
          <Table
            sx={{ width: '100%' }}
            size={dense ? 'small' : 'medium'}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                {writeOffActSortTableCell.map((cell) => (
                  <StyledTableCell
                    key={cell.id}
                    align="center"
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
                {writeOffActTableCell.map((cell) => (
                  <StyledTableCell key={cell.id} align="center">{cell.title}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {!writeOffActs
                ? (
                  <TableRow>
                    <StyledTableCell><CircularProgress color="primary" /></StyledTableCell>
                  </TableRow>
                )
                : stableSort(writeOffActs, getComparator(order, orderBy))
                  .map((writeOffAct) => (
                    <StyledTableRow key={writeOffAct.id}>
                      <StyledTableCell align="center" scope="company">{writeOffAct.good_name}</StyledTableCell>
                      <StyledTableCell align="center">{writeOffAct.lost_quantity}</StyledTableCell>
                      <StyledTableCell align="center">{writeOffAct.description}</StyledTableCell>
                      <StyledTableCell align="center">{writeOffAct.consignment.bundle_seria}</StyledTableCell>
                      <StyledTableCell align="center">{writeOffAct.consignment.bundle_number}</StyledTableCell>
                    </StyledTableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={writeOffActsCount}
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

export default WriteOffActTable;
