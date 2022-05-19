import * as React from 'react';

import {
  Table, TableBody, TableContainer, Paper, Box,
  Checkbox, FormControlLabel, Switch, TablePagination, Button, TableRow, CircularProgress,
} from '@mui/material';

import EnhancedTableToolbar from './TableToolbar';
import EnhancedTableHead from './TableHead';
import { Order } from '../../../mixins/initialValues/userList';
import { getComparator, stableSort } from '../../../utils/stableSort';
import { EnhancedTableProps, User } from '../../../common/interfaces_types';
import { StyledTableCell, StyledTableRow } from '../../../utils/style';
import httpClient from '../../../api/httpClient';

const EnhancedTable: React.FC<EnhancedTableProps> = (props: EnhancedTableProps) => {
  const {
    users, setUser, setEditUserModal, setUpdateModalActive, searchData, userCount,
  } = props;

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof User>('login');
  const [selectedUsersIds, setSelectedUsersIds] = React.useState<number[]>([]);
  const [page, setPage] = React.useState<number>(0);
  const [dense, setDense] = React.useState<boolean>(false);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    httpClient.users.getAll(newPage).then((response) => setUser(response.data)).then(() => setPage(newPage));
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof User,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelectedUsersIds = users.map((user) => user.id);
      setSelectedUsersIds(newSelectedUsersIds);
      return;
    }
    setSelectedUsersIds([]);
  };

  const handleToggle = (userID: number) => {
    if (selectedUsersIds.indexOf(userID) === -1) {
      const newSelectedUsersIds: number[] = [...selectedUsersIds, userID];
      setSelectedUsersIds(newSelectedUsersIds);
    } else {
      setSelectedUsersIds(selectedUsersIds.filter((item) => item !== userID));
    }
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openUpdateModal = (id) => {
    setEditUserModal(id);
    setUpdateModalActive(true);
  };

  let usersData: any[];

  if (searchData) usersData = searchData;
  else usersData = users;

  // const UsersData = searchData || users;
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selectedUsersIds.length}
          users={usersData}
          setUser={setUser}
          selectedUsersIds={selectedUsersIds}
          setSelectedUsersIds={setSelectedUsersIds}
        />
        <TableContainer>
          <Table
            sx={{ width: '100%' }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selectedUsersIds.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={usersData.length}
            />
            <TableBody>
              {!users
                ? (
                  <TableRow>
                    <StyledTableCell><CircularProgress color="primary" /></StyledTableCell>
                  </TableRow>
                )
                : stableSort(usersData, getComparator(order, orderBy))

                  .map((user, index) => {
                    const name = `${user.first_name} ${user.middle_name} ${user.second_name}`;
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={user.id}
                      >
                        <StyledTableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={selectedUsersIds.indexOf(+user.id) !== -1}
                            onClick={() => handleToggle(+user.id)}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          <Button
                            variant="text"
                            onClick={() => { openUpdateModal(user.id); }}
                          >
                            {name}
                          </Button>
                        </StyledTableCell>
                        <StyledTableCell align="left">{user.login}</StyledTableCell>
                        <StyledTableCell align="left">{user.role.role_name}</StyledTableCell>
                      </TableRow>
                    );
                  })}

            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={userCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
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

export default EnhancedTable;
