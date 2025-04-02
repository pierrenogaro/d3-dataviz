import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            d3.select(chartRef.current).selectAll("*").remove();
        }

        const margin = {top: 10, right: 30, bottom: 30, left: 60},
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        const svg = d3.select(chartRef.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv")
            .then((rawData) => {
                // Parse the data
                const data = rawData.map(d => ({
                    date: d3.timeParse("%Y-%m-%d")(d.date),
                    value: +d.value
                }));

                const x = d3.scaleTime()
                    .domain(d3.extent(data, d => d.date))
                    .range([0, width]);
                svg.append("g")
                    .attr("transform", `translate(0,${height})`)
                    .call(d3.axisBottom(x));

                const max = d3.max(data, d => d.value);
                const y = d3.scaleLinear()
                    .domain([0, max])
                    .range([height, 0]);
                svg.append("g")
                    .call(d3.axisLeft(y));

                const gradient = svg.append("linearGradient")
                    .attr("id", "line-gradient")
                    .attr("gradientUnits", "userSpaceOnUse")
                    .attr("x1", 0)
                    .attr("y1", height)
                    .attr("x2", 0)
                    .attr("y2", 0);

                gradient.selectAll("stop")
                    .data([
                        {offset: "0%", color: "blue"},
                        {offset: "100%", color: "red"}
                    ])
                    .enter().append("stop")
                    .attr("offset", d => d.offset)
                    .attr("stop-color", d => d.color);

                const line = d3.line()
                    .x(d => x(d.date))
                    .y(d => y(d.value));

                svg.append("path")
                    .datum(data)
                    .attr("fill", "none")
                    .attr("stroke", "url(#line-gradient)")
                    .attr("stroke-width", 2)
                    .attr("d", line);
            })
            .catch((error) => {
                console.error("Error loading the CSV file:", error);
            });
    }, []);

    return <div ref={chartRef}></div>;
};



export default LineChart;