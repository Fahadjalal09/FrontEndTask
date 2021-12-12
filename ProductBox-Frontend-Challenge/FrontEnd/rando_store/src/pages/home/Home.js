import React, {useEffect, useState} from "react";
import CustomAppBar from "../../components/AppBar";
import Grid from '@mui/material/Grid';
import axios from "axios";
import {Typography} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import CustomCard from "../../components/CustomCard";

const useStyles = makeStyles(theme => ({
	gridMargin:{
		margin:"0 10%",
	}
}))

const Home = (props) => {
	const [data, setData] = useState([]);
	const classes = useStyles();
	
	useEffect(()=>{
		axios({
			method: "GET",
			url: "items",
			data: {},
			headers: {
				'Content-Type': 'application/json',
			},
		}).then(res => {
			console.log(res);
			setData(res.data)
		}).catch(err => {
			console.log("ERROR -> ", err);
		});
	},[data])
	
	return (
		<div>
			<CustomAppBar/>
			<br/>
			<div className={classes.gridMargin}>
				<Grid container spacing={2}>
					{data.map(item =>{
						return(
							<Grid item xs={12} sm={6} md={4}>
								<CustomCard addToCart={props.addToCart} item={item}/>
							</Grid>
						)
					})}
				</Grid>
			</div>
			<br/><br/>
		</div>
	);
}

export default Home;
