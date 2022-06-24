import * as React from 'react';

import { Button, Grid } from '@mui/material';
import { CountriesProps, Country } from '../common/interfaces_types';
import CountryTable from './countries/Table';
import CreateCountryForm from './countries/CreateCountry';

const Countries: React.FC<CountriesProps> = (props: CountriesProps) => {
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

export default Countries;
