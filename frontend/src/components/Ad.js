import * as React from "react";
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	CardHeader,
	Button,
	Grid,
	Typography,
	Container,
} from "@mui/material/";
import "../App.css";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

function Ad({
	id,
	description,
	title,
	price,
	images,
	key,
	adCount
}) {
	console.log({ price });
	const image = images[0];
	const daily = price.daily;
	const weekly = price.weekly;
	const monthly = price.monthly;
	const imageWidth	= Math.floor(100/adCount)/100
	const subheader =
		" D:$" + daily + " W:$" + weekly + " M:$" + monthly;

	return (
		<ImageListItem key={key} sx={{ width: imageWidth, height: 300 , display:"flex", justifyContents:"center", alignItems:"center" }}>
			<div sx={{ width: imageWidth, height: "20%" , }}>
			<img
				src={image}
				loading="lazy"
				alt={title}
				id={id}
				// sx={{ maxHeight: "50%"}}
				/>
				</div>

			<ImageListItemBar
				title={title}
				subtitle={subheader}
				position="below"
				
			/>
		</ImageListItem>
	);
}

export default Ad;
