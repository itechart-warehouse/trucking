import * as React from 'react';

import {
  Table, TableBody, TableRow, TableContainer, TableHead, Paper, TablePagination,
  Box, CircularProgress, Button, Dialog,
} from '@mui/material';
import httpClient from '../../api/httpClient';
import { StyledTableCell, StyledTableRow } from '../../utils/style';
import { City, CityTableProps } from '../../common/interfaces_types';
import { citiesFields } from '../../constants/citiesFields';
import CreateCity from './createCity';

const CityTable: React.FC<CityTableProps> = (props: CityTableProps) => {
  const {
    countryId, handleClose, isActiveModal, setCities,
    setCitiesCount, citiesCount, cities,
  } = props;

  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [page, setPage] = React.useState<number>(0);
  const [isActiveModalCreate, setActiveModalCreate] = React.useState<boolean>(false);
  const [editRecord, setEditRecord] = React.useState<City>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    httpClient.cities.getByPage(countryId, newPage, rowsPerPage)
      .then((response) => {
        setCities(response.data.cities);
        setPage(newPage);
      });
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    httpClient.cities.getByPage(countryId, page, event)
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
      <Dialog
        maxWidth="lg"
        open={isActiveModal}
        onClose={handleClose}
        sx={{ '& .MuiDialog-paper': { width: '100%', maxHeight: 535 } }}
      >
        <Button onClick={() => setActiveModalCreate(true)}>Create</Button>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer component={Paper}>
            <Table
              sx={{ width: '100%' }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  {citiesFields.map((cell) => (
                    <StyledTableCell key={cell.id} align="center">{cell.title}</StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {!cities
                  ? (
                    <TableRow>
                      <StyledTableCell><CircularProgress color="primary" /></StyledTableCell>
                    </TableRow>
                  )
                  : cities
                    .map((city) => (
                      <StyledTableRow key={city.id}>
                        <StyledTableCell align="center" scope="company">{city.name}</StyledTableCell>
                        <StyledTableCell align="center" scope="company">
                          <Button variant="outlined" color="info" onClick={() => handleEdit(city)}>
                            edit
                          </Button>
                        </StyledTableCell>
                        <StyledTableCell align="center" scope="company">
                          <Button variant="outlined" color="error" onClick={() => handleDelete(city.id)}>
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
            count={citiesCount}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <div />
      </Dialog>
    </Box>
  );
};

export default CityTable;
