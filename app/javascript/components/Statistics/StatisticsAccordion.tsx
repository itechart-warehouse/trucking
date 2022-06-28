import * as React from 'react';
import {
  Paper,
  styled,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { StatAccordion } from '../../common/interfaces_types';
import { StyledTableCell, StyledTableRow } from '../../utils/style';

const rowChangeStyle = {
  '&:last-child td, &:last-child th': { border: 0 },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const StatisticsAccordion: React.FC<StatAccordion> = (props: StatAccordion) => {
  const { item } = props;
  return (
    <Accordion>
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Typography>Details</Typography>
      </AccordionSummary>
      {Object.keys(item.changes).map((it) => (
        <AccordionDetails key={it}>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {Array.isArray(item.changes[it]) ? (
                  <StyledTableRow sx={rowChangeStyle}>
                    <StyledTableCell align="center" sx={{ flex: '3 0 20px' }}>
                      {it}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ flex: '3 0 20px' }}>
                      {String(item.changes[it][0])}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ flex: '3 0 20px' }}>
                      <ArrowForwardIcon />
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ flex: '3 0 20px' }}>
                      {String(item.changes[it][1])}
                    </StyledTableCell>
                  </StyledTableRow>
                ) : null}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      ))}
    </Accordion>
  );
};
export default StatisticsAccordion;
