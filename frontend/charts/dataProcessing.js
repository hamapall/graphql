// This file contains utility functions for categorizing projects, filtering and sorting projects by XP, and calculating total XP for given projects.

// Categorizes projects into specific groups based on their paths.
export function categorizeProjects(transactions) {
    const categorized = {
        piscineGo: [],
        piscineJS: [],
        div01: []
    };

    transactions.forEach(transaction => {
        const path = transaction.path.toLowerCase();
        if (path.includes("piscine-go")) {
            categorized.piscineGo.push(transaction);
        } else if (path.includes("piscine-js")) {
            categorized.piscineJS.push(transaction);
        } else if (path.includes("div-01")) {
            categorized.div01.push(transaction);
        }
    });

    return categorized;
}

// Filters projects by type "XP" and sorts them in ascending order by their XP amount.
export function filterAndSortXpProjects(projects) {
    return projects
        .filter(project => project.type === "xp")
        .sort((a, b) => a.amount - b.amount);
}

// Calculates the total XP of a given set of projects.
export function calculateTotalXp(projects) {
    return projects.reduce((total, project) => total + project.amount, 0);
}
