import * as React from 'react';

import {
  Table, TableBody, TableRow, TableContainer, TableHead, Paper, Button, CircularProgress, TablePagination,
} from '@mui/material';

import httpClient from '../../api/httpClient';
import { StyledTableCell, StyledTableRow } from '../../utils/style';
import { CompanyTableProps } from '../../common/interfaces_types';

const CompanyTable: React.FC<CompanyTableProps> = (props: CompanyTableProps) => {
  const {
    companies, setCompany, setAlertData, changeCompanyStatus, companyCount,
    setCompanyCount, setRowsPerPage, rowsPerPage, setPage, page,
  } = props;

  const handleChangePage = (event: unknown, newPage: number) => {
    httpClient.companies.getAll(newPage, rowsPerPage.toString())
      .then((response) => {
        setCompany(JSON.parse(response.data.companies));
        setPage(newPage);
      });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    httpClient.companies.getAll(0, event.target.value)
      .then((response) => setCompany(JSON.parse(response.data.companies)))
      .then(() => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      });
  };

  const deleteCompany = (id) => {
    httpClient.companies.delete(id).then(() => {
      setCompany(companies.filter((company) => id !== company.id));
      httpClient.companies.getAll(page, rowsPerPage.toString())
        .then((response) => setCompany(response.data))
        .then(() => setCompanyCount(companyCount - 1));
      httpClient.companies.getAll(page)
        .then((response) => setCompany(JSON.parse(response.data.companies)));
    });
    setAlertData({ alertType: 'success', alertText: 'Company successfully deleted!', open: true });
  };

  return (
    <div>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name&nbsp;</StyledTableCell>
                <StyledTableCell align="center" style={{ width: '22%' }}>Action&nbsp;</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!companies
                ? (
                  <TableRow>
                    <StyledTableCell><CircularProgress color="primary" /></StyledTableCell>
                  </TableRow>
                )
                : companies.map((company) => (
                  <StyledTableRow key={company.id}>
                    <StyledTableCell scope="company">{company.name}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="outlined"
                        color="warning"
                        onClick={() => (company.is_suspended
                          ? changeCompanyStatus(company.id, 'resumed') : changeCompanyStatus(company.id, 'suspended'))}
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={companyCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default CompanyTable;
