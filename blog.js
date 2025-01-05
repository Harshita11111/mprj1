function toggleVisibility() {
    const hiddenText = document.querySelector('.hidden-text');
    hiddenText.style.display = hiddenText.style.display === 'none' ? 'inline' : 'none';
}

const apiUrl = "1A8EF303-D355-40D6-9E7C-7929BF7DB768";
// const apiUrl = `https://api.twingly.com/blog/search/api/v3/search?q=animal+welfare&api_key=${apiKey}`;

const apiBlogContainer = document.getElementById("api-blogs");
const userBlogContainer = document.getElementById("user-blogs");
const blogForm = document.getElementById("blog-form");


async function fetchBlogsFromAPI() {
    try {
      const response = await fetch(apiUrl); // Fetch from local file
      const data = await response.json();
      console.log(data);
      displayApiBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      apiBlogContainer.innerHTML = "<p>Failed to load blogs.</p>";
    }
  }

// Fetch Blogs from Twingly API
// async function fetchBlogsFromAPI() {
//     try {
//       const response = await fetch(apiUrl);
//       if (!response.ok) {
//         throw new Error("Failed to fetch blogs from API");
//       }
//       const data = await response.json();
  
//       if (data.hits && data.hits.length > 0) {
//         displayApiBlogs(data.hits);
//       } else {
//         apiBlogContainer.innerHTML = "<p>No blogs found from API.</p>";
//       }
//     } catch (error) {
//       console.error("Error fetching blogs:", error);
//       apiBlogContainer.innerHTML = "<p>Failed to load blogs. Please try again later.</p>";
//     }
//   }

// Display Blogs from API
function displayApiBlogs(blogs) {
    blogs.forEach((blog) => {
      const blogPost = document.createElement("div");
      blogPost.classList.add("blog");
  
      // Handle missing images and description
      const imageUrl = blog.images?.[0] || "https://via.placeholder.com/300x200?text=No+Image";
      const description = blog.snippet || "No description available.";
      const title = blog.title || "Untitled Blog";
      const url = blog.url || "#";
  
      blogPost.innerHTML = `
        <img src="${imageUrl}" alt="${title}">
        <h3>${title}</h3>
        <p>${description}</p>
        <a href="${url}" target="_blank" class="read-more">Read More</a>
      `;
      apiBlogContainer.appendChild(blogPost);
    });
  }

// Display User-Submitted Blogs
function displayUserBlogs() {
  const blogs = JSON.parse(localStorage.getItem("userBlogs")) || [];
  blogs.forEach((blog) => {
    const blogPost = createBlogPost(blog.title, blog.author, blog.content);
    userBlogContainer.appendChild(blogPost);
  });
}

// Create Blog Post
function createBlogPost(title, author, content) {
  const blog = document.createElement("div");
  blog.classList.add("blog");
  blog.innerHTML = `<h3>${title}</h3><p><strong>By ${author}</strong></p><p>${content}</p>`;
  return blog;
}

// Save User Blogs
blogForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const content = document.getElementById("content").value;

  const blogs = JSON.parse(localStorage.getItem("userBlogs")) || [];
  blogs.push({ title, author, content });
  localStorage.setItem("userBlogs", JSON.stringify(blogs));

  userBlogContainer.appendChild(createBlogPost(title, author, content));
  blogForm.reset();
});

fetchBlogsFromAPI();
displayUserBlogs();
