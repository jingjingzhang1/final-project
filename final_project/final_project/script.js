// Sample Job Data
const jobData = [
    {
        position: "Computer Scientist",
        company: "Company ABC",
        location: "City abc",
        description: "Mainly about programming and designing.",
        requirements: [
            "Experience in Java",
            "Graduate after 2026"
        ],
        link: "https://jobs.application.site12345",
        saved: false
    },
    {
        position: "Data Scientist",
        company: "Company EFG",
        location: "City efg",
        description: "Focuses on database and data structure.",
        requirements: [
            "Experience in SQL",
            "Graduate after 2026"
        ],
        link: "https://jobs.application.site67890",
        saved: false
    }
];

// User Posts
let userPosts = [];

// Current View State
let currentPage = "main";

// Render Dynamic Content
function renderContent() {
    const content = document.getElementById("content");
    const returnArrow = document.getElementById("returnArrow");
    content.innerHTML = ""; // Clear previous content

    // Toggle Return Arrow Visibility
    if (currentPage === "main") {
        returnArrow.classList.add("hidden");
    } else {
        returnArrow.classList.remove("hidden");
    }

    if (currentPage === "main") {
        renderPosts(jobData);
    } else if (currentPage === "savedPosts") {
        renderPosts(jobData.filter(job => job.saved));
    } else if (currentPage === "myPosts") {
        renderUserPosts();
    } else if (currentPage === "newPost") {
        renderNewPostForm();
    }
}

// Render Job Posts
function renderPosts(posts) {
    const content = document.getElementById("content");

    if (posts.length === 0) {
        content.innerHTML = "<p>No posts available.</p>";
        return;
    }

    const postsContainer = document.createElement("div");
    postsContainer.className = "posts";

    posts.forEach((post, index) => {
        const postCard = document.createElement("div");
        postCard.className = "card";
        postCard.innerHTML = `
            <h2>${post.position}</h2>
            <p><strong>Company:</strong> ${post.company}</p>
            <p><strong>Location:</strong> ${post.location}</p>
            <p><strong>Description:</strong> ${post.description}</p>
            <p><strong>Requirements:</strong> ${post.requirements.join(", ")}</p>
            <p><a href="${post.link}" target="_blank">Official Website</a></p>
        `;
        postsContainer.appendChild(postCard);
        
    });

    content.appendChild(postsContainer);
}

// Render User Posts
function renderUserPosts() {
    const content = document.getElementById("content");

    if (userPosts.length === 0) {
        content.innerHTML = "<p>No posts available.</p>";
    } else {
        const postsContainer = document.createElement("div");
        postsContainer.className = "posts";

        userPosts.forEach((post, index) => {
            const postCard = document.createElement("div");
            postCard.className = "card";
            postCard.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.content}</p>
                <button onclick="deletePost(${index})">Delete</button>
            `;
            postsContainer.appendChild(postCard);
        });

        content.appendChild(postsContainer);
    }

    // Add "Post" button
    const postButton = document.createElement("button");
    postButton.textContent = "Post New";
    postButton.className = "btn";
    postButton.onclick = () => navigateTo("newPost");
    content.appendChild(postButton);
}

// Render New Post Form
function renderNewPostForm() {
    const content = document.getElementById("content");

    const formContainer = document.createElement("div");
    formContainer.className = "form-container";

    formContainer.innerHTML = `
        <label for="postTitle">Title:</label>
        <input type="text" id="postTitle" placeholder="Enter post title">

        <label for="postContent">Content:</label>
        <textarea id="postContent" rows="4" placeholder="Enter post content"></textarea>

        <button onclick="addNewPost()">Post</button>
    `;

    content.appendChild(formContainer);
}

// Add New Post
function addNewPost() {
    const title = document.getElementById("postTitle").value;
    const content = document.getElementById("postContent").value;

    if (title && content) {
        userPosts.push({ title, content });
        navigateTo("myPosts");
    } else {
        alert("Please fill in both fields!");
    }
}

// Delete Post
function deletePost(index) {
    userPosts.splice(index, 1);
    renderUserPosts();
}

// Navigate Between Pages
function navigateTo(page) {
    currentPage = page;
    renderContent();
}

// Initial Render
renderContent();
