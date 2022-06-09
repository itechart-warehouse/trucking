import * as React from 'react';

import { Box, Grid, Button } from '@mui/material';

import httpClient from '../api/httpClient';
import WriteOffActTable from './WriteOffAct/WriteOffActTable';
import CreateWriteOffActForm from './WriteOffAct/CreateWriteOffActForm';
import SiteAlerts from './Alert';
import { Alert, WriteOffActsProps, WriteOffAct } from '../common/interfaces_types';
import Search from './Search';

const WriteOffActs: React.FC<WriteOffActsProps> = (props: WriteOffActsProps) => {
  const {
    currentUserRole, writeOffActsJSON, consignmentsJSON, writeOffActCount,
  } = props;

  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [writeOffActsCount, setWriteOffActsCount] = React.useState<number>(writeOffActCount);
  const [isActiveModal, setModalActive] = React.useState<boolean>(false);
  const [writeOffActs, setWriteOffActs] = React.useState<WriteOffAct[]>(JSON.parse(writeOffActsJSON));
  const [formErrors, setFormErrors] = React.useState<string[]>([]);
  const [alertData, setAlertData] = React.useState<Alert>({ alertType: null, alertText: '', open: false });
  const [searchData, setSearchData] = React.useState<string[]>();

  const handleClose = () => {
    setModalActive(false);
    setFormErrors(null);
  };

  const handleSubmit = async (writeOffAct) => {
    await httpClient.writeOffActs.create(writeOffAct)
      .then((response) => {
        if (writeOffActs.length < rowsPerPage) {
          setWriteOffActs((prev) => [...prev, response.data]);
        }
        setWriteOffActsCount(writeOffActCount + 1);
        setModalActive(false);
        setAlertData({ alertType: 'success', alertText: 'Successfully created write-off act!', open: true });
      })
      .catch((error) => {
        setFormErrors(error.response.data);
        setAlertData({ alertType: 'error', alertText: 'Something went wrong with creating write-off act', open: true });
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
            <Search setData={setSearchData} Data={writeOffActs} keyField="consignment" />
          </Grid>
          {['driver', 'manager'].includes(currentUserRole)
            ? (
              <Grid item xs={2} style={{ textAlign: 'right' }}>
                <Button variant="contained" color="success" size="large" style={{ height: '51px' }} onClick={() => setModalActive(true)}>
                  Create Write-off Act
                </Button>
              </Grid>
            )
            : null}
          <Grid item xs={12}>
            <WriteOffActTable
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              setWriteOffActs={setWriteOffActs}
              writeOffActs={writeOffActs}
              searchData={searchData}
              writeOffActsCount={writeOffActsCount}
              setWriteOffActsCount={setWriteOffActsCount}
            />
          </Grid>
        </Grid>
      </Box>
      <CreateWriteOffActForm
        isActiveModal={isActiveModal}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        formErrors={formErrors}
        consignments={JSON.parse(consignmentsJSON)}
        setAlertData={setAlertData}
      />
      <SiteAlerts alertData={alertData} setAlertData={setAlertData} />
    </div>
  );
};

export default WriteOffActs;
