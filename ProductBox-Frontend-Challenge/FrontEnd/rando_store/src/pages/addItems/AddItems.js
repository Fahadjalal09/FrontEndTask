import React from "react";
import CustomAppBar from "../../components/AppBar";
import axios from "axios";
import AddItemCard from "../../components/AddItemCard";

const AddItems = () => {
	const handleSubmit = (data) => {
		axios({
			method: "POST",
			url: "items",
			data: data,
			headers: {
				'Content-Type': 'application/json',
			},
		}).then(res => {
			console.log("API RESPONSE -> ", res);
		}).catch(err => {
			alert(err.message)
			console.log("ERROR -> ", err);
		});
	}
	return (
		<div>
			<CustomAppBar/>
			<AddItemCard handle={handleSubmit}/>
		</div>
	);
}

export default AddItems;