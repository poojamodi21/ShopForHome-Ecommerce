import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { Button, CardMedia } from '@mui/material';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useEffect, useContext, useState } from 'react';
import { GlobalContext } from '../App';
import CardCart from './CardCart';
import SendIcon from '@mui/icons-material/Send';
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

export default function Cart() {

    const globalcontext = useContext(GlobalContext);
    const [total, setTotal] = useState(0);

    const createOrder = () => {
        fetch('/createOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                products: globalcontext.user.cart,
                total: total,
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success(data.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            ).catch(err => {
                console.log(err);
                toast.error(err, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            );
    }




    return (
        <div>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '1rem',
            }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    Your Shopping Cart
                </Typography>
            </Box>
            {
                globalcontext.user.cart.map((item, index) => (
                    < CardCart name={item.productId.name}
                        description={item.productId.description}
                        price={item.productId.price}
                        category={item.productId.category}
                        id={item.productId._id}
                        countInStock = {item.productId.countInStock}
                        index={index}
                        total={total}
                        setTotal={setTotal}
                    />
                ))

            }
            < Paper
                sx={{
                    p: 2,
                    margin: ' 15px auto',
                    maxWidth: 900,
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'space-between',

                    alignItems: 'center',
                    marginTop: '1rem',
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
            >

                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Total Amount
                </Typography>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                    ₹ {total}
                </Typography>

            </Paper >
            <Paper
                sx={{
                    p: 2,
                    margin: ' 15px auto',
                    maxWidth: 900,
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'space-between',

                    alignItems: 'center',
                    marginTop: '1rem',
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
            >
                <Button variant="contained" color="primary" size="large" sx={{
                }}
                    onClick={() => {
                        setTotal(total - (total * globalcontext.user.discount / 100));
                    }
                    }
                >
                    Apply Coupon
                </Button>
                <Button variant="contained" size="large"
                    onClick={() => {
                        createOrder()
                    }
                    }

                    sx={{
                        backgroundColor: '#1A2027',


                    }}>
                    Checkout
                    <SendIcon style={{
                        marginLeft: '10px'
                    }} />
                </Button>
            </Paper>
        </div >
    );
}
