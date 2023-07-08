const g = 9.81; // acceleration due to gravity in m/s^2

const calculateProjectilePath = (launchAngle, landingDistance) => {
	// Convert launch angle to radians
	const angleRadians = (Math.PI / 180) * launchAngle;

	// Calculate initial velocity
	const initialVelocity = Math.sqrt(
		(landingDistance * g) / Math.sin(2 * angleRadians)
	);

	// Calculate time of flight
	const timeOfFlight = (2 * initialVelocity * Math.sin(angleRadians)) / g;

	// Calculate the flight path
	const intervals = 100;
	const timeInterval = timeOfFlight / intervals;
	const xCoordinates = [];
	const yCoordinates = [];
	for (let i = 0; i <= intervals; i++) {
		const t = i * timeInterval;
		const x = initialVelocity * t * Math.cos(angleRadians);
		const y =
			initialVelocity * t * Math.sin(angleRadians) - 0.5 * g * t * t;
		xCoordinates.push(x);
		yCoordinates.push(y);
	}

	return {
		initialVelocity,
		timeOfFlight,
		xCoordinates,
		yCoordinates,
	};
};

export default calculateProjectilePath;
