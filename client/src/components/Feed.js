import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CustomCard from './CustomCard';
import { Typography } from '@mui/material';
import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../App';




export default function ResponsiveGrid({ search, setSearch, category, setCategory, price, setPrice }) {
  const [products, setProducts] = useState([]);
  const globalContext = useContext(GlobalContext);
  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch('/allProducts');
      const data = await response.json();
      setProducts(data);
    }
    getProducts();

  }, []);

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
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {
          category != "" ?
            products.filter(product => product.category === category)
              .filter(item => {
                if (search == "") {
                  return item;
                }
                else if (item.name.toLowerCase().includes(search.toLowerCase())) {
                  return item
                }
                else if (item.description.toLowerCase().includes(search.toLowerCase())) {
                  return item
                }


              }).sort((a, b) => {
                if (price === "lowest") {
                  return a.price - b.price;
                }
                else if (price === "highest") {
                  return b.price - a.price;
                }
                else {
                  return a.price - b.price;
                }
              })
              .map((product, index) => {
                return (
                  <Grid item xs={1} sm={4} md={3} key={index}>
                    <CustomCard name={product.name} description={product.description} image={product.image} price={product.price} productId={product._id} />
                  </Grid>
                )
              })

            :
            products.filter((item) => {
              if (search === "") {
                return item
              } else if (item.name.toLowerCase().includes(search.toLowerCase())) {
                return item
              } else if (item.category.toLowerCase().includes(search.toLowerCase())) {
                return item
              } else if (item.description.toLowerCase().includes(search.toLowerCase())) {
                return item
              }
            }).sort((a, b) => {
              if (price === "lowest") {
                return a.price - b.price;
              }
              else if (price === "highest") {
                return b.price - a.price;
              }
              else {
                return a.price - b.price;
              }
            })
              .map((product, index) => (
                <Grid item xs={1} sm={4} md={3} key={index}>

                  <CustomCard name={product.name} description={product.description} image={product.image} price={product.price} productId={product._id} />
                </Grid>
              ))
        }
      </Grid>

    </Box>
  );
}