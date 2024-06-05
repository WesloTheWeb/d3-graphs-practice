import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BarChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const data = [12, 36, 6, 25, 35, 10, 20];

    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', '#f0f0f0')
      .style('margin', '50px')
      .style('overflow', 'visible');

    const xScale = d3.scaleBand()
      .domain(data.map((value, index) => index.toString()))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data) as number])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickFormat((d, i) => `Label ${i + 1}`));

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

    svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => xScale(i.toString()) as number)
      .attr('y', d => yScale(d))
      .attr('width', xScale.bandwidth())
      .attr('height', d => yScale(0) - yScale(d))
      .attr('fill', 'steelblue');
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default BarChart;
