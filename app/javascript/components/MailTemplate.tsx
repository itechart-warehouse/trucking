import * as React from 'react';
import { Box, Grid, Button } from '@mui/material';
import { useState } from 'react';
import MailTemplateTable from './MailTemplate/MailTemplateTable';
import SiteAlerts from './Alert';
import { Alert, MailTemplate, MailTemplateProps } from '../common/interfaces_types';
import Search from './Search';
import CreateMailTemplateForm from './MailTemplate/CreateMailTemplateForm';
import httpClient from '../api/httpClient';

const MailTemplates: React.FC<MailTemplateProps> = (props: MailTemplateProps) => {
  const { templatesJSON, templatesCount } = props;
  const [isActiveModal, setModalActive] = React.useState<boolean>(false);
  const [formErrors, setFormErrors] = React.useState<string[]>([]);
  const [templates, setTemplates] = React.useState<MailTemplate[]>(JSON.parse(templatesJSON));
  const [alertData, setAlertData] = React.useState<Alert>({ alertType: null, alertText: '', open: false });
  const [templateCount, setTemplateCount] = useState<number>(templatesCount);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [page, setPage] = React.useState<number>(0);

  const handleClose = () => {
    setModalActive(false);
    setFormErrors(null);
  };

  const handleSubmit = async (template) => {
    await httpClient.mailTemplates.create(template)
      .then((response) => {
        setTemplates((prevTemplate) => [...prevTemplate, response.data]);
        setModalActive(false);
        setAlertData({ alertType: 'success', alertText: 'Successfully created a mail template!', open: true });
        handleClose();
      })
      .catch((error) => {
        setFormErrors(error.response.data);
        setAlertData({ alertType: 'error', alertText: 'Something went wrong with creating a mail template', open: true });
      });
  };

  const handleSearch = (text: string) => {
    if (text) {
      httpClient.mailTemplates.search(0, rowsPerPage.toString(), text)
        .then((response) => {
          setTemplates(JSON.parse(response.data.templates));
          setTemplateCount(response.data.total_count);
        });
    } else {
      httpClient.mailTemplates.getAll(0, rowsPerPage.toString())
        .then((response) => {
          setTemplates(JSON.parse(response.data.templates));
          setTemplateCount(response.data.total_count);
          setPage(0);
        });
    }
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
            <Search handleSubmit={handleSearch} />
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
              templateCount={templateCount}
              setTemplateCount={setTemplateCount}
              setPage={setPage}
              page={page}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
            />
          </Grid>
        </Grid>
      </Box>
      <CreateMailTemplateForm
        isActiveModal={isActiveModal}
        handleClose={handleClose}
        formErrors={formErrors}
        handleSubmit={handleSubmit}
      />
      <SiteAlerts alertData={alertData} setAlertData={setAlertData} />
    </div>
  );
};

export default MailTemplates;
