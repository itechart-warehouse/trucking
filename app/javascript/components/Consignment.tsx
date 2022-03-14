import * as React from 'react';

import Button from '@mui/material/Button';
import { Box, Grid } from '@mui/material';

import CreateConsignmentForm from './Consignment/CreateConsignmentForm';
import { consignmentFormValues } from '../initialValues/consignmentInitialValues';
import { ConsignmentData } from '../mixins/initialValues/consignmentList';
import httpClient from '../api/httpClient';
import ConsignmentTable from './Consignment/ConsigmentTable';
import { goodsFormValues } from '../initialValues/goodsInitialValues';
import { GoodsData } from '../mixins/initialValues/goodsList';

function Consignment() {
  const [isActiveModal, setModalActive] = React.useState(false);
  const [consignments, setConsignment] = React.useState<ConsignmentData[]>(null);
  // const [goods, setGoods] = React.useState<GoodsData[]>([]);

  const handleClose = () => setModalActive(false);

  const handleSubmit = async (consignment: consignmentFormValues, goods: goodsFormValues) => {
    await httpClient.consignments.create(consignment);
    // await httpClient.goods.create(goods);
    setConsignment((prevConsignment) => [...prevConsignment, consignment]);
  };

  return (
    <div className="wrapper">
      <Box sx={{
        flexGrow: 1, display: 'flex', rowGap: '20px', flexDirection: 'column',
      }}
      >
        <Grid item xs={12}>
          <Button variant="outlined" onClick={() => setModalActive(true)} color="inherit">
            Create Consignment
          </Button>
        </Grid>
        <Grid item xs={12}>
          <ConsignmentTable consignments={consignments} setConsignment={setConsignment} />
        </Grid>
      </Box>
      <CreateConsignmentForm
        isActiveModal={isActiveModal}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default Consignment;
