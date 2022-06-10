import * as React from 'react';

import {
  alpha, Button, IconButton, Toolbar, Tooltip, Typography,
} from '@mui/material';

import httpClient from '../../../api/httpClient';
import { EnhancedTableToolbarProps } from '../../../common/interfaces_types';

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const {
    numSelected, setUser, selectedUsersIds, setSelectedUsersIds, page, setUserCount,
    userCount, rowPerPage,
  } = props;

  const deleteUserByIds = async () => {
    const promises: Promise<any>[] = selectedUsersIds.map(
      (userID) => httpClient.users.delete(userID),
    );

    await Promise.all(promises).then(() => {
      httpClient.users.getAll(page, rowPerPage.toString())
        .then((response) => setUser(JSON.parse(response.data.users)));
      setSelectedUsersIds([]);
      setUserCount(userCount - selectedUsersIds.length);
    });
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(
            theme.palette.primary.main,
            theme.palette.action.activatedOpacity,
          ),
        }),
        backgroundColor: '#57606f',
        color: '#fff',
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected}
          {' '}
          selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Users of Company
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <Button variant="contained" color="error" size="large" onClick={deleteUserByIds}>Delete</Button>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            {/* <FilterListIcon /> */}
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
