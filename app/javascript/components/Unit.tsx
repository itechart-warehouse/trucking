import * as React from 'react';

import { Box, Grid, Button } from '@mui/material';
import httpClient from '../api/httpClient';
import { UnitProps } from '../common/interfaces_types';
import { Unit } from '../common/interfaces_types';
import UnitsTable from './Units/UntisTable';
import CreateUnitForm from './Units/CreateUnitForm';
import Search from './Search';

const Units: React.FC<UnitProps> = (props: UnitProps) => {
  const { UnitCount, UnitsJSON } = props;

  const [Units, setUnits] = React.useState<Unit[]>(JSON.parse(UnitsJSON));
  const [UnitsCount, setUnitsCount] = React.useState<number>(UnitCount);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);

  const [createModal, setCreateModal] = React.useState<boolean>(false);
  const [updateModal, setUpdateModal] = React.useState<boolean>(false);

  const [formErrors, setFormErrors] = React.useState<string[]>([]);
  const [page, setPage] = React.useState<number>(0);

  const [measureUnitId, setMeasureUnitId] = React.useState<number>();

  const handleClose = () => {
    setCreateModal(false);
    setUpdateModal(false);
    setFormErrors(null);
  };

  const handleSubmit = (Unit: Unit) => {
    httpClient.Unit.create(Unit)
      .then((response) => {
        handleClose();
        if (Units.length < rowsPerPage) {
          setUnits((prevUnits) => [...prevUnits, response.data]);
        }
        setUnitsCount(UnitsCount + 1);
      })
      .catch((error) => {
        setFormErrors(error.response.data);
      });
  };

  const handleEditSubmit = (Unit: Unit) => {
    httpClient.Unit.update(Unit.id, Unit)
      .then((response) => {
        const objIndex = Units.findIndex((element) => element.id === Unit.id);
        const updatedUnit: Unit = response.data;
        Units[objIndex] = updatedUnit;
        setUnits(Units);
        handleClose();
      })
      .catch((error) => setFormErrors(error.response.data));
  };

  const handleSearch = (text: string) => {
    if (text) {
      httpClient.Unit.search(0, rowsPerPage.toString(), text)
        .then((response) => {
          setUnitsCount(response.data.total_count);
          setUnits(response.data.units);
        });
    } else {
      httpClient.Unit.getAll(0, rowsPerPage.toString())
        .then((response) => {
          setUnitsCount(response.data.total_count);
          setUnits(response.data.units);
        })
        .then(() => setPage(0));
    }
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
          <Grid item md={3} style={{ textAlign: 'left' }}>
            <Search handleSubmit={handleSearch} label="unit" />
          </Grid>
          <Grid item xs={1.75} style={{ textAlign: 'right' }}>
            <Button variant="contained" color="success" size="large" style={{ height: '51px' }} onClick={() => setCreateModal(true)}>
              Create unit
            </Button>
          </Grid>
          <Grid item xs={12}>
            <UnitsTable
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              Units={Units}
              setUnits={setUnits}
              UnitsCount={UnitsCount}
              setUnitsCount={setUnitsCount}
              updateModal={updateModal}
              setUpdateModal={setUpdateModal}
              setMeasureUnitId={setMeasureUnitId}
            />
          </Grid>
        </Grid>
      </Box>
      <CreateUnitForm
        createModal={createModal}
        updateModal={updateModal}
        measureUnitId={measureUnitId}
        handleSubmit={createModal ? handleSubmit : handleEditSubmit}
        handleClose={handleClose}
        formErrors={formErrors}
      />
    </div>
  );
};

export default Units;
