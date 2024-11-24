// Audit render with XP
import { formatXP } from "../script/index.js";

const margin = { top: 20, right: 20, bottom: 60, left: 150 };

// Renders a comparative bar chart for audits done versus audits received.
export function renderBarChart(auditDone, auditReceived) {
    const data = [
        { name: "Done", value: auditDone },
        { name: "Received", value: auditReceived }
    ];

    const margin = { top: 70, right: 30, bottom: 60, left: 60 };
    const width = window.innerWidth * 0.5 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
 
    const svg = d3.select("#barChartContainer")
        .html('')
        .append("svg")
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value) || 0])
        .nice()
        .range([height, 0]);

    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => x(d.name))
        .attr("y", d => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.value))
        .attr("fill", (d, i) => (i === 0 ? "#fb8072" : "#80b1d3"));

    svg.selectAll(".bar-value")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "bar-value")
        .attr("x", d => x(d.name) + x.bandwidth() / 2)
        .attr("y", d => y(d.value) - 10)
        .attr("text-anchor", "middle")
        .text(d => formatXP(d.value, 2));

    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y).tickFormat(d => formatXP(d, 2)));

    const xpInfo = d3.select("#barChartContainer")
        .append("div")
        .attr("class", "xp-info");

    xpInfo.append("p").text("Received audit XP: " + formatXP(auditReceived, 2));
    xpInfo.append("p").text("Done audit XP: " + formatXP(auditDone, 2));
}
