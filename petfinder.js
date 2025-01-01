 // CODE TO ADD THE PETFINDER API

 const clientId = "YOUR_CLIENT_ID";
 const clientSecret = "YOUR_CLIENT_SECRET";
 
 // Variables
 let accessToken = "";
 
 // Get Access Token from Petfinder API
 async function getAccessToken() {
   const response = await fetch("https://api.petfinder.com/v2/oauth2/token", {
     method: "POST",
     headers: {
       "Content-Type": "application/x-www-form-urlencoded",
     },
     body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
   });
 
   const data = await response.json();
   accessToken = data.access_token;
 }
 
 // Fetch Pets Based on Search Query
 async function fetchPets(query) {
   const response = await fetch(
     `https://api.petfinder.com/v2/animals?type=${query}&limit=10`,
     {
       headers: {
         Authorization: `Bearer ${accessToken}`,
       },
     }
   );
 
   const data = await response.json();
   displayPets(data.animals);
 }
 
 // Display Pets on the Page
 function displayPets(pets) {
   const resultsSection = document.getElementById("results-section");
   resultsSection.innerHTML = ""; // Clear previous results
 
   if (pets.length === 0) {
     resultsSection.innerHTML = "<p>No pets found. Try another search!</p>";
     return;
   }
 
   pets.forEach((pet) => {
     const petCard = document.createElement("div");
     petCard.classList.add("pet-card");
 
     // Handle missing images
     const imageUrl =
       pet.photos && pet.photos.length > 0
         ? pet.photos[0].medium
         : "https://via.placeholder.com/300x200?text=No+Image";
 
     petCard.innerHTML = `
       <img src="${imageUrl}" alt="${pet.name}">
       <h3>${pet.name}</h3>
       <p><strong>Breed:</strong> ${pet.breeds.primary || "Unknown"}</p>
       <p><strong>Age:</strong> ${pet.age || "Unknown"}</p>
       <p><strong>Gender:</strong> ${pet.gender}</p>
       <a href="${pet.url}" target="_blank" class="adopt-button">Adopt Me</a>
     `;
 
     resultsSection.appendChild(petCard);
   });
 }
 
 // Event Listener for Search Button
 document.getElementById("search-button").addEventListener("click", () => {
   const query = document.getElementById("search-input").value.trim();
   if (query) {
     fetchPets(query);
   } else {
     alert("Please enter a search term!");
   }
 });
 
 // Initialize the page by fetching an access token
 getAccessToken();
 