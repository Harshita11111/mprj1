let map;
let service;
let infowindow;

// Function to initialize Google Map
function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        // Initialize the map centered at the user's location
        map = new google.maps.Map(document.getElementById("map"), {
          center: userLocation,
          zoom: 14,
          mapId: "YOUR_MAP_ID", // Optional if using custom styling
        });

        // Use AdvancedMarkerElement for user location
        new google.maps.marker.AdvancedMarkerElement({
          position: userLocation,
          map: map,
          title: "You are here",
        });

        // Perform a nearby search for clinics
        searchNearbyClinics(userLocation);
      },
      (error) => {
        console.error("Geolocation error:", error.message);
        alert("Geolocation failed. Please enable location access.");
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
    alert("Geolocation is not supported by this browser.");
  }
}

// Function to search for nearby veterinary clinics
function searchNearbyClinics(location) {
  if (!location || !(location instanceof google.maps.LatLng)) {
    console.error("Invalid location provided for nearbySearch:", location);
    return;
  }

  const request = {
    location: location,
    radius: 5000, // Search within 5 km
    type: ["veterinary_care"], // Ensure a valid place type
  };

  service = new google.maps.places.PlacesService(map);

  service
    .nearbySearch(request)
    .then((results) => {
      if (results && results.length > 0) {
        displayClinics(results);
      } else {
        console.warn("No clinics found nearby.");
        alert("No veterinary clinics found in this area.");
      }
    })
    .catch((error) => {
      console.error("Error fetching nearby clinics:", error);
      alert("An error occurred while searching for clinics. Please try again.");
    });
}

// Function to display clinics in the list
function displayClinics(clinics) {
  const clinicList = document.getElementById("clinic-list");
  clinicList.innerHTML = ""; // Clear previous results

  clinics.forEach((clinic) => {
    if (!clinic.geometry || !clinic.geometry.location) {
      console.warn("Skipping clinic with invalid location data:", clinic);
      return;
    }

    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <strong>${clinic.name}</strong><br>
      ${clinic.vicinity || "No address available"}<br>
      <a href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        clinic.vicinity
      )}" target="_blank">Get Directions</a>
    `;

    clinicList.appendChild(listItem);

    // Use AdvancedMarkerElement for clinic markers
    new google.maps.marker.AdvancedMarkerElement({
      position: clinic.geometry.location,
      map: map,
      title: clinic.name,
    });
  });
}

// Initialize map when window loads
window.onload = initMap;
