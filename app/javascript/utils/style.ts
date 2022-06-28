import {
  alpha, styled, TableCell, tableCellClasses, TableRow,
} from '@mui/material';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#57606f',
    color: theme.palette.common.white,
    fontSize: '1rem',
  },
  [`&.${tableCellClasses.body}`]: { fontSize: 17 },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover },
  '&:last-child td, &:last-child th': { border: 0 },
}));

export const SearchPanel = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  columnGap: '10px',
  rowGap: '10px',
  marginBottom: '20px',
  padding: '10px',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.5),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.9),
  },
}));
