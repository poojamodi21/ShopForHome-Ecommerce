
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { CardMedia } from '@mui/material';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useEffect, useContext } from 'react';
import { GlobalContext } from '../App';
import { useState } from 'react';
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';


const CardCart = ({ name, description, price, category, id, index, total, setTotal }) => {
    const [quantity, setQuantity] = useState(1);
    const globalContext = useContext(GlobalContext);

    const getTotal = () => {
        let total = 0;
        globalContext.user.cart.forEach(product => {
            total = (total + (product.productId.price * product.quantity));
        }
        )
        return total;

    }

    useEffect(() => {
        setTotal(getTotal());
        console.log(total)
    }, [quantity,globalContext.user.cart]);

    const removeProduct = (id) => {
        fetch(`/removeProduct/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    toast.error(data.error, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                else {
                    globalContext.setUser(data.result);
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

            }
            )
    }

    return (
        <div>
            <Paper
                sx={{
                    p: 2,
                    margin: ' 15px auto',
                    maxWidth: 900,
                    flexGrow: 1,
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
            >

                <Grid container spacing={2}>
                    <Grid item>

                        <CardMedia
                            component="img"
                            sx={{ width: 120, height: 90 }}
                            image="https://source.unsplash.com/random/400x200"
                            alt="Live from space album cover"
                        />
                    </Grid>
                    <Grid item xs={12} sm container>

                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1" component="div" sx={{ fontWeight: 'bold' }}>
                                    {name}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {description}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {category}
                                </Typography>
                            </Grid>
                            <Grid item >
                                <Typography sx={{ cursor: 'pointer' }} variant="body2"
                                    onClick={() => removeProduct(id)}
                                >

                                    Remove
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid item >
                            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginRight: '30px', marginBottom: '15px' }}>
                                ₹ {price}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, marginLeft: '-30px', justifyContent: 'space-between' }}>

                                <RemoveCircleIcon sx={{
                                    cursor: 'pointer',
                                }}
                                    onClick={() => {
                                        if (quantity > 1) {
                                            setQuantity(quantity - 1);
                                            let temp = globalContext.user;
                                            temp.cart[index].quantity = quantity - 1;
                                            globalContext.setUser(temp);
                                        }
                                    }
                                    }

                                />

                                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', }} >
                                    {quantity}
                                </Typography>
                                <AddCircleIcon
                                    sx={{
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                        setQuantity(quantity + 1)
                                        let temp = globalContext.user;
                                        temp.cart[index].quantity = quantity + 1;
                                        globalContext.setUser(temp);
                                    }
                                    }

                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>

            </Paper>


        </div>
    )
}

export default CardCart