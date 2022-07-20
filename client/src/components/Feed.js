import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CustomCard from './CustomCard';
import { Typography } from '@mui/material';

const Products = [
  {
    id: 1,
    name: 'Product 1',
    description: 'This is a product',
    image: 'https://source.unsplash.com/random/400x200',
    price: '$100',
    category: 'bed',


  },
  {
    id: 2,
    name: 'Product 2',
    description: 'This is a product',
    image: 'https://source.unsplash.com/random/400x200',
    price: '$100',
    category: 'furniture',

  },
  {
    id: 3,
    name: 'Product 3',
    description: 'This is a product',
    image: 'https://source.unsplash.com/random/400x200',
    price: '$100',
    category: 'furniture',

  },
  {
    id: 4,
    name: 'Product 4',
    description: 'This is a product',
    image: 'https://source.unsplash.com/random/400x200',
    price: '$100',
    category: 'bed',

  },
  {
    id: 5,
    name: 'Product 5',
    description: 'This is a product',
    image: 'https://source.unsplash.com/random/400x200',
    price: '$100',
    category: 'chairs',

  },
  {
    id: 6,
    name: 'Product 6',
    description: 'This is a product',
    image: 'https://source.unsplash.com/random/400x200',
    price: '$100',
    category: 'chairs',
  },
  {
    id: 7,
    name: 'Product 7',
    description: 'This is a product',
    image: 'https://source.unsplash.com/random/400x200',
    price: '$100',
    category: 'tables',
  },
  {
    id: 8,
    name: 'Product 8',
    description: 'This is a product',
    image: 'https://source.unsplash.com/random/400x200',
    price: '$100',
    category: 'tables',
  },
];

export default function ResponsiveGrid({ search, setSearch }) {
  return (
    <Box sx={{
      flexGrow: 1
      , marginLeft: '4rem',
      marginRight: '4rem',
      marginTop: '1rem',
    }}>
      <Typography gutterBottom variant="h4" component="div" >
        Right to the latest trends
      </Typography>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Products.filter((item) => {
          if (search == "") {
            return item
          } else if (item.name.toLowerCase().includes(search.toLowerCase())) {
            return item
          } else if (item.category.toLowerCase().includes(search.toLowerCase())) {
            return item
          } else if (item.description.toLowerCase().includes(search.toLowerCase())) {
            return item
          }
        }).map((product, index) => (
          <Grid item xs={1} sm={4} md={3} key={index}>
            {/* <Item>{product}</Item> */}
            <CustomCard name={product.name} description={product.description} image={product.image} price={product.price} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}