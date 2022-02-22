import { Typography, Container } from "@mui/material";
import React from "react";
import AboutUs from "../staticData/AboutUs";

const About = (props) => {
	return (
		<Container sx={{ marginBottom: "50px" }}>
			<Typography variant="h2" sx={{ fontWeight: "800" }}>
				About Us
			</Typography>
			<hr></hr>
			<Typography>{AboutUs[0]}</Typography>
			<Typography  variant="h6" sx={{display:'flex', justifyContent:'center'}}>{AboutUs[1]}</Typography>
		</Container>
	);
};

export default About;
