import * as React from "react";
import { Form, Formik } from "formik";

import {
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Button,
} from "@mui/material";

import FormikField from "../../UI/FormikField";
import FormikActionText from "../../UI/FormikActionText";
import {
  MailTemplate,
  CreateMailTemplateFormProps,
} from "../../common/interfaces_types";
import httpClient from "../../api/httpClient";

const CreateMailTemplateForm = ({
  isActiveModal,
  handleClose,
  setTemplate,
  setFormErrors,
  formErrors,
  setAlertData,
}: CreateMailTemplateFormProps) => {
  const mailTemplateInitialValues: MailTemplate = {
    id: undefined,
    name: "",
    content: "",
  };

  const handleSubmit = async (template: MailTemplate) => {
    await httpClient.mailTemplates
      .create(template)
      .then((response) => {
        handleClose();
        setTemplate((prevTemplate) => [...prevTemplate, response.data]);
        setAlertData({
          alertType: "success",
          alertText: "Successfully created a mail template!",
          open: true,
        });
      })
      .catch((error) => {
        setFormErrors(error.response.data);
        setAlertData({
          alertType: "error",
          alertText: "Something went wrong with creating a mail template",
          open: true,
        });
      });
  };

  return (
    <div>
      <Dialog
        open={isActiveModal}
        onClose={handleClose}
        sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 535 } }}
        maxWidth="xs"
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
                    {formErrors ? (
                      <p className="error-msg">{formErrors}</p>
                    ) : null}
                    <FormikField
                      name="name"
                      label="Enter name"
                      required
                      type="text"
                      variant="standard"
                    />
                    <FormikField
                      name="content"
                      label="Enter content"
                      required
                      type="text"
                      variant="standard"
                    />
                  </Container>
                  <DialogActions
                    sx={{
                      justifyContent: "space-between",
                      padding: "8px 24px",
                    }}
                  >
                    <Button
                      onClick={handleClose}
                      color="error"
                      variant="outlined"
                    >
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
