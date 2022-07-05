import * as React from 'react';

import { Box, Button, Grid } from '@mui/material';
import { CountryFormProps, Country, City } from '../common/interfaces_types';
import CountryTable from './countries/Table';
import CreateCountryForm from './countries/CreateCountry';
import Search from './Search';
import httpClient from '../api/httpClient';
import CityTable from './city/Table';

const CountryForm: React.FC<CountryFormProps> = (props: CountryFormProps) => {
  const { countries, totalCount } = props;

  const [cities, setCities] = React.useState<City[]>(null);
  const [citiesCount, setCitiesCount] = React.useState<number>(5);
  const [countriesCount, setCountriesCount] = React.useState<number>(totalCount);
  const [country, setCountry] = React.useState<Country[]>(countries);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [page, setPage] = React.useState<number>(0);
  const [isActiveModal, setActiveModal] = React.useState<boolean>(false);
  const [editRecord, setEditRecord] = React.useState<Country>(null);
  const [isActiveModalCreate, setActiveModalCreate] = React.useState<boolean>(false);
  const [countryId, setCountryId] = React.useState<number>(countries[0].id);
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

  const handleChooseCountry = (id: number) => {
    setCountryId(id);
    httpClient.cities
      .getByPage(id, page, rowsPerPage)
      .then((response) => {
        setCities(response.data.cities);
        setCitiesCount(response.data.total_count);
      });
  };

  return (
    <div className="wrapper">
      <Box sx={{
        flexGrow: 1, display: 'flex', rowGap: '20px', flexDirection: 'column', maxWidth: '66%',
      }}
      >
        <Grid
          container
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          justifyContent="flex-end"
        >
          <Grid item md={2} style={{ textAlign: 'left' }}>
            <Search handleSubmit={handleSearch} label="country" />
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Grid item xs={1.75} style={{ textAlign: 'right' }}>
              <button className="btn btn-success" onClick={() => setActiveModal(true)}>
                Create country
              </button>
              </Grid>
              <CountryTable
                countries={country}
                setCountries={setCountry}
                countriesCount={countriesCount}
                setCountriesCount={setCountriesCount}
                page={page}
                rowsPerPage={rowsPerPage}
                setPage={setPage}
                setRowsPerPage={setRowsPerPage}
                handleChooseCountry={handleChooseCountry}
                handleEdit={handleEdit}
              />
            </Grid>
            <Grid item xs={6}>
              <Grid item xs={1.75} style={{ textAlign: 'right' }}>
              <button className="btn btn-success" onClick={() => setActiveModalCreate(true)}>
                Create city
              </button>
              </Grid>
              <CityTable
                isActiveModalCreate={isActiveModalCreate}
                setActiveModalCreate={setActiveModalCreate}
                cities={cities}
                setCities={setCities}
                citiesCount={citiesCount}
                setCitiesCount={setCitiesCount}
                countryId={countryId}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
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
