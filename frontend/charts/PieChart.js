// Render all categories with XP to piechart

import { categorizeProjects, filterAndSortXpProjects, calculateTotalXp } from "../charts/dataProcessing.js";
import { fetchTransactions } from "../../backend/api.js";

export async function renderCategoriesChart(JWToken){
    try {
        const transactions = await fetchTransactions(JWToken);
        const { piscineGo, piscineJS, div01 } = categorizeProjects(transactions);

        if (!piscineGo || !piscineJS || !div01) {
            console.error("Categories are empty or incorrectly partitioned.");
            return;
        }

        const sortedPiscineGoXpProjects = filterAndSortXpProjects(piscineGo);
        const totalPiscineGoXp = calculateTotalXp(sortedPiscineGoXpProjects);

        const sortedPiscineJSXpProjects = filterAndSortXpProjects(piscineJS);
        const totalPiscineJSXp = calculateTotalXp(sortedPiscineJSXpProjects);

        const sortedDiv01XpProjects = filterAndSortXpProjects(div01);
        const totalDiv01Xp = calculateTotalXp(sortedDiv01XpProjects);

        renderPieChart(totalPiscineGoXp, totalPiscineJSXp, totalDiv01Xp);

    } catch (error) {
        console.error("Error fetching transactions:", error);
    }
}

export function renderPieChart(totalPiscineGoXp, totalPiscineJSXp, totalDiv01Xp){
    const container = d3.select("#pieChartContainer");
    container.selectAll("*").remove();

    const data = [
        {name: "Go Piscine", value: totalPiscineGoXp},
        {name: "JS Piscine", value: totalPiscineJSXp},
        {name: "Div-01 Projects", value: totalDiv01Xp},
    ];
    
    // Dimensions
    const width = 400;
    const height = 400;
    const margin = 40;
    const radius = Math.min(width, height) / 2 - margin;
    
    // Create SVG container
    const svg = container
        .append("svg")
        .style("width", width + "px")
        .style("height", height + "px")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);
    
    // Color scale
    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.name))
        .range(d3.schemeSet3);

    // Calculate positions
    const pie = d3.pie()
        .value(d => d.value);

    const data_ready = pie(data);

    //Draw arcs
    const arc = d3.arc()
        .innerRadius(40)
        .outerRadius(radius);

    svg.selectAll("slices")
        .data(data_ready)
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", d => color(d.data.name))
        .attr("stroke", "grey")
        .style("stroke-width", "2px")
    
    // Add labels
    svg.selectAll("slices")
        .data(data_ready)
        .enter()
        .append("text")
        .text(d => d.data.name)
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .style("text-anchor", "middle")
        .style("font-size", 12)
        .style("fill", "black")
}

