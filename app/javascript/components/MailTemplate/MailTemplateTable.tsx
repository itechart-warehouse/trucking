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
  TablePagination,
} from '@mui/material';
import httpClient from '../../api/httpClient';
import { StyledTableCell, StyledTableRow } from '../../utils/style';
import { MailTemplateTableProps } from '../../common/interfaces_types';
import ShowMailTemplate from './ShowMailTemplate';
import EditMailTemplateForm from './EditMailTemplateForm';

const MailTemplateTable: React.FC<MailTemplateTableProps> = (
  props: MailTemplateTableProps,
) => {
  const {
    templates,
    setTemplate,
    setAlertData,
    setTemplateCount,
    templateCount,
    setRowsPerPage,
    rowsPerPage,
    setPage,
    page,
  } = props;
  const [isShowOpen, setShowOpen] = useState<boolean>(false);
  const [clickedTemplateId, setClickedTemplateId] = useState<number>(null);
  const [isEditOpen, setEditOpen] = useState<boolean>(false);
  const [editTemplate, setEditTemplate] = useState({
    name: '',
    content: '',
  });
  const [formErrors, setFormErrors] = React.useState<string[]>([]);

  const handleShowClose = () => {
    setShowOpen(false);
    setClickedTemplateId(null);
  };

  const handleShowOpen = (id) => {
    setShowOpen(true);
    setClickedTemplateId(id);
  };

  const handleEditOpen = (template) => {
    setEditOpen(true);
    setEditTemplate(template);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditTemplate({
      name: '',
      content: '',
    });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    httpClient.mailTemplates
      .getAll(newPage, rowsPerPage.toString())
      .then((response) => {
        setTemplate(JSON.parse(response.data.templates));
        setPage(newPage);
      });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    httpClient.mailTemplates
      .getAll(0, event.target.value)
      .then((response) => setTemplate(JSON.parse(response.data.templates)))
      .then(() => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      });
  };

  const deleteMailTemplate = (id) => {
    httpClient.mailTemplates.delete(id).then(() => {
      setTemplate(templates.filter((template) => id !== template.id));
      httpClient.mailTemplates
        .getAll(page, rowsPerPage.toString())
        .then((response) => setTemplate(response.data))
        .then(() => setTemplateCount(templateCount - 1));
      httpClient.mailTemplates
        .getAll(page)
        .then((response) => setTemplate(JSON.parse(response.data.templates)));
    });
    setAlertData({
      alertType: 'success',
      alertText: 'Mail template successfully deleted!',
      open: true,
    });
  };

  const updateMailTemplate = (template) => {
    httpClient.mailTemplates
      .update(template)
      .then((response) => {
        setEditTemplate((prev) => !prev);
        setEditOpen(false);
        setAlertData({
          alertType: 'success',
          alertText: 'Successfully updated a mail template!',
          open: true,
        });
        handleEditClose();
      })
      .catch((error) => {
        setFormErrors(error.response.data);
      });
  };

  return (
    <div>
      <Paper sx={{ width: '100%', mb: 2 }}>
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
                      <Button
                        variant="outlined"
                        color="warning"
                        onClick={() => handleEditOpen(template)}
                      >
                        Edit
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <TableRow>
                  <StyledTableCell>
                    <CircularProgress color="primary" />
                  </StyledTableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={templateCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <ShowMailTemplate
        isShowOpen={isShowOpen}
        clickedTemplateId={clickedTemplateId}
        handleShowClose={handleShowClose}
      />
      <EditMailTemplateForm
        isEditOpen={isEditOpen}
        editTemplate={editTemplate}
        handleEditClose={handleEditClose}
        formErrors={formErrors}
        handleSubmit={updateMailTemplate}
      />
    </div>
  );
};

export default MailTemplateTable;
