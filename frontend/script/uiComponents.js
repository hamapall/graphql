// This file creates and renders the header for the application, including a personalized greeting and a logout button.

export function createHeader(username) {
    // Create the header element and set its class.
    const header = document.createElement("header");
    header.className = "app-header";

    // Create and append the welcome message with the provided username.
    const welcomeContainer = document.createElement("div");
    welcomeContainer.className = "welcome";
    welcomeContainer.innerText = `Welcome, ${username}!`;
    header.appendChild(welcomeContainer);

    // Check for the logout button and append it to the header if it exists.
    const logoutBtn = document.getElementById("logoutButton");
    if (logoutBtn) {
        header.appendChild(logoutBtn);
    } else {
        console.warn("Logout button with ID 'logoutButton' not found.");
    }

    // Prepend the header to the app container element, ensuring the app element exists.
    const appElement = document.getElementById("app");
    if (appElement) {
        appElement.prepend(header);
    } else {
        console.error("App element with ID 'app' not found.");
    }
}
