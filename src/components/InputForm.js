import React from "react";
import { Button, TextField, Grid } from "@mui/material";
import { styled } from "@mui/system";

const InputForm = ({ onCalculate }) => {
	const [angle, setAngle] = React.useState(30);
	const [distance, setDistance] = React.useState(100);

	const handleSubmit = (event) => {
		event.preventDefault();
		onCalculate(angle, distance);
	};

	const handleInputChange = (event) => {
		let value = event.target.value;
		if (value > 89) {
			value = 89;
		}
		setAngle(value);
	};

	return (
		<StyledForm onSubmit={handleSubmit}>
			<Grid container spacing={3}>
				<Grid item>
					<StyledField
						label="Launch Angle (degrees)"
						type="number"
						value={angle}
						onChange={(e) => handleInputChange(e)}
						inputProps={{ min: "0", max: "89", step: "1" }}
					/>
				</Grid>
				<Grid item>
					<StyledField
						label="Landing Distance (meters)"
						type="number"
						value={distance}
						onChange={(e) => setDistance(e.target.value)}
					/>
				</Grid>
				<Grid item>
					<Button variant="contained" color="primary" type="submit">
						Launch
					</Button>
				</Grid>
			</Grid>
		</StyledForm>
	);
};

const StyledForm = styled("form")(({ theme }) => ({
	marginTop: theme.spacing(8),
}));

const StyledField = styled(TextField)(({ theme }) => ({
	marginRight: theme.spacing(4),
}));

export default InputForm;
