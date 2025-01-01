 // CODE FOR STATIC ADDING OF NEWS ARTICLE
 const newsContainer = document.getElementById("news-container");

 // Predefined articles
 const articles = [
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
        <hr><br>
     `;
 
     newsContainer.appendChild(articleDiv);
   });
 }
 
 // Load predefined articles
 displayArticles();



//  const apiKey = "3287dccaa0ae41c8a2e532e197c52950"; // Replace with your NewsAPI key
// const apiUrl = `https://newsapi.org/v2/everything?q=animal%20rescue&apiKey=${apiKey}`;
// const newsContainer1 = document.getElementById("necontainer");

// // Fetch news articles
// async function fetchNews() {
//   try {
//     const response = await fetch(apiUrl);
//     const data = await response.json();

//     // Display articles
//     displayArticles(data.articles);
//   } catch (error) {
//     console.error("Failed to fetch news:", error);
//     newsContainer1.innerHTML = "<p>Unable to fetch news at the moment. Please try again later.</p>";
//   }
// }

// // Display articles dynamically
// function displayArticles(articles) {
//   newsContainer1.innerHTML = ""; // Clear previous content

//   articles.slice(0, 6).forEach((article) => {
//     const dynamicNews = document.createElement("news-section");
//     dynamicNews.classList.add("news-card");

//     const imageUrl = article.urlToImage || "https://via.placeholder.com/300x200?text=No+Image";
//     const description = article.description || "No description available.";

//     dynamicNews.innerHTML = `
      
//       <h3>${article.title}</h3><br>
//       <p>${description.substring(0, 100)}...</p>
//       <a href="${article.url}" target="_blank">Read More</a>
//     `;

//     newsContainer1.appendChild(dynamicNews);
//   });
// }

// // Load news articles when page loads
// fetchNews();
