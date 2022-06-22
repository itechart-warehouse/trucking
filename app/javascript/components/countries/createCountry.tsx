import * as React from 'react';
import { Form, Formik, FormikValues } from 'formik';

import {
  Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Button,
} from '@mui/material';

import FormikField from '../../UI/FormikField';
import { Country, CreateCountryFormProps } from '../../common/interfaces_types';
import httpClient from '../../api/httpClient';
import countries from '../countries';

const CreateCountryForm: React.FC<CreateCountryFormProps> = (props: CreateCountryFormProps) => {
  const {
    isActiveModal, handleClose, setCountry, setCountriesCount,
    rowsPerPage, countriesCount, editRecord, setEditRecord, country,
  } = props;

  const countryInitialValues: Country = { id: undefined, name: editRecord ? editRecord.name : '' };

  const handleSubmit = async (newCountry: FormikValues) => {
    if (editRecord) {
      await httpClient.countries.update(newCountry, editRecord.id).then(() => {
        const newCountries = country;
        newCountries.find((country) => editRecord.id === country.id).name = newCountry.name;
        setCountry(newCountries);
        setEditRecord(null);
        handleClose();
      });
    } else {
      await httpClient.countries.create(newCountry)
        .then((response) => {
          handleClose();
          setCountriesCount(countriesCount + 1);
          if (countries.length < rowsPerPage) {
            setCountry((prevCountry) => [...prevCountry, response.data]);
          }
        });
    }
  };

  return (
    <div>
      <Dialog
        open={isActiveModal}
        onClose={handleClose}
        sx={{ '& .MuiDialog-paper': { width: '100%', maxHeight: 535 } }}
        maxWidth="xs"
      >
        <DialogTitle>{editRecord ? 'edit country' : 'Create country'}</DialogTitle>
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
                    <Button type="submit" color="success" variant="outlined">{editRecord ? 'edit' : 'Create'}</Button>
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

export default CreateCountryForm;
