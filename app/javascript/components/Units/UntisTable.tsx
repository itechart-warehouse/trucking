import * as React from 'react';
import {
  Paper, TableContainer, Table, TableHead, TableRow, TableBody, CircularProgress, Button, Checkbox, IconButton, TablePagination,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Unit, UnitsTableProps } from '../../common/interfaces_types';
import { StyledTableCell, StyledTableRow } from '../../utils/style';
import httpClient from '../../api/httpClient';

const UnitsTable: React.FC<UnitsTableProps> = (props: UnitsTableProps) => {
  const {
    rowsPerPage, setRowsPerPage, Units, setUnits, UnitsCount, setUnitsCount, setUpdateModal, setMeasureUnitId,
  } = props;

  const [page, setPage] = React.useState<number>(0);

  const handleChangePage = (event: unknown, newPage: number) => {
    httpClient.Unit.getAll(newPage, rowsPerPage.toString())
      .then((response) => {
        setUnits(response.data.units);
      })
      .then(() => setPage(newPage));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    httpClient.Unit.getAll(0, event.target.value)
      .then((response) => setUnits(response.data.units))
      .then(() => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      });
  };

  const handleDeleteUnit = (id: number) => {
    httpClient.Unit.delete(id).then(() => {
      httpClient.Unit.getAll(page, rowsPerPage.toString())
        .then((response) => setUnits(response.data.units))
        .then(() => setUnitsCount(UnitsCount - 1));
    });
  };

  const openUpdateModal = (id) => {
    setMeasureUnitId(id);
    setUpdateModal(true);
  };

  return (
    <div>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Name&nbsp;</StyledTableCell>
                <StyledTableCell align="center">Short name&nbsp;</StyledTableCell>
                <StyledTableCell align="center" style={{ width: '22%' }}>Action&nbsp;</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!Units
                ? (
                  <TableRow>
                    <StyledTableCell><CircularProgress color="primary" /></StyledTableCell>
                  </TableRow>
                )
                : Units.map((Unit, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <StyledTableRow key={Unit.id}>
                      <StyledTableCell
                        component="th"
                        id={labelId}
                        scope="measure-unit"
                        padding="none"
                        align="center"
                      >
                        <Button
                          variant="text"
                          onClick={() => { openUpdateModal(Unit.id); }}
                        >
                          {Unit.name}
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell scope="measure-unit" align="center">{Unit.short_name}</StyledTableCell>
                      <StyledTableCell align="center">
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDeleteUnit(Unit.id)}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={UnitsCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default UnitsTable;
