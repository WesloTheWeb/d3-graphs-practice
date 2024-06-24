import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const responses = [
  2, 1, 3, 2, 1, 2,  // Q1 - Q6: Reinforcement of Needs
  1, 3, 2, 3, 1, 2,  // Q7 - Q12: Membership
  2, 1, 3, 2, 1, 3,  // Q13 - Q18: Influence
  1, 2, 3, 1, 2, 3   // Q19 - Q24: Shared Emotional Connection
];

const subscales = {
  "Reinforcement of Needs": responses.slice(0, 6).reduce((a, b) => a + b, 0),
  "Membership": responses.slice(6, 12).reduce((a, b) => a + b, 0),
  "Influence": responses.slice(12, 18).reduce((a, b) => a + b, 0),
  "Shared Emotional Connection": responses.slice(18, 24).reduce((a, b) => a + b, 0)
};

const data = Object.keys(subscales).map(key => ({
  name: key,
  value: subscales[key]
}));

const ConceptBarChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    svg
      .attr('width', width)
      .attr('height', height)
      .style('background', '#f0f0f0')
      .style('margin', '50px')
      .style('overflow', 'visible');

    const x = d3
      .scaleBand()
      .domain(data.map(d => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.value) as number])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg
      .append('g')
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.name) as number)
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => y(0) - y(d.value))
      .attr('fill', 'steelblue');

       // Add header
    svg.append('text')
    .attr('x', width / 2)
    .attr('y', margin.top / 2 - 20) // Adjust the -20 to add padding
    .attr('text-anchor', 'middle')
    .style('font-size', '20px')
    .style('font-weight', 'bold')
    .style('fill', 'white')
    .text(`Chinese Student's responses`);

  // Add legend
  const legend = svg.append('g')
    .attr('transform', `translate(${width - margin.right + 20}, ${margin.top})`);

  const legendItems = data.map(d => d.name);
  const legendColors = d3.scaleOrdinal()
    .domain(legendItems)
    .range(d3.schemeCategory10);

  legend.selectAll('rect')
    .data(legendItems)
    .enter()
    .append('rect')
    .attr('x', 0)
    .attr('y', (d, i) => i * 20)
    .attr('width', 18)
    .attr('height', 18)
    .attr('fill', d => legendColors(d) as string);

  legend.selectAll('text')
    .data(legendItems)
    .enter()
    .append('text')
    .attr('x', 24)
    .attr('y', (d, i) => i * 20 + 9)
    .attr('dy', '0.35em')
    .text(d => d)
    .style('fill', 'white')
    .style('font-size', '12px');

  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default ConceptBarChart;
