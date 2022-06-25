import * as React from 'react';
import { Form, Formik } from 'formik';
import {
  Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Button,
} from '@mui/material';
import FormikField from '../../UI/FormikField';
import FormikActionText from '../../UI/FormikActionText';
import { CreateMailTemplateFormProps } from '../../common/interfaces_types';
import { mailTemplateInitialValues } from '../../initialValues/mailTemplateInitialValues';

const CreateMailTemplateForm:
  React.FC<CreateMailTemplateFormProps> = (props: CreateMailTemplateFormProps) => {
    const {
      isActiveModal, handleClose, formErrors, handleSubmit,
    } = props;

    return (
      <div>
        <Dialog
          open={isActiveModal}
          onClose={handleClose}
          sx={{ '& .MuiDialog-paper': { width: '100%', maxHeight: 535 } }}
          maxWidth="md"
        >
          <DialogTitle>Add Mail Template</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} direction="column">
              <Grid item xs={8}>
                <Formik
                  initialValues={mailTemplateInitialValues}
                  onSubmit={handleSubmit}
                >
                  <Form>
                    <Container maxWidth="sm">
                      {formErrors ? <p className="error-msg">{formErrors}</p> : null}
                      <FormikField
                        name="name"
                        label="Enter name"
                        required
                        type="text"
                        variant="standard"
                      />
                      <FormikActionText
                        name="content"
                        label="Enter content"
                        required
                        type="text"
                        variant="standard"
                      />
                    </Container>
                    <DialogActions
                      sx={{ justifyContent: 'space-between', padding: '8px 24px' }}
                    >
                      <Button onClick={handleClose} color="error" variant="outlined">
                        Cancel
                      </Button>
                      <Button type="submit" color="success" variant="outlined">
                        Create
                      </Button>
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

export default CreateMailTemplateForm;
