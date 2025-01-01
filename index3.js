const feedbackForm = document.getElementById("feedback");
const feedbackList = document.getElementById("feedback-list");

// Load Existing Feedback from LocalStorage
const feedbackData = JSON.parse(localStorage.getItem("feedback")) || [];

// Display Feedback Function
function displayFeedback() {
  feedbackList.innerHTML = ""; // Clear old data

  // Display the latest 5 feedback entries
  const recentFeedback = feedbackData.slice(-5); // Show only the last 5 entries
  recentFeedback.forEach((feedback) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <strong>${feedback.name}</strong> (${feedback.email}, ${feedback.phone}): 
      ${feedback.message}
    `;
    feedbackList.appendChild(listItem);
  });
}

// Save Feedback Function
feedbackForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent page reload

  // Get input values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;

  // Create feedback object
  const feedback = { name, email, phone, message };
  feedbackData.push(feedback); // Add new feedback to the array

  // Save updated feedback to LocalStorage
  localStorage.setItem("feedback", JSON.stringify(feedbackData));

  // Clear the form
  feedbackForm.reset();

  // Display updated feedback
  displayFeedback();

  // Notify user
  alert("Thank you for your feedback!");
});

// Display feedback when the page loads
displayFeedback();



function showLocationOnMap() {
    const mapDiv = document.getElementById("map");
  
    // Check if browser supports Geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
  
          // Display map with user's location
          mapDiv.innerHTML = `
            <iframe 
              width="100%" 
              height="300px" 
              frameborder="0" 
              style="border:0" 
              src="https://www.google.com/maps?q=${latitude},${longitude}&hl=es;z=14&output=embed">
            </iframe>
          `;
        },
        (error) => {
          mapDiv.innerHTML = `<p>Unable to retrieve location. Error: ${error.message}</p>`;
        }
      );
    } else {
      mapDiv.innerHTML = "<p>Geolocation is not supported by this browser.</p>";
    }
  }
  
  // Display user's current location
  showLocationOnMap();




  // CODE FOR STATIC ADDING OF NEWS ARTICLE
  const newsContainer = document.getElementById("news-container");

  // Predefined articles
  const articles = [
    {
      title: "Rescue Team Saves 20 Dogs from Floods",
      description: "A heroic rescue team saved 20 dogs stranded due to heavy floods.",
      image: "https://via.placeholder.com/300x200",
      url: "#"
    },
    {
      title: "Animal Shelter Hosts Adoption Drive",
      description: "Local shelter successfully rehomes 50 animals in weekend drive.",
      image: "https://via.placeholder.com/300x200",
      url: "#"
    },
    {
      title: "New Laws Protect Stray Animals",
      description: "Legislation passed to improve welfare for stray animals nationwide.",
      image: "https://via.placeholder.com/300x200",
      url: "#"
    },
  ];
  
  // Display articles dynamically
  function displayArticles() {
    articles.forEach((article) => {
      const articleDiv = document.createElement("div");
      articleDiv.classList.add("news-article");
  
      articleDiv.innerHTML = `
 
        <h3>${article.title}</h3>
        <p>${article.description}</p>
        <a href="${article.url}" target="_blank">Read More</a>
      `;
  
      newsContainer.appendChild(articleDiv);
    });
  }
  
  // Load predefined articles
  displayArticles();