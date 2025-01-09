const apiKey = "3287dccaa0ae41c8a2e532e197c52950"; // Replace with your NewsAPI key
const apiUrl = `https://newsapi.org/v2/everything?q=animal%20welfare&apiKey=${apiKey}`;
const newsContainer = document.getElementById("news-container");

// Predefined Local News Articles (Fallback)
const localArticles = [
  {
    title: "WeWork India and Heads Up For Tails Join Forces to Drive Pet Adoption with ‘Adopt Don’t Shop’",
    description: "A heroic rescue team saved 20 dogs stranded due to heavy floods.",
    image: "https://via.placeholder.com/300x200",
    url: "https://www.passionateinmarketing.com/wework-india-and-heads-up-for-tails-join-forces-to-drive-pet-adoption-with-adopt-dont-shop/"
  },
  {
    title: "When you adopt, you save 3 lives': Riveting story of Nawabi Tails, an animal rescue team in Lucknow",
    description: "If you're a pet lover who feels strongly about animal welfare, this article is for you! Meet Dr Vishakha Shukla, the Godmother of animals in need in Lucknow.",
    image: "https://via.placeholder.com/300x200",
    url: "https://www.knocksense.com/lucknow/when-you-adopt-you-save-3-lives-riveting-story-of-nawabi-tails-an-animal-rescue-team-in-lucknow"
  },
  {
    title: "Reliance Foundation unveils Vantara: Anant Ambani's animal rescue & care facility",
    description: "Vantara, which is a Hindi word, means 'star of the forest'. This program is dedicated to the rescue, treatment, care, and rehabilitation of animals in need. ",
    image: "https://via.placeholder.com/300x200",
    url: "https://economictimes.indiatimes.com/news/india/reliance-foundation-unveils-vantara-anant-ambanis-animal-rescue-care-facility/articleshow/108015721.cms?from=mdr"
  },
  {
    title: "Community Raises Funds for Animal Hospital",
    description: "Community members raised $50,000 to build a new animal hospital.",
    image: "https://via.placeholder.com/300x200",
    url: "#"
  }
];

// Fetch News Articles from API
async function fetchNews() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Check if articles are available
    if (data.articles && data.articles.length > 0) {
      displayArticles(data.articles); // Use API data
    } else {
      displayArticles(localArticles); // Fallback to local articles
    }
  } catch (error) {
    console.error("Failed to fetch news from API. Using local articles.", error);
    displayArticles(localArticles); // Fallback in case of error
  }
}

// Display Articles (API or Local)
function displayArticles(articles) {
  newsContainer.innerHTML = ""; // Clear existing content

  articles.slice(0, 6).forEach((article) => {
    const articleDiv = document.createElement("div");
    articleDiv.classList.add("news-article");

    // Handle missing images
    const imageUrl = article.urlToImage || article.image || "https://via.placeholder.com/300x200";
    const description = article.description || "No description available.";

    // Add articleDiv content
    articleDiv.innerHTML = `
      <img src="${imageUrl}" alt="${article.title}"  >
      <h3>${article.title}</h3>
      <p>${description.substring(0, 130)}...</p>
      <a href="${article.url}" target="_blank">Read More</a>
      <hr><br>
    `;

    newsContainer.appendChild(articleDiv);
  });
}

// Load news on page load
fetchNews();