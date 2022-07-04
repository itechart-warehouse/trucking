import * as React from 'react';
import { Form, Formik } from 'formik';

import {
  Autocomplete, Box, Container, Button, InputLabel,
  Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField,
} from '@mui/material';

import FormikField from '../../UI/FormikField';
import CreateCheckpoint from './CreateCheckpoints';
import CheckpointTable from './CheckpointTable';
import httpClient from '../../api/httpClient';
import waybillInitialValues from '../../initialValues/waybillInitianalValue';
import validationWaybill from '../../mixins/validation_schema/waybill';
import { waybillBottomFields, waybillLeftFields, waybillRightFields } from '../../constants/waybillFields';
import {
  Checkpoint, CreateWaybillsFormProps, GoodsOwners, Warehouse,
} from '../../common/interfaces_types';

const CreateWaybill: React.FC<CreateWaybillsFormProps> = (props: CreateWaybillsFormProps) => {
  const {
    id, formWaybillErrors, isActiveWayBill, setWayBillActive, handleClose, createWaybillData,
    setAlertData, setConsignment, consignments, warehouses, goodsOwners,
  } = props;

  const [isCreateCheckpoints, setCreateCheckpoints] = React.useState<boolean>(false);
  const [checkpoints, setCheckpoints] = React.useState<Checkpoint[]>([]);
  const [formErrors, setFormErrors] = React.useState<string[]>([]);
  const [editCheckpoint, setEditCheckpoint] = React.useState<Checkpoint>(null);
  const handleSubmit = (values) => {
    const cityNames = checkpoints.map((name) => name.city_name);
    httpClient.waybill.create(values, cityNames, id)
      .then((response) => {
        const objIndex = consignments.findIndex((consignment) => consignment.id === id);
        consignments[objIndex] = response.data.consignment;
        setConsignment(consignments);
        setWayBillActive(false);
        setAlertData({ alertType: 'success', alertText: 'Successfully created waybill!', open: true });
      })
      .catch((error) => {
        setFormErrors(error.response.data);
        setAlertData({ alertType: 'error', alertText: 'Something went wrong with creating waybill!', open: true });
      });
  };

  const closeCreateCheckpoints = () => setCreateCheckpoints(false);
  const handleSubmitCheckpoints = (values) => { setCheckpoints([...checkpoints, values]); };
  const handleEditCheckpoint = (values) => {
    checkpoints.find((checkpoint) => checkpoint.id === editCheckpoint.id).city_name = values.city_name;
    setEditCheckpoint(null);
    setCheckpoints(checkpoints);
  };
  return (
    <div>
      <Dialog
        open={isActiveWayBill}
        onClose={handleClose}
        sx={{ '& .MuiDialog-paper': { width: '100%', maxHeight: 750 } }}
        maxWidth="xs"
      >
        <DialogTitle>Create Waybill</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} direction="column">
            <Grid item xs={12}>
              {formErrors ? <p className="error-msg">{formErrors}</p> : null}
              <Formik
                initialValues={waybillInitialValues}
                onSubmit={handleSubmit}
                validationSchema={validationWaybill}
              >
                {({
                  dirty, isValid, handleChange, values,
                }) => (
                  <Form>
                    <Container maxWidth="xs">
                      {formWaybillErrors ? <p className="error-msg">{formWaybillErrors}</p> : null}
                      <div style={{
                        width: '100%', display: 'flex', justifyContent: 'space-around', textAlign: 'center',
                      }}
                      >
                        <Box
                          component="div"
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          m={1}
                          rowGap="5px"
                          bgcolor="background.paper"
                        >
                          <span><strong>Truck number</strong></span>
                          <span>{createWaybillData.truckNumber}</span>
                        </Box>
                        <Box
                          component="div"
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          m={1}
                          rowGap="5px"
                          bgcolor="background.paper"
                        >
                          <span><strong>Driver</strong></span>
                          <span>{createWaybillData.driverFio}</span>
                        </Box>
                      </div>

                      <div style={{ width: '100%', display: 'flex' }}>
                        <Box
                          component="div"
                          display="flex"
                          m={1}
                          flexDirection="column"
                          columnGap="10px"
                          bgcolor="background.paper"
                        >
                          {waybillLeftFields.map((column) => (
                            <FormikField
                              key={column.id}
                              name={column.model}
                              label={column.placeholder}
                              required={column.required}
                              type={column.type}
                              variant="standard"
                            />
                          ))}
                        </Box>
                        <Box
                          component="div"
                          display="flex"
                          m={1}
                          flexDirection="column"
                          columnGap="10px"
                          bgcolor="background.paper"
                        >
                          {waybillRightFields.map((column) => (
                            <FormikField
                              key={column.id}
                              name={column.model}
                              label={column?.placeholder}
                              required={column.required}
                              type={column.type}
                              variant="standard"
                            />
                          ))}
                        </Box>
                      </div>

                      <Autocomplete
                        id="goods_owner"
                        options={goodsOwners}
                        getOptionLabel={(option: GoodsOwners) => option.goods_owner_name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            onSelect={handleChange}
                            margin="normal"
                            label="goods owner"
                            fullWidth
                            value={values?.owner}
                          />
                        )}
                      />

                      <div style={{
                        display: 'flex', justifyContent: 'space-between', textAlign: 'center', columnGap: '10px', marginTop: '10px',
                      }}
                      >
                        {waybillBottomFields.map((column) => (
                          <div key={column.id}>
                            <InputLabel shrink htmlFor="bootstrap-input">
                              {column.label}
                            </InputLabel>
                            <FormikField
                              key={column.id}
                              name={column.model}
                              label={column.placeholder}
                              required={column.required}
                              type={column.type}
                              variant="outlined"
                            />
                          </div>
                        ))}
                      </div>
                      <Autocomplete
                        id="warehouse"
                        options={warehouses}
                        getOptionLabel={(option: Warehouse) => option.warehouse_name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            onSelect={handleChange}
                            margin="normal"
                            label="Warehouse"
                            fullWidth
                            value={values?.warehouse}
                          />
                        )}
                      />

                      {checkpoints.length !== 0
                        ? (
                          <CheckpointTable
                            checkpoints={checkpoints}
                            setCheckpoints={setCheckpoints}
                            setEditCheckpoint={setEditCheckpoint}
                            setCreateCheckpoints={setCreateCheckpoints}
                          />
                        ) : null}

                    </Container>

                    <DialogActions style={{ flexDirection: 'column', padding: '8px 24px' }}>
                      <Button onClick={() => setCreateCheckpoints(true)} color="success" variant="outlined" fullWidth>create new checkpoints</Button>
                      <div style={{
                        width: '100%', display: 'flex', justifyContent: 'space-between', padding: '8px 24px',
                      }}
                      >
                        <Button onClick={handleClose} color="error" variant="outlined">Cancel</Button>
                        <Button type="submit" disabled={!dirty || !isValid} color="success" variant="outlined">Create</Button>
                      </div>
                    </DialogActions>
                  </Form>
                )}
              </Formik>
            </Grid>
            <CreateCheckpoint
              isActiveModal={isCreateCheckpoints}
              checkpointsHandleClose={closeCreateCheckpoints}
              handleSubmitCheckpoints={editCheckpoint ? handleEditCheckpoint : handleSubmitCheckpoints}
              editCheckpoint={editCheckpoint}
            />
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateWaybill;
