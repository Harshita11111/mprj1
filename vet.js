let map;
let service;

// Ensure initMap is globally accessible
window.initMap = async function () {
  try {
    const userLocation = await getUserLocation(); // Get user's location
    map = new google.maps.Map(document.getElementById("map"), {
      center: userLocation,
      zoom: 14,
      mapId: "b364784da23176c8",
    });

    // Add marker for user's location
    new google.maps.marker.AdvancedMarkerElement({
      position: userLocation,
      map: map,
      title: "You are here",
    });

    // Search for nearby veterinary clinics
    await searchNearbyClinics(userLocation);
  } catch (error) {
    console.error("Error initializing map:", error);
    alert("Failed to initialize map: " + error.message);
  }
};

// ✅ Function to get user's geolocation using Promises
async function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          reject(new Error("Geolocation failed. Please enable location access."));
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
}

// ✅ Function to search for nearby veterinary clinics (promisified)
async function searchNearbyClinics(location) {
  if (!map) throw new Error("Map is not initialized.");

  const request = {
    location: new google.maps.LatLng(location.lat, location.lng),
    radius: 5000,
    type: ["veterinary_care"],
  };

  // Initialize Places Service
  service = new google.maps.places.PlacesService(map);

  try {
    const results = await nearbySearchPromise(service, request);
    console.log("Places API Response:", results);

    if (results.length > 0) {
      displayClinics(results);
    } else {
      alert("No veterinary clinics found nearby.");
    }
  } catch (error) {
    console.error("Places API Error:", error);
    alert("Error fetching nearby clinics: " + error.message);
  }
}

// ✅ Function to promisify the Google Places API nearbySearch
function nearbySearchPromise(service, request) {
  return new Promise((resolve, reject) => {
    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        resolve(results);
      } else {
        reject(new Error("Places API Error: " + status));
      }
    });
  });
}

// ✅ Function to display clinics in the list
function displayClinics(clinics) {
  const clinicList = document.getElementById("clinic-list");
  if (!clinicList) {
    console.error("Error: clinic-list element not found.");
    return;
  }

  clinicList.innerHTML = ""; // Clear existing list

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
