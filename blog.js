function toggleVisibility(button) {
  // Find the parent container of the clicked button
  const container = button.closest('.context');
  
  // Find the hidden text within this container
  const hiddenText = container.querySelector('.hidden-text');
  
  // Toggle visibility of the hidden text
  if (hiddenText.style.display === "none" || hiddenText.style.display === "") {
      hiddenText.style.display = "block";
      button.textContent = "Read Less";
  } else {
      hiddenText.style.display = "none";
      button.textContent = "Read More";
  }
}

// Attach event listeners to buttons
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', function () {
      toggleVisibility(this);
  });
});


// const apiKey = "1A8EF303-D355-40D6-9E7C-7929BF7DB768";
// const apiUrl = `https://api.twingly.com/blog/search/api/v3/search?apikey=${apiKey}&q=animal welfare%20page-size:1`;
// const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // CORS proxy

// const apiBlogContainer = document.getElementById("api-blogs");
const userBlogContainer = document.getElementById("user-blogs");
const blogForm = document.getElementById("blog-form");






// Display User-Submitted Blogs
function displayUserBlogs() {
  const blogs = JSON.parse(localStorage.getItem("userBlogs")) || [];
  blogs.forEach((blog) => {
    const blogPost = createBlogPost(blog.title, blog.author, blog.content);
    userBlogContainer.appendChild(blogPost);
  });
}




function createBlogPost(title, author, content) {
  const blog = document.createElement("div");
  blog.classList.add("context");
  blog.innerHTML = `
    <h5><b>${title} ~~~ by ${author}</b></h5>
    <p class="dateandessence">
      <br>${content.substring(0, 150)}...
      <span class="hidden-text" style="display: none;">${content}</span>
    </p>
    <button onclick="toggleVisibility(this)">Read More</button>
    <br><br><hr><br>
  `;
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

// fetchBlogsFromAPI();
displayUserBlogs();
