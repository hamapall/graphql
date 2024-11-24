// auth.js
import { createElement, createInput, appendChildren } from "../frontend/script/domUtils.js";
import { showErrorNotification } from "../frontend/script/notifications.js";
import { initApp } from "../frontend/script/index.js";

let username = "";
let password = "";

// Initialize the login page UI and form
export function initLoginPage() {
    const app = document.getElementById("app");
    app.style.display = "none"; // Hide main app content
    const loginDiv = document.getElementById("loginDiv");
    loginDiv.className = "login";

    // Create login form elements
    const loginHeader = createElement("h1", "title", "GraphQL");
    const loginForm = createElement("form");
    loginForm.id = 'loginForm';
    const loginUser = createInput("username", "text", "Username or email");
    const loginPw = createInput("password", "password", "Password");
    const submitButton = createElement("button", null, "Login");
    submitButton.type = "submit";

    // Append created elements to the DOM
    appendChildren(loginForm, [loginUser, loginPw, submitButton]);
    appendChildren(loginDiv, [loginHeader, loginForm]);

    // Add event listener for form submission
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        await auth();
    });
}

// Function to handle authentication via API call
export async function auth() {
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    let data = btoa(`${username}:${password}`); // Encode credentials in base64

    let response = await fetch("https://01.kood.tech/api/auth/signin", {
        method: 'POST',
        headers: { 'Authorization': `Basic ${data}` }
    });

    // If authentication is successful, store the token and proceed to app
    if (response.ok) {
        let JWToken = await response.json();
        localStorage.setItem('JWToken', JWToken);
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('username', username);
        initApp(JWToken, username); // Call initApp to initialize the application
    } else {
        // Show error notification on incorrect credentials
        showErrorNotification("Incorrect username or password");
    }
}
