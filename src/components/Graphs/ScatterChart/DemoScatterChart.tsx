import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

// Dummy data: Ethnicity and AVG Membership scores
const scatterData = [
  { ethnicity: "Bangladeshi", avgMembership: 2.5, info: "Bangladeshi participants generally feel somewhat connected." },
  { ethnicity: "Cambodian and Chinese", avgMembership: 3.2, info: "High sense of community among Cambodian and Chinese participants." },
  { ethnicity: "Cantonese and Korean", avgMembership: 2.8, info: "Moderate sense of community." },
  { ethnicity: "Chinese", avgMembership: 3.1, info: "Chinese participants feel mostly connected." },
  { ethnicity: "Chinese and Jewish", avgMembership: 2.9, info: "Diverse backgrounds, moderate sense of community." },
  { ethnicity: "Chinese and Taiwanese", avgMembership: 3.3, info: "Strong sense of community among Chinese and Taiwanese participants." },
  { ethnicity: "Chinese and Vietnamese", avgMembership: 3.0, info: "Mostly connected." },
  { ethnicity: "Filipino", avgMembership: 3.5, info: "Highest sense of community observed among Filipino participants." },
  { ethnicity: "Chinese and White", avgMembership: 2.7, info: "Chinese and White participants feel somewhat connected." },
  { ethnicity: "Japanese and White", avgMembership: 3.1, info: "Japanese and White participants feel mostly connected." },
  { ethnicity: "Kazakhstan", avgMembership: 2.4, info: "Kazakhstan participants generally feel somewhat connected." },
  { ethnicity: "Korean", avgMembership: 3.2, info: "High sense of community among Korean participants." },
  { ethnicity: "Singaporean", avgMembership: 2.8, info: "Moderate sense of community among Singaporean participants." },
  { ethnicity: "Taiwanese", avgMembership: 3.0, info: "Mostly connected." },
  { ethnicity: "Taiwanese and Hong Kong", avgMembership: 2.9, info: "Moderate sense of community among Taiwanese and Hong Kong participants." },
  { ethnicity: "Vietnamese", avgMembership: 3.4, info: "Strong sense of community among Vietnamese participants." },
  { ethnicity: "Indian", avgMembership: 2.6, info: "Indian participants feel somewhat connected." },
  { ethnicity: "Japanese, German, and Dutch", avgMembership: 3.5, info: "Highest sense of community observed among mixed background participants." },
];

const ScatterPlot: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 1000;
    const height = 500;
    const margin = { top: 50, right: 50, bottom: 150, left: 50 };

    svg
      .attr('width', width)
      .attr('height', height)
      .style('background', '#f9f9f9')
      .style('margin', '50px')
      .style('overflow', 'visible');

    const x = d3.scaleBand()
      .domain(scatterData.map(d => d.ethnicity))
      .range([margin.left, width - margin.right])
      .padding(1);

    const y = d3.scaleLinear()
      .domain([0, 4]) // Adjust y-axis to scale from 0 to 4
      .range([height - margin.bottom, margin.top]);

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .attr("text-anchor", "end");

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    // Create a tooltip div that is hidden by default
    const tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background", "#fff")
      .style("border", "1px solid #ccc")
      .style("padding", "10px")
      .style("box-shadow", "0 0 10px rgba(0, 0, 0, 0.1)")
      .style("border-radius", "5px")
      .style("display", "none");

    svg.append("g")
      .selectAll("circle")
      .data(scatterData)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.ethnicity))
      .attr("cy", d => y(d.avgMembership))
      .attr("r", 5)
      .attr("fill", "steelblue")
      .on("mouseover", function (event, d) {
        tooltip
          .html(`<strong>${d.ethnicity}</strong><br/>${d.info}`)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 20) + "px")
          .style("display", "block");
      })
      .on("mousemove", function (event) {
        tooltip
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 20) + "px");
      })
      .on("mouseout", function () {
        tooltip.style("display", "none");
      });

    // Add x-axis label
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height - margin.bottom + 100)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text('Ethnicity');

    // Add y-axis label
    svg.append('text')
      .attr('x', -height / 2)
      .attr('y', margin.left - 40)
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text('AVG Membership');

    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', margin.top / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '20px')
      .style('font-weight', 'bold')
      .text('Scatter Plot of AVG Membership by Ethnicity');

  }, []);

  return <svg ref={svgRef}></svg>;
};

export default ScatterPlot;
