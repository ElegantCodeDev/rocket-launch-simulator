import React, { useState, useEffect } from "react";
import { Container, Typography, Paper, Grid } from "@mui/material";
import { styled } from "@mui/system";
import InputForm from "./components/InputForm";
import FlightPath from "./components/FlightPath";
import FlightData from "./components/FlightData";
import calculateProjectilePath from "./utils/calculateProjectilePath";

function App() {
	const [flightData, setFlightData] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [angle, setAngle] = React.useState(30);

	const handleCalculate = (angle, distance) => {
		const data = calculateProjectilePath(angle, distance);

		setFlightData(data);
		setAngle(angle);
		setCurrentIndex(0);
	};

	useEffect(() => {
		if (flightData) {
			const timer = setInterval(() => {
				setCurrentIndex((currentIndex) => currentIndex + 1);
			}, (flightData.timeOfFlight * 1000) / flightData.xCoordinates.length);

			if (currentIndex >= flightData.xCoordinates.length - 1) {
				clearInterval(timer);
			}

			return () => clearInterval(timer);
		}
	}, [flightData, currentIndex]);

	useEffect(() => {
		console.log("flightData", flightData);
	}, [flightData]);

	return (
		<RootContainer>
			<Typography variant="h4" align="center">
				Rocket Launch Simulator
			</Typography>
			<InputForm onCalculate={handleCalculate} />

			{flightData && (
				<Grid container spacing={2} mt={2}>
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
		</RootContainer>
	);
}

const RootContainer = styled(Container)(({ theme }) => ({
	padding: 10,
	margin: "auto",
}));

export default App;
