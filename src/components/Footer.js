import React from "react";
import { Box, Typography, Container } from "@mui/material";
import universityLogo from "../assets/logo.png";

const Footer = () => {
	return (
		<Box
			sx={{
				backgroundColor: "#fafafa",
				marginTop: "auto",
				padding: "20px 0",
			}}
		>
			<Container maxWidth="sm">
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<img
						src={universityLogo}
						alt="University Logo"
						height="50"
					/>
					<Box sx={{ textAlign: "right" }}>
						<Typography variant="body1">
							Taine John Bambrough
						</Typography>
						<Typography variant="body1">
							Student number: 600997
						</Typography>
						<Typography variant="body1">Subject: MAT171</Typography>
					</Box>
				</Box>
			</Container>
		</Box>
	);
};

export default Footer;
