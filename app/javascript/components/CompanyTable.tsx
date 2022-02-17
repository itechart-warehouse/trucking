import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Formik, Field, Form, FormikHelpers, useFormik} from 'formik';

const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 17,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function CompanyTable( ) {
   
    const [companies, setCompany] = React.useState(null);
    React.useEffect(() => {
        axios.get('/companies.json').then((response) => {
            setCompany(response.data);
        })
    }, []);
    function deleteCompany(id) {
        axios.delete(`/companies/${id}`)
            .then(() => {
                alert("Post deleted!");
                axios.get('/companies.json').then((response)=>{
                    setCompany(response.data)
                })
            }) }
    function freezeCompany(id) {
        axios.post(`/companies/change_status/${id}`)
            .then(() => {
                axios.get('/companies.json').then((response)=>{
                    setCompany(response.data)
                })
            }) .catch((error) => {
            console.log('There was an error!', error);
        }); }
   if (!companies) return null
    return (<div >
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name&nbsp;</StyledTableCell>
                            <StyledTableCell align="right" colSpan="2">Action&nbsp;</StyledTableCell></TableRow>
                    </TableHead>
                    <TableBody>
                        {companies.map((company) => (
                            <StyledTableRow key={company.name}>
                                <StyledTableCell component="th" scope="company">
                                    {company.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <Button variant="outlined"  onClick={()=>freezeCompany(company.id)}>
                                        {company.status ? 'suspend' : 'unsuspend'}
                                    </Button>
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                        <Button variant="outlined"  onClick={()=>deleteCompany(company.id)}>
                                            Delete
                                        </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

    </div>
    );
};

