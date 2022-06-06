import * as React from 'react';

import {
  Table, TableBody, TableRow, TableContainer, TableHead, Paper, Button, CircularProgress,
} from '@mui/material';

import { StyledTableCell, StyledTableRow } from '../../utils/style';
import { MailTemplateTableProps } from '../../common/interfaces_types';

const MailTemplateTable = ({ templates }: MailTemplateTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name&nbsp;</StyledTableCell>
            <StyledTableCell align="center" style={{ width: '22%' }}>Action&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            templates.length ? (
              templates.map((template) => (
                <StyledTableRow key={template.id}>
                  <StyledTableCell scope="template">{template.name}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Button variant="outlined" color="error" onClick={() => console.log("Template deleted")}>
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))) : (
              <TableRow>
                <StyledTableCell><CircularProgress color="primary" /></StyledTableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MailTemplateTable;
