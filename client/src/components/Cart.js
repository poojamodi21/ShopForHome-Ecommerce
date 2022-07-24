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
import { useEffect, useContext, useState} from 'react';
import { GlobalContext } from '../App';
import CardCart from './CardCart';
// import IconButton from '@mui/material/IconButton';
// import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import SkipNextIcon from '@mui/icons-material/SkipNext';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

export default function Cart() {

    const globalcontext = useContext(GlobalContext);
    const [total, setTotal] = useState(0);
    
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
                        index={index}
                        total={total}
                        setTotal={setTotal}
                    />
                ))

            }
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

                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Total Amount
                </Typography>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                    ₹ {total}
                </Typography>

            </Paper>

        </div>
    );
}
