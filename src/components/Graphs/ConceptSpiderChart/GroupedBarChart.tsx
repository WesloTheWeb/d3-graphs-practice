import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

// ? This is taking in multiple responses from a "type" of student and then combining data
const studentsResponses = {
  "Chinese Student": [
    Array.from({ length: 24 }, () => Math.floor(Math.random() * 4)),
    Array.from({ length: 24 }, () => Math.floor(Math.random() * 4))
  ],
  "Filipino Student": [
    Array.from({ length: 24 }, () => Math.floor(Math.random() * 4)),
    Array.from({ length: 24 }, () => Math.floor(Math.random() * 4)),
    Array.from({ length: 24 }, () => Math.floor(Math.random() * 4))
  ],
  "Japanese Student": [
    Array.from({ length: 24 }, () => Math.floor(Math.random() * 4)),
    Array.from({ length: 24 }, () => Math.floor(Math.random() * 4))
  ],
  "Vietnamese Student": [
    Array.from({ length: 24 }, () => Math.floor(Math.random() * 4)),
    Array.from({ length: 24 }, () => Math.floor(Math.random() * 4))
  ],
  "Indian Student": [
    Array.from({ length: 24 }, () => Math.floor(Math.random() * 4)),
    Array.from({ length: 24 }, () => Math.floor(Math.random() * 4))
  ],
  "Korean Student": [
    Array.from({ length: 24 }, () => Math.floor(Math.random() * 4)),
    Array.from({ length: 24 }, () => Math.floor(Math.random() * 4))
  ],
  "Thai Student": [
    Array.from({ length: 24 }, () => Math.floor(Math.random() * 4))
  ],
  "Malaysian Student": [
    Array.from({ length: 24 }, () => Math.floor(Math.random() * 4)),
    Array.from({ length: 24 }, () => Math.floor(Math.random() * 4))
  ]
};

// ! Would an individual student score matter if we are not collecting identifiable information?
// ! and just want to know how that demographic feel the sense of community? Ask Albert.

const subscales = [
  "Reinforcement of Needs",
  "Membership",
  "Influence",
  "Shared Emotional Connection"
];

const processDataForGroupedBar = (responses) => {
  return Object.entries(responses).map(([demographic, answersList]) => {
    const aggregatedData = answersList.reduce((acc, answers) => {
      subscales.forEach((subscale, i) => {
        const subscaleAnswers = answers.slice(i * 6, (i + 1) * 6);
        const subscaleScore = subscaleAnswers.reduce((a, b) => a + b, 0);
        acc[subscale] = (acc[subscale] || 0) + subscaleScore;
      });
      return acc;
    }, {});
    
    subscales.forEach(subscale => {
      aggregatedData[subscale] /= answersList.length;
    });

    return {
      demographic,
      ...aggregatedData
    };
  });
};

const groupedBarData = processDataForGroupedBar(studentsResponses);

const GroupedBarChart: React.FC = () => {
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
      .domain(groupedBarData.map(d => d.demographic))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const x1 = d3
      .scaleBand()
      .domain(subscales)
      .range([0, x0.bandwidth()])
      .padding(0.05);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(groupedBarData, d => d3.max(subscales, key => d[key])) as number])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const color = d3.scaleOrdinal()
      .domain(subscales)
      .range(d3.schemeCategory10);

    svg.append("g")
      .selectAll("g")
      .data(groupedBarData)
      .enter()
      .append("g")
      .attr("transform", d => `translate(${x0(d.demographic)},0)`)
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

export default GroupedBarChart;
