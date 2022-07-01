import * as React from 'react';

import {
  Table, TableBody, TableRow, TableContainer, TableHead, Paper, TablePagination,
  Box, CircularProgress, Button,
} from '@mui/material';
import { City, CountryTableProps } from '../../common/interfaces_types';
import httpClient from '../../api/httpClient';
import { StyledTableCell, StyledTableRow } from '../../utils/style';
import { CountriesField } from '../../constants/countriesField';
import CityTable from '../city/Table';

const CountryTable: React.FC<CountryTableProps> = (props: CountryTableProps) => {
  const {
    countries, countriesCount, setCountries, setCountriesCount,
    page, setPage, setRowsPerPage, rowsPerPage, handleEdit,
  } = props;

  const [citiesCount, setCitiesCount] = React.useState<number>(0);
  const [cities, setCities] = React.useState<City[]>(null);
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
        setCountriesCount(response.data.total_count);
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
      <Paper sx={{ width: '100%', mb: 2 }}>
        <CityTable
          countryId={countryId}
          isActiveModal={isActiveModal}
          handleClose={handleCloseCities}
          setCities={setCities}
          setCitiesCount={setCitiesCount}
          cities={cities}
          citiesCount={citiesCount}
        />
          <table
            className="table table-hover"
          >
            <thead>
              <tr>
                {CountriesField.map((cell) => (
                  <th key={cell.id} align="center">{cell.title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!countries || countries.length === 0
                ? (
                  <tr>
                    <StyledTableCell><CircularProgress color="primary" /></StyledTableCell>
                  </tr>
                )
                : countries
                  .map((country) => (
                    <tr key={country.id}>
                      <th align="center" scope="company">{country.name}</th>
                      <th align="center" scope="company">
                        <Button variant="outlined" color="info" onClick={() => handleEdit(country)}>
                          edit
                        </Button>
                      </th>
                      <th align="center" scope="company">
                        <Button variant="outlined" color="error" onClick={() => handleDelete(country.id)}>
                          Delete
                        </Button>
                      </th>
                      <th align="center" scope="company">
                        <Button variant="outlined" color="info" onClick={() => handleOpen(country.id)}>
                          cities
                        </Button>
                      </th>
                    </tr>
                  ))}
            </tbody>
          </table>
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
