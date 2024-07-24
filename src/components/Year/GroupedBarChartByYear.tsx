
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const studentsYearResponses = {
    "First Year": [
        Array.from({ length: 24 }, () => Math.floor(Math.random() * 4)),
        Array.from({ length: 24 }, () => Math.floor(Math.random() * 4))
    ],
    "Second Year": [
        Array.from({ length: 24 }, () => Math.floor(Math.random() * 4)),
        Array.from({ length: 24 }, () => Math.floor(Math.random() * 4)),
        Array.from({ length: 24 }, () => Math.floor(Math.random() * 4))
    ],
    "Third Year": [
        Array.from({ length: 24 }, () => Math.floor(Math.random() * 4)),
        Array.from({ length: 24 }, () => Math.floor(Math.random() * 4))
    ],
    "Fourth Year": [
        Array.from({ length: 24 }, () => Math.floor(Math.random() * 4)),
        Array.from({ length: 24 }, () => Math.floor(Math.random() * 4))
    ],
    "Fifth Year": [
        Array.from({ length: 24 }, () => Math.floor(Math.random() * 4)),
        Array.from({ length: 24 }, () => Math.floor(Math.random() * 4))
    ]
};

const subscales = [
    "Reinforcement of Needs",
    "Membership",
    "Influence",
    "Shared Emotional Connection"
];

const responseLevels = ["Not at All", "Somewhat", "Mostly", "Completely"];

const processDataForGroupedBar = (responses) => {
    return Object.entries(responses).map(([year, answersList]) => {
        const aggregatedData = answersList.reduce((acc, answers) => {
            subscales.forEach((subscale, i) => {
                const subscaleAnswers = answers.slice(i * 6, (i + 1) * 6);
                const subscaleScore = subscaleAnswers.reduce((a, b) => a + b, 0) / 6; // Average score per subscale
                acc[subscale] = (acc[subscale] || 0) + subscaleScore;
            });
            return acc;
        }, {});

        subscales.forEach(subscale => {
            aggregatedData[subscale] /= answersList.length;
        });

        return {
            year,
            ...aggregatedData
        };
    });
};

const groupedBarData = processDataForGroupedBar(studentsYearResponses);

const GroupedBarChartByYear: React.FC = () => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const width = 1000;
        const height = 600;
        const margin = { top: 50, right: 150, bottom: 100, left: 100 };

        svg
            .attr('width', width)
            .attr('height', height)
            .style('background', '#f9f9f9')
            .style('margin', '50px')
            .style('overflow', 'visible');

        const x0 = d3
            .scaleBand()
            .domain(groupedBarData.map(d => d.year))
            .range([margin.left, width - margin.right])
            .padding(0.1);

        const x1 = d3
            .scaleBand()
            .domain(subscales)
            .range([0, x0.bandwidth()])
            .padding(0.05);

        const y = d3
            .scaleLinear()
            .domain([0, 3]) // Adjust y-axis to scale from 0 to 3
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
            .attr("transform", d => `translate(${x0(d.year)},0)`)
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
            .call(d3.axisBottom(x0).tickSizeOuter(0))
            .selectAll("text")
            .attr("transform", "rotate(-45)")
            .attr("text-anchor", "end");

        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y)
                .ticks(4)
                .tickFormat((d, i) => responseLevels[i])); // Custom tick format for y-axis

        // Add header
        svg.append('text')
            .attr('x', width / 2)
            .attr('y', margin.top / 2)
            .attr('text-anchor', 'middle')
            .style('font-size', '24px')
            .style('font-weight', 'bold')
            .style('fill', 'black')
            .text('Sense of Community Index Subscale Scores by Year');

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
            .style('font-size', '14px')
            .style('fill', 'black');

    }, []);

    return <svg ref={ svgRef }> </svg>;
};

export default GroupedBarChartByYear;
