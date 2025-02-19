let map;
let service;
let infowindow;

// Initialize Map - now global
function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        map = new google.maps.Map(document.getElementById("map"), {
          center: userLocation,
          zoom: 14,
          mapId: "DEMO_MAP_ID", // Replace with your own Map ID if needed
        });

        // Add user's location marker
        new google.maps.marker.AdvancedMarkerElement({
          position: userLocation,
          map: map,
          title: "You are here",
        });

        searchNearbyClinics(userLocation);
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Geolocation failed. Please enable location access.");
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Function to search for nearby veterinary clinics
function searchNearbyClinics(location) {
  if (!location || !(location instanceof google.maps.LatLng)) {
    console.error("Invalid location object passed:", location);
    alert("Error: Invalid location data.");
    return;
  }

  const request = {
    location: location,
    radius: 5000,
    type: "veterinary_care", 
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      displayClinics(results);
    } else {
      console.error("Places API Error:", status);
      alert("No clinics found nearby or an error occurred.");
    }
  });
}

// Display clinics in list and on map
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
