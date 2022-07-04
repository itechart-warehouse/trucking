import * as React from 'react';
import {
  Box,
  CircularProgress, FormControlLabel,
  Paper, Switch,
  Table,
  TableBody,
  TableContainer,
  TableHead, TablePagination,
  TableSortLabel,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { statisticsSortTable, statisticsTable } from '../../constants/statisticsField';
import StatisticsAccordion from './StatisticsAccordion';
import { StatisticsTableType, UserLogs } from '../../common/interfaces_types';
import { Order } from '../../mixins/initialValues/userList';
import { getComparator, stableSort } from '../../utils/stableSort';
import { StyledTableCell, StyledTableRow } from '../../utils/style';
import httpClient from '../../api/httpClient';

const StatisticsTable: React.FC<StatisticsTableType> = (props: StatisticsTableType) => {
  const { userLogs, setUserLogs, statisticsCount } = props;
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof UserLogs>('username');
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [page, setPage] = React.useState<number>(0);
  const [dense, setDense] = React.useState<boolean>(false);

  const handleRequestSort = (event, property: keyof UserLogs) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event: React.MouseEvent<unknown>) => {
    handleRequestSort(event, property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    httpClient.statistics.getAll(newPage, rowsPerPage.toString())
      .then((response) => {
        setUserLogs(response.data);
      })
      .then(() => setPage(newPage));
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    httpClient.statistics.getAll(0, event.target.value).then((response) => setUserLogs(response.data))
      .then(() => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      });
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: '700px', width: '100%' }}
            aria-label="statisticsTable"
            size={dense ? 'small' : 'medium'}
          >
            <TableHead>
              <StyledTableRow>
                {statisticsSortTable.map((cell) => (
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
                          {order === 'desc'
                            ? 'sorted descending'
                            : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </StyledTableCell>
                ))}
                {statisticsTable.map((cell) => (
                  <StyledTableCell key={cell.id} align={cell.align}>
                    {cell.title}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {Object.keys(userLogs).length === 0 ? (
                <StyledTableRow>
                  <StyledTableCell color="primary" align="center" colSpan={6}><CircularProgress /></StyledTableCell>
                </StyledTableRow>
              ) : (
                stableSort(userLogs, getComparator(order, orderBy)).map((item) => (
                  <StyledTableRow key={item.id}>
                    <StyledTableCell align="center">{item.username}</StyledTableCell>
                    <StyledTableCell align="center">{item.date}</StyledTableCell>
                    <StyledTableCell align="center">{item.company}</StyledTableCell>
                    <StyledTableCell align="center">{item.action}</StyledTableCell>
                    <StyledTableCell align="center">{item.type}</StyledTableCell>
                    <StyledTableCell align="center" style={{ width: '45%' }}>
                      <StatisticsAccordion item={item} />
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={statisticsCount}
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

export default StatisticsTable;
