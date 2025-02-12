import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import axios from "axios";
import { Paper, Typography } from "@mui/material";

const PieChart = () => {
  const svgRef = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/stocks");
        const timeSeries = response.data["Monthly Time Series"];

        const formattedData = Object.entries(timeSeries).map(([date, values]) => ({
          name: date,
          value: parseInt(values["5. volume"]),
        }));

        setData(formattedData.slice(0, 6));  
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

     const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

     const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

     const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

     const pie = d3.pie().value((d) => d.value);
    const arc = d3.arc().innerRadius(50).outerRadius(radius);

     const color = d3.scaleOrdinal(d3.schemeCategory10);

     g.selectAll("path")
      .data(pie(data))
      .join("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.name))
      .attr("stroke", "#fff")
      .attr("stroke-width", "2px")
      .append("title")
      .text((d) => `${d.data.name}: ${d.data.value.toLocaleString()}`);

     g.selectAll("text")
      .data(pie(data))
      .join("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", "white")
      .text((d) => d.data.name);
  }, [data]);

  return (
    <Paper sx={{ p: 2, height: 500, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h6" gutterBottom>
        Monthly Trading Volume
      </Typography>
      <svg ref={svgRef} width={400} height={400}></svg>
    </Paper>
  );
};

export default PieChart;
