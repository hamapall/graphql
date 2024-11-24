export async function auth() {
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    let data = btoa(`${username}:${password}`);

    try {
        let response = await fetch("https://01.kood.tech/api/auth/signin", {
            method: 'POST',
            headers: { 'Authorization': `Basic ${data}` }
        });

        if (response.ok) {
            let JWToken = await response.json();
            localStorage.setItem('JWToken', JWToken);
            localStorage.setItem('loggedIn', true);
            localStorage.setItem('username', username);
            initApp(JWToken, username);
        } else {
            showErrorNotification("Incorrect username or password");
        }
    } catch (error) {
        console.error("Error in authentication:", error);
        showErrorNotification("Authentication error: Please try again later.");
    }
}
