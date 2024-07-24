import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

// Dummy data: Year and AVG Membership scores
const scatterDataByYear = [
  { year: "First Year", avgMembership: 2.5, info: "First-year students generally feel somewhat connected." },
  { year: "Second Year", avgMembership: 3.2, info: "High sense of community among second-year students." },
  { year: "Third Year", avgMembership: 2.8, info: "Moderate sense of community." },
  { year: "Fourth Year", avgMembership: 3.1, info: "Fourth-year students feel mostly connected." },
  { year: "Fifth Year", avgMembership: 2.9, info: "Fifth-year students have a diverse background, moderate sense of community." },
];

const ScatterPlotByYear: React.FC = () => {
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
      .domain(scatterDataByYear.map(d => d.year))
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
      .data(scatterDataByYear)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.year))
      .attr("cy", d => y(d.avgMembership))
      .attr("r", 5)
      .attr("fill", "steelblue")
      .on("mouseover", function (event, d) {
        tooltip
          .html(`<strong>${d.year}</strong><br/>${d.info}`)
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
      .text('Year');

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
      .text('Scatter Plot of AVG Membership by Year');

  }, []);

  return <svg ref={svgRef}></svg>;
};

export default ScatterPlotByYear;
