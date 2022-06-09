import * as React from 'react';
import { useState } from 'react';

import { Box, Grid, Button } from '@mui/material';

import MailTemplateTable from './MailTemplate/MailTemplateTable';
import SiteAlerts from './Alert';
import { Alert, MailTemplate, MailTemplateProps } from '../common/interfaces_types';
import Search from './Search';
import CreateMailTemplateForm from './MailTemplate/CreateMailTemplateForm';

const MailTemplates = ({ templatesJSON }: MailTemplateProps) => {
  const [isActiveModal, setModalActive] = useState<boolean>(false);
  const [formErrors, setFormErrors] = React.useState<string[]>([]);
  const [templates, setTemplates] = React.useState<MailTemplate[]>(JSON.parse(templatesJSON) || []);
  const [alertData, setAlertData] = React.useState<Alert>({ alertType: null, alertText: '', open: false });

  const handleClose = () => {
    setModalActive(false);
    setFormErrors(null);
  };

  return (
    <div className="wrapper">
      <Box sx={{
        flexGrow: 1, display: 'flex', flexDirection: 'column', maxWidth: '66%',
      }}
      >
        <Grid
          container
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          justifyContent="flex-end"
        >
          <Grid item md={3} style={{ textAlign: 'left' }}>
            <Search Data={"templates"} keyField="" />
          </Grid>
          <Grid item xs={1.75} style={{ textAlign: 'right' }}>
            <Button variant="contained" color="success" size="large" style={{ height: '51px' }} onClick={() => setModalActive(true)}>
              Create Template
            </Button>
          </Grid>

          <Grid item xs={12}>
            <MailTemplateTable
              templates={templates}
              setTemplate={setTemplates}
              setAlertData={setAlertData}
            />
          </Grid>
        </Grid>
      </Box>
      <CreateMailTemplateForm
        isActiveModal={isActiveModal}
        handleClose={handleClose}
        setTemplate={setTemplates}
        formErrors={formErrors}
        setFormErrors={setFormErrors}
        setAlertData={setAlertData}
      />
      <SiteAlerts alertData={alertData} setAlertData={setAlertData} />
    </div>
  );
};

export default MailTemplates;
