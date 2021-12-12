import React, {useState} from "react";
import Grid from "@mui/material/Grid";
import makeStyles from "@mui/styles/makeStyles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import {CardContent} from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

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
	price: 0,
	img: null,
};


const AddItemCard = (props) => {
	const classes = useStyles();
	const [formValues, setFormValues] = useState(defaultValues);
	const [selectedImage, setSelectedImage] = useState(null);
	
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
			props.handle(formValues)
			setFormValues(defaultValues)
			setSelectedImage(null)
		}
	};
	const handleInputImg = (e) => {
		handleImg(e.target.files[0])
	}
	const handleImg = (file) => {
		const fileReader = new FileReader();
		fileReader.onloadend = () => {
			const content = fileReader.result;
			setFormValues({
				...formValues,
				"img": content,
			});
			setSelectedImage(content)
		};
		fileReader.readAsDataURL(file)
	};
	
	return (
		<div>
			<br/><br/>
			<Card className={classes.gridMargin} sx={{maxWidth: 500}}>
				<CardHeader
					className={classes.gridBackground}
					title={<Typography style={{paddingTop:"10px"}} variant="h6">Add New Item</Typography>}
				/>
				<CardContent>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6} md={6}>
							<TextField
								name="name"
								label="Name"
								type="text"
								value={formValues.name}
								onChange={handleInputChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={6}>
							<TextField
								name="price"
								label="Price"
								type="number"
								value={formValues.price}
								onChange={handleInputChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<Button
								variant="outlined"
								component="label"
								startIcon={<AddPhotoAlternateIcon/>}
								style={{marginRight: "20px", width:"100%"}}
							>
								Upload Image
								<input
									type="file"
									hidden
									accept="image/*"
									onChange={handleInputImg}/>
							</Button>
						</Grid>
						{selectedImage && <Grid item xs={12}>
							<div style={{margin:"auto"}}>
								<img style={{marginLeft:"15%"}}  src={selectedImage} height="70%" width="70%" alt="Selected image"/>
							</div>
						</Grid>}
						<Grid item xs={12}>
							<Button
								className={classes.submitButton}
								variant={"contained"}
								onClick={handleSubmit}
							>Submit</Button>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
			<br/><br/>
		</div>
	);
}

export default AddItemCard;