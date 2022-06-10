import * as React from 'react';

import {
  TableContainer, Paper, Table, TableHead, TableRow, TableBody, Button, TablePagination,
  FormControlLabel, Switch, Box, CircularProgress, TableSortLabel,
} from '@mui/material';

import { visuallyHidden } from '@mui/utils';
import { waybillSortTableCell, waybillTableCell } from '../../constants/waybillFields';
import { StyledTableCell, StyledTableRow } from '../../utils/style';
import { Waybill, WaybillTableProps } from '../../common/interfaces_types';
import { getComparator, stableSort } from '../../utils/stableSort';
import { Order } from '../../mixins/initialValues/userList';
import httpClient from '../../api/httpClient';

const WaybillTable: React.FC<WaybillTableProps> = (props: WaybillTableProps) => {
  const {
    waybills, setWaybillModalActive, setWaybillID, searchData, setCheckpoints, setWaybillsCount, waybillsCount, setWaybill,
  } = props;

  const [dense, setDense] = React.useState<boolean>(false);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Waybill>('waybill_seria');
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    httpClient.waybill.getAll(newPage, rowsPerPage.toString())
      .then((response) => setWaybill(JSON.parse(response.data.waybills)))
      .then(() => setPage(newPage));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    httpClient.waybill.getAll(0, event.target.value)
      .then((response) => setWaybill(JSON.parse(response.data.waybills)))
      .then(() => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      });
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const handleGetCheckpoint = (waybill) => {
    setWaybillModalActive(true);
    setWaybillID(waybill.id);
    setCheckpoints(waybill.checkpoints);
  };

  const handleRequestSort = (event, property: keyof Waybill) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event: React.MouseEvent<unknown>) => {
    handleRequestSort(event, property);
  };

  let waybillsData = [];

  if (searchData) waybillsData = searchData;
  else waybillsData = waybills;

  // const waybillsData = searchData || waybills;

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
                {waybillSortTableCell.map((cell) => (
                  <StyledTableCell
                    key={cell.id}
                    align={cell.align}
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
                {waybillTableCell.map((cell) => (
                  <StyledTableCell key={cell.id} align={cell.align}>{cell.title}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {!waybills
                ? (
                  <TableRow>
                    <StyledTableCell><CircularProgress color="primary" /></StyledTableCell>
                  </TableRow>
                )
                : stableSort(waybillsData, getComparator(order, orderBy))
                  .map((waybill) => {
                    const startpointAddress = `${waybill.startpoint.town} ${waybill.startpoint.street} ${waybill.startpoint.building}`;
                    const endpointAddress = `${waybill.endpoint.town} ${waybill.endpoint.street} ${waybill.endpoint.building}`;
                    return (
                      <StyledTableRow key={waybill.id}>
                        <StyledTableCell align="center">{waybill.waybill_seria}</StyledTableCell>
                        <StyledTableCell align="center">{waybill.waybill_number}</StyledTableCell>
                        <StyledTableCell align="center">{waybill.status}</StyledTableCell>
                        <StyledTableCell align="center">{startpointAddress}</StyledTableCell>
                        <StyledTableCell align="center">{endpointAddress}</StyledTableCell>
                        <StyledTableCell align="center">
                          <Button variant="text" onClick={() => handleGetCheckpoint(waybill)}>
                            open waybill
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}

            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={waybillsCount}
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

export default WaybillTable;
