import * as React from 'react';
import { Form, Formik, FormikValues } from 'formik';

import {
  Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Button,
} from '@mui/material';

import FormikField from '../../UI/FormikField';
import { Country, createCityFormProps } from '../../common/interfaces_types';
import httpClient from '../../api/httpClient';

const createCityForm: React.FC<createCityFormProps> = (props: createCityFormProps) => {
  const {
    isActiveModal, setCities, setCitiesCount, citiesCount, cities,
    handleClose, rowsPerPage, editRecord, setEditRecord, countryId,
  } = props;

  const countryInitialValues: Country = { id: undefined, name: editRecord ? editRecord.name : '' };

  const handleSubmit = async (newCity: FormikValues) => {
    if (editRecord) {
      await httpClient.cities.update(countryId, newCity, editRecord.id).then(() => {
        const newCities = cities;
        newCities.find((city) => editRecord.id === city.id).name = newCity.name;
        setCities(newCities);
        setEditRecord(null);
        handleClose();
      });
    } else {
      await httpClient.cities.create(countryId, newCity)
        .then((response) => {
          handleClose();
          setCitiesCount(citiesCount + 1);
          if (cities.length < rowsPerPage) {
            setCities((prevCity) => [...prevCity, response.data]);
          }
        });
    }
  };

  return (
    <div>
      <Dialog
        open={isActiveModal}
        onClose={handleClose}
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 535 } }}
        maxWidth="xs"
      >
        <DialogTitle>{editRecord ? 'Edit city' : 'Create city'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} direction="column">
            <Grid item xs={8}>
              <Formik
                initialValues={countryInitialValues}
                onSubmit={(values, { resetForm }) => {
                  handleSubmit(values);
                  resetForm({});
                  window.scrollTo(0, 0);
                }}
              >
                <Form>
                  <Container maxWidth="sm">
                    <FormikField
                      name="name"
                      label="Enter title"
                      required
                      type="text"
                      variant="standard"
                    />
                  </Container>
                  <DialogActions sx={{ justifyContent: 'space-between', padding: '8px 24px' }}>
                    <Button onClick={handleClose} color="error" variant="outlined">Cancel</Button>
                    <Button type="submit" color="success" variant="outlined">{editRecord ? 'Edit' : 'Create'}</Button>
                  </DialogActions>
                </Form>
              </Formik>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default createCityForm;
