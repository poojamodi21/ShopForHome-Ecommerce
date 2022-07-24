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

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };




const CustomTable = ({ name, isAdmin, id, customers, setCustomers }) => {
    const [editUser, setEditUser] = useState(false);
    const [admin, setAdmin] = useState(isAdmin);
    const [newName, setNewName] = useState(name);


    const deleteUser = async () => {
        const response = await fetch(`/deleteUser/${id}`, {
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
            toast.success("User deleted successfully", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setCustomers(data.users);
        }
    }


    const saveUser = async (id) => {
        const response = await fetch(`/updateUser/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            },
            body: JSON.stringify({
                name: newName,
                isAdmin: admin
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
            toast.success("User updated successfully", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setCustomers(data.users);

        }
    }



    return (

        <TableRow key={id}>
            {
                editUser ?
                    (
                        <>
                            <TableCell>
                                <TextField id="outlined-basic" label="Name" variant="outlined" value={newName}
                                    onChange={(e) => setNewName(e.target.value)}

                                />

                            </TableCell>
                            <TableCell>{isAdmin ?
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

                            </TableCell>
                            <TableCell>

                                <Button variant="contained" color="warning"
                                    onClick={() => {
                                        saveUser(id)
                                        setEditUser(false);

                                    }
                                    }
                                ><UpgradeIcon />
                                </Button>


                            </TableCell>
                            <TableCell>

                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => deleteUser(id)}
                                >
                                    <DeleteIcon />
                                </Button>


                            </TableCell>
                        </>
                    ) : (
                        <>
                            <TableCell>{name}</TableCell>
                            <TableCell>{isAdmin ?
                                <CheckIcon style={{ color: 'green' }} />
                                :
                                <CloseIcon style={{ color: 'red' }} />
                            }

                            </TableCell>
                            <TableCell>

                                <Button variant="contained"
                                    onClick={() => {
                                        setEditUser(true);

                                    }
                                    }
                                ><EditIcon />
                                </Button>


                            </TableCell>
                            <TableCell>

                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => deleteUser(id)}
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

export default CustomTable