import React, { useState, useEffect } from "react";
import { Container, Typography, Paper, Grid, Box } from "@mui/material";
import InputForm from "./components/InputForm";
import FlightPath from "./components/FlightPath";
import FlightData from "./components/FlightData";
import calculateProjectilePath from "./utils/calculateProjectilePath";
import Footer from "./components/Footer";

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
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}
		>
			<Container sx={{ marginTop: "20px" }}>
				<Typography
					variant="h4"
					align="center"
					sx={{ marginBottom: "20px" }}
				>
					Rocket Launch Simulator
				</Typography>
				<InputForm onCalculate={handleCalculate} />

				{flightData && (
					<Grid container spacing={3} sx={{ marginTop: "20px" }}>
						<Grid item xs={8}>
							<Typography variant="h6">Flight Path:</Typography>
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
			<Footer />
		</Box>
	);
}

export default App;
