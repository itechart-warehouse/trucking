import * as React from 'react';

import { Button, Grid } from '@mui/material';
import { CountriesProps, Country } from '../common/interfaces_types';
import CountryTable from './countries/table';
import CreateCountryForm from './countries/createCountry';

const Countries: React.FC<CountriesProps> = (props: CountriesProps) => {
  const { countries, total_count } = props;

  const [countriesCount, setCountriesCount] = React.useState<number>(total_count);
  const [country, setCountry] = React.useState<Country[]>(countries);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [page, setPage] = React.useState<number>(0);
  const [isActiveModal, setActiveModal] = React.useState<boolean>(false);
  const [editRecord, setEditRecord] = React.useState<Country>(null);

  const handleClose = () => {
    setActiveModal(false);
    setEditRecord(null);
  };

  const handleEdit = (editRecord) => {
    setEditRecord(editRecord);
    setActiveModal(true);
  };

  return (
    <div className="wrapper">
      <Grid container spacing={2} sx={{ justifyContent: "end" }}>
        <Grid item xs={6}>
          <Button variant="contained" color="success" size="large" style={{ height: '51px' }} onClick={() => setActiveModal(true)}>
            Create country
          </Button>
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

    </div>
  );
};

export default Countries;
