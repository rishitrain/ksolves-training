import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import axios from "axios";
import { Paper, Typography, MenuItem, Select, FormControl } from "@mui/material";

const Graph = () => {
  const svgRef = useRef();
  const [data, setData] = useState([]);
  const [metaData, setMetaData] = useState({ symbol: "", information: "" });
  const [selectedMetric, setSelectedMetric] = useState("close"); // Default metric

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/stocks");

        const meta = response.data["Meta Data"];
        const timeSeries = response.data["Monthly Time Series"];

        setMetaData({
          symbol: meta["2. Symbol"],
          information: meta["1. Information"],
        });

        const formattedData = Object.entries(timeSeries).map(([date, values]) => ({
          date: new Date(date),
          open: parseFloat(values["1. open"]),
          high: parseFloat(values["2. high"]),
          low: parseFloat(values["3. low"]),
          close: parseFloat(values["4. close"]),
        }));

        setData(formattedData.reverse());
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 600, height = 300, margin = { top: 20, right: 30, bottom: 40, left: 50 };

    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => d.date))
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain([
        d3.min(data, d => d[selectedMetric]) * 0.9, 
        d3.max(data, d => d[selectedMetric]) * 1.1
      ])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3.line()
      .x(d => xScale(d.date))
      .y(d => yScale(d[selectedMetric]))
      .curve(d3.curveCatmullRom);

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).ticks(6).tickFormat(d3.timeFormat("%b %Y")));

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#3f51b5")
      .attr("stroke-width", 2)
      .attr("d", line);
    
  }, [data, selectedMetric]);

  return (
    <Paper sx={{ p: 2, height: 470, textAlign: "center" }}>
      <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
        {metaData.symbol} - {metaData.information}
      </Typography>

       <FormControl sx={{ minWidth: 50, mb: 2 }}>
       
        <Select value={selectedMetric} onChange={(e) => setSelectedMetric(e.target.value)}>
          <MenuItem value="open">Open</MenuItem>
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="close">Close</MenuItem>
        </Select>
      </FormControl>

      <svg ref={svgRef} width={600} height={600}></svg>
    </Paper>
  );
};

export default Graph;
