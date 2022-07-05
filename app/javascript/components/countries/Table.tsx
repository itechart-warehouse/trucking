import * as React from 'react';

import {
  Paper, TablePagination,
  Box,
} from '@mui/material';
import { CountryTableProps } from '../../common/interfaces_types';
import httpClient from '../../api/httpClient';
import { CountriesField } from '../../constants/countriesField';

const CountryTable: React.FC<CountryTableProps> = (props: CountryTableProps) => {
  const {
    countries, countriesCount, setCountries, setCountriesCount,
    page, setPage, setRowsPerPage, rowsPerPage, handleEdit, handleChooseCountry,
  } = props;

  const handleChangePage = (event: unknown, newPage: number) => {
    httpClient.countries.getByPage(newPage, rowsPerPage.toString())
      .then((response) => {
        setCountries(response.data.countries);
        setPage(newPage);
      });
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

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
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
                  <th> NO DATA YET </th>
                </tr>
              )
              : countries
                .map((country) => (
                  <tr key={country.id}>
                    <th align="center" scope="country">{country.name}</th>
                    <th align="center" scope="country">
                      <button className="btn btn-outline-info" onClick={() => handleEdit(country)}>
                        edit
                      </button>
                    </th>
                    <th align="center" scope="country">
                      <button className="btn btn-outline-danger" onClick={() => handleDelete(country.id)}>
                        Delete
                      </button>
                    </th>
                    <th align="center" scope="country">
                      <button className="btn btn-outline-info" onClick={() => handleChooseCountry(country.id)}>
                        cities
                      </button>
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
