import * as React from 'react';

import {
  Table, TableBody, TableRow, TableContainer, TableHead, Paper, Button, CircularProgress,
} from '@mui/material';

import { StyledTableCell, StyledTableRow } from '../../utils/style';
import { MailTemplateTableProps } from '../../common/interfaces_types';

const MailTemplateTable: React.FC<MailTemplateTableProps> = (props: MailTemplateTableProps) => {
  const {
    templates
  } = props;

  const templatesData = templates;

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name&nbsp;</StyledTableCell>
              <StyledTableCell align="center" style={{ width: '22%' }}>Action&nbsp;</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!templates
              ? (
                <TableRow>
                  <StyledTableCell><CircularProgress color="primary" /></StyledTableCell>
                </TableRow>
              )
              : templatesData.map((template) => (
                <StyledTableRow key={template.id}>
                  <StyledTableCell scope="company">{template.name}</StyledTableCell>
                  <StyledTableCell align="center">
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MailTemplateTable;
