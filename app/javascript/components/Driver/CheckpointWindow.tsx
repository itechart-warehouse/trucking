import * as React from 'react';
import { Form, Formik } from 'formik';

import {
  Button, DialogTitle, DialogContent, Dialog, Typography,
} from '@mui/material';

import httpClient from '../../api/httpClient';
import FormikField from '../../UI/FormikField';
import { CheckpointWindowFormProps } from '../../common/interfaces_types';

const CheckpointWindow:
  React.FC<CheckpointWindowFormProps> = (props: CheckpointWindowFormProps) => {
    const {
      wayID, id, status, currentUserRole, update_checkpoint_status, setAlertText, alertSetOpen, setAlertType,
    } = props;
    const [isActiveModal, setActiveModal] = React.useState(false);

    const handleClose = () => setActiveModal(false);

    const statusChange = () => {
      if (status) {
        httpClient.route.rollback({ ids: id }).then(() => {
          update_checkpoint_status(wayID);
          handleClose();
        });
      } else setActiveModal(true);
    };
    const handleSubmit = (values) => {
      Object.assign(values, { ids: id });
      httpClient.route.passCh(values)
        .then(() => {
          update_checkpoint_status(wayID);
          setAlertType('success');
          setAlertText('Successfully passed checkpoint!');
          alertSetOpen(true);
          setTimeout(() => {
            alertSetOpen(false);
          }, 5000);
        });
    };

    return (
      <>
        <Button
          onClick={() => statusChange()}
          disabled={!(currentUserRole === 'driver')}
        >
          {status ? 'rollback' : 'pass'}
        </Button>
        <Dialog
          open={isActiveModal}
          onClose={handleClose}
          sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 535 } }}
          maxWidth="xs"
        >
          <DialogTitle>checkpoint</DialogTitle>
          <DialogContent>
            <Formik
              initialValues={{ pass_date: '' }}
              onSubmit={handleSubmit}
            >
              <Form>
                <Typography>Pass date</Typography>
                <FormikField
                  name="pass_date"
                  required
                  label=""
                  type="date"
                  variant="standard"
                />
                <Button type="submit" onClick={handleClose}>save</Button>
              </Form>
            </Formik>
          </DialogContent>
        </Dialog>
      </>
    );
  };

export default CheckpointWindow;