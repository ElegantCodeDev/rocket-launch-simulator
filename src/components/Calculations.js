import React from "react";
import { Typography, Grid } from "@material-ui/core";

const Calculations = ({ initialVelocity, timeOfFlight, maxHeight }) => {
	return (
		<Grid container spacing={3}>
			<Grid item>
				<Typography variant="subtitle1">
					Initial Speed: {initialVelocity.toFixed(2)} m/s
				</Typography>
			</Grid>
			<Grid item>
				<Typography variant="subtitle1">
					Maximum Height: {maxHeight.toFixed(2)} m
				</Typography>
			</Grid>
			<Grid item>
				<Typography variant="subtitle1">
					Travel Time: {timeOfFlight.toFixed(2)} s
				</Typography>
			</Grid>
		</Grid>
	);
};

export default Calculations;
