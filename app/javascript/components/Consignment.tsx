import * as React from 'react';

import { Box, Grid, Button } from '@mui/material';

import { v4 as uuidv4 } from 'uuid';
import httpClient from '../api/httpClient';
import CreateConsignmentForm from './Consignment/CreateConsignmentForm';
import ConsignmentGoods from './Consignment/ConsignmentGoods';
import ConsignmentTable from './Consignment/ConsigmentTable';
import {
  Alert, ConsignmentProps, Item, CreateWaybillData, Consignment, NewGoods,
} from '../common/interfaces_types';
import CreateWaybill from './Waybill/CreateWaybill';
import SiteAlerts from './Alert';
import { consignmentFormValues } from '../initialValues/consignmentInitialValues';
import Search from './Search';

const Consignments: React.FC<ConsignmentProps> = (props: ConsignmentProps) => {
  const {
    currentUserRole, consignmentsJSON, trucksJSON, driversJSON, warehousesJSON,
    goodsOwnersJSON,
  } = props;

  // MODAL states
  const [isActiveModal, setModalActive] = React.useState<boolean>(false);
  const [isActiveGoodsModal, setModalGoodsActive] = React.useState<boolean>(false);
  const [isActiveWayBill, setWayBillActive] = React.useState<boolean>(false);
  // Form Errors states
  const [formErrors, setFormErrors] = React.useState<string[]>([]);
  // Alert and Search states
  const [alertData, setAlertData] = React.useState<Alert>({ alertType: null, alertText: '', open: false });

  const [searchData, setSearchData] = React.useState<string[]>();

  const consignmentsOrder = ['registered', 'checked', 'delivered'];
  const [consignments, setConsignment] = React.useState<Consignment[]>(
    JSON.parse(consignmentsJSON)
      .sort((a, b) => consignmentsOrder.indexOf(a.status) - consignmentsOrder.indexOf(b.status)),
  );

  const [trucks, setTrucks] = React.useState(JSON.parse(trucksJSON));
  const [drivers, setDrivers] = React.useState(JSON.parse(driversJSON));
  const [goodsOwners, setGoodsOwners] = React.useState(JSON.parse(goodsOwnersJSON));
  const [warehouses, setWarehouses] = React.useState(JSON.parse(warehousesJSON));
  const [waybillStatus, setWaybillStatus] = React.useState<string>(null);
  const [goods, setGoods] = React.useState([]);
  const [selectedGoods, setSelectedGoods] = React.useState<Item[]>([]);
  const [consId, setConsID] = React.useState<number>(null);
  const [createWaybillData, setCreateWaybillData] = React.useState<CreateWaybillData>(null);
  const [titleStatus, setTitleStatus] = React.useState<string>(null);
  const [newGoods, setNewGood] = React.useState<NewGoods[]>([{
    good_name: '', unit_of_measurement: '', quantity: 0, id: uuidv4(),
  }]);

  const handleFieldAdd = () => setNewGood([...newGoods, {
    good_name: '', unit_of_measurement: '', quantity: 0, id: uuidv4(),
  }]);

  const handleFieldChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...newGoods];
    list[index][name] = value;
    setNewGood(list);
  };

  const handelDeleteGoods = (id: string) => setNewGood(newGoods.filter((good) => good.id !== id));

  const handleClose = () => {
    setModalActive(false);
    setModalGoodsActive(false);
    setWayBillActive(false);
    setFormErrors(null);
    setSelectedGoods([]);
    setTitleStatus('');
    setNewGood([{
      good_name: '', unit_of_measurement: '', quantity: 0, id: uuidv4(),
    }]);
  };

  const handleSubmit = (consignment: consignmentFormValues) => {
    httpClient.consignments.create({ consignment, newGoods })
      .then((response) => {
        setConsignment((prevConsignment) => [response.data, ...prevConsignment]);
        setAlertData({
          alertType: 'success',
          alertText: 'Successfully created consignment with goods!',
          open: true,
        });
        handleClose();
      })
      .catch((errors) => {
        setFormErrors(errors.response.data);
        setAlertData({
          alertType: 'error',
          alertText: 'Something went wrong with creating consignment or goods',
          open: true,
        });
      });
  };

  const handleGoodsSubmit = () => {
    const selectedGoodsIds = selectedGoods.map((checkedGood) => checkedGood.id);
    switch (titleStatus) {
      case 'Checked':
        setTitleStatus('');
        return httpClient.goods.updateStatus(consId, { selectedGoodsIds, status: 'checked' })
          .then((response) => {
            const objIndex = consignments.findIndex((element) => element.id === consId);
            consignments[objIndex] = response.data;
            setConsignment(consignments);
            if (searchData) setSearchData([response.data]);
            setAlertData({ alertType: 'info', alertText: 'Goods status changed!', open: true });
            handleClose();
          });
      case 'Delivered':
        setTitleStatus('');
        return httpClient.goods.updateStatus(consId, { selectedGoodsIds, status: 'delivered' })
          .then((response) => {
            const objIndex = consignments.findIndex((element) => element.id === consId);
            consignments[objIndex] = response.data;
            setConsignment(consignments);
            if (searchData) setSearchData([response.data]);
            setModalActive(false);
            setAlertData({ alertType: 'info', alertText: 'Goods status changed!', open: true });
            handleClose();
          });
      default:
        setTitleStatus('');
        return setTitleStatus('');
    }
  };

  return (
    <div className="wrapper">
      <Box sx={{
        flexGrow: 1, display: 'flex', rowGap: '20px', flexDirection: 'column',
      }}
      >
        <Grid
          container
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          justifyContent="flex-end"
        >
          <Grid item md={2} style={{ textAlign: 'left' }}>
            <Search setData={setSearchData} Data={consignments} keyField="dispatcher" />
          </Grid>
          {currentUserRole === 'dispatcher'
            ? (
              <Grid item xs={1.75} style={{ textAlign: 'right' }}>
                <Button variant="contained" color="success" size="large" style={{ height: '51px' }} onClick={() => setModalActive(true)}>
                  Create Consignment
                </Button>
              </Grid>
            )
            : null}

          <Grid item xs={12}>
            <ConsignmentTable
              consignments={consignments}
              setModalGoodsActive={setModalGoodsActive}
              setConsID={setConsID}
              setGoods={setGoods}
              formErrors={formErrors}
              setWayBillActive={setWayBillActive}
              setCreateWaybillData={setCreateWaybillData}
              currentUserRole={currentUserRole}
              searchData={searchData}
              setWaybillStatus={setWaybillStatus}
            />
          </Grid>
        </Grid>
      </Box>
      <CreateConsignmentForm
        isActiveModal={isActiveModal}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        newGoods={newGoods}
        handleFieldAdd={handleFieldAdd}
        handleFieldChange={handleFieldChange}
        formErrors={formErrors}
        trucks={trucks}
        drivers={drivers}
        handelDeleteGoods={handelDeleteGoods}
      />
      <ConsignmentGoods
        isActiveModal={isActiveGoodsModal}
        handleClose={handleClose}
        goods={goods}
        selectedGoods={selectedGoods}
        setSelectedGoods={setSelectedGoods}
        handleGoodsSubmit={handleGoodsSubmit}
        currentUserRole={currentUserRole}
        titleStatus={titleStatus}
        setTitleStatus={setTitleStatus}
        waybillStatus={waybillStatus}
      />
      <CreateWaybill
        id={consId}
        isActiveWayBill={isActiveWayBill}
        setWayBillActive={setWayBillActive}
        createWaybillData={createWaybillData}
        handleClose={handleClose}
        warehouses={warehouses}
        searchData={searchData}
        setSearchData={setSearchData}
        formWaybillErrors={formErrors}
        consignments={consignments}
        setConsignment={setConsignment}
        setAlertData={setAlertData}
        goodsOwners={goodsOwners}
      />
      <SiteAlerts alertData={alertData} setAlertData={setAlertData} />
    </div>
  );
};

export default Consignments;
