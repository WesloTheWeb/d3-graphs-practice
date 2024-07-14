import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

// Dummy data: Ethnicity and AVG scores for each subscale
const scatterData = [
  { ethnicity: "Bangladeshi", avgReinforcement: 2.5, avgInfluence: 2.7, avgSharedEmotional: 2.4, info: "Bangladeshi participants generally feel somewhat connected." },
  { ethnicity: "Cambodian and Chinese", avgReinforcement: 3.2, avgInfluence: 3.1, avgSharedEmotional: 3.3, info: "High sense of community among Cambodian and Chinese participants." },
  { ethnicity: "Cantonese and Korean", avgReinforcement: 2.8, avgInfluence: 2.9, avgSharedEmotional: 2.6, info: "Moderate sense of community." },
  { ethnicity: "Chinese", avgReinforcement: 3.1, avgInfluence: 3.2, avgSharedEmotional: 3.1, info: "Chinese participants feel mostly connected." },
  { ethnicity: "Chinese and Jewish", avgReinforcement: 2.9, avgInfluence: 2.7, avgSharedEmotional: 2.8, info: "Diverse backgrounds, moderate sense of community." },
  { ethnicity: "Chinese and Taiwanese", avgReinforcement: 3.3, avgInfluence: 3.4, avgSharedEmotional: 3.3, info: "Strong sense of community among Chinese and Taiwanese participants." },
  { ethnicity: "Chinese and Vietnamese", avgReinforcement: 3.0, avgInfluence: 3.1, avgSharedEmotional: 3.0, info: "Mostly connected." },
  { ethnicity: "Filipino", avgReinforcement: 3.5, avgInfluence: 3.5, avgSharedEmotional: 3.5, info: "Highest sense of community observed among Filipino participants." },
  { ethnicity: "Chinese and White", avgReinforcement: 2.7, avgInfluence: 2.8, avgSharedEmotional: 2.9, info: "Chinese and White participants feel somewhat connected." },
  { ethnicity: "Japanese and White", avgReinforcement: 3.1, avgInfluence: 3.2, avgSharedEmotional: 3.1, info: "Japanese and White participants feel mostly connected." },
  { ethnicity: "Kazakhstan", avgReinforcement: 2.4, avgInfluence: 2.3, avgSharedEmotional: 2.4, info: "Kazakhstan participants generally feel somewhat connected." },
  { ethnicity: "Korean", avgReinforcement: 3.2, avgInfluence: 3.1, avgSharedEmotional: 3.2, info: "High sense of community among Korean participants." },
  { ethnicity: "Singaporean", avgReinforcement: 2.8, avgInfluence: 2.7, avgSharedEmotional: 2.8, info: "Moderate sense of community among Singaporean participants." },
  { ethnicity: "Taiwanese", avgReinforcement: 3.0, avgInfluence: 3.1, avgSharedEmotional: 3.0, info: "Mostly connected." },
  { ethnicity: "Taiwanese and Hong Kong", avgReinforcement: 2.9, avgInfluence: 2.8, avgSharedEmotional: 2.9, info: "Moderate sense of community among Taiwanese and Hong Kong participants." },
  { ethnicity: "Vietnamese", avgReinforcement: 3.4, avgInfluence: 3.3, avgSharedEmotional: 3.4, info: "Strong sense of community among Vietnamese participants." },
  { ethnicity: "Indian", avgReinforcement: 2.6, avgInfluence: 2.5, avgSharedEmotional: 2.6, info: "Indian participants feel somewhat connected." },
  { ethnicity: "Japanese, German, and Dutch", avgReinforcement: 3.5, avgInfluence: 3.4, avgSharedEmotional: 3.5, info: "Highest sense of community observed among mixed background participants." },
  // Add more data points as needed
];

const createScatterPlot = (svg, data, width, height, margin, x, y, xLabel, yLabel, title) => {
  svg
    .attr('width', width)
    .attr('height', height)
    .style('background', '#f9f9f9')
    .style('margin', '50px')
    .style('overflow', 'visible');

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
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => x(d.ethnicity))
    .attr("cy", d => y(d.avg))
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
    .text(xLabel);

  // Add y-axis label
  svg.append('text')
    .attr('x', -height / 2)
    .attr('y', margin.left - 40)
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .style('font-size', '16px')
    .style('font-weight', 'bold')
    .text(yLabel);

  // Add title
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', margin.top / 2)
    .attr('text-anchor', 'middle')
    .style('font-size', '20px')
    .style('font-weight', 'bold')
    .text(title);
};

const ScatterPlotOther: React.FC = () => {
  const reinforcementRef = useRef<SVGSVGElement | null>(null);
  const influenceRef = useRef<SVGSVGElement | null>(null);
  const sharedEmotionalRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const width = 1000;
    const height = 500;
    const margin = { top: 50, right: 50, bottom: 150, left: 50 };

    const x = d3.scaleBand()
      .domain(scatterData.map(d => d.ethnicity))
      .range([margin.left, width - margin.right])
      .padding(1);

    const y = d3.scaleLinear()
      .domain([0, 4]) // Adjust y-axis to scale from 0 to 4
      .range([height - margin.bottom, margin.top]);

    const reinforcementData = scatterData.map(d => ({ ethnicity: d.ethnicity, avg: d.avgReinforcement, info: d.info }));
    const influenceData = scatterData.map(d => ({ ethnicity: d.ethnicity, avg: d.avgInfluence, info: d.info }));
    const sharedEmotionalData = scatterData.map(d => ({ ethnicity: d.ethnicity, avg: d.avgSharedEmotional, info: d.info }));

    createScatterPlot(
      d3.select(reinforcementRef.current),
      reinforcementData,
      width,
      height,
      margin,
      x,
      y,
      'Ethnicity',
      'AVG Reinforcement of Needs',
      'Scatter Plot of AVG Reinforcement of Needs by Ethnicity'
    );

    createScatterPlot(
      d3.select(influenceRef.current),
      influenceData,
      width,
      height,
      margin,
      x,
      y,
      'Ethnicity',
      'AVG Influence',
      'Scatter Plot of AVG Influence by Ethnicity'
    );

    createScatterPlot(
      d3.select(sharedEmotionalRef.current),
      sharedEmotionalData,
      width,
      height,
      margin,
      x,
      y,
      'Ethnicity',
      'AVG Shared Emotional Connection',
      'Scatter Plot of AVG Shared Emotional Connection by Ethnicity'
    );

  }, []);

  return (
    <>
      <svg ref={reinforcementRef}></svg>
      <svg ref={influenceRef}></svg>
      <svg ref={sharedEmotionalRef}></svg>
    </>
  );
};

export default ScatterPlotOther;
