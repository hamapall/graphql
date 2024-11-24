// This file handles the logic for displaying categorized projects and rendering graphs based on user transactions.
import { categorizeProjects, filterAndSortXpProjects, calculateTotalXp } from "../charts/dataProcessing.js";
import { renderCategory } from "../charts/CategoryRendering.js";
import { fetchTransactions } from "../../backend/api.js";
import { renderBarChart } from "../charts/AuditRendering.js";
import { renderCategoriesChart } from "../charts/PieChart.js";

// Fetches transactions and displays projects categorized by "Piscine Go", "Piscine JS", and "Div-01" projects.
export async function displayProjectCategories(JWToken) {
    try {
        const transactions = await fetchTransactions(JWToken);
        const { piscineGo, piscineJS, div01 } = categorizeProjects(transactions);

        if (!piscineGo || !piscineJS || !div01) {
            console.error("Categories are empty or incorrectly partitioned.");
            return;
        }

        const container = document.getElementById("projectsContainer");
        if (!container) {
            console.error("projectsContainer element not found");
            return;
        }

        container.innerHTML = "";

        const sortedPiscineGoXpProjects = filterAndSortXpProjects(piscineGo);
        const totalPiscineGoXp = calculateTotalXp(sortedPiscineGoXpProjects);

        const sortedPiscineJSXpProjects = filterAndSortXpProjects(piscineJS);
        const totalPiscineJSXp = calculateTotalXp(sortedPiscineJSXpProjects);

        const sortedDiv01XpProjects = filterAndSortXpProjects(div01);
        const totalDiv01Xp = calculateTotalXp(sortedDiv01XpProjects);

        renderCategory(container, "Piscine Go Projects", totalPiscineGoXp, sortedPiscineGoXpProjects);
        renderCategory(container, "Piscine JS Projects", totalPiscineJSXp, sortedPiscineJSXpProjects);
        renderCategory(container, "Div-01 Projects", totalDiv01Xp, sortedDiv01XpProjects);
    } catch (error) {
        console.error("Error fetching transactions:", error);
    }
}

// Fetches transactions and displays bar charts based on "up" and "down" transaction types.
export async function displayGraphs(JWToken) {
    try {
        const transactions = await fetchTransactions(JWToken);
        console.log("Fetched transactions:", transactions);

        // Display categorized projects
        displayProjectCategories(JWToken);

        const totalUp = transactions
            .filter(tx => tx.type === "up")
            .reduce((sum, tx) => sum + tx.amount, 0);

        const totalDown = transactions
            .filter(tx => tx.type === "down")
            .reduce((sum, tx) => sum + tx.amount, 0);

        const barChartContainer = document.getElementById("barChartContainer");
        if (!barChartContainer) {
            console.error("barChartContainer element not found");
            return;
        }

        // Clear previous content in case of re-rendering
        barChartContainer.innerHTML = "";

        // Render the bar chart using the transaction data
        renderBarChart(totalUp, totalDown);
        renderCategoriesChart(JWToken);
    } catch (error) {
        console.error("Error fetching transactions:", error);
    }
}
