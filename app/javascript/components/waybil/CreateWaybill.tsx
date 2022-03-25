import * as React from 'react';
import { Form, Formik } from 'formik';

import {
  Autocomplete, Box, Container, Dialog, DialogActions,
  DialogContent, DialogTitle, Grid, TextField, Button, InputLabel,
} from '@mui/material';

import FormikField from '../../UI/FormikField';
import CreateRoutes from './CreateRoutes';
import RouteTable from './RouteTable';
import httpClients from '../../api/httpClient';
import waybillInitialValues from '../../initialValues/waybillInitianalValue';
import validationWaybill from '../../mixins/validationWaybill';
import { waybillBottomFields, waybillLeftFields, waybillRightFields } from '../../constants/waybillFields';

interface CreateWaybillsFormProps {
    id:number;
}

const CreateWaybill:React.FC <CreateWaybillsFormProps> = (props: CreateWaybillsFormProps) => {
  const { id } = props;

  const [isActiveWayBill, setWayBillActive] = React.useState(false);
  const [isCreateRoutes, setCreateRoutes] = React.useState(false);
  const [routes, setRoutes] = React.useState([]);
  const [data, setData] = React.useState(null);
  const [owners, setOwners] = React.useState([]);

  React.useEffect(() => {
    httpClients.waybill.get_data_waybill(id).then((response) => setData(response.data));
    httpClients.goods_owner.get_names().then((response) => setOwners(response.data));
  }, []);

  const handleSubmit = (values) => {
    const cityNames = routes.map((name) => name.city_name);
    httpClients.waybill.create(values, cityNames, id);
  };

  const CloseCreateRoutes = () => setCreateRoutes(false);

  const handleClose = () => setWayBillActive(false);

  return (
    <div>
      <Button variant="outlined" onClick={() => { setWayBillActive(true); }}>
        Open waybill
      </Button>
      <Dialog
        open={isActiveWayBill}
        onClose={handleClose}
        sx={{ '& .MuiDialog-paper': { width: '100%', maxHeight: 550 } }}
        maxWidth="xs"
      >
        <DialogTitle>Add Waybill</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} direction="column">
            <Grid item xs={12}>
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
                          <span>{data.truck_number}</span>
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
                          <span>{data.driver_fio}</span>
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
                        options={owners}
                        getOptionLabel={(option) => option.warehouse_name}
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
                      <RouteTable routes={routes} />
                    </Container>

                    <div style={{
                      display: 'flex', justifyContent: 'space-between', textAlign: 'center', columnGap: '10px', marginTop: '10px',
                    }}
                    >
                      {waybillBottomFields.map((column) => (
                        <div>
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

                    <DialogActions style={{ padding: '3px', marginTop: '20px' }}>
                      <Button onClick={() => setCreateRoutes(true)}>create new checkpoints</Button>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button type="submit" disabled={!dirty || !isValid} onClick={handleClose}>Create</Button>
                    </DialogActions>
                  </Form>
                )}
              </Formik>
            </Grid>
            <CreateRoutes
              isActiveModal={isCreateRoutes}
              routeHandleClose={CloseCreateRoutes}
              setRoutes={setRoutes}
              routes={routes}
            />
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateWaybill;
