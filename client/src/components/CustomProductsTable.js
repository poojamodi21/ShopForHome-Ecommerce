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
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import axios from 'axios';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };




const CustomProductsTable = ({ name, description, price, category, id, countInStock, image, products, setProducts }) => {
    // const [editUser, setEditUser] = useState(false);
    // const [admin, setAdmin] = useState(isAdmin);

    const [newName, setNewName] = useState(name);
    const [newDescription, setNewDescription] = useState(description);
    const [newPrice, setNewPrice] = useState(price);
    const [newCategory, setNewCategory] = useState(category);
    const [newCountInStock, setNewCountInStock] = useState(countInStock);
    const [newImage, setNewImage] = useState(image);
    const [editProduct, setEditProduct] = useState(false);
    const [editImage, setEditImage] = useState(false);


    const deleteProduct = async () => {
        const response = await fetch(`/deleteProduct/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            }
        });
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
            setProducts(data.products);
        }
    }




    const saveProduct = async (path, id) => {
        const response = await fetch(`/updateProduct/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            },
            body: JSON.stringify({
                name: newName,
                description: newDescription,
                price: newPrice,
                category: newCategory,
                countInStock: newCountInStock,
                image: path,

            })
        });
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
            setProducts(data.products);
        }
    }

    const addImage = async (id) => {
        if(editImage) {
        const formData = new FormData();
        formData.append('image', newImage, newImage.name);
        // setNewImageName(`/images/${newImage.name}`);
        axios.post('/addImage', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            }
        })
            .then(res => {

                // setNewImageName(res.image)
                console.log(res, "this is the response")
                saveProduct(`/images/${newImage.name}`, id);
            }
            )
            .catch(err => {
                console.log(err);
            }
            )}
            else{
                saveProduct(image, id);
            }
    }

    // let base64code = ""
    // const handleChange = e => {
    //     const files = e.target.files;
    //     const file = files[0];
    //     getBase64(file);
    // };

    // const onLoad = fileString => {
    //     setNewImage(fileString);
    //     this.base64code = fileString
    //   };

    // const getBase64 = file => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = () => {
    //         onLoad(reader.result);
    //     }
    // }


    return (

        <TableRow key={id}>
            {
                editProduct ?
                    (
                        <>
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
                                <TextField id="outlined-basic" variant="outlined"
                                    onChange={(e) => {
                                        setNewImage(e.target.files[0])
                                        setEditImage(true)
                                    }
                                    }

                                    type="file"



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

                                <Button variant="contained" color="warning"
                                    onClick={() => {
                                        addImage(id)
                                        setEditProduct(false)
                                    }
                                    }
                                ><UpgradeIcon />
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
                        </>
                    ) : (
                        <>
                            <TableCell>{name}</TableCell>
                            <TableCell>{description}</TableCell>
                            <TableCell>{image}</TableCell>
                            <TableCell>{price}</TableCell>
                            <TableCell>{category}</TableCell>
                            <TableCell>{countInStock}</TableCell>


                            <TableCell>

                                <Button variant="contained"
                                    onClick={() => {
                                        setEditProduct(true);

                                    }
                                    }
                                ><EditIcon />
                                </Button>


                            </TableCell>
                            <TableCell>

                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => deleteProduct(id)}
                                >
                                    <DeleteIcon />
                                </Button>


                            </TableCell>
                        </>
                    )
            }
        </TableRow>

    )
}

export default CustomProductsTable