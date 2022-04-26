import * as React from 'react';

import { Box, Grid, Button } from '@mui/material';

import httpClient from '../api/httpClient';
import WriteOffActTable from './WriteOffAct/WriteOffActTable';
import CreateWriteOffActForm from './WriteOffAct/CreateWriteOffActForm';
import SiteAlerts from './Alert';
import { WriteOffActsProps } from '../common/interfaces_types';
import Search from './Search';

const WriteOffActs: React.FC<WriteOffActsProps> = (props: WriteOffActsProps) => {
  const { currentUserRole } = props;
  const [isActiveModal, setModalActive] = React.useState(false);
  const [writeOffActs, setWriteOffActs] = React.useState([]);
  const [formErrors, setFormErrors] = React.useState([]);
  const [alertOpen, alertSetOpen] = React.useState(false);
  const [alertData, setAlertData] = React.useState({});
  const [searchData, setSearchData] = React.useState();

  const handleClose = () => {
    setModalActive(false);
    setFormErrors(null);
  };

  const handleSubmit = async (writeOffAct) => {
    await httpClient.writeOffActs.create(writeOffAct)
      .then((response) => {
        setWriteOffActs((prev) => [...prev, response.data]);
        setModalActive(false);
        setAlertData({
          alertType: 'success',
          alertText: 'Successfully created write-off act!',
        });
        alertSetOpen(true);
      })
      .catch((error) => {
        setFormErrors(error.response.data);
        setAlertData({
          alertType: 'error',
          alertText: 'Something went wrong with creating write-off act',
        });
        alertSetOpen(true);
      });
  };

  return (
    <div className="wrapper">

      <Box sx={{
        flexGrow: 1, display: 'flex', flexDirection: 'column', rowGap: '20px', maxWidth: '70%',
      }}
      >
        <Grid
          container
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          justifyContent="flex-end"
        >
          <Grid item md={3} style={{ textAlign: 'left' }}>
            <Search setData={setSearchData} Data={writeOffActs} keyField="consignment" />
          </Grid>
          {['driver', 'manager'].includes(currentUserRole)
            ? (
              <Grid item xs={3} style={{ textAlign: 'right' }}>
                <Button variant="contained" color="success" size="large" onClick={() => setModalActive(true)}>
                  Create Write-off Act
                </Button>
              </Grid>
            )
            : null}
          <Grid item xs={12}>
            <WriteOffActTable
              writeOffActs={writeOffActs}
              setWriteOffActs={setWriteOffActs}
              searchData={searchData}
            />
          </Grid>
        </Grid>
      </Box>
      <CreateWriteOffActForm
        isActiveModal={isActiveModal}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        formErrors={formErrors}
      />
      <SiteAlerts alertData={alertData} alertSetOpen={alertSetOpen} alertOpen={alertOpen} />
    </div>
  );
};

export default WriteOffActs;
