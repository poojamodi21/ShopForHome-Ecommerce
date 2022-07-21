import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CustomCard from './CustomCard';
import { Typography } from '@mui/material';
import { useEffect,useState, useContext} from 'react';
import { GlobalContext } from '../App';




export default function ResponsiveGrid({ search, setSearch }) {
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
      <Typography gutterBottom variant="h4" component="div" >
        Right to the latest trends
      </Typography>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {products.filter((item) => {
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