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
import TextField from "@mui/material/TextField";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles(theme => ({
	gridMargin: {
		margin: "auto",
	},
	gridBackground: {
		backgroundColor: "lightgray",
		padding: "0 10px 15px 50px",
	},
	gridItem: {
		width: "100% ",
	},
	submitButton: {
		width: "100%",
	}
}))

const defaultValues = {
	name: "",
	address:"",
	number:"",
	city:"",
};



//let rows = [];

const Checkout = (props) => {
	const classes = useStyles();
	const navigate = useNavigate();
	
	let {cartItem, addToPreviousOrder} = props;
	const [formValues, setFormValues] = useState(defaultValues);
	
	const [rows, setRows] = useState([])
	const [subTotal, setSubTotal] = useState(0);
	const [discount, setDiscount] = useState(0);
	
	function createData(image, name, quantity, price) {
		rows.push({image, name, quantity, price});
	}
	
	useEffect(() =>{
		//setRows([])
		cartItem.map((item)=>{
			createData(item.img, item.name, 1, item.price);
		})
	},[cartItem])
	
	useEffect(()=>{
		console.log("subtotal chageed", subTotal)
		let totalPrice = 0;
		rows.map((row) => {
			totalPrice += (row.price * row.quantity)
			setSubTotal(totalPrice);
		})
		
	},[subTotal])
	
	const handleInputChange = (e) => {
		const {name, value} = e.target;
		setFormValues({
			...formValues,
			[name]: value,
		});
	};
	
	const handleSubmit = () => {
		if (formValues.img === null || formValues.price === 0 || formValues.name === "")
		{
			alert("All Fields are Required!")
		}
		else {
			addToPreviousOrder(rows)
			setFormValues(defaultValues)
			setRows([])
			setSubTotal(0)
			navigate("/previous_order")
		}
	};
	
	return (
		<div>
			<CustomAppBar/>
			<br/>
			<div style={{margin:"0 10%"}}>
				<Box className={classes.gridMargin} sx={{flexGrow: 1}}>
					<Grid container spacing={2}>
						<Grid item xs={8}>
							<Card >
								<CardHeader
									className={classes.gridBackground}
									title={<Typography style={{paddingTop: "5px"}} variant="h6">Delivery Information</Typography>}
								/>
								<CardContent>
									<Grid container spacing={2}>
										<Grid item xs={12} sm={6} >
											<TextField
												style={{width:"100%"}}
												name="name"
												label="Name"
												type="text"
												value={formValues.name}
												onChange={handleInputChange}
											/>
										</Grid>
										<Grid item xs={12} sm={6} >
											<TextField
												style={{width:"100%"}}
												name="address"
												label="Address"
												type="text"
												value={formValues.address}
												onChange={handleInputChange}
											/>
										</Grid>
										<Grid item xs={12} sm={6} >
											<TextField
												style={{width:"100%"}}
												name="number"
												label="Number"
												type="text"
												value={formValues.number}
												onChange={handleInputChange}
											/>
										</Grid>
										<Grid item xs={12} sm={6} >
											<TextField
												style={{width:"100%"}}
												name="city"
												label="City"
												type="text"
												value={formValues.city}
												onChange={handleInputChange}
											/>
										</Grid>
										<Grid item xs={12}>
											<Button
												className={classes.submitButton}
												variant={"contained"}
												onClick={handleSubmit}
												disabled={subTotal <= 0}
											>Order</Button>
										</Grid>
									</Grid>
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
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</Box>
			</div>
		</div>
	);
}
export default Checkout;
