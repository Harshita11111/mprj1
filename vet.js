let map;
let service;
let infowindow;

// Function to initialize Google Map
function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // Initialize map centered at user's location
        map = new google.maps.Map(document.getElementById("map"), {
          center: userLocation,
          zoom: 14,
        });

        // Use AdvancedMarkerElement for user location
        new google.maps.marker.AdvancedMarkerElement({
          position: userLocation,
          map: map,
          title: "You are here",
        });

        // Search for nearby veterinary clinics
        searchNearbyClinics(userLocation);
      },
      () => {
        alert("Geolocation failed. Please enable location access.");
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Function to search for nearby veterinary clinics
function searchNearbyClinics(location) {
  const request = {
    location: location,
    radius: 5000, // Search within 5 km
    type: ["veterinary_care"], // Search for veterinary clinics
  };

  service = new google.maps.places.PlacesService(map);

  service
    .nearbySearch(request)
    .then((results) => {
      if (results && results.length > 0) {
        displayClinics(results);
      } else {
        console.warn("No clinics found nearby.");
      }
    })
    .catch((error) => {
      console.error("Error fetching nearby clinics:", error);
    });
}

// Function to display clinics in the list
function displayClinics(clinics) {
  const clinicList = document.getElementById("clinic-list");
  clinicList.innerHTML = ""; // Clear previous results

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
