// Renders a category section with XP and associated project details in a popup.

import { formatXP } from "../script/index.js";

export const renderCategory = (container, categoryName, totalXp, projects) => {
    const categoryBox = document.createElement("div");
    categoryBox.classList.add("category-box");

    const categoryTitle = document.createElement("h3");
    categoryTitle.textContent = `${categoryName} - Total XP: ${formatXP(totalXp)}`;
    categoryBox.appendChild(categoryTitle);

    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.style.display = "none";
    const popupContent = document.createElement("div");
    popupContent.classList.add("popup-content");

    const projectList = document.createElement("ul");
    projects.forEach(project => {
        const listItem = document.createElement("li");
        const projectName = document.createElement("span");
        const lastSegment = project.path.split('/').pop();
        const projectNameOnly = lastSegment.includes('deprecated')
            ? lastSegment.split('-').pop()
            : lastSegment;
        projectName.textContent = projectNameOnly;

        const projectAmount = document.createElement("span");
        const formattedXP = formatXP(project.amount);
        projectAmount.textContent = ` - Amount: ${formattedXP}`;

        listItem.appendChild(projectName);
        listItem.appendChild(projectAmount);
        projectList.appendChild(listItem);
    });

    popupContent.appendChild(projectList);
    const closeButton = document.createElement("button");
    closeButton.textContent = "X";
    closeButton.onclick = () => popup.style.display = "none";
    popupContent.appendChild(closeButton);
    popup.appendChild(popupContent);
    container.appendChild(popup);

    categoryBox.onclick = () => {
        popup.style.display = (popup.style.display === "none") ? "flex" : "none";
    };

    popup.onclick = (event) => {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    };

    container.appendChild(categoryBox);
};


