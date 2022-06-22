import * as React from 'react';
import { useState } from 'react';

import { Box, Grid, Button } from '@mui/material';

import CompanyTable from './Company/CompanyTable';
import CreateCompanyForm from './Company/CreateCompanyForm';
import SiteAlerts from './Alert';
import { Alert, Company, CompanyProps } from '../common/interfaces_types';
import Search from './Search';
import httpClient from '../api/httpClient';

const Companies: React.FC<CompanyProps> = (props: CompanyProps) => {
  const { currentUserRole, companiesJSON, companiesCount } = props;
  const [companyCount, setCompanyCount] = useState<number>(companiesCount);
  const [isActiveModal, setModalActive] = useState<boolean>(false);
  const [companies, setCompany] = React.useState<Company[]>(JSON.parse(companiesJSON));
  const [formErrors, setFormErrors] = React.useState<string[]>([]);
  const [alertData, setAlertData] = React.useState<Alert>({ alertType: null, alertText: '', open: false });
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [page, setPage] = React.useState<number>(0);

  const handleClose = () => {
    setModalActive(false);
    setFormErrors(null);
  };

  const handleSearch = (text: string) => {
    if (text) {
      httpClient.companies.search(0, rowsPerPage.toString(), text)
        .then((response) => {
          setCompany(JSON.parse(response.data.companies));
          setCompanyCount(response.data.total_count);
        });
    } else {
      httpClient.companies.getAll(0, rowsPerPage.toString())
        .then((response) => {
          setCompany(JSON.parse(response.data.companies));
          setCompanyCount(response.data.total_count);
          setPage(0);
        });
    }
  };

  const changeCompanyStatus = (id: number, alertText: string) => {
    httpClient.companies.updateStatus(id).then((response) => {
      const companyIndex = companies.findIndex((element) => element.id === id);
      companies[companyIndex] = response.data;
      setCompany(companies);

      setAlertData({
        alertType: 'info',
        alertText: `Company successfully ${alertText}`,
        open: true,
      });
    });
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
          {currentUserRole === 'system administrator'
            ? (
              <Grid item xs={1.75} style={{ textAlign: 'right' }}>
                <Button variant="contained" color="success" size="large" style={{ height: '51px' }} onClick={() => setModalActive(true)}>
                  Create Company
                </Button>
              </Grid>
            )
            : null}

          <Grid item xs={12}>
            <CompanyTable
              setPage={setPage}
              page={page}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              companies={companies}
              setCompany={setCompany}
              setAlertData={setAlertData}
              changeCompanyStatus={changeCompanyStatus}
              companyCount={companyCount}
              setCompanyCount={setCompanyCount}
            />
          </Grid>
        </Grid>
      </Box>
      <CreateCompanyForm
        companies={companies}
        rowsPerPage={rowsPerPage}
        companyCount={companyCount}
        setCompanyCount={setCompanyCount}
        isActiveModal={isActiveModal}
        handleClose={handleClose}
        setCompany={setCompany}
        formErrors={formErrors}
        setFormErrors={setFormErrors}
        setAlertData={setAlertData}
      />
      <SiteAlerts alertData={alertData} setAlertData={setAlertData} />
    </div>
  );
};

export default Companies;
