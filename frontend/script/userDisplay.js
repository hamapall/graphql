// This file handles fetching and displaying user information in the application.

import { createElement } from "./domUtils.js";
import { fetchUserData } from "../../backend/api.js";

// Fetches user data from the backend and displays it on the screen.
export async function displayUserInfo(JWToken) {
    try {
        const userData = await fetchUserData(JWToken);
        console.log("User data fetched successfully:", userData);
        display(userData);
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

// Displays the user data in a designated container element.
export function display(data) {
    const userInfoContainer = document.getElementById("userInfoContainer");
    if (!userInfoContainer) {
        console.error("userInfoContainer element not found");
        return;
    }
    userInfoContainer.innerHTML = "";

    // Create a user information section with a header.
    const userInfoDiv = createElement("div", "userInfo");
    const header = createElement("h2", "userInfoHeader", "User Information");
    userInfoDiv.appendChild(header);

    // Check if the user data structure contains valid information and display it.
    if (data && data.data && data.data.user && data.data.user[0]) {
        userInfoDiv.appendChild(displayInfo(data.data.user[0]));
        userInfoDiv.appendChild(displayMap(data.data.user[0]));
    } else {
        console.warn("User data is incomplete or missing.");
    }

    userInfoContainer.appendChild(userInfoDiv);
}

// Formats and displays specific user attributes in a styled div.
export function displayInfo(user) {
    const infoDiv = createElement("div", "infoDiv");
    infoDiv.appendChild(createElement("div", "userData", "Username: " + user.login));
    infoDiv.appendChild(createElement("div", "userData", "First name: " + user.attrs.firstName));
    infoDiv.appendChild(createElement("div", "userData", "Last name: " + user.attrs.lastName));
    infoDiv.appendChild(createElement("div", "userData", "E-mail: " + user.attrs.email));
    infoDiv.appendChild(createElement("div", "userData", "Phone number: " + user.attrs.tel));
    infoDiv.appendChild(createElement("div", "userData", "Address: " + 
        user.attrs.addressStreet + ", " + 
        user.attrs.addressCity + ", " + 
        user.attrs.country ));
    return infoDiv;
}

export function displayMap(data){
    const mapDiv = document.createElement("div");
    mapDiv.classList.add("mapDiv");
    mapDiv.id = "map";
    if (typeof google === "undefined"){
        console.warn("Google maps not found!")
        return mapDiv;
    }
    const address = data.attrs.addressStreet + ", " + 
    data.attrs.addressCity + ", " + 
    data.attrs.country;

    const map = new google.maps.Map(mapDiv, {
        // First render location - Tallinn
        center: { lat: 59.4370, lng: 24.7536 },
        zoom: 16,
        mapId: "userposition"
    })

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({address}, function (results, status){
        if (status == "OK") {
            const position = results[0].geometry.location
            map.setCenter(position);
            const marker = new google.maps.marker.AdvancedMarkerElement({
                map, position
            });
            console.log("Location found!", position)
        } else {
            console.warn("Geocode not successful", status);
        }
    });
    return mapDiv;
}
