import { showNotification } from "./notifications.js"; // Import the notification function

// Utility function to create DOM elements
export function createElement(type, className, textContent) {
    const element = document.createElement(type);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
}

// Utility function to create input fields
export function createInput(id, type, placeholder) {
    const input = createElement("input", "input");
    input.id = id;
    input.name = id;
    input.type = type;
    input.placeholder = placeholder;
    input.required = true;
    return input;
}

// Utility function to append multiple children to a parent element
export function appendChildren(parent, children) {
    children.forEach(child => parent.appendChild(child));
}

export function setupLogout() {
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem("JWToken");
            localStorage.removeItem("loggedIn");
            localStorage.removeItem("username");
            showNotification("It was nice to see you! Come back soon!");
            setTimeout(() => {
                if (location.href.includes("/graphql")) {
                    window.location.replace("/graphql/");
                } else {
                    window.location.replace("/");
                }
            }, 1000);
        });
    }
}


