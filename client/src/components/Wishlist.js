import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CustomCard from './CustomCard';
import { Typography } from '@mui/material';
import { useEffect, useState, useContext } from 'react';

import { GlobalContext } from '../App'

const Wishlist = () => {
  const globalContext = useContext(GlobalContext);
  return (
    <Box sx={{
      flexGrow: 1
      , marginLeft: '4rem',
      marginRight: '4rem',
      marginTop: '1rem',
    }}>
      <Typography gutterBottom variant="h4" component="div" style={{ marginBottom: '30px' }} >
        Right to the latest trends
      </Typography>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}>
        {
          globalContext.user.wishlist.map((product, index) => (
            <Grid item xs={1} sm={4} md={3} key={index}>
              {console.log(product)}
              <CustomCard name={product.productId.name} description={product.productId.description} image={product.productId.image} price={product.productId.price} productId={product.productId._id} />
            </Grid>
          ))
        }


      </Grid>

    </Box>

  )
}

export default Wishlist