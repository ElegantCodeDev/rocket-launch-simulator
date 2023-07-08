import React from "react";
import { Button, TextField, Grid, makeStyles } from "@mui/material";

const useStyles = makeStyles((theme) => ({
	form: {
		marginTop: theme.spacing(6),
	},
	field: {
		marginRight: theme.spacing(2),
	},
}));

const InputForm = ({ onCalculate }) => {
	const classes = useStyles();
	const [angle, setAngle] = React.useState(30);
	const [distance, setDistance] = React.useState(100);

	const handleSubmit = (event) => {
		event.preventDefault();
		onCalculate(angle, distance);
	};
	return (
		<form onSubmit={handleSubmit} className={classes.form}>
			<Grid container spacing={3}>
				<Grid item>
					<TextField
						label="Launch Angle (degrees)"
						type="number"
						value={angle}
						onChange={(e) => setAngle(e.target.value)}
						className={classes.field}
					/>
				</Grid>
				<Grid item>
					<TextField
						label="Landing Distance (meters)"
						type="number"
						value={distance}
						onChange={(e) => setDistance(e.target.value)}
						className={classes.field}
					/>
				</Grid>
				<Grid item>
					<Button variant="contained" color="primary" type="submit">
						Launch
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};

export default InputForm;
