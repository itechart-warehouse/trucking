import * as React from 'react';
import { Form, Formik, useFormikContext } from 'formik';

import {
  Autocomplete, Container, Dialog, DialogActions, Button,
  DialogContent, DialogTitle, Grid, TextField, Box,
} from '@mui/material';

import FormikField from '../../../UI/FormikField';
import { userFields, userFirstFields, userSecondFields } from '../../../constants/userFields';
import httpClient from '../../../api/httpClient';
import userInitialValues from '../../../initialValues/userInitialValues';
import userValidation from '../../../mixins/validation_schema/user';
import { Company, Role, UserCreateFormProps } from '../../../common/interfaces_types';

const CreateForm: React.FC<UserCreateFormProps> = (props: UserCreateFormProps) => {
  const {
    createModal, updateModal, handleClose, handleSubmit, editUserModal, title, btnTitle,
    formErrors, roles, companies,
  } = props;

  const LoadUserData = ({ id }) => {
    const { setFieldValue } = useFormikContext();

    // TODO: probably it is possible to load data
    // from front-end instead of requesting back-end
    React.useEffect(() => {
      if (id) {
        httpClient.users.get(id).then(({ data }) => {
          Object.keys(data).forEach((filedName) => {
            setFieldValue(filedName, data[filedName], false);
          });
          setFieldValue('town', data.address.town, false);
          setFieldValue('street', data.address.street, false);
          setFieldValue('building', data.address.building, false);
          setFieldValue('apartment', data.address.apartment, false);
          // TODO: Autocomplete field set value
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
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 735 } }}
        maxWidth="xs"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} direction="column">
            <Grid item xs={8}>
              <Formik
                initialValues={userInitialValues}
                validationSchema={userValidation}
                onSubmit={(values, { resetForm }) => {
                  handleSubmit(values);
                  resetForm({});
                  window.scrollTo(0, 0);
                }}
              >
                {({
                  dirty, isValid, handleChange, values,
                }) => (
                  <Form>
                    <Container maxWidth="sm">
                      {formErrors ? <p className="error-msg">{formErrors}</p> : null}
                      {userFields.map((column) => (
                        <FormikField
                          key={column.id}
                          name={column.model}
                          label={column.placeholder}
                          required={column.required}
                          type={column.type}
                          variant="standard"
                        />
                      ))}
                      <div style={{ width: '100%', display: 'flex' }}>
                        <Box
                          component="div"
                          display="flex"
                          flexDirection="row"
                          columnGap="15px"
                          bgcolor="background.paper"
                        >
                          {userFirstFields.map((column) => (
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
                      </div>
                      <div style={{ width: '100%', display: 'flex' }}>
                        <Box
                          component="div"
                          display="flex"
                          flexDirection="row"
                          columnGap="15px"
                          bgcolor="background.paper"
                        >
                          {userSecondFields.map((column) => (
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
                      </div>

                      {createModal
                        ? (
                          <Autocomplete
                            id="company"
                            options={companies}
                            getOptionLabel={(option: Company) => option.name}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                onSelect={handleChange}
                                margin="normal"
                                label="Company"
                                fullWidth
                                value={values?.company}
                              />
                            )}
                          />
                        )
                        : null}

                      <Autocomplete
                        id="role"
                        options={roles}
                        getOptionLabel={(option: Role) => option.role_name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            onSelect={handleChange}
                            margin="normal"
                            label="Role"
                            fullWidth
                            value={values?.role}
                            required
                          />
                        )}
                      />

                    </Container>

                    <DialogActions sx={{ justifyContent: 'space-between', padding: '8px 24px' }}>
                      <Button onClick={handleClose} color="error" variant="outlined">Cancel</Button>
                      <Button type="submit" disabled={!dirty || !isValid} color="success" variant="outlined">{btnTitle}</Button>
                    </DialogActions>

                    {updateModal
                      ? <LoadUserData id={editUserModal} />
                      : null}

                  </Form>
                )}
              </Formik>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateForm;
