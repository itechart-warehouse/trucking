import * as React from 'react';

import { Button, Grid } from '@mui/material';
import { CountryFormProps, Country } from '../common/interfaces_types';
import CountryTable from './countries/Table';
import CreateCountryForm from './countries/CreateCountry';
import Search from './Search';
import httpClient from '../api/httpClient';

const CountryForm: React.FC<CountryFormProps> = (props: CountryFormProps) => {
  const { countries, totalCount } = props;

  const [countriesCount, setCountriesCount] = React.useState<number>(totalCount);
  const [country, setCountry] = React.useState<Country[]>(countries);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [page, setPage] = React.useState<number>(0);
  const [isActiveModal, setActiveModal] = React.useState<boolean>(false);
  const [editRecord, setEditRecord] = React.useState<Country>(null);

  const handleClose = () => {
    setActiveModal(false);
    setEditRecord(null);
  };

  const handleSearch = (text: string) => {
    if (text) {
      httpClient.countries.search(text, page, rowsPerPage)
        .then((response) => {
          setCountry(response.data.countries);
          setCountriesCount(response.data.total_count);
        });
    } else {
      httpClient.countries.getByPage(0, rowsPerPage)
        .then((response) => {
          setCountry(response.data.countries);
          setCountriesCount(response.data.total_count);
          setPage(0);
        });
    }
  };

  const handleEdit = (editRecord) => {
    setEditRecord(editRecord);
    setActiveModal(true);
  };

  return (
    <div className="wrapper">
      <Grid
        container
        rowSpacing={3}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        justifyContent="flex-end"
      >
        <Grid item md={2} style={{ textAlign: 'left' }}>
          <Search handleSubmit={handleSearch} />
        </Grid>
        <Grid item xs={1.75} style={{ textAlign: 'right' }}>
          <Button variant="contained" color="success" size="large" style={{ height: '51px' }} onClick={() => setActiveModal(true)}>
            Create country
          </Button>
        </Grid>
        <Grid item xs={12}>
          <CountryTable
            countries={country}
            setCountries={setCountry}
            countriesCount={countriesCount}
            setCountriesCount={setCountriesCount}
            page={page}
            rowsPerPage={rowsPerPage}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
            handleEdit={handleEdit}
          />
        </Grid>
      </Grid>

      <CreateCountryForm
        country={country}
        setCountriesCount={setCountriesCount}
        rowsPerPage={rowsPerPage}
        isActiveModal={isActiveModal}
        handleClose={handleClose}
        countriesCount={countriesCount}
        editRecord={editRecord}
        setEditRecord={setEditRecord}
        setCountry={setCountry}
      />
    </div>
  );
};

export default CountryForm;
