let map;
let service;

// Ensure initMap is globally accessible
window.initMap = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // Initialize the map
        map = new google.maps.Map(document.getElementById("map"), {
          center: userLocation,
          zoom: 14,
          mapId: "b364784da23176c8",
        });

        // Add marker for user's location using AdvancedMarkerElement
        new google.maps.marker.AdvancedMarkerElement({
          position: userLocation,
          map: map,
          title: "You are here",
        });

        // Search for nearby veterinary clinics
        searchNearbyClinics(userLocation);
      },
      (error) => {
        console.error("Geolocation failed:", error);
        alert("Geolocation failed. Please enable location access.");
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
};

// Function to search for nearby veterinary clinics
function searchNearbyClinics(location) {
  if (!map) {
    console.error("Map is not initialized.");
    return;
  }

  const request = {
    location: new google.maps.LatLng(location.lat, location.lng),
    radius: 5000,
    type: ["veterinary_care"],
  };

  // Initialize Places Service
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, (results, status) => {
    console.log("Places API Response:", { results, status });

    if (status === google.maps.places.PlacesServiceStatus.OK) {
      displayClinics(results);
    } else {
      console.error("Places API Error:", status);
      alert("Error fetching nearby clinics: " + status);
    }
  });
}

// Function to display clinics in the list
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
