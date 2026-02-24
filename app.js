const jobs = [
  {
    id: "J-1",
    companyName: "Mobile First Corp",
    position: "React Native Developer",
    location: "Remote",
    type: "Full-time",
    salary: "$130,000 - $175,000",
    description: "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.",
    status: "All",
  },
  {
    id: "J-2",
    companyName: "WebFlow Agency",
    position: "Web Designer & Developer",
    location: "Los Angeles, CA",
    type: "Part-time",
    salary: "$80,000 - $120,000",
    description: "Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.",
    status: "All",
  },
  {
    id: "J-3",
    companyName: "DataViz Solutions",
    position: "Data Visualization Specialist",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$125,000 - $165,000",
    description: "Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.",
    status: "All",
  },
  {
    id: "J-4",
    companyName: "CloudFirst Inc",
    position: "Backend Developer",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$115,000 - $155,000",
    description: "Design scalable APIs and services. Work with databases, authentication, and deployment pipelines for modern web apps.",
    status: "All",
  },
  {
    id: "J-5",
    companyName: "Innovation Labs",
    position: "Frontend Engineer",
    location: "New York, NY",
    type: "Full-time",
    salary: "$120,000 - $160,000",
    description: "Build secure and accessible dashboards. Improve UI performance, state management, and component-based architecture.",
    status: "All",
  },
  {
    id: "J-6",
    companyName: "MegaCorp Solutions",
    position: "UI Developer",
    location: "Austin, TX",
    type: "Contract",
    salary: "$90,000 - $130,000",
    description: "Create user-friendly interfaces for healthcare products. Focus on clean layouts, responsive screens, and consistent spacing.",
    status: "All",
  },
  {
    id: "J-7",
    companyName: "StartupXYZ",
    position: "Junior Web Developer",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$70,000 - $95,000",
    description: "Work on product listing pages and admin tools. Implement DOM features, event handling, and UI enhancements.",
    status: "All",
  },
  {
    id: "J-8",
    companyName: "TechCorp Industries",
    position: "Frontend Intern",
    location: "San Francisco, CA",
    type: "Internship",
    salary: "$25/hr - $35/hr",
    description: "Support the web team by converting designs into HTML/CSS, fixing UI bugs, and improving mobile responsiveness.",
    status: "All",
  },
];

let activeTab = "all";

const els = {
  cards: document.getElementById("cards"),
  empty: document.getElementById("emptyState"),
  emptyTitle: document.getElementById("emptyTitle"),
  emptySub: document.getElementById("emptySub"),

  totalCount: document.getElementById("totalCount"),
  interviewCount: document.getElementById("interviewCount"),
  rejectedCount: document.getElementById("rejectedCount"),

  tabCount: document.getElementById("tabCount"),
  tabs: Array.from(document.querySelectorAll(".tab")),
};

function getFilteredJobs() {
  if (activeTab === "all") return jobs;
  if (activeTab === "interview") return jobs.filter(j => j.status === "Interview");
  return jobs.filter(j => j.status === "Rejected");
}

function updateCounts() {
  els.totalCount.textContent = jobs.length;
  els.interviewCount.textContent = jobs.filter(j => j.status === "Interview").length;
  els.rejectedCount.textContent = jobs.filter(j => j.status === "Rejected").length;

  const filteredCount = getFilteredJobs().length;
  els.tabCount.textContent = `${filteredCount} jobs`;
}

function showEmptyStateIfNeeded() {
  const filtered = getFilteredJobs();
  const isEmpty = filtered.length === 0;

  if (!isEmpty) {
    els.empty.classList.add("is-hidden");
    return;
  }

  els.empty.classList.remove("is-hidden");
  els.emptyTitle.textContent = "No jobs Available";

  if (activeTab === "interview") {
    els.emptySub.textContent = "You haven’t added any Interview jobs yet.";
  } else if (activeTab === "rejected") {
    els.emptySub.textContent = "You haven’t added any Rejected jobs yet.";
  } else {
    els.emptySub.textContent = "No jobs found.";
  }
}

function statusPillText(status) {
  if (status === "Interview") return "INTERVIEW";
  if (status === "Rejected") return "REJECTED";
  return "NOT APPLIED";
}

function renderCards() {
  const filtered = getFilteredJobs();

  els.cards.innerHTML = filtered.map(job => {
    const interviewActive = job.status === "Interview";
    const rejectedActive = job.status === "Rejected";

    return `
      <article class="card" data-id="${job.id}">
        <div class="card__top">
          <div>
            <h3 class="card__company">${job.companyName}</h3>
            <p class="card__position">${job.position}</p>

            <div class="card__meta">${job.location} • ${job.type} • ${job.salary}</div>

            <div class="pill">${statusPillText(job.status)}</div>

            <p class="card__desc">${job.description}</p>

            <div class="card__actions">
              <button class="btn interview ${interviewActive ? "is-active" : ""}" data-action="interview">INTERVIEW</button>
              <button class="btn rejected ${rejectedActive ? "is-active" : ""}" data-action="rejected">REJECTED</button>
            </div>
          </div>

          <button class="icon-btn" data-action="delete" aria-label="Delete job">🗑️</button>
        </div>
      </article>
    `;
  }).join("");

  showEmptyStateIfNeeded();
  updateCounts();
}

function setActiveTab(tabKey) {
  activeTab = tabKey;

  els.tabs.forEach(btn => {
    const on = btn.dataset.tab === tabKey;
    btn.classList.toggle("is-active", on);
    btn.setAttribute("aria-selected", on ? "true" : "false");
  });

  renderCards();
}


els.cards.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const card = e.target.closest(".card");
  if (!card) return;

  const id = card.dataset.id;
  const action = btn.dataset.action;

  const idx = jobs.findIndex(j => j.id === id);
  if (idx === -1) return;

  if (action === "delete") {
    jobs.splice(idx, 1);
    renderCards();
    return;
  }

  if (action === "interview") {
    jobs[idx].status = "Interview";
    setActiveTab("interview");
    return;
  }

  if (action === "rejected") {
    jobs[idx].status = "Rejected";
    setActiveTab("rejected");
    return;
  }
});

els.tabs.forEach(t => t.addEventListener("click", () => setActiveTab(t.dataset.tab)));

renderCards();