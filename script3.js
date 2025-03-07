 function displayAnimals() {
              if (!document.getElementById("adoption")) return;
            
              const animals = [
                {
                  name: "Buddy",
                  breed: "Golden Retriever",
                  age: "2 years",
                  image: "https://via.placeholder.com/300x200?text=Buddy",
                  description: "A playful and friendly dog who loves fetch!",
                },
                {
                  name: "Whiskers",
                  breed: "Tabby Cat",
                  age: "1 year",
                  image: "https://via.placeholder.com/300x200?text=Whiskers",
                  description: "A curious and cuddly cat who loves attention.",
                },
                {
                  name: "Chirpy",
                  breed: "Cockatiel",
                  age: "3 years",
                  image: "https://via.placeholder.com/300x200?text=Chirpy",
                  description: "A cheerful bird who loves to sing and mimic sounds.",
                },
              ];
            
              const animalList = document.getElementById("animal-list");
            
              animals.forEach((animal) => {
                const card = document.createElement("div");
                card.classList.add("animal-card");
            
                card.innerHTML = `
                  <img src="${animal.image}" alt="${animal.name}">
                  <h3>${animal.name}</h3>
                  <p><strong>Breed:</strong> ${animal.breed}</p>
                  <p><strong>Age:</strong> ${animal.age}</p>
                  <p>${animal.description}</p>
                  <a href="#" class="adopt-button">Adopt Me</a>
                `;
            
                animalList.appendChild(card);
              });
            }
            
            function displayEvents() {
              if (!document.getElementById("welfareevents")) return;
            
              const events = [
                {
                  title: "Adoption Drive",
                  date: "January 20, 2024",
                  location: "City Park, Springfield",
                  description: "Join us for an adoption drive and meet your future furry friends!",
                  image: "/mprj1/petimage.jpeg/adopdrive.jpg",
                  link: "https://www.facebook.com/ChennaiAdoptionDrive/",
                },
                {
                  title: "Pet Care Workshop",
                  date: "February 15, 2024",
                  location: "Community Hall, Greenfield",
                  description: "Learn essential pet care tips from experienced veterinarians.",
                  image: "/mprj1/petimage.jpeg/petcare.jpg",
                  link: "https://littlecrittercare.co.uk/pet-care-workshops/",
                },
                {
                  title: "Fundraising Gala",
                  date: "March 10, 2024",
                  location: "Grand Hotel, Rivertown",
                  description: "A gala dinner to raise funds for shelter animals in need.",
                  image: "/mprj1/petimage.jpeg/fundraise.jpg",
                  link: "https://www.kxnet.com/news/top-stories/turtle-mountain-animal-rescue-fundraising-to-keep-animals-safe/",
                },
              ];
            
              const eventsList = document.getElementById("events-list");
            
              events.forEach((event) => {
                const card = document.createElement("div");
                card.classList.add("event-card");
            
                card.innerHTML = `
                  <img src="${event.image}" alt="${event.title}">
                  <h3>${event.title}</h3>
                  <p class="event-date">${event.date}</p>
                  <p class="event-location">${event.location}</p>
                  <p>${event.description}</p>
                  <a href="${event.link}" class="event-link">Learn More</a>
                `;
            
                eventsList.appendChild(card);
              });
            }
            
            document.addEventListener("DOMContentLoaded", () => {
              displayAnimals(); 
              displayEvents(); 
            });
