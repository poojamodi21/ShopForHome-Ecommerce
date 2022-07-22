
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';

export default function Dropdown() {

    // const [products, setProducts] = useState([]);
    // const [selectedProduct, setSelectedProduct] = useState('');
    // useEffect(() => {
    //     const getProducts = async () => {
    //         const response = await fetch('/allProducts');
    //         const data = await response.json();
    //         setProducts(data);
    //     }
    //     getProducts();

    // }, []);

    // const uniqueCategories = products.map(product => product.category).filter((item, index, array) => array.indexOf(item) === index);
    // const handleChange = (event) => {
    //     setSelectedProduct(event.target.value);
    // };

    return (
        <div className=''>
            {/* <FormControl sx={{ m: 1, minWidth: 140, margin: '-10 20px', }} size="small">
                <InputLabel id="demo-select-small" style={{ color: 'whitesmoke', border: 'none' }}>Category</InputLabel>
                <Select
                    style={{ color: 'whitesmoke', border: 'none' }}
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={selectedProduct}
                    label="Age"
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>Category</em>
                    </MenuItem>
                    {uniqueCategories.map((category, index) => (
                        <MenuItem value={category} key={index}>
                            {category}
                        </MenuItem>
                    ))}

                    

                </Select>
            </FormControl> */}
        </div>
    );
}