const eventDisplay = document.getElementById("event-display");
async function loadEvents() {
  try {
    const response = await fetch("try.json");
    const events = await response.json();
    function showRandomEvent() {
 
      const randomIndex = Math.floor(Math.random() * events.length);
      const event = events[randomIndex];
      eventDisplay.innerHTML = `
        <h3>${event.eventName}</h3>
        <p>${event.date}</p>
        <p>${event.celebratedFor}</p>
      `;
    }
    showRandomEvent();
    setInterval(() => {
      showRandomEvent();
    }, 6000); 
  } catch (error) {
    console.error("Error loading events:", error);
    eventDisplay.innerHTML = `<p>Error loading events. Please try again later.</p>`;
  }
}
loadEvents();
