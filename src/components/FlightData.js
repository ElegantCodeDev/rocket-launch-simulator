import React from "react";
import { Typography, Box, Divider } from "@material-ui/core";

const FlightData = ({
	initialVelocity,
	launchAngle,
	currentIndex,
	xCoordinates,
	yCoordinates,
	flightData,
}) => {
	const currentHeight = yCoordinates && yCoordinates[currentIndex];
	const totalDistance = xCoordinates && xCoordinates[xCoordinates.length - 1];
	const totalTravelTime = flightData && flightData.timeOfFlight;
	const averageVelocity = totalDistance / totalTravelTime;
	const acceleration = 9.8;

	return (
		<Box
			sx={{
				padding: 2,
				bgcolor: "background.paper",
				borderRadius: 1,
				marginTop: 2,
				marginBottom: 2,
			}}
		>
			<Typography variant="h6" sx={{ mb: 2 }}>
				Pre-Flight Data:
			</Typography>
			<Typography variant="body1">
				Launch Angle: {launchAngle} degrees
			</Typography>
			<Typography variant="body1" sx={{ mb: 2 }}>
				Initial Speed:{" "}
				{initialVelocity ? initialVelocity.toFixed(2) : "N/A"} m/s
			</Typography>
			<Divider sx={{ my: 2 }} />

			<Typography variant="h6" sx={{ mb: 2 }}>
				Live Flight Data:
			</Typography>
			<Typography variant="body1">
				Current Height:{" "}
				{currentHeight ? currentHeight.toFixed(2) : "N/A"} m
			</Typography>
			<Typography variant="body1" sx={{ mb: 2 }}>
				Travel Time:{" "}
				{flightData && currentIndex
					? (
							(currentIndex / flightData.xCoordinates.length) *
							flightData.timeOfFlight
					  ).toFixed(2)
					: "N/A"}{" "}
				s
			</Typography>
			<Divider sx={{ my: 2 }} />

			<Typography variant="h6" sx={{ mb: 2 }}>
				Post-Flight Data:
			</Typography>
			<Typography variant="body1">
				Maximum Height:{" "}
				{yCoordinates ? Math.max(...yCoordinates).toFixed(2) : "N/A"} m
			</Typography>
			<Typography variant="body1">
				Total Travel Time:{" "}
				{totalTravelTime ? totalTravelTime.toFixed(2) : "N/A"} s
			</Typography>
			<Typography variant="body1">
				Total Distance:{" "}
				{totalDistance ? totalDistance.toFixed(2) : "N/A"} m
			</Typography>
			<Typography variant="body1">
				Average Velocity:{" "}
				{averageVelocity ? averageVelocity.toFixed(2) : "N/A"} m/s
			</Typography>
			<Typography variant="body1">
				Acceleration: {acceleration.toFixed(2)} m/s^2
			</Typography>
		</Box>
	);
};

export default FlightData;
