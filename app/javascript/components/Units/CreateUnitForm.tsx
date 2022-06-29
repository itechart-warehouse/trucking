import * as React from 'react';
import { Form, Formik, useFormikContext } from 'formik';

import {
  Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Button,
} from '@mui/material';

import FormikField from '../../UI/FormikField';
import { CreateUnitFormProps, Unit, } from '../../common/interfaces_types';
import httpClient from '../../api/httpClient';

const CreateUnitForm: React.FC<CreateUnitFormProps> = (props: CreateUnitFormProps) => {
  const {
    createModal, handleClose, formErrors, updateModal,
    measureUnitId, handleSubmit
  } = props;

  const UnitInitialValues: Unit = { id: undefined, name: '', short_name: '' };

  const LoadUnitData = ({ id }) => {
    const { setFieldValue } = useFormikContext();

    React.useEffect(() => {
      if (id) {
        httpClient.Unit.get(id).then(({ data }) => {
          Object.keys(data).forEach((filedName) => {
            setFieldValue(filedName, data[filedName], false);
          });
        });
      }
    }, [id]);
    return null;
  };

  return (
    <div>
      <Dialog
        open={createModal || updateModal}
        onClose={handleClose}
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 535 } }}
        maxWidth="xs"
      >
        <DialogTitle>Add measurement unit</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} direction="column">
            <Grid item xs={8}>
              <Formik
                initialValues={UnitInitialValues}
                onSubmit={(values, { resetForm }) => {
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
                      label="Enter full name"
                      required
                      type="text"
                      variant="standard"
                    />
                    <FormikField
                      name="short_name"
                      label="Enter short name"
                      required
                      type="text"
                      variant="standard"
                    />
                  </Container>
                  <DialogActions sx={{ justifyContent: 'space-between', padding: '8px 24px' }}>
                    <Button onClick={handleClose} color="error" variant="outlined">Cancel</Button>
                    <Button type="submit" color="success" variant="outlined">{updateModal ? 'Update' : 'Create'}</Button>
                  </DialogActions>

                  {updateModal
                    ? <LoadUnitData id={measureUnitId} />
                    : null}

                </Form>
              </Formik>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateUnitForm;
