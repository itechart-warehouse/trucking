import * as React from 'react';

import {
  Table, TableBody, TableRow, TableContainer, TableHead, Paper, TablePagination,
  Box, CircularProgress, Button,
} from '@mui/material';
import { City, CountryTableProps } from '../../common/interfaces_types';
import httpClient from '../../api/httpClient';
import { StyledTableCell, StyledTableRow } from '../../utils/style';
import { CountriesField } from '../../constants/countriesField';
import CityTable from '../city/table';

const CountryTable: React.FC<CountryTableProps> = (props: CountryTableProps) => {
  const {
    countries, countriesCount, setCountries, setCountriesCount,
    page, setPage, setRowsPerPage, rowsPerPage, handleEdit,
  } = props;

  const [citiesCount, setCitiesCount] = React.useState<number>();
  const [cities, setCities] = React.useState<City[]>();
  const [isActiveModal, setActiveModal] = React.useState<boolean>(false);
  const [countryId, setcountryId] = React.useState<number>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    httpClient.countries.getByPage(newPage, rowsPerPage.toString())
      .then((response) => {
        setCountries(response.data.countries);
        setPage(newPage);
      });
  };

  const handleCloseCities = () => {
    setActiveModal(false);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    httpClient.countries.getByPage(0, event.target.value)
      .then((response) => setCountries(response.data.countries))
      .then(() => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      });
  };

  const handleDelete = (id) => {
    httpClient.countries.delete(id).then(() => {
      httpClient.countries.getByPage(page, rowsPerPage).then((response) => {
        setCountries(response.data.countries);
      });
    });
  };
  const handleOpen = (id) => {
    setcountryId(id);
    httpClient.cities.getByPage(id, 0, 5).then((response) => {
      setCities(response.data.cities);
      setCitiesCount(response.data.total_count);
    });
    setActiveModal(true);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <CityTable
        countryId={countryId}
        isActiveModal={isActiveModal}
        handleClose={handleCloseCities}
        setCities={setCities}
        setCitiesCount={setCitiesCount}
        cities={cities}
        citiesCount={citiesCount}
      />
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer component={Paper}>
          <Table
            sx={{ width: '100%' }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                {CountriesField.map((cell) => (
                  <StyledTableCell key={cell.id} align="center">{cell.title}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {!countries
                ? (
                  <TableRow>
                    <StyledTableCell><CircularProgress color="primary" /></StyledTableCell>
                  </TableRow>
                )
                : countries
                  .map((country) => (
                    <StyledTableRow key={country.id}>
                      <StyledTableCell align="center" scope="company">{country.name}</StyledTableCell>
                      <StyledTableCell align="center" scope="company">
                        <Button variant="outlined" color="info" onClick={() => handleEdit(country)}>
                          edit
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell align="center" scope="company">
                        <Button variant="outlined" color="error" onClick={() => handleDelete(country.id)}>
                          Delete
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell align="center" scope="company">
                        <Button variant="outlined" color="info" onClick={() => handleOpen(country.id)}>
                          cities
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
          count={countriesCount}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <div />
    </Box>
  );
};

export default CountryTable;
