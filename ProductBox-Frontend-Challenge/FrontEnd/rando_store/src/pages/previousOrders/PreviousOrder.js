import * as React from 'react';
import {useEffect} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CustomAppBar from "../../components/AppBar";
import makeStyles from "@mui/styles/makeStyles";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import {CardContent, Divider} from "@mui/material";
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
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles(theme => ({
	gridMargin: {
		margin: "0 10%",
	},
	gridBackground: {
		backgroundColor: "lightgray",
		padding: "0 10px 15px 50px",
	},
}))

let rows = [];

const PreviousOrder = (props) => {
	const classes = useStyles();
	const navigate = useNavigate();
	
	const {previousOrder} = props;
	
	
	useEffect(() => {
		rows = []
		previousOrder.map((item) => {
			item.map((product) => {
				rows.push(product)
			})
		})
	}, [])
	
	return (
		<div>
			<CustomAppBar/>
			<br/>
			<Box className={classes.gridMargin} sx={{flexGrow: 1}}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Card>
							<CardHeader
								className={classes.gridBackground}
								title={<Typography style={{paddingTop: "5px"}} variant="h6">Previous purchased Items</Typography>}
							/>
							{previousOrder.length > 0 ? <CardContent>
									<TableContainer>
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
												{
													previousOrder.map((previousOrderItem) => (
														
														previousOrderItem.map((row) => (
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
																	{row.quantity}
																</TableCell>
																<TableCell align="center">{row.price}</TableCell>
															</TableRow>
														))
													))
												}
											</TableBody>
											
											
										</Table>
									</TableContainer>
								</CardContent> :
								<Typography style={{margin: "10px"}}>This is your first order, There is no previous
									record available.</Typography>}
						</Card>
					</Grid>
				</Grid>
			</Box>
		</div>
	);
}
export default PreviousOrder;
