import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PieChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            d3.select(chartRef.current).selectAll("*").remove();

            const width = 450;
            const height = 450;
            const margin = 40;

            const radius = Math.min(width, height) / 2 - margin;

            const svg = d3.select(chartRef.current)
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", `translate(${width / 2}, ${height / 2})`);

            const data = {a: 9, b: 20, c: 30, d: 8, e: 12};

            const color = d3.scaleOrdinal()
                .domain(Object.keys(data))
                .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]);

            const pie = d3.pie()
                .value(d => d.value);

            const dataReady = pie(Object.entries(data).map(([key, value]) => ({ key, value })));

            svg
                .selectAll('pieces')
                .data(dataReady)
                .enter()
                .append('path')
                .attr('d', d3.arc()
                    .innerRadius(0)
                    .outerRadius(radius)
                )
                .attr('fill', d => color(d.data.key))
                .attr("stroke", "black")
                .style("stroke-width", "2px")
                .style("opacity", 0.7);
        }
    }, []);

    return <div ref={chartRef}></div>;
};

export default PieChart;