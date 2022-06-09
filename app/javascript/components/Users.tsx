import * as React from 'react';

import { Box, Grid, Button } from '@mui/material';

import CreateForm from './Users/form/CreateForm';
import UsersTable from './Users/table/Table';
import { userFormValues } from '../initialValues/userInitialValues';
import httpClient from '../api/httpClient';
import Search from './Search';
import { User, UsersProps } from '../common/interfaces_types';

const Users: React.FC<UsersProps> = (props: UsersProps) => {
  const {
    rolesJSON, companiesJSON, usersJSON, user_count,
  } = props;
  const [userCount, setUserCount] = React.useState<number>(user_count);
  const [createModal, setCreateModalActive] = React.useState<boolean>(false);
  const [updateModal, setUpdateModalActive] = React.useState<boolean>(false);
  const [editUserModal, setEditUserModal] = React.useState<number>(null);
  const [formErrors, setFormErrors] = React.useState<string[]>([]);
  const [users, setUser] = React.useState<User[]>(JSON.parse(usersJSON));
  const [searchData, setSearchData] = React.useState<string[]>();
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);

  const handleClose = () => {
    setCreateModalActive(false);
    setUpdateModalActive(false);
    setEditUserModal(null);
    setFormErrors(null);
  };

  const handleSubmit = (user: userFormValues) => {
    httpClient.users.create(user)
      .then((response) => {
        if (users.length < rowsPerPage) {
          setUser((prevUsers) => [...prevUsers, response.data]);
        }
        setUserCount(userCount + 1);
        handleClose();
      })
      .catch((error) => setFormErrors(error.response.data));
  };

  const handleEditSubmit = (user: userFormValues) => {
    httpClient.users.update(user.id, user)
      .then((response) => {
        const newUsers = [...users];
        const userIndex = newUsers.findIndex((it) => it.id === user.id);
        if (userIndex !== -1) {
          newUsers[userIndex] = {
            ...newUsers[userIndex],
            ...response.data,
          };
          setUser(newUsers);
          handleClose();
        }
      })
      .catch((error) => setFormErrors(error.response.data));
  };

  return (
    <div className="wrapper">
      <Box sx={{
        flexGrow: 1, display: 'flex', flexDirection: 'column', maxWidth: '73%',
      }}
      >
        <Grid
          container
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          justifyContent="flex-end"
        >
          <Grid item md={3} style={{ textAlign: 'left' }}>
            <Search setData={setSearchData} Data={users} keyField="role" />
          </Grid>
          <Grid item xs={1.75} style={{ textAlign: 'right' }}>
            <Button variant="contained" color="success" size="large" style={{ height: '51px' }} onClick={() => setCreateModalActive(true)}>
              Create User
            </Button>
          </Grid>
          <Grid item xs={12}>
            <UsersTable
              setRowsPerPage={setRowsPerPage}
              rowsPerPage={rowsPerPage}
              setUserCount={setUserCount}
              userCount={userCount}
              users={users}
              setUser={setUser}
              setEditUserModal={setEditUserModal}
              setUpdateModalActive={setUpdateModalActive}
              searchData={searchData}
            />
          </Grid>
        </Grid>
      </Box>
      <CreateForm
        createModal={createModal}
        updateModal={updateModal}
        handleClose={handleClose}
        companies={JSON.parse(companiesJSON)}
        roles={JSON.parse(rolesJSON)}
        editUserModal={editUserModal}
        handleSubmit={createModal ? handleSubmit : handleEditSubmit}
        title={updateModal ? 'Update Profile' : 'Add User Of Company'}
        btnTitle={updateModal ? 'Update' : 'Create'}
        formErrors={formErrors}
      />
    </div>
  );
};

export default Users;
