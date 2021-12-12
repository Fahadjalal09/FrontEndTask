import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CustomAppBar from "../../components/AppBar";
import makeStyles from "@mui/styles/makeStyles";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import {CardContent} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from "@mui/material/Card";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const Item = styled(Paper)(({theme}) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));


const useStyles = makeStyles(theme => ({
	gridMargin: {
		margin: "0 10%",
	},
	gridBackground: {
		backgroundColor: "lightgray",
		padding: "0 10px 15px 50px",
	},
}))

function createData(image, name, quantity, price) {
	rows.push({image, name, quantity, price});
}

let rows = [];

const Cart = (props) => {
	const classes = useStyles();
	const navigate = useNavigate();
	
	let {cartItem} = props;
	
	const [subTotal, setSubTotal] = useState(0);
	const [discount, setDiscount] = useState(0);
	
	useEffect(() =>{
		rows =[]
		cartItem && cartItem.map((item)=>{
			createData(item.img, item.name, 1, item.price);
		})
	},[cartItem])
	
	useEffect(()=>{
		let totalPrice = 0;
		rows.map((row) => {
			totalPrice += (row.price * row.quantity)
			setSubTotal(totalPrice);
		})
		
	},[])
	
	const handleProceedToCheckOut = () => {
		navigate("/checkout");
	}
	
	return (
		<div>
			<CustomAppBar/>
			<br/>
			<Box className={classes.gridMargin} sx={{flexGrow: 1}}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12} md={8}>
						<Card sx={{maxWidth: "100%"}}>
							<CardHeader
								className={classes.gridBackground}
								title={<Typography style={{paddingTop: "5px"}} variant="h6">Cart Items</Typography>}
							/>
							<CardContent>
								{cartItem.length > 0 ?<TableContainer>
									<Table sx={{minWidth: 650}} aria-label="simple table">
										<TableHead>
											<TableRow>
												<TableCell align="center">Image</TableCell>
												<TableCell align="center">Name</TableCell>
												<TableCell align="center">Quantity</TableCell>
												<TableCell align="center">Price per item</TableCell>
											</TableRow>
										</TableHead>
										
										 <TableBody>
											{rows.map((row) => (
												<TableRow
													key={row.name}
													sx={{'&:last-child td, &:last-child th': {border: 0}}}
												>
													<TableCell align="center" component="th" scope="row">
														<img height="50px" width="50px" src={row.image}
															 alt={"alt " + row.name}/>
													</TableCell>
													
													<TableCell align="center">{row.name}</TableCell>
													
													<TableCell align="center">
														<IconButton size={"small"} style={{border: "1px solid gray"}}>
															<RemoveIcon/>
														</IconButton>
														&nbsp;&nbsp;&nbsp;{row.quantity}&nbsp;&nbsp;&nbsp;
														<IconButton size={"small"} style={{border: "1px solid gray"}}>
															<AddIcon/>
														</IconButton>
													</TableCell>
													
													<TableCell align="center">{row.price}</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>:"Cart is empty!"}
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} sm={12} md={4}>
						<Card sx={{maxWidth: "100%"}}>
							<CardHeader
								title={<Typography style={{paddingTop: "5px"}} variant="h6">Order Summary</Typography>}
							/>
							<Divider/>
							<CardContent>
								<Grid container spacing={2}>
									<Grid item container spacing={2}>
										<Grid style={{flexGrow:"1"}}item sx={8}>
											Subtotal
										</Grid>
										<Grid  item sx={4}>
											Rs. {subTotal}
										</Grid>
									</Grid>
									
									<Grid item container spacing={2}>
										<Grid style={{flexGrow:"1"}}item sx={8}>
											Discount
										</Grid>
										<Grid  item sx={4}>
											Rs. {discount}
										</Grid>
									</Grid>
								</Grid>
								<br/><Divider/><br/>
								<Grid container spacing={2}>
									<Grid style={{flexGrow:"1"}}item sx={8}>
										Total
									</Grid>
									<Grid  item sx={4}>
										Rs. {subTotal-discount}
									</Grid>
								</Grid>
								<br/><Divider/><br/>
								<Button
									style={{width:"100%"}}
									variant={"contained"}
									onClick={handleProceedToCheckOut}
									disabled={subTotal <= 0}
								>Proceed to Checkout</Button>
								
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Box>
		</div>
	);
}
export default Cart;
