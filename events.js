// Select the event display container
const eventDisplay = document.getElementById("event-display");

// Fetch data from JSON file
async function loadEvents() {
  try {
    // Fetch the JSON file
    const response = await fetch("try.json");
    const events = await response.json();

    // Function to show random event
    function showRandomEvent() {
      // Pick a random event
      const randomIndex = Math.floor(Math.random() * events.length);
      const event = events[randomIndex];

      // Update the display content
      eventDisplay.innerHTML = `
        <h3>${event.eventName}</h3>
        <p>${event.date}</p>
        <p>${event.celebratedFor}</p>
      `;
    }

    // Show the first event immediately
    showRandomEvent();

    // Change the event every 6 seconds
    setInterval(() => {
      showRandomEvent();
    }, 6000); // Matches CSS animation duration
  } catch (error) {
    console.error("Error loading events:", error);
    eventDisplay.innerHTML = `<p>Error loading events. Please try again later.</p>`;
  }
}

// Load events when the page loads
loadEvents();
