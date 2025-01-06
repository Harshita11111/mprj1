let map;
let service;
let infowindow;

// Function to initialize Google Map
function initMap() {
  // Check if browser supports geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // Create Map centered at user's location
        map = new google.maps.Map(document.getElementById("map"), {
          center: userLocation,
          zoom: 14,
        });

        // Add marker for user's location
        new google.maps.Marker({
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

// Function to search for nearby clinics
function searchNearbyClinics(location) {
  const request = {
    location: location,
    radius: 5000, // Search within 10 km
    type: ["veterinary_care"], // Veterinary clinics
  };

  // Create Places Service
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      displayClinics(results);
    } else {
      alert("No clinics found nearby.");
    }
  });
}

// Function to display clinics in the list
function displayClinics(clinics) {
  const clinicList = document.getElementById("clinic-list");
  clinicList.innerHTML = ""; // Clear previous results

  clinics.forEach((clinic) => {
    // Create List Item
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <strong>${clinic.name}</strong><br>
      ${clinic.vicinity || "No address available"}<br>
      <a href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        clinic.vicinity
      )}" target="_blank">Get Directions</a>
    `;

    clinicList.appendChild(listItem);

    // Add marker on the map
    new google.maps.Marker({
      position: clinic.geometry.location,
      map: map,
      title: clinic.name,
    });
  });
}

// Initialize the map
window.onload = initMap;
