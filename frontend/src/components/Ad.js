import * as React from "react";
import { NavLink } from "react-router-dom";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Box, sizing } from "@mui/system";
import { Link } from "react-router-dom";


function Ad({
	ad,
	id,
	description,
	title,
	price,
	images,
	key,
	adCount,
}) {
	console.log({ price });
	const image = images[0];
	const daily = price.daily;
	const weekly = price.weekly;
	const monthly = price.monthly;
	const imageWidth = 2 / adCount;
	const textwidth = 4 / adCount;

	const subheader =
		"D:$" + daily + "W:$" + weekly + "M:$" + monthly;

	return (
		<Card sx={{ width: imageWidth, maxHeight:1, display: 'flex',flex:1 }}>
      <NavLink to={`/listings/${id}`}>
			<CardActionArea>
      <NavLink to={`/listings/${id}`} className='nav-link' />
      <Box sx={{ maxeight:"md", display: 'inline-flex',flex:1 }}>
				<CardMedia
            component="img"
            height="auto"
            image={image}
            alt={title}
            sx={{maxHeight:150}}
          />
        </Box>
				<CardContent>
					<Typography
						gutterBottom
						variant="h7"
						component="div"
					>
						{title}
					</Typography>
					<Typography
						variant="body2"
						color="text.secondary"
					>
						{subheader}
					</Typography>
				</CardContent>
			</CardActionArea>
      </NavLink>
		</Card>
	);
}

export default Ad;
