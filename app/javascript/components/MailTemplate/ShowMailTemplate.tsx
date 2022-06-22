// import * as React from 'react';
import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';

import {
  Dialog, DialogActions, DialogContent, DialogTitle, Grid, Button,
} from '@mui/material';
import httpClient from '../../api/httpClient';
import { ShowMailTemplateProps } from '../../common/interfaces_types';

const ShowMailTemplate: React.FC<ShowMailTemplateProps> = (props: ShowMailTemplateProps) => {
  const { isShowOpen, handleShowClose, clickedTemplateId } = props;
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    if (clickedTemplateId) {
      httpClient.mailTemplates.get(clickedTemplateId).then((res) => {
        console.log('Response', res);
        setTemplate(res.data);
      });
    }
  }, [clickedTemplateId]);

  return (
    <Dialog
      open={isShowOpen}
      onClose={handleShowClose}
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 535 } }}
      maxWidth="xs"
    >
      <DialogTitle>Template information</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} direction="column">
          <Grid item xs={8}>
            {template && template.name}
          </Grid>
          <Grid item xs={8}>
            {template && ReactHtmlParser(template.body)}
          </Grid>
          <Grid item xs={8}>
            <DialogActions
              sx={{ justifyContent: 'space-between', padding: '8px 24px' }}
            >
              <Button
                onClick={handleShowClose}
                color="error"
                variant="outlined"
              >
                Cancel
              </Button>
            </DialogActions>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
export default ShowMailTemplate;
