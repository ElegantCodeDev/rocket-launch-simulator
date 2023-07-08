import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	svgContainer: {
		width: 750,
		height: 400,
		padding: theme.spacing(2),
	},
}));

const FlightPath = ({ xCoordinates, yCoordinates, currentIndex }) => {
	const d3Container = useRef(null);
	const classes = useStyles();

	useEffect(() => {
		if (xCoordinates && yCoordinates && d3Container.current) {
			const svg = d3.select(d3Container.current);
			svg.selectAll("*").remove(); // This line removes all child elements of the svg

			const margin = { top: 10, right: 30, bottom: 30, left: 60 },
				width = 750 - margin.left - margin.right,
				height = 400 - margin.top - margin.bottom;

			const xScale = d3
				.scaleLinear()
				.domain([0, d3.max(xCoordinates)])
				.range([0, width]);

			const yScale = d3
				.scaleLinear()
				.domain([0, d3.max(yCoordinates)])
				.range([height, 0]);

			const g = svg
				.append("g")
				.attr(
					"transform",
					"translate(" + margin.left + "," + margin.top + ")"
				);

			// Define the axes
			const xAxis = d3.axisBottom(xScale).ticks(5);
			const yAxis = d3.axisLeft(yScale).ticks(5);

			// Add the axes to the svg
			g.append("g")
				.attr("transform", "translate(0," + height + ")")
				.call(xAxis);

			g.append("g").call(yAxis);

			// Add the path
			const line = d3
				.line()
				.x((d, i) => xScale(xCoordinates[i]))
				.y((d) => yScale(d));

			g.append("path")
				.datum(yCoordinates.slice(0, currentIndex + 1)) // Only include up to the current index
				.attr("fill", "none")
				.attr("stroke", "blue")
				.attr("stroke-width", 2)
				.attr("d", line);

			// Add a marker for the current position
			g.selectAll(".dot")
				.data([yCoordinates[currentIndex]]) // Only include the current index
				.join("circle")
				.attr("cx", (d, i) => xScale(xCoordinates[currentIndex]))
				.attr("cy", yScale)
				.attr("r", 6) // Increase the size of the marker
				.attr("fill", "red") // Change the color of the marker
				.transition() // Start a transition
				.duration(500) // The transition lasts 500ms
				.attr("r", 4); // The marker shrinks back to its original size
		}
	}, [xCoordinates, yCoordinates, currentIndex]);

	return <svg ref={d3Container} className={classes.svgContainer} />;
};

export default FlightPath;
