import * as React from 'react';
import { Form, Formik } from 'formik';

import {
  Dialog, DialogActions, DialogContent, DialogTitle, Grid, Button, ListItemButton, ListItemText,
  IconButton, Paper, Table, TableHead, TableRow, TableBody, TableContainer, Checkbox,
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';

import {
  ConsignmentGoodsProps, Item,
} from '../../common/interfaces_types';
import { StyledTableCell, StyledTableRow } from '../../utils/style';
import { consignmentGoods } from '../../constants/consignmentFields';

const ConsignmentGoods: React.FC<ConsignmentGoodsProps> = (props: ConsignmentGoodsProps) => {
  const {
    isActiveModal, handleClose, handleGoodsSubmit, goods, selectedGoods, setTitleStatus,
    setSelectedGoods, titleStatus, currentUserRole, waybillStatus,
  } = props;

  const handleToggle = (value: Item) => () => {
    if (selectedGoods.indexOf(value) === -1) {
      setSelectedGoods([...selectedGoods, value]);
    } else {
      setSelectedGoods(selectedGoods.filter((item) => item !== value));
    }
    switch (value.status) {
      case 'accepted':
        return setTitleStatus('Checked');
      case 'checked':
        setTitleStatus('Checked');
        return setTitleStatus('Delivered');
      default:
        setTitleStatus('');
        return setTitleStatus('');
    }
  };

  const accessRestricted = (status: string) => {
    switch (status) {
      case 'accepted':
        return currentUserRole === 'driver';
      case 'checked':
        return waybillStatus !== 'delivered to the recipient';
      default:
        return false;
    }
  };

  return (
    <div>
      <Dialog
        open={isActiveModal}
        onClose={handleClose}
        sx={{ '& .MuiDialog-paper': { maxWidth: '650px', maxHeight: 535 } }}
        maxWidth="xs"
      >
        <DialogTitle>Goods Conformity</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} direction="column">
            <Grid item xs={12}>
              <Formik
                initialValues={{ checked: [] }}
                onSubmit={handleGoodsSubmit}
              >
                <Form>
                  <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                      <TableHead>
                        <StyledTableRow>
                          <StyledTableCell>{titleStatus}</StyledTableCell>
                          {consignmentGoods.map((good) => (
                            <StyledTableCell key={good.id} align={good.align}>
                              {good.title}
                            </StyledTableCell>
                          ))}
                        </StyledTableRow>
                      </TableHead>
                      <TableBody>
                        {!goods
                          ? (
                            <TableRow>
                              <StyledTableCell>No data yet ...</StyledTableCell>
                            </TableRow>
                          )
                          : goods.map((item) => {
                            const labelId = `checkbox-list-label-${item}`;
                            return (
                              <StyledTableRow key={item.id}>
                                <StyledTableCell>
                                  <ListItemButton
                                    role={undefined}
                                    onClick={handleToggle(item)}
                                    disabled={!['driver', 'manager'].includes(currentUserRole) || ['delivered', 'lost'].includes(item.status)
                                      || accessRestricted(item.status)}
                                    dense
                                  >
                                    <Checkbox
                                      checked={selectedGoods.indexOf(item) !== -1}
                                      tabIndex={-1}
                                      disableRipple
                                      inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                  </ListItemButton>
                                </StyledTableCell>
                                <StyledTableCell align="center"><ListItemText id={labelId} primary={`${item?.good_name}`} /></StyledTableCell>
                                <StyledTableCell align="center"><ListItemText id={labelId} primary={`${item?.quantity}`} /></StyledTableCell>
                                <StyledTableCell align="center">
                                  <ListItemText id={labelId} primary={`${item?.unit_of_measurement}`} />
                                </StyledTableCell>
                                <StyledTableCell align="center">{item?.status}</StyledTableCell>
                                <StyledTableCell align="right" style={{ width: '30%' }}>
                                  <IconButton edge="end" aria-label="comments"><CommentIcon /></IconButton>
                                </StyledTableCell>
                              </StyledTableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <DialogActions>
                    <Button
                      type="submit"
                      color="success"
                      disabled={!(['driver', 'manager'].includes(currentUserRole) && selectedGoods.length)}
                      variant="outlined"
                    >
                      Submit
                    </Button>
                  </DialogActions>
                </Form>
              </Formik>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default ConsignmentGoods;
