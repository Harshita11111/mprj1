const feedbackForm = document.getElementById("feedback");
const feedbackList = document.getElementById("feedback-list");

// Loading here Feedback from LocalStorage(take from user)
const feedbackData = JSON.parse(localStorage.getItem("feedback")) || [];

// Display Feedback Function
function displayFeedback() {
  feedbackList.innerHTML = ""; 

  // Display the latest 5 feedback entries
  const recentFeedback = feedbackData.slice(-5); 
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

// Save it
feedbackForm.addEventListener("submit", (e) => {
  e.preventDefault(); 

 
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;

  // feedback ka object
  const feedback = { name, email, phone, message };
  feedbackData.push(feedback); 

  // Save updated feedback to LocalStorage
  localStorage.setItem("feedback", JSON.stringify(feedbackData));
  feedbackForm.reset();
  displayFeedback();

  alert("Thank you for your feedback!");
});


displayFeedback();


// PART FOR MAKING GEOLOCATION PART
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
// DISPLAY
  showLocationOnMap();





