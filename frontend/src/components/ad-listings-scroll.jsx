import React, { useEffect, useState } from "react";
import ListingsDataService from "../services/listings";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Carousel from "react-material-ui-carousel";
import { Box } from "@mui/system";
import { ListSubheader } from "@mui/material";

const AdListingsScroll = (props) => {
	const [listings, setListings] = useState([]);
	const [scroll, setScroll] = useState([]);

	useEffect(() => {
		retrieveListings();
	}, []);

	const retrieveListings = () => {
		ListingsDataService.getAll()
			.then((response) => {
				setListings(response.data.listings);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	return (
		<Box sx={{ height: "100%", width: "100%", margin: 10 }}>
			<ImageListItem key="Subheader" cols={2}>
				<ListSubheader component="div">
					<h4>Recent Jams</h4>
				</ListSubheader>
			</ImageListItem>
			<Carousel sx={{ height: "100%", width: "100%" }}>
				<div className="row">
					{listings.slice(0, 8).map((item) => (
						<ImageListItem
							key={item.images[0]}
							sx={{ height: "25%", width: "25%" }}
						>
							<div className="col-lg-4 pb-2">
								<div className="card">
									<img
										src={`${item.images[0]}?w=248&fit=crop&auto=format`}
										srcSet={`${item.images[0]}?w=248&fit=crop&auto=format&dpr=2 2x`}
										alt={item.title}
										loading="lazy"
									/>
									<ImageListItemBar
										title={item.title}
										subtitle={item.author}
										actionIcon={
											<IconButton
												sx={{
													color:
														"rgba(255, 255, 255, 0.54)",
												}}
												aria-label={`info about ${item.title}`}
											>
												<InfoIcon />
											</IconButton>
										}
									/>
								</div>
							</div>
						</ImageListItem>
					))}
				</div>
			</Carousel>
		</Box>
	);
};

export default AdListingsScroll;
