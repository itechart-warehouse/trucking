import * as React from 'react';

import {
  TableContainer, Paper, TablePagination,
  Box, Button,
} from '@mui/material';
import { useEffect } from 'react';
import httpClient from '../../api/httpClient';
import { City, CityTableProps } from '../../common/interfaces_types';
import { citiesFields } from '../../constants/citiesFields';
import CreateCity from './CreateCity';

const CityTable: React.FC<CityTableProps> = (props: CityTableProps) => {
  const {
    countryId, cities, setCities, citiesCount, setCitiesCount,
    isActiveModalCreate, setActiveModalCreate,
  } = props;

  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [page, setPage] = React.useState<number>(0);
  const [editRecord, setEditRecord] = React.useState<City>(null);

  useEffect(() => {
    httpClient.cities
      .getByPage(countryId, page, rowsPerPage)
      .then((response) => {
        setCities(response.data.cities);
        setCitiesCount(response.data.total_count);
      });
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    httpClient.cities.getByPage(countryId, newPage, rowsPerPage)
      .then((response) => {
        setCities(response.data.cities);
        setPage(newPage);
      });
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    httpClient.cities.getByPage(countryId, page, event.target.value)
      .then((response) => setCities(response.data.cities))
      .then(() => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      });
  };
  const handleCreateClose = () => {
    setActiveModalCreate(false);
    setEditRecord(null);
  };

  const handleEdit = (newEditRecord) => {
    setEditRecord(newEditRecord);
    setActiveModalCreate(true);
  };

  const handleDelete = (id) => {
    httpClient.cities.delete(countryId, id).then(() => {
      httpClient.cities.getByPage(countryId, page, rowsPerPage).then((response) => {
        setCities(response.data.cities);
        setCitiesCount(response.data.total_count);
      });
    });
  };

  return (
    <Box sx={{ width: '100%' }}>
      <CreateCity
        countryId={countryId}
        cities={cities}
        setEditRecord={setEditRecord}
        setCities={setCities}
        setCitiesCount={setCitiesCount}
        rowsPerPage={rowsPerPage}
        isActiveModal={isActiveModalCreate}
        handleClose={handleCreateClose}
        citiesCount={citiesCount}
        editRecord={editRecord}
      />
      <Paper sx={{ width: '100%', mb: 2 }}>
          <table
            className="table table-hover"
          >
            <thead>
              <tr>
                {citiesFields.map((cell) => (
                  <th key={cell.id} align="center">{cell.title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!cities || cities.length === 0
                ? (
                  <tr>
                    <th> NO DATA YET </th>
                  </tr>
                )
                : cities
                  .map((city) => (
                    <tr key={city.id}>
                      <th align="center" scope="company">{city.name}</th>
                      <th align="center" scope="company">
                        <button className="btn btn-outline-info" onClick={() => handleEdit(city)}>
                          edit
                        </button>
                      </th>
                      <th align="center" scope="company">
                        <button className="btn btn-success" onClick={() => handleDelete(city.id)}>
                          Delete
                        </button>
                      </th>
                    </tr>
                  ))}
            </tbody>
          </table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={citiesCount}
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

export default CityTable;
