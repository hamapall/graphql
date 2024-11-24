import { initLoginPage, auth } from "../../login/login.js";
import { createHeader } from "./uiComponents.js";
import { displayGraphs } from "./categoriesDisplay.js";
import { displayUserInfo } from "./userDisplay.js";
import { setupLogout } from "./domUtils.js";
import { showErrorNotification, showNotification } from "./notifications.js";

let username = "";

// Initialize the app when DOM is ready
document.addEventListener("DOMContentLoaded", async () => {
    await init(); // Call the initialization function
});

// App initialization function, checking if user is logged in
async function init() {
    await google.maps.importLibrary("maps");
    await google.maps.importLibrary("marker");
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn !== "true") {
        initLoginPage(auth); // Show login page if not logged in
    } else {
        const JWToken = localStorage.getItem("JWToken");
        username = localStorage.getItem("username");
        initApp(JWToken, username); // If logged in, initialize the app
    }
}

// Function to set up the main application after login
export async function initApp(JWToken, username) {
    // Hide login view, show main app view
    toggleElementVisibility("loginDiv", false);
    toggleElementVisibility("app", true);


    try {
        // Create header and load user-specific content
        createHeader(username);
        const userInfo = await displayUserInfo(JWToken);
        displayGraphs(JWToken);

        // Show a welcome notification
        showNotification(`Welcome back, ${username}!`);
    } catch (error) {
        console.error("Error initializing app:", error);
        handleError(error); // Improved error handling
    }

    setupLogout(); // Set up logout functionality
}

// Format XP or data sizes for user display
export function formatXP(bits, decimals = 2) {
    if (!+bits) return "0 Bits"; // Handle invalid or zero input
    const bit = 1000; // Define conversion factor
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bits", "KiB", "MiB", "GiB"];
    const i = Math.floor(Math.log(bits) / Math.log(bit));

    return `${parseFloat((bits / Math.pow(bit, i)).toFixed(dm))} ${sizes[i]}`;
}

// Improved error handling function
function handleError(error) {
    if (error.response) {
        // Server responded with an error status code
        showErrorNotification(`Error: ${error.response.status} - ${error.response.data.message}`);
    } else if (error.message) {
        // General network or runtime error
        showErrorNotification(`Error: ${error.message}`);
    } else {
        showErrorNotification("Unknown error occurred. Please try again.");
    }
}

// Utility function to toggle element visibility
function toggleElementVisibility(elementId, isVisible) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = isVisible ? "block" : "none";
    } else {
        console.warn(`Element with ID '${elementId}' not found.`);
    }
}
