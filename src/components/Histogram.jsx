import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const Histogram = () => {
    const svgRef = useRef(null);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://alcool-api.pierrenogaro.com/alcools/all')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
            })
            .catch(error => {
                setError(error.message);
            });
    }, []);

    useEffect(() => {
        const width = 1000;
        const height = 600;


        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height);

        const x = d3.scaleBand()
            .domain(data.map(d => d.name))
            .range([50, width - 20])
            .padding(0.2);

        const maxDegree = Math.max(...data.map(d => parseFloat(d.degree) || 0)) + 5;

        const y = d3.scaleLinear()
            .domain([0, maxDegree])
            .range([height - 30, 20]);

        svg.selectAll('rect')
            .data(data)
            .join('rect')
            .attr('x', d => x(d.name))
            .attr('y', d => y(parseFloat(d.degree) || 0))
            .attr('width', x.bandwidth())
            .attr('height', d => height - 30 - y(parseFloat(d.degree) || 0))
            .attr('fill', 'steelblue');

        svg.selectAll('.name-text')
            .data(data)
            .join('text')
            .attr('class', 'name-text')
            .attr('x', d => x(d.name) + x.bandwidth() / 2)
            .attr('y', height - 10)
            .attr('text-anchor', 'middle')
            .text(d => d.name);

        svg.append('g')
            .attr('transform', 'translate(50,0)')
            .call(d3.axisLeft(y));
    }, [data, error]);

    return (
        <div className="w-full flex flex-col items-center">
            <h3 className='text mb-4'>Histogram</h3>
            <svg ref={svgRef} className="w-full max-w-xl"></svg>
        </div>
    );
};

export default Histogram;