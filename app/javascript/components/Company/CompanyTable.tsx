import * as React from 'react';

import {
  Table, TableBody, TableRow, TableContainer, TableHead, Paper, Button,
} from '@mui/material';

import httpClient from '../../api/httpClient';
import { StyledTableCell, StyledTableRow } from '../../utils/style';
import { CompanyTableProps } from '../../common/interfaces_types';

const CompanyTable: React.FC<CompanyTableProps> = (props: CompanyTableProps) => {
  const {
    companies, setCompany, setAlertData, searchData,
  } = props;
  const componentMounted = React.useRef(true);

  React.useEffect(() => {
    httpClient.companies.getCompanies()
      .then((response) => {
        if (componentMounted.current) setCompany(response.data);
      });
    return () => {
      componentMounted.current = false;
    };
  }, []);

  // NOTE: updating companies this way isn't good
  // We dont need to fetch all companies when we performing action to a single one
  const updateData = () => {
    httpClient.companies.getCompanies().then((response) => setCompany(response.data));
  };

  const deleteCompany = (id) => {
    httpClient.companies.delete(id).then(() => updateData());
    setAlertData({
      alertType: 'success',
      alertText: 'Company successfully deleted!',
      open: true,
    });
  };

  const suspendCompany = (id) => {
    httpClient.companies.suspend(id).then(() => updateData());
    setAlertData({
      alertType: 'info',
      alertText: 'Company successfully suspended',
      open: true,
    });
  };

  const resumeCompany = (id) => {
    httpClient.companies.resume(id).then(() => updateData());
    setAlertData({
      alertType: 'info',
      alertText: 'Company successfully resumed',
      open: true,
    });
  };
  const companiesData = searchData || companies;
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name&nbsp;</StyledTableCell>
              <StyledTableCell align="right" colSpan={1} style={{ width: '30%' }}>Action&nbsp;</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!companies
              ? (
                <TableRow>
                  <StyledTableCell>No data yet ...</StyledTableCell>
                </TableRow>
              )
              : companiesData.map((company) => (
                <StyledTableRow key={company.name}>
                  <StyledTableCell component="th" scope="company">{company.name}</StyledTableCell>
                  <StyledTableCell align="right" style={{ width: '30%' }}>
                    <Button
                      variant="outlined"
                      color="warning"
                      onClick={() => (company.is_suspended
                        ? resumeCompany(company.id) : suspendCompany(company.id))}
                      style={{ marginRight: '10px' }}
                    >
                      {company.is_suspended ? 'resume' : 'suspend'}
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => deleteCompany(company.id)}>
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CompanyTable;
