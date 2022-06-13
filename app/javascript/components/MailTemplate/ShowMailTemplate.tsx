import * as React from 'react';

import {
  Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Button,
} from '@mui/material';

import { ShowMailTemplateProps } from '../../common/interfaces_types';

const ShowMailTemplate = ({ isShowOpen, handleShowClose }: ShowMailTemplateProps) => {

  console.log(isShowOpen)

  return (
    <div>
      <Dialog
        open={isShowOpen}
        onClose={handleShowClose}
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 535 } }}
        maxWidth="xs"
      >
        <DialogTitle>Add Mail Template</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} direction="column">
            <Grid item xs={8}>
              Hello
              <DialogActions sx={{ justifyContent: 'space-between', padding: '8px 24px' }}>
                <Button onClick={handleShowClose} color="error" variant="outlined">Cancel</Button>
              </DialogActions>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShowMailTemplate;
