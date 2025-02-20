let map;
let service;

window.initMap = async function () {
  try {
    console.log("🟢 Initializing Map...");

    const userLocation = await getUserLocation();
    console.log("🟢 User Location:", userLocation);

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

    service = new google.maps.places.PlacesService(map); // Ensure service is initialized

    await searchNearbyClinics(userLocation);
  } catch (error) {
    console.error("❌ Error initializing map:", error);
    alert("Failed to initialize map: " + error.message);
  }
};

// ✅ Properly handles geolocation errors
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
          console.error("❌ Geolocation error:", error);
          reject(new Error("Geolocation failed. Please enable location access."));
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
}

// ✅ Uses async/await and proper error handling
async function searchNearbyClinics(location) {
  if (!map || !service) {
    console.error("❌ Map or Places Service is not initialized.");
    return;
  }

  const request = {
    location: new google.maps.LatLng(location.lat, location.lng),
    radius: 5000,
    type: ["veterinary_care"],
  };

  console.log("🟢 Sending Places API request:", request);

  try {
    const results = await nearbySearchPromise(service, request);

    console.log("🟢 Places API Response:", results);

    if (Array.isArray(results) && results.length > 0) {
      displayClinics(results);
    } else {
      console.warn("⚠️ No clinics found in API response.");
      alert("No veterinary clinics found nearby.");
    }
  } catch (error) {
    console.error("❌ Places API Error:", error);
    alert("Error fetching nearby clinics: " + error.message);
  }
}

// ✅ Converts Google Places API callback into a Promise
function nearbySearchPromise(service, request) {
  return new Promise((resolve, reject) => {
    service.nearbySearch(request, (results, status) => {
      console.log("🟢 Places API Callback:", { results, status });

      if (status === google.maps.places.PlacesServiceStatus.OK) {
        resolve(results);
      } else {
        reject(new Error("Places API Error: " + status));
      }
    });
  });
}

// ✅ Displays results properly
function displayClinics(clinics) {
  const clinicList = document.getElementById("clinic-list");
  if (!clinicList) {
    console.error("❌ Error: clinic-list element not found.");
    return;
  }

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
