import * as React from 'react';

import { Box, Grid } from '@mui/material';

import httpClient from '../api/httpClient';
import WaybillTable from './Waybill/WaybillTable';
import Checkpoints from './Driver/Checkpoints';
import SiteAlerts from './Alert';
import Search from './Search';
import {
  Alert, WaybillProps, Waybill, Checkpoint,
} from '../common/interfaces_types';

const Waybills: React.FC<WaybillProps> = (props: WaybillProps) => {
  const { currentUserRole, waybillsJSON, waybillCount } = props;

  const [page, setPage] = React.useState<number>(0);
  const [waybillsCount, setWaybillsCount] = React.useState<number>(waybillCount);
  const [isWaybillModal, setWaybillModalActive] = React.useState<boolean>(false);
  const [waybillID, setWaybillID] = React.useState<number>(null);
  const [checkpoints, setCheckpoints] = React.useState<Checkpoint[]>([]);
  const [formErrorsCheckpoints, setFormErrorsCheckpoints] = React.useState<string[]>([]);
  const [alertData, setAlertData] = React.useState<Alert>({ alertType: null, alertText: '', open: false });
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const waybillsOrder = ['transportation started', 'delivered to the recipient'];
  const [waybills, setWaybill] = React.useState<Waybill[]>(JSON.parse(waybillsJSON)
    .sort((a, b) => waybillsOrder.indexOf(a.status) - waybillsOrder.indexOf(b.status)));

  const handleSubmitWaybill = (id) => {
    httpClient.waybill.finish(id)
      .then(() => {
        setAlertData({ alertType: 'success', alertText: 'Successfully finished cargo transportation!', open: true });

        setWaybillsCount(waybillCount + 1);
      })
      .catch((error) => {
        setFormErrorsCheckpoints(error.response.data);
        setAlertData({ alertType: 'error', alertText: "Couldn't complete the trip!", open: true });
      });
  };

  const handleSearch = (text:string) => {
    if (text) {
      httpClient.waybill.search(0, rowsPerPage.toString(), text)
        .then((response) => {
          setWaybillsCount(response.data.total_count);
          setWaybill(JSON.parse(response.data.waybills));
        });
    } else {
      httpClient.waybill.getAll(0, rowsPerPage.toString())
        .then((response) => {
          setWaybillsCount(response.data.total_count);
          setWaybill(JSON.parse(response.data.waybills));
        })
        .then(() => setPage(0));
    }
  };

  return (
    <div className="wrapper">
      <Box sx={{
        flexGrow: 1, display: 'flex', flexDirection: 'column', rowGap: '20px',
      }}
      >
        <Grid
          container
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          justifyContent="flex-end"
        >
          <Grid item md={2} style={{ textAlign: 'left' }}>
            <Search handleSubmit={handleSearch} />
          </Grid>
          <Grid item xs={12}>
            <WaybillTable
              page={page}
              setPage={setPage}
              setWaybill={setWaybill}
              waybillsCount={waybillsCount}
              setWaybillsCount={setWaybillsCount}
              waybills={waybills}
              setWaybillID={setWaybillID}
              setWaybillModalActive={setWaybillModalActive}
              setCheckpoints={setCheckpoints}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
            />
          </Grid>
        </Grid>
      </Box>
      <Checkpoints
        id={waybillID}
        isWaybillModal={isWaybillModal}
        setWaybillModalActive={setWaybillModalActive}
        checkpoints={checkpoints}
        currentUserRole={currentUserRole}
        setAlertData={setAlertData}
        handleSubmitWaybill={handleSubmitWaybill}
        formErrorsCheckpoints={formErrorsCheckpoints}
        setCheckpoints={setCheckpoints}
      />
      <SiteAlerts alertData={alertData} setAlertData={setAlertData} />
    </div>
  );
};

export default Waybills;
