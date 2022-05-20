import * as React from 'react';

import {
  List, ListItem, ListItemButton, ListItemText,
  Checkbox, IconButton, ListItemIcon, Box, CircularProgress, TableRow,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { blue } from '@mui/material/colors';

import httpClient from '../../api/httpClient';
import { Warehouse, WarehouseTableProps } from '../../common/interfaces_types';
import { warehouseTable } from '../../constants/warehouseFields';
import { StyledTableCell } from '../../utils/style';

const WarehouseTable: React.FC<WarehouseTableProps> = (props: WarehouseTableProps) => {
  const {
    warehouses, setWarehouses, setAlertData, currentUserRole, searchData, setSearchData,
  } = props;

  const setWarehouseTrusted = (warehouse: Warehouse) => {
    warehouse.trusted = !warehouse.trusted;
    httpClient.warehouses.update(warehouse.id, warehouse).then((response) => {
      const objIndex = warehouses.findIndex((element) => element.id === warehouse.id);
      warehouses[objIndex] = response.data;
      setWarehouses(warehouses);
      if (searchData) setSearchData([response.data]);
      setAlertData({ alertType: 'info', alertText: 'Warehouse successfully set trusted/untrusted', open: true });
    });
  };

  const handleDeleteWarehouse = async (id) => {
    await httpClient.warehouses.delete(id);
    setWarehouses(warehouses.filter((data: Warehouse) => data.id !== id));
    setAlertData({ alertType: 'warning', alertText: 'Warehouse successfully deleted', open: true });
  };

  const handleToggle = (value: Warehouse) => () => setWarehouseTrusted(value);

  const warehousesData = searchData || warehouses;

  return (
    <div>
      <List sx={{
        width: '100%', bgcolor: 'background.paper', paddingTop: '0px',
      }}
      >
        <div style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', backgroundColor: '#57606f',
        }}
        >
          {warehouseTable.map((cell) => (
            <Box key={cell.id} component="div" display="inline" p={2} color="#fff">
              {cell.title}
            </Box>
          ))}
        </div>
        {!warehouses
          ? (
            <TableRow>
              <StyledTableCell><CircularProgress color="primary" /></StyledTableCell>
            </TableRow>
          )
          : warehousesData.map((value) => {
            const labelId = `checkbox-list-label-${value}`;
            return (
              <ListItem
                key={value?.id}
                secondaryAction={(
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    disabled={!(currentUserRole === 'admin')}
                    onClick={() => handleDeleteWarehouse(value?.id)}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                )}
                disablePadding
                sx={{ width: '95%' }}
              >
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(value)}
                  dense
                  disabled={!(currentUserRole === 'admin')}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={value?.trusted}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                      sx={{ color: blue[800], '&.Mui-checked': { color: blue[600] } }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={value?.warehouse_name} />
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
    </div>
  );
};

export default WarehouseTable;
