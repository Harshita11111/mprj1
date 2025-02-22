let map;
let service;

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


        map = new google.maps.Map(document.getElementById("map"), {
            center: userLocation,
            zoom: 14,
            mapId: "b364784da23176c8",
        });

  
        new google.maps.marker.AdvancedMarkerElement({
            position: userLocation,
            map: map,
            title: "You are here",
        });

        service = new google.maps.places.PlacesService(map);
        console.log("✅ PlacesService Initialized:", service);


        await searchNearbyClinics(userLocation);
    } catch (error) {
        console.error(" Geolocation error:", error);
        alert("Geolocation failed. Please enable location access.");
    }
}

function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}


async function searchNearbyClinics(location) {
    if (!map) {
        console.error("Map is not initialized.");
        return;
    }

    const request = {
        location: new google.maps.LatLng(location.lat, location.lng),
        radius: 5000,
        keyword: "veterinary clinic", 
    };

    console.log(" Sending Places API request:", request);

    const service = new google.maps.places.PlacesService(map);

    try {
        const results = await new Promise((resolve, reject) => {
            service.nearbySearch(request, (places, status) => {
                console.log("🔍 Raw API Response:", { places, status }); 

                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    resolve(places);
                } else {
                    reject(`Places API Error: ${status}`);
                }
            });
        });

        console.log("✅ Places API Response:", results);
        displayClinics(results);
    } catch (error) {
        console.error("❌ Error fetching nearby clinics:", error);
    }
}


function nearbySearchPromise(request) {
    return new Promise((resolve, reject) => {
        console.log(" Sending Places API request:", request); // Debug log
        
        service.nearbySearch(request, (results, status) => {
            console.log(" Places API Response:", { results, status }); // Log response
            
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                resolve(results);
            } else {
                console.error(" Places API Error:", status, results); // Log the full error
                reject(new Error(`PlacesServiceStatus: ${status}`));
            }
        });
    });
}



function displayClinics(clinics) {
    const clinicList = document.getElementById("clinic-list");
    clinicList.innerHTML = "";

    clinics.forEach((clinic) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>${clinic.name}</strong><br>
            ${clinic.vicinity || "No address available"}<br>
            <a href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                clinic.vicinity
            )}" target="_blank">Get Directions</a>
        `;
        clinicList.appendChild(listItem);
        new google.maps.marker.AdvancedMarkerElement({
            position: clinic.geometry.location,
            map: map,
            title: clinic.name,
        });
    });
}

window.initMap = initMap;
