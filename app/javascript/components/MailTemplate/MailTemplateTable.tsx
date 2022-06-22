import * as React from 'react';
import { useState } from 'react';

import {
  Table,
  TableBody,
  TableRow,
  TableContainer,
  TableHead,
  Paper,
  Button,
  CircularProgress,
} from '@mui/material';
import httpClient from '../../api/httpClient';

import { StyledTableCell, StyledTableRow } from '../../utils/style';
import { MailTemplateTableProps } from '../../common/interfaces_types';
import ShowMailTemplate from './ShowMailTemplate';

const MailTemplateTable: React.FC<MailTemplateTableProps> = (props: MailTemplateTableProps) => {
  const { templates, setTemplate, setAlertData } = props;
  const [isShowOpen, setShowOpen] = useState<boolean>(false);
  const [clickedTemplateId, setClickedTemplateId] = useState<number>(null);

  const handleShowClose = () => {
    setShowOpen(false);
    setClickedTemplateId(null);
  };

  const handleShowOpen = (id) => {
    setShowOpen(true);
    setClickedTemplateId(id);
  };

  const deleteMailTemplate = (id) => {
    httpClient.mailTemplates.delete(id).then(() => {
      setTemplate(templates.filter((template) => id !== template.id));
    });
    setAlertData({ alertType: 'success', alertText: 'Mail template successfully deleted!', open: true });
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name&nbsp;</StyledTableCell>
              <StyledTableCell align="center" style={{ width: '22%' }}>
                Action&nbsp;
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {templates.length ? (
              templates.map((template) => (
                <StyledTableRow key={template.id}>
                  <StyledTableCell scope="template">
                    <Button
                      variant="text"
                      onClick={() => handleShowOpen(template.id)}
                    >
                      {template.name}
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteMailTemplate(template.id)}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <StyledTableCell>
                  {/* <CircularProgress color="primary" /> */}
                  No templates yet...
                </StyledTableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <ShowMailTemplate
        isShowOpen={isShowOpen}
        clickedTemplateId={clickedTemplateId}
        handleShowClose={handleShowClose}
      />
    </div>
  );
};

export default MailTemplateTable;
