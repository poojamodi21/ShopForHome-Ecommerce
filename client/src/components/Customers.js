import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import CustomTable from './CustomTable';
// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
    return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
    createData(
        0,
        '16 Mar, 2019',
        'Elvis Presley',
        'Tupelo, MS',
        'VISA ⠀•••• 3719',
        312.44,
    ),
    createData(
        1,
        '16 Mar, 2019',
        'Paul McCartney',
        'London, UK',
        'VISA ⠀•••• 2574',
        866.99,
    ),
    createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
    createData(
        3,
        '16 Mar, 2019',
        'Michael Jackson',
        'Gary, IN',
        'AMEX ⠀•••• 2000',
        654.39,
    ),
    createData(
        4,
        '15 Mar, 2019',
        'Bruce Springsteen',
        'Long Branch, NJ',
        'VISA ⠀•••• 5919',
        212.79,
    ),
];

function preventDefault(event) {
    event.preventDefault();
}

export default function Customers() {

    const [customers, setCustomers] = useState([]);

    const fetchUsers = async () => {
        const response = await fetch('/allUsers',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                }
            });
        const data = await response.json();
        setCustomers(data);
    }



    useEffect(() => {
        fetchUsers();
    }
        , []);

    return (
        <React.Fragment>
            <Title>Customer Information</Title>
            <Table size="small">
                <TableHead>
                    <TableRow >
                        {/* <TableCell>Date</TableCell> */}
                        <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>isAdmin</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Edit</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Delete</TableCell>
                        {/* <TableCell>Payment Method</TableCell>
                        <TableCell align="right">Sale Amount</TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        customers.map((row) => (
                            <CustomTable
                                name={row.name}
                                isAdmin={row.isAdmin}
                                id={row._id}
                                customers={customers}
                                setCustomers={setCustomers}
                            />
                        ))}
                </TableBody>
            </Table>
            {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                See more orders
            </Link> */}
        </React.Fragment>
    );
}