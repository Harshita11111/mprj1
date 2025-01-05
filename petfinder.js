// const apiKey = "4ca8f130ffmsh1bf9d91c666c205p18e633jsne80d25c8c4ef"; // Replace with your RapidAPI key
// const apiUrl = "https://pet-data.p.rapidapi.com/animalType?orderBy=asc&index=0&value=0&limit=100"; // Replace with the endpoint URL

// async function fetchPets() {
//   try {
//     const response = await fetch(apiUrl, {
//       method: "GET",
//       headers: {
//         "X-RapidAPI-Key": apiKey, // Authorization Header
//         "X-RapidAPI-Host": "pet-data.p.rapidapi.com", // Replace with actual host
//       },
//     });

//     const data = await response.json();
//     console.log(data); // Display the pet data in console
//     displayPets(data.pets); // Function to dynamically display data
//   } catch (error) {
//     console.error("Error fetching pets:", error);
//   }
// }

// // Example function to display pet details
// function displayPets(pets) {
//   const resultsSection = document.getElementById("results-section");
//   resultsSection.innerHTML = "";

//   pets.forEach((pet) => {
//     const petCard = document.createElement("div");
//     petCard.classList.add("pet-card");

//     petCard.innerHTML = `
//       <img src="${pet.image}" alt="${pet.name}">
//       <h3>${pet.name}</h3>
//       <p><strong>Species:</strong> ${pet.species}</p>
//       <p><strong>Breed:</strong> ${pet.breed}</p>
//       <p><strong>Age:</strong> ${pet.age}</p>
//       <a href="${pet.url}" target="_blank" class="adopt-button">Adopt Me</a>
//     `;
//     resultsSection.appendChild(petCard);
//   });
// }

// fetchPets(); // Call the function

 


//   CODE WHEN ADDING THE JSON FILE FOR ANIMAL DATA
let animals = []; // Array to store animal data

// Fetch data from JSON file
fetch("animals.json")
  .then((response) => response.json())
  .then((data) => {
    animals = data; // Store data in the animals array
  })
  .catch((error) => console.error("Error loading animals data:", error));

// Event Listener for Search
document.getElementById("search-button").addEventListener("click", () => {
  const searchInput = document.getElementById("search-input").value.trim().toLowerCase();
  const filteredAnimals = animals.filter((animal) =>
    animal.species.toLowerCase().includes(searchInput)
  );

  displayAnimals(filteredAnimals);
});

// Display Animals in Cards
function displayAnimals(pets) {
  const resultsSection = document.getElementById("results-section");
  resultsSection.innerHTML = ""; // Clear previous results

  if (pets.length === 0) {
    resultsSection.innerHTML = "<p>No pets found. Try another search!</p>";
    return;
  }

  pets.forEach((pet) => {
    const petCard = document.createElement("div");
    petCard.classList.add("pet-card");

    petCard.innerHTML = `
      <img src="${pet.image}" alt="${pet.name}">
      <h3>${pet.name}</h3>
      <p><strong>Species:</strong> ${pet.species}</p>
      <p><strong>Breed:</strong> ${pet.breed}</p>
      <p><strong>Age:</strong> ${pet.age}</p>
      <p><strong>Gender:</strong> ${pet.gender}</p>
      <p>${pet.description}</p>
    `;

    resultsSection.appendChild(petCard);
  });
}
