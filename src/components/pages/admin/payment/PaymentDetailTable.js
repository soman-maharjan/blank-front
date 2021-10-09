import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function PaymentDetailTable(props) {
    const { orders, payment } = props;
    const providersShare = ((parseFloat(payment.fee) * parseFloat(payment.amount)) / 100.00).toFixed(2);
    const fee = ((parseFloat(process.env.REACT_APP_PERCENTAGE) * parseFloat(payment.amount)) / 100.00).toFixed(2);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={4}>
                            Details
                        </TableCell>
                        <TableCell align="right">Price</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Product Name</TableCell>
                        <TableCell align="right">Category</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Unit</TableCell>
                        <TableCell align="right">Sum</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell>{row.productName}</TableCell>
                            <TableCell align="right">{row.category}</TableCell>
                            <TableCell align="right">{row.quantity}</TableCell>
                            <TableCell align="right">{row.price}</TableCell>
                            <TableCell align="right">{row.totalPrice}</TableCell>
                        </TableRow>
                    ))}

                    <TableRow>
                        <TableCell rowSpan={4} />
                        <TableCell rowSpan={4} />
                        <TableCell colSpan={2}>Subtotal</TableCell>
                        <TableCell align="right">{payment.amount}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Fee</TableCell>
                        <TableCell align="right">{process.env.REACT_APP_PERCENTAGE} %</TableCell>
                        <TableCell align="right">- {fee} </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>({payment.type}) Fee</TableCell>
                        <TableCell align="right">{payment.fee} %</TableCell>
                        <TableCell align="right">- {providersShare}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Seller</TableCell>
                        <TableCell align="right">Rs. {(parseFloat(payment.amount).toFixed(2) - providersShare - fee)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}
