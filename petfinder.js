document.addEventListener("DOMContentLoaded", () => {
 const speciesFilter = document.getElementById("species-filter");
 const breedFilter = document.getElementById("breed-filter");
 const locationFilter = document.getElementById("location-filter");
 const searchBar = document.getElementById("search-bar");
 const searchBtn = document.getElementById("search-button");
 const applyFiltersBtn = document.getElementById("apply-filters");
 const resultList = document.getElementById("result-list");
 const prevBtn = document.getElementById("prev-btn");
 const nextBtn = document.getElementById("next-btn");
 const pageInfo = document.getElementById("page-info");
  
  if (!speciesFilter || !breedFilter || !locationFilter || !searchBar || !searchBtn || !applyFiltersBtn || !resultList || !prevBtn || !nextBtn || !pageInfo) {
    console.error("One or more DOM elements are missing.");
    return;
  }
  
  let pets = [];
  let filteredPets = [];
  let currentPage = 1;
  const itemsPerPage = 3; 
  
  async function loadPets() {
    try {
      const response = await fetch("adoptable_pets.json"); 
      if (!response.ok) throw new Error("Failed to fetch pets data");
  
      pets = await response.json();
      filteredPets = pets; 
      populateFilters();
      updatePage(1); 
    } catch (error) {
      console.error("Error loading pets:", error);
    }
  }
  
  function populateFilters() {
    const breeds = [...new Set(pets.map((pet) => pet.breed))];
    const locations = [...new Set(pets.map((pet) => pet.location))];
  
    populateDropdown(breedFilter, breeds);
    populateDropdown(locationFilter, locations);
  }
  
  function populateDropdown(dropdown, options) {
    options.forEach((option) => {
      const element = document.createElement("option");
      element.value = option;
      element.textContent = option;
      dropdown.appendChild(element);
    });
  }
  
  function displayPets(petsToShow) {
    resultList.innerHTML = "";
  
    if (petsToShow.length === 0) {
      resultList.innerHTML = "<p>No pets found.</p>";
      return;
    }
    petsToShow.forEach((pet) => {
      const petCard = document.createElement("div");
      petCard.classList.add("pet-card");
  
      petCard.innerHTML = `
        <img src="${pet.image}" alt="${pet.name}">
        <h3>${pet.name}</h3>
        <p><strong>Species:</strong> ${pet.species}</p>
        <p><strong>Breed:</strong> ${pet.breed}</p>
        <p><strong>Location:</strong> ${pet.location}</p>
        <p>${pet.description}</p>
        <button>Adopt Me</button>
      `;
      resultList.appendChild(petCard);
    });
  }

  function updatePage(page) {
    currentPage = page;
  
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedPets = filteredPets.slice(start, end);
  
    displayPets(paginatedPets);
    updatePaginationControls();
  }
  
  function updatePaginationControls() {
    pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(
      filteredPets.length / itemsPerPage
    )}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === Math.ceil(filteredPets.length / itemsPerPage);
  }
  
  applyFiltersBtn.addEventListener("click", () => {
    const species = speciesFilter.value;
    const breed = breedFilter.value;
    const location = locationFilter.value;
  
    filteredPets = pets.filter(
      (pet) =>
        (species === "" || pet.species === species) &&
        (breed === "" || pet.breed === breed) &&
        (location === "" || pet.location === location)
    );
    updatePage(1);
  });
  
  searchBtn.addEventListener("click", () => {
    const query = searchBar.value.toLowerCase();
    filteredPets = pets.filter((pet) =>
      pet.species.toLowerCase().includes(query)
    );
    updatePage(1);
  });
 
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      updatePage(currentPage - 1);
    }
  });
  
  nextBtn.addEventListener("click", () => {
    if (currentPage < Math.ceil(filteredPets.length / itemsPerPage)) {
      updatePage(currentPage + 1);
    }
  });
  
  loadPets();
  
  });
