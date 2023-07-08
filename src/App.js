// src/App.js

import React, { useState, useEffect } from "react";
import {
	Container,
	Typography,
	Paper,
	Grid,
	makeStyles,
} from "@material-ui/core";
import InputForm from "./components/InputForm";
import FlightPath from "./components/FlightPath";
import FlightData from "./components/FlightData";
import calculateProjectilePath from "./utils/calculateProjectilePath";

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
		margin: "auto",
	},
	simulator: {
		padding: theme.spacing(2),
		marginTop: theme.spacing(2),
	},
}));

function App() {
	const classes = useStyles();
	const [flightData, setFlightData] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [angle, setAngle] = React.useState(30);

	const handleCalculate = (angle, distance) => {
		const data = calculateProjectilePath(angle, distance);

		setFlightData(data);
		setAngle(angle);
		setCurrentIndex(0); // Reset the current index when new data is calculated
	};

	useEffect(() => {
		if (flightData) {
			const timer = setInterval(() => {
				setCurrentIndex((currentIndex) => currentIndex + 1);
			}, (flightData.timeOfFlight * 1000) / flightData.xCoordinates.length); // Update the index at a fixed interval

			// Stop the timer when it reaches the end of the flight path
			if (currentIndex >= flightData.xCoordinates.length - 1) {
				clearInterval(timer);
			}

			// Clean up the timer when the component is unmounted or when the flight data changes
			return () => clearInterval(timer);
		}
	}, [flightData, currentIndex]);

	useEffect(() => {
		console.log("flightData", flightData);
	}, [flightData]);

	return (
		<Container className={classes.root}>
			<Typography variant="h4" align="center">
				Rocket Launch Simulator
			</Typography>
			<InputForm onCalculate={handleCalculate} />

			{flightData && (
				<Grid container spacing={3} className={classes.simulator}>
					<Grid item xs={8}>
						<Paper elevation={3}>
							<FlightPath
								xCoordinates={flightData.xCoordinates}
								yCoordinates={flightData.yCoordinates}
								currentIndex={currentIndex}
							/>
						</Paper>
					</Grid>
					<Grid item xs={4}>
						<FlightData
							initialVelocity={flightData.initialVelocity}
							launchAngle={angle}
							currentIndex={currentIndex}
							xCoordinates={flightData.xCoordinates}
							yCoordinates={flightData.yCoordinates}
							flightData={flightData}
						/>
					</Grid>
				</Grid>
			)}
		</Container>
	);
}

export default App;
