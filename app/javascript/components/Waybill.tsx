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

  const [waybillsCount, setWaybillsCount] = React.useState<number>(waybillCount);
  const [isWaybillModal, setWaybillModalActive] = React.useState<boolean>(false);
  const [waybillID, setWaybillID] = React.useState<number>(null);
  const [checkpoints, setCheckpoints] = React.useState<Checkpoint[]>([]);
  const [formErrorsCheckpoints, setFormErrorsCheckpoints] = React.useState<string[]>([]);
  const [alertData, setAlertData] = React.useState<Alert>({ alertType: null, alertText: '', open: false });
  const [searchData, setSearchData] = React.useState<string[]>();
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
            <Search setData={setSearchData} Data={waybills} keyField="" />
          </Grid>
          <Grid item xs={12}>
            <WaybillTable
              setWaybill={setWaybill}
              waybillsCount={waybillsCount}
              setWaybillsCount={setWaybillsCount}
              waybills={waybills}
              setWaybillID={setWaybillID}
              setWaybillModalActive={setWaybillModalActive}
              setCheckpoints={setCheckpoints}
              searchData={searchData}
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
