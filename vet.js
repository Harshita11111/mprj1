let map;
let service;

// ✅ Initialize the Map
async function initMap() {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by this browser.");
        return;
    }

    try {
        const position = await getCurrentPosition();
        const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        };

        // ✅ Initialize the map
        map = new google.maps.Map(document.getElementById("map"), {
            center: userLocation,
            zoom: 14,
            mapId: "b364784da23176c8",
        });

        // ✅ Add user marker using AdvancedMarkerElement
        new google.maps.marker.AdvancedMarkerElement({
            position: userLocation,
            map: map,
            title: "You are here",
        });

        // ✅ Initialize PlacesService after the map is ready
        service = new google.maps.places.PlacesService(map);
        console.log("✅ PlacesService Initialized:", service);

        // ✅ Search for clinics
        await searchNearbyClinics(userLocation);
    } catch (error) {
        console.error("❌ Geolocation error:", error);
        alert("Geolocation failed. Please enable location access.");
    }
}

// ✅ Convert `getCurrentPosition()` into a Promise-based function
function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

// ✅ Search for nearby veterinary clinics
async function searchNearbyClinics(location) {
    if (!service) {
        console.error("❌ PlacesService is not initialized!");
        return;
    }

    const request = {
        location: new google.maps.LatLng(location.lat, location.lng),
        radius: 5000,
        type: ["veterinary_care"],
    };

    try {
        console.log("🟢 Sending Places API request:", request); // Log request
        const results = await nearbySearchPromise(request);
        console.log("✅ Places API Response:", results); // Log success

        if (!results || results.length === 0) {
            alert("No veterinary clinics found nearby.");
            return;
        }

        displayClinics(results);
    } catch (error) {
        console.error("❌ Places API Error:", error.message);
        alert("Error fetching nearby clinics: " + error.message);
    }
}


// ✅ Convert `nearbySearch()` into a Promise-based function
// ✅ Convert `nearbySearch()` into a Promise-based function with more logging
function nearbySearchPromise(request) {
    return new Promise((resolve, reject) => {
        console.log("🟢 Sending Places API request:", request); // Debug log
        
        service.nearbySearch(request, (results, status) => {
            console.log("🟢 Places API Response:", { results, status }); // Log response
            
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                resolve(results);
            } else {
                console.error("❌ Places API Error:", status, results); // Log the full error
                reject(new Error(`PlacesServiceStatus: ${status}`));
            }
        });
    });
}


// ✅ Display clinics on the map and list
function displayClinics(clinics) {
    const clinicList = document.getElementById("clinic-list");
    clinicList.innerHTML = ""; // Clear previous results

    clinics.forEach((clinic) => {
        // ✅ Create a list item for each clinic
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>${clinic.name}</strong><br>
            ${clinic.vicinity || "No address available"}<br>
            <a href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                clinic.vicinity
            )}" target="_blank">Get Directions</a>
        `;
        clinicList.appendChild(listItem);

        // ✅ Add marker for each clinic
        new google.maps.marker.AdvancedMarkerElement({
            position: clinic.geometry.location,
            map: map,
            title: clinic.name,
        });
    });
}

// ✅ Call `initMap()` when the window loads
window.initMap = initMap;
