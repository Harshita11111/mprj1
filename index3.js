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
    const feedbackDiv = document.createElement("div");
    feedbackDiv.classList.add("feedback-div");

      feedbackDiv.innerHTML = `
       <h3>${feedback.name}</h3>
         <p>${feedback.message}</p>
       `;
    feedbackList.appendChild(feedbackDiv);
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




//  // Select feedback form and display container
// const feedbackForm = document.getElementById("feedback");
// const feedbackList = document.getElementById("feedback-list");

// // Load existing feedback from localStorage
// function loadFeedback() {
//   const feedbackData = JSON.parse(localStorage.getItem("feedback")) || [];
//   feedbackList.innerHTML = ""; // Clear existing feedback

//   feedbackData.forEach((item) => {
//     displayFeedback(item.username, item.feedback);
//   });
// }

// // Save feedback to localStorage
// function saveFeedback(username, feedback) {
//   const feedbackData = JSON.parse(localStorage.getItem("feedback")) || [];
//   feedbackData.push({ username, feedback });
//   localStorage.setItem("feedback", JSON.stringify(feedbackData));
// }

// // Display feedback dynamically in div format
// function displayFeedback(username, feedback) {
//   const feedbackDiv = document.createElement("div");
//   feedbackDiv.classList.add("feedback-div");

//   feedbackDiv.innerHTML = `
//     <h3>${username}</h3>
//     <p>${feedback}</p>
//   `;

//   feedbackList.appendChild(feedbackDiv);
// }

// // Handle form submission
// feedbackForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const username = document.getElementById("username").value;
//   const feedback = document.getElementById("feedback").value;

//   // Save and display feedback
//   saveFeedback(username, feedback);
//   displayFeedback(username, feedback);

//   // Clear form fields
//   feedbackForm.reset();
// });

// // Load feedback on page load
// loadFeedback();