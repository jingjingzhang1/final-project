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

// Current View State
let currentPage = "main";

// Render Job Posts
function renderPosts() {
    const postsContainer = document.getElementById("posts");
    const returnArrow = document.getElementById("returnArrow");
    postsContainer.innerHTML = ""; // Clear previous content

    // Toggle Return Arrow Visibility
    if (currentPage === "main") {
        returnArrow.classList.add("hidden");
    } else {
        returnArrow.classList.remove("hidden");
    }

    let filteredData = jobData;
    if (currentPage === "savedPosts") {
        filteredData = jobData.filter(job => job.saved);
    } else if (currentPage === "myPosts") {
        // Example logic for "My Posts" (if there are specific user-created posts)
        filteredData = []; // Replace with actual logic if needed
    }

    if (filteredData.length === 0) {
        postsContainer.innerHTML = "<p>No posts available.</p>";
        return;
    }

    filteredData.forEach((job, index) => {
        const jobCard = document.createElement("div");
        jobCard.className = "card";
        jobCard.innerHTML = `
            <h2>${job.position}</h2>
            <p><strong>Company:</strong> ${job.company}</p>
            <p><strong>Location:</strong> ${job.location}</p>
            <p><strong>Description:</strong> ${job.description}</p>
            <p><strong>Requirements:</strong> ${job.requirements.join(", ")}</p>
            <p><a href="${job.link}" target="_blank">Official Website</a></p>
            <button class="save-btn ${job.saved ? "saved" : ""}" onclick="toggleSave(${index})">
                ${job.saved ? "⭐ Saved" : "☆ Save"}
            </button>
        `;
        postsContainer.appendChild(jobCard);
    });
}

// Save Post
function toggleSave(index) {
    jobData[index].saved = !jobData[index].saved;
    renderPosts();
}

// Navigate Between Pages
function navigateTo(page) {
    currentPage = page;
    renderPosts();
}

// Sort Posts
function sortPosts(criteria) {
    jobData.sort((a, b) => (a[criteria].localeCompare(b[criteria])));
    renderPosts();
}

// Toggle Sort Dropdown
function toggleSort() {
    document.querySelector(".filters").classList.toggle("hidden");
}

// Initial Render
renderPosts();
