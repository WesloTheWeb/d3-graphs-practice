import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

// const studentResponses = {
//   "Chinese Student": [
//     2, 1, 3, 2, 1, 2,  // Q1 - Q6: Reinforcement of Needs
//     1, 3, 2, 3, 1, 2,  // Q7 - Q12: Membership
//     2, 1, 3, 2, 1, 3,  // Q13 - Q18: Influence
//     1, 2, 3, 1, 2, 3   // Q19 - Q24: Shared Emotional Connection
//   ],
//   "Filipino Student": [
//     3, 2, 2, 3, 2, 3,  // Q1 - Q6: Reinforcement of Needs
//     2, 2, 3, 2, 3, 2,  // Q7 - Q12: Membership
//     3, 2, 2, 3, 2, 3,  // Q13 - Q18: Influence
//     2, 3, 3, 2, 3, 2   // Q19 - Q24: Shared Emotional Connection
//   ],
//   "Japanese Student": [
//     1, 2, 1, 2, 1, 2,  // Q1 - Q6: Reinforcement of Needs
//     2, 1, 2, 1, 2, 1,  // Q7 - Q12: Membership
//     1, 2, 1, 2, 1, 2,  // Q13 - Q18: Influence
//     2, 1, 2, 1, 2, 1   // Q19 - Q24: Shared Emotional Connection
//   ],
//   "Vietnamese Student": [
//     2, 3, 2, 3, 2, 3,  // Q1 - Q6: Reinforcement of Needs
//     3, 2, 3, 2, 3, 2,  // Q7 - Q12: Membership
//     2, 3, 2, 3, 2, 3,  // Q13 - Q18: Influence
//     3, 2, 3, 2, 3, 2   // Q19 - Q24: Shared Emotional Connection
//   ]
// };

const studentResponses = {
    "Chinese Student": Array.from({ length: 24 }, () => Math.floor(Math.random() * 4)),
    "Filipino Student": Array.from({ length: 24 }, () => Math.floor(Math.random() * 4)),
    "Japanese Student": Array.from({ length: 24 }, () => Math.floor(Math.random() * 4)),
    "Vietnamese Student": Array.from({ length: 24 }, () => Math.floor(Math.random() * 4)),
    "Indian Student": Array.from({ length: 24 }, () => Math.floor(Math.random() * 4)),
    "Korean Student": Array.from({ length: 24 }, () => Math.floor(Math.random() * 4)),
    "Thai Student": Array.from({ length: 24 }, () => Math.floor(Math.random() * 4)),
    "Malaysian Student": Array.from({ length: 24 }, () => Math.floor(Math.random() * 4))
  };

const subscales = [
  "Reinforcement of Needs",
  "Membership",
  "Influence",
  "Shared Emotional Connection"
];

const processData = (responses) => {
  return Object.entries(responses).map(([student, answers]) => {
    const studentData = {
      name: student,
      "Reinforcement of Needs": answers.slice(0, 6).reduce((a, b) => a + b, 0),
      "Membership": answers.slice(6, 12).reduce((a, b) => a + b, 0),
      "Influence": answers.slice(12, 18).reduce((a, b) => a + b, 0),
      "Shared Emotional Connection": answers.slice(18, 24).reduce((a, b) => a + b, 0)
    };
    return studentData;
  });
};

const data = processData(studentResponses);

const ConceptSpiderChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 500;
    const margin = { top: 50, right: 150, bottom: 50, left: 50 };

    svg
      .attr('width', width)
      .attr('height', height)
      .style('background', '#f0f0f0')
      .style('margin', '50px')
      .style('overflow', 'visible');

    const x0 = d3
      .scaleBand()
      .domain(data.map(d => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const x1 = d3
      .scaleBand()
      .domain(subscales)
      .range([0, x0.bandwidth()])
      .padding(0.05);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d3.max(subscales, key => d[key])) as number])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const color = d3.scaleOrdinal()
      .domain(subscales)
      .range(d3.schemeCategory10);

    svg.append("g")
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", d => `translate(${x0(d.name)},0)`)
      .selectAll("rect")
      .data(d => subscales.map(key => ({ key, value: d[key] })))
      .enter()
      .append("rect")
      .attr("x", d => x1(d.key))
      .attr("y", d => y(d.value))
      .attr("width", x1.bandwidth())
      .attr("height", d => y(0) - y(d.value))
      .attr("fill", d => color(d.key));

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x0).tickSizeOuter(0));

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    // Add header
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', margin.top / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '20px')
      .style('font-weight', 'bold')
      .style('fill', 'black')
      .text('Sense of Community Index Scores Comparison');

    // Add legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width - margin.right + 20}, ${margin.top})`);

    legend.selectAll('rect')
      .data(subscales)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', (d, i) => i * 20)
      .attr('width', 18)
      .attr('height', 18)
      .attr('fill', d => color(d));

    legend.selectAll('text')
      .data(subscales)
      .enter()
      .append('text')
      .attr('x', 24)
      .attr('y', (d, i) => i * 20 + 9)
      .attr('dy', '0.35em')
      .text(d => d)
      .style('font-size', '12px')
      .style('fill', 'black');

  }, []);

  return <svg ref={svgRef}></svg>;
};

export default ConceptSpiderChart;
