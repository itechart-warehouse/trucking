import * as React from 'react';

import {
  alpha, Button, IconButton, Toolbar, Tooltip, Typography,
} from '@mui/material';

import httpClient from '../../../api/httpClient';

interface EnhancedTableToolbarProps {
    numSelected: number;
    users: any;
    setUser: any;
    userIds: number[];
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const {
    numSelected, setUser, users, userIds,
  } = props;

  const deleteUserByIds = async () => {
    const promises: Promise<any>[] = userIds.map((it) => httpClient.users.delete(it));
    await Promise.all(promises);
    setUser(users.filter((user) => !userIds.includes(user.id)));
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
        backgroundColor: '#000',
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
          <Button variant="outlined" color="error" onClick={deleteUserByIds}>Delete</Button>
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
