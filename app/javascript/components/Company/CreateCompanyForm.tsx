import * as React from 'react';
import { Form, Formik } from 'formik';

import {
  Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Button,
} from '@mui/material';

import FormikField from '../../UI/FormikField';
import { Company, CreateCompanyFormProps } from '../../common/interfaces_types';
import httpClient from '../../api/httpClient';

const CreateCompanyForm: React.FC<CreateCompanyFormProps> = (props: CreateCompanyFormProps) => {
  const {
    isActiveModal, handleClose, setCompany, setFormErrors, formErrors, setAlertData, companyCount, setCompanyCount,
    companies, rowsPerPage,
  } = props;

  const companyInitialValues: Company = { id: undefined, name: '', is_suspended: false };

  const handleSubmit = async (company: Company) => {
    await httpClient.companies.create(company)
      .then((response) => {
        handleClose();
        // TODO: cast type
        if (companies.length < rowsPerPage) {
          setCompany((prevCompany) => [...prevCompany, response.data]);
        }
        setAlertData({ alertType: 'success', alertText: 'Successfully created a company!', open: true });
        setCompanyCount(companyCount + 1);
      })
      .catch((error) => {
        setFormErrors(error.response.data);
        setAlertData({ alertType: 'error', alertText: 'Something went wrong with creating a company', open: true });
      });
  };

  return (
    <div>
      <Dialog
        open={isActiveModal}
        onClose={handleClose}
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 535 } }}
        maxWidth="xs"
      >
        <DialogTitle>Add Company</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} direction="column">
            <Grid item xs={8}>
              <Formik
                initialValues={companyInitialValues}
                onSubmit={(values, {resetForm}) => {
                  handleSubmit(values);
                  resetForm({});
                  window.scrollTo(0, 0);
                }}
              >
                <Form>
                  <Container maxWidth="sm">
                    {formErrors ? <p className="error-msg">{formErrors}</p> : null}
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
                    <Button type="submit" color="success" variant="outlined">Create</Button>
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

export default CreateCompanyForm;
