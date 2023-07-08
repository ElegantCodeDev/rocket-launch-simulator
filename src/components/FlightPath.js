import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { styled } from "@mui/system";

const FlightPath = ({ xCoordinates, yCoordinates, currentIndex }) => {
	const d3Container = useRef(null);

	useEffect(() => {
		if (xCoordinates && yCoordinates && d3Container.current) {
			const svg = d3.select(d3Container.current);
			svg.selectAll("*").remove();

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

			const xAxis = d3.axisBottom(xScale).ticks(5);
			const yAxis = d3.axisLeft(yScale).ticks(5);

			g.append("g")
				.attr("transform", "translate(0," + height + ")")
				.call(xAxis);

			g.append("g").call(yAxis);

			const line = d3
				.line()
				.x((d, i) => xScale(xCoordinates[i]))
				.y((d) => yScale(d));

			g.append("path")
				.datum(yCoordinates.slice(0, currentIndex + 1))
				.attr("fill", "none")
				.attr("stroke", "blue")
				.attr("stroke-width", 2)
				.attr("d", line);

			g.selectAll(".dot")
				.data([yCoordinates[currentIndex]])
				.join("circle")
				.attr("cx", (d, i) => xScale(xCoordinates[currentIndex]))
				.attr("cy", yScale)
				.attr("r", 6)
				.attr("fill", "red")
				.transition()
				.duration(500)
				.attr("r", 4);
		}
	}, [xCoordinates, yCoordinates, currentIndex]);

	return <StyledSvg ref={d3Container} />;
};

const StyledSvg = styled("svg")(({ theme }) => ({
	width: 750,
	height: 400,
	padding: theme.spacing(2),
}));

export default FlightPath;
