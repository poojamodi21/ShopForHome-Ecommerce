import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import CustomTable from './CustomTable';
import CustomProductsTable from './CustomProductsTable';
import TextField from '@mui/material/TextField';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';



export default function Products() {


    const [products, setProducts] = useState([]);
    const [newName, setNewName] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [newCountInStock, setNewCountInStock] = useState('');
    const [newImage, setNewImage] = useState('');



    const fetchProducts = async () => {
        const response = await fetch('/allProducts',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                }
            });
        const data = await response.json();
        setProducts(data);
    }

    const addNewProduct = async () => {
        const response = await fetch('/addProduct',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                },
                body: JSON.stringify({
                    name: newName,
                    description: newDescription,
                    price: newPrice,
                    category: newCategory,
                    countInStock: newCountInStock,
                    image: "https://source.unsplash.com/random/400x200"

                })

            }
        );
        const data = await response.json();
        if (data.error) {
            toast.error(data.error, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        }
        else {
            toast.success(data.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setNewName('');
            setNewDescription('');
            setNewPrice('');
            setNewCategory('');
            setNewCountInStock('');
            setNewImage('');
            setProducts(data.products);
        }
    }



    useEffect(() => {
        // fetchUsers();
        fetchProducts();
    }
        , []);

    return (
        <React.Fragment>




            <Title>Product Information</Title>
            <Table size="small">
                <TableHead>
                    <TableRow >
                        {/* <TableCell>Date</TableCell> */}
                        <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>description</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>image</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>price</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>category</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>countInStock</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Edit</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Delete</TableCell>
                        {/* <TableCell>Payment Method</TableCell>
                        <TableCell align="right">Sale Amount</TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <TextField id="outlined-basic" label="Name" variant="outlined" value={newName}
                                onChange={(e) => setNewName(e.target.value)}

                            />

                        </TableCell>
                        <TableCell>
                            <TextField id="outlined-basic" label="Description" variant="outlined" value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}

                            />

                        </TableCell>
                        <TableCell>
                                <TextField id="outlined-basic" label="Name" variant="outlined" 
                                value ={newImage}
                                onChange={(e)=>setNewImage(e.target.value)}

                                />

                            </TableCell>
                        <TableCell>
                            <TextField id="outlined-basic" label="Price" variant="outlined" value={newPrice}
                                onChange={(e) => setNewPrice(e.target.value)}

                            />

                        </TableCell>
                        <TableCell>
                            <TextField id="outlined-basic" label="Category" variant="outlined" value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}

                            />

                        </TableCell>
                        <TableCell>
                            <TextField id="outlined-basic" label="Count in stock" variant="outlined" value={newCountInStock}
                                onChange={(e) => setNewCountInStock(e.target.value)}

                            />

                        </TableCell>

                        {/* <TableCell>{isAdmin ?
                                <Checkbox {...label} defaultChecked
                                    onChange={(e) => {
                                        setAdmin(e.target.checked)
                                        console.log(admin, "admin")
                                    }
                                    }
                                />
                                :
                                <Checkbox {...label}
                                    onChange={(e) => {
                                        setAdmin(e.target.checked)
                                        console.log(admin, "admin")
                                    }
                                    }
                                />
                            }

                            </TableCell> */}
                        <TableCell>

                            <Button variant="contained" color="success"
                                onClick={() => {
                                    addNewProduct();
                                }
                                }

                            ><AddBoxIcon />
                            </Button>


                        </TableCell>
                        <TableCell>

                            <Button
                                variant="contained"
                                color="error"
                                // onClick={() => deleteUser(id)}
                                disabled
                            >
                                <DeleteIcon />
                            </Button>


                        </TableCell>
                    </TableRow>
                    {
                        products.map((row) => (
                            <CustomProductsTable
                                name={row.name}
                                description={row.description}
                                image={row.image}
                                price={row.price}
                                category={row.category}
                                countInStock={row.countInStock}
                                id={row._id}
                                products={products}
                                setProducts={setProducts}
                            />

                        ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}