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
                                            Standard license
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            Full resolution 1920x1080 • JPEG
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Category
                                        </Typography>
                                    </Grid>
                                    <Grid item >
                                        <Typography sx={{ cursor: 'pointer' }} variant="body2">
                                            Remove
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid item >
                                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginRight: '30px', marginBottom: '15px' }}>
                                        $19.00
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, marginLeft: '-30px', justifyContent: 'space-between' }}>

                                        <RemoveCircleIcon sx={{
                                            cursor: 'pointer',
                                        }} />

                                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', }} >
                                            1
                                        </Typography>
                                        <AddCircleIcon
                                            sx={{
                                                cursor: 'pointer',
                                            }}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Paper>

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
                    $19.00
                </Typography>

            </Paper>

        </div>
    );
}
