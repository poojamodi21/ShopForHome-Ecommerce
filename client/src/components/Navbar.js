import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContext } from '../App';
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import Dropdown from './Dropdown';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect } from 'react';



const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));
const Dropdownwrapper = styled('div')(({ theme }) => ({
    position: 'relative',

    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    margin: '10px 0',

    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function PrimarySearchAppBar({ search, setSearch, category, setCategory, price, setPrice }) {
    const globalContext = useContext(GlobalContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const logout = () => {
        globalContext.setUser({
            name: "",
            isAdmin: false,
            cart: [],
            wishlist: [],
        });
        localStorage.clear();
        toast.success(`${globalContext.user.name} logged out successfully`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }


    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {globalContext.user.name != "" ? (
                <div>

                    <MenuItem onClick={handleMenuClose} >Welcome, {globalContext.user.name}</MenuItem>
                    <Link style={{ textDecoration: 'none' }} to="/profile" ><MenuItem onClick={handleMenuClose} >Profile</MenuItem></Link>
                    {globalContext.user.isAdmin && <Link style={{ textDecoration: 'none' }} to="/dashboard"><MenuItem onClick={handleMenuClose}>Dashboard</MenuItem></Link>}
                    <Link onClick={logout} style={{ textDecoration: 'none' }} to="/"><MenuItem onClick={handleMenuClose}>Logout</MenuItem></Link>
                </div>
            ) :
                (
                    <div>

                        <Link style={{ textDecoration: 'none' }} to="/login" ><MenuItem onClick={handleMenuClose} >Login</MenuItem></Link>
                        <Link style={{ textDecoration: 'none' }} to="/register"><MenuItem onClick={handleMenuClose}>Register</MenuItem></Link>
                    </div>

                )}

        </Menu>
    );


    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >

            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge
                        badgeContent={globalContext.user.cart.length} color="error">
                        <Link to="/cart" >
                            <ShoppingCartIcon />
                        </Link>
                    </Badge>
                </IconButton>
                <p>Cart</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );
    const [products, setProducts] = useState([]);


    useEffect(() => {
        const getProducts = async () => {
            const response = await fetch('/allProducts');
            const data = await response.json();
            setProducts(data);
        }
        getProducts();

    }, []);


    const uniqueCategories = products.map(product => product.category).filter((item, index, array) => array.indexOf(item) === index);
    const handleChange = (event) => {
        setCategory(event.target.value);
    };




    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >

                    </IconButton>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"

                            sx={{ display: { xs: 'none', sm: 'block', color: 'white', fontWeight: 'bold', marginRight: '24px' } }}
                        >
                            ShopForHome

                        </Typography>
                    </Link>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>



                    <Dropdownwrapper>
                        <FormControl sx={{ m: 1, minWidth: 140, margin: '-10 20px', }} size="small">
                            <InputLabel id="demo-select-small" style={{ color: 'whitesmoke', border: 'none' }}>Category</InputLabel>
                            <Select
                                style={{ color: 'whitesmoke', border: 'none' }}
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={category}
                                label="Age"
                                onChange={handleChange}
                            >


                                <MenuItem value="">
                                    <em>All</em>
                                </MenuItem>
                                {uniqueCategories.map((category, index) => (
                                    <MenuItem value={category} key={index}>
                                        {category}
                                    </MenuItem>
                                ))}



                            </Select>
                        </FormControl>
                    </Dropdownwrapper>
                    <Dropdownwrapper>

                        <FormControl sx={{ m: 1, minWidth: 140, margin: '-10 20px', }} size="small">
                            <InputLabel id="demo-select-small" style={{ color: 'whitesmoke', border: 'none' }}>Sort By Price</InputLabel>
                            <Select
                                style={{ color: 'whitesmoke', border: 'none' }}
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={price}
                                label="Price"

                                onChange={(e) => setPrice(e.target.value)}
                            >

                                <MenuItem value="">
                                    <em>All</em>
                                </MenuItem>
                                <MenuItem value="lowest">Low to high</MenuItem>
                                <MenuItem value="highest">High to low</MenuItem>



                            </Select>
                        </FormControl>
                    </Dropdownwrapper>






                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {
                            console.log(globalContext.user.cart)
                        }
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={globalContext.user.cart.length} color="error">
                                <Link to="/cart" style={{ color: 'white' }}>
                                    <ShoppingCartIcon />
                                </Link>
                            </Badge>
                        </IconButton>

                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>

                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Box>
    );
}
