import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from "@mui/material/Tooltip";
import Modal from '@mui/material/Modal';
import axios from "axios";
import makeStyles from "@mui/styles/makeStyles";
import AddItems from "../pages/addItems/AddItems";
import AddItemCard from "./AddItemCard";

const useStyles = makeStyles(theme => ({
	modal: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		boxShadow: 24,
		p: 4,
	},
}))

const CustomCard = (props) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	
	const handleDelete = (id) => {
		axios({
			method: "Delete",
			url: "items/" + id,
			data: {},
		}).then(res => {
			console.log(res);
		}).catch(err => {
			console.log("ERROR -> ", err);
		});
	}
	const handleSubmit =(data) =>{
		data = {...data, id:props.item.id}
		
		axios({
			method: "PUT",
			url: "items/"+props.item.id,
			data: data,
			headers: {
				'Content-Type': 'application/json',
			},
		}).then(res => {
			console.log(res);
		}).catch(err => {
			alert(err.message)
			console.log("ERROR -> ", err);
		});
		handleClose()
	}
	
	return (
		<div>
			<Card sx={{maxWidth: 345}}>
				<CardHeader
					action={
						[
							<Tooltip title="Edit">
								<IconButton onClick={handleOpen}>
									<EditIcon/>
								</IconButton>
							</Tooltip>,
							<Tooltip title="Delete">
								<IconButton onClick={() => handleDelete(props.item.id)}>
									<DeleteIcon/>
								</IconButton>
							</Tooltip>
						]
					}
					title={<Typography variant={"body2"}>{props.item.name}</Typography>}
					subheader={
							<div style={{display:"flex"}}>
								<Typography style={{marginRight:"30px"}} variant={"body2"}>id: {props.item.id}</Typography>
								<Typography variant={"body2"}>Price: {props.item.price}</Typography>
							</div>
					}
				/>
				<CardMedia
					component="img"
					height="194"
					image={props.item.img}
					alt={"product image: " + props.item.name}
				/>
				<CardActions disableSpacing>
					<Tooltip title="Add to Cart">
						<IconButton onClick={() => {
							props.addToCart(props.item)
						}}>
							<AddShoppingCartIcon/>
						</IconButton>
					</Tooltip>
				</CardActions>
			</Card>
			
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<div className={classes.modal}>
					<AddItemCard handle={handleSubmit}/>
				</div>
			</Modal>
		</div>
	);
}

export default CustomCard;
