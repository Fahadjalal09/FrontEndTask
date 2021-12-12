import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const pages = ['Home', 'Add Item', 'Checkout','Previous Order'];

const CustomAppBar = () => {
	const navigate = useNavigate();
	
	const handleChange = (page) => {
		if (page === "Home")
			navigate("/")
		else if (page === "Add Item")
			navigate("/additem")
		else if (page === "Previous Order")
			navigate("/previous_order")
		else
			navigate("/checkout")
	}
	
	const handleCart = () => {
		navigate("/cart")
	}
	
	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}
					>
						Redo Store
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
						{pages.map((page) => (
							<Button
								key={page}
								onClick={() => handleChange(page)}
								sx={{ my: 2, color: 'white', display: 'block' }}
							>
								{page}
							</Button>
						))}
					</Box>
					
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open Cart">
							<IconButton  sx={{ p: 0 }} onClick={handleCart}>
								<Avatar >
									<ShoppingCartIcon/>
								</Avatar>
							</IconButton>
						</Tooltip>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default CustomAppBar;
