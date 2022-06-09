import * as React from 'react';

import { Box, Grid, Button } from '@mui/material';

import WarehouseTable from './Warehouse/WarehouseTable';
import WarehouseCreateForm from './Warehouse/CreateWarehouseForm';
import { Alert, Warehouse, WarehouseProps } from '../common/interfaces_types';
import SiteAlerts from './Alert';
import Search from './Search';
import { warehouseFormValues } from '../initialValues/warehouseInitialValues';
import httpClient from '../api/httpClient';

const Warehouses: React.FC<WarehouseProps> = (props: WarehouseProps) => {
  const {
    currentUserRole, warehousesJSON, warehousemansJSON, warehouseCount,
  } = props;

  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [warehousesCount, setWarehousesCount] = React.useState<number>(warehouseCount);
  const [isActiveModal, setModalActive] = React.useState<boolean>(false);
  const [warehouses, setWarehouses] = React.useState<Warehouse[]>(JSON.parse(warehousesJSON));
  const [formErrors, setFormErrors] = React.useState<string[]>([]);
  const [alertData, setAlertData] = React.useState<Alert>({ alertType: null, alertText: '', open: false });
  const [searchData, setSearchData] = React.useState<string[]>();

  const handleClose = () => {
    setModalActive(false);
    setFormErrors(null);
  };

  const handleSubmit = (warehouse: warehouseFormValues) => {
    httpClient.warehouses.create(warehouse)
      .then((response) => {
        // TODO: cast data type
        if (warehouses.length < rowsPerPage)setWarehouses((prev) => [...prev, response.data]);
        handleClose();
        setAlertData({
          alertType: 'success',
          alertText: 'Successfully created a warehouse!',
          open: true,
        });
        setWarehousesCount(warehouseCount + 1);
      })
      .catch((error) => {
        setFormErrors(error.response.data);
        setAlertData({
          alertType: 'error',
          alertText: 'Something went wrong with creating a warehouse',
          open: true,
        });
      });
  };

  return (
    <div className="wrapper">
      <Box sx={{
        flexGrow: 1, display: 'flex', flexDirection: 'column', maxWidth: '66%',
      }}
      >
        <Grid
          container
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          justifyContent="flex-end"
        >
          <Grid item md={3} style={{ textAlign: 'left' }}>
            <Search setData={setSearchData} Data={warehouses} keyField="" />
          </Grid>
          {currentUserRole === 'admin'
            ? (
              <Grid item xs={1.75} style={{ textAlign: 'right' }}>
                <Button variant="contained" color="success" size="large" style={{ height: '51px' }} onClick={() => setModalActive(true)}>
                  Create Warehouse
                </Button>
              </Grid>
            )
            : null}

          <Grid item xs={12}>
            <WarehouseTable
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              warehousesCount={warehousesCount}
              setWarehousesCount={setWarehousesCount}
              warehouses={warehouses}
              setWarehouses={setWarehouses}
              setAlertData={setAlertData}
              setSearchData={setSearchData}
              currentUserRole={currentUserRole}
              searchData={searchData}
            />
          </Grid>
        </Grid>
      </Box>
      <WarehouseCreateForm
        handleSubmit={handleSubmit}
        isActiveModal={isActiveModal}
        handleClose={handleClose}
        warehousemen={JSON.parse(warehousemansJSON)}
        formErrors={formErrors}
      />
      <SiteAlerts alertData={alertData} setAlertData={setAlertData} />
    </div>
  );
};

export default Warehouses;
