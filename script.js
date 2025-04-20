document.addEventListener("DOMContentLoaded", () => {
  const blogForm = document.getElementById("blog-form");
  const blogList = document.getElementById("blog-list");
  const blogContent = document.getElementById("blog-content");

  let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

  if (blogForm) {
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get("edit");
    if (editId !== null) {
      const blog = blogs[editId];
      document.getElementById("title").value = blog.title;
      document.getElementById("image").value = blog.image;
      document.getElementById("content").value = blog.content;
    }

    blogForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("title").value;
      const image = document.getElementById("image").value;
      const content = document.getElementById("content").value;
      const newBlog = { title, image, content };

      if (editId !== null) {
        blogs[editId] = newBlog;
      } else {
        blogs.unshift(newBlog);
      }

      localStorage.setItem("blogs", JSON.stringify(blogs));
      window.location.href = "index.html";
    });
  }

  if (blogList) {
    blogs.forEach((blog, index) => {
      const blogCard = document.createElement("div");
      blogCard.className = "blog-card";
      blogCard.innerHTML = `
        <img src="${blog.image}" alt="${blog.title}">
        <h2>${blog.title}</h2>
        <p>${blog.content.substring(0, 100)}...</p>
        <a href="blog.html?id=${index}">Read More</a>
      `;
      blogList.appendChild(blogCard);
    });
  }

  if (blogContent) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const blog = blogs[id];
    if (blog) {
      const container = document.createElement("div");
      container.className = "blog-full";
      container.innerHTML = `
        <img src="${blog.image}" alt="${blog.title}">
        <h2>${blog.title}</h2>
        <p>${blog.content}</p>
        <div class="actions">
          <button onclick="editBlog(${id})">Edit</button>
          <button onclick="deleteBlog(${id})">Delete</button>
        </div>
      `;
      blogContent.appendChild(container);
    }
  }
});

function editBlog(id) {
  window.location.href = "add.html?edit=" + id;
}

function deleteBlog(id) {
  let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  blogs.splice(id, 1);
  localStorage.setItem("blogs", JSON.stringify(blogs));
  window.location.href = "index.html";
}
