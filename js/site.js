(() => {
  const toggleNav = () => {
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector(".navbar-center");
    if (!hamburger || !nav) return;
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("active");
      hamburger.classList.toggle("active");
    });
  };

  const setActiveNav = () => {
    const links = document.querySelectorAll(".navbar-center a");
    if (!links.length) return;

    const pathname = window.location.pathname;
    const currentFile = pathname.split("/").pop() || "index.html";
    const currentBase = currentFile.replace(/\.html$/, "");

    links.forEach((link) => {
      const href = (link.getAttribute("href") || "").trim();
      if (!href) return;

      const hrefFile = href.split("/").pop() || "index.html";
      const hrefBase = hrefFile.replace(/\.html$/, "");

      const isActive =
        currentBase === hrefBase ||
        (currentBase === "" && hrefBase === "index");

      if (isActive) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };

  const initFaq = () => {
    const faqCards = document.querySelectorAll(".faqCard");
    if (!faqCards.length) return;
    const setIcon = (card, open) => {
      const icon = card.querySelector(".faqHeader span");
      if (icon) icon.textContent = open ? "-" : "+";
      card.setAttribute("aria-expanded", open ? "true" : "false");
    };
    faqCards.forEach((card) => {
      setIcon(card, false);
      card.addEventListener("click", () => {
        const isOpen = card.classList.contains("open");
        faqCards.forEach((c) => {
          c.classList.remove("open");
          setIcon(c, false);
        });
        if (!isOpen) {
          card.classList.add("open");
          setIcon(card, true);
        }
      });
    });
  };

  const initCourses = () => {
    const grid = document.querySelector(".coursesGrid");
    if (!grid) return;

    const courses = [
      {
        id: 1,
        title: "Applied AI & Machine Learning",
        description:
          "Build end-to-end ML systems with real product workflows, from data prep to deployment.",
        overview:
          "A practical, project-driven track focused on production-ready ML pipelines, model evaluation, and deployment best practices.",
        tags: ["AI", "ML", "Python"],
        level: "Intermediate",
        audience:
          "Engineers, analysts, and product builders who want to ship ML features with confidence.",
        prerequisites: "Comfortable with Python and basic statistics.",
        tools: "Python, scikit-learn, pandas, model monitoring basics",
        outcomes: [
          "Build a full ML pipeline from data prep to deployment",
          "Evaluate models with reliable metrics",
          "Ship a production-ready model with monitoring",
        ],
      },
      {
        id: 2,
        title: "Data Science Foundations",
        description:
          "Master data analysis, visualization, and statistical thinking to solve real problems.",
        overview:
          "A beginner-friendly program to build strong fundamentals in analytics, visualization, and storytelling.",
        tags: ["Data", "Analytics", "Statistics"],
        level: "Beginner",
        audience:
          "Aspiring data analysts and professionals transitioning into data science.",
        prerequisites: "No prior experience required.",
        tools: "Python, pandas, matplotlib, SQL basics",
        outcomes: [
          "Clean and analyze datasets confidently",
          "Create clear, insightful visualizations",
          "Explain findings with data storytelling",
        ],
      },
      {
        id: 3,
        title: "Quantum Computing Essentials",
        description:
          "Explore quantum concepts, algorithms, and how they impact future software systems.",
        overview:
          "Learn the core ideas behind quantum computing with practical labs and real-world applications.",
        tags: ["Quantum", "Algorithms", "Research"],
        level: "Advanced",
        audience:
          "Engineers and researchers exploring advanced computing paradigms.",
        prerequisites: "Linear algebra fundamentals and strong programming skills.",
        tools: "Qiskit, Python, quantum circuit simulators",
        outcomes: [
          "Understand qubits, gates, and measurement",
          "Implement foundational quantum algorithms",
          "Evaluate where quantum advantage fits",
        ],
      },
      {
        id: 4,
        title: "AI Product Strategy",
        description:
          "Learn how to design AI-powered products with measurable impact and ethical care.",
        overview:
          "A strategy-focused course covering AI product discovery, data readiness, and responsible deployment.",
        tags: ["Product", "AI", "UX"],
        level: "All Levels",
        audience:
          "Product managers, founders, and team leads planning AI initiatives.",
        prerequisites: "Interest in AI product development and business impact.",
        tools: "Product discovery frameworks, experimentation planning",
        outcomes: [
          "Define AI product opportunities",
          "Plan data and model readiness",
          "Design responsible AI experiences",
        ],
      },
    ];

    const searchInput = document.querySelector(".coursesSearch input");
    const filterButtons = document.querySelectorAll(".filterChip");
    const modal = document.querySelector(".courseOverlay");
    const modalTitle = document.querySelector(".modalHeader h2");
    const modalOverview = document.querySelector(".modalHeader p");
    const modalLevel = document.querySelector(".modalStats .levelValue");
    const modalFocus = document.querySelector(".modalStats .focusValue");
    const modalOutcomes = document.querySelector(".modalContent ul");
    const modalAudience = document.querySelector(".modalAudience");
    const modalPrereq = document.querySelector(".modalPrereq");
    const modalTools = document.querySelector(".modalTools");

    let activeFilter = "All";
    let query = "";

    const renderCourses = () => {
      grid.innerHTML = "";
      const filtered = courses.filter((course) => {
        const q = query.trim().toLowerCase();
        const matchesQuery =
          !q ||
          course.title.toLowerCase().includes(q) ||
          course.description.toLowerCase().includes(q) ||
          course.tags.some((tag) => tag.toLowerCase().includes(q));
        const matchesFilter =
          activeFilter === "All" ||
          course.level === activeFilter ||
          course.tags.includes(activeFilter);
        return matchesQuery && matchesFilter;
      });

      filtered.forEach((course) => {
        const card = document.createElement("article");
        card.className = "courseCard";
        card.innerHTML = `
          <h3>${course.title}</h3>
          <p>${course.description}</p>
          <div class="courseTags">
            ${course.tags.map((tag) => `<span class="courseTag">${tag}</span>`).join("")}
          </div>
          <button class="btn-primary" data-course="${course.id}">View Course Details</button>
        `;
        grid.appendChild(card);
      });

      if (filtered.length === 0) {
        const empty = document.createElement("div");
        empty.className = "coursesEmpty";
        empty.innerHTML = `
          <h3>No courses found</h3>
          <p>Try a different keyword or explore all available courses.</p>
          <button class="btn-outline" type="button">Reset filters</button>
        `;
        grid.appendChild(empty);
        const resetBtn = empty.querySelector("button");
        if (resetBtn) {
          resetBtn.addEventListener("click", () => {
            query = "";
            if (searchInput) searchInput.value = "";
            activeFilter = "All";
            filterButtons.forEach((b) => b.classList.remove("active"));
            const first = document.querySelector(".filterChip");
            if (first) first.classList.add("active");
            renderCourses();
          });
        }
      }

      grid.querySelectorAll("button[data-course]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = Number(btn.getAttribute("data-course"));
          const course = courses.find((c) => c.id === id);
          if (!course) return;
          modalTitle.textContent = course.title;
          modalOverview.textContent = course.overview;
          modalLevel.textContent = course.level;
          modalFocus.textContent = course.tags.join(", ");
          modalOutcomes.innerHTML = course.outcomes
            .map((item) => `<li>${item}</li>`)
            .join("");
          modalAudience.textContent = course.audience;
          modalPrereq.textContent = course.prerequisites;
          modalTools.textContent = course.tools;
          modal.classList.add("open");
        });
      });
    };

    if (searchInput) {
      searchInput.addEventListener("input", (event) => {
        query = event.target.value;
        renderCourses();
      });
    }

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        button.classList.add("active");
        activeFilter = button.textContent.trim();
        renderCourses();
      });
    });

    if (modal) {
      modal.addEventListener("click", (event) => {
        if (event.target.classList.contains("courseOverlay")) {
          modal.classList.remove("open");
        }
      });
      const closeBtn = modal.querySelector(".modalClose");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => modal.classList.remove("open"));
      }
    }

    renderCourses();
  };

  document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;
    if (path === "/privacy-policy" || path === "/privacy-policy/") {
      window.location.replace("./privacy-policy.html");
      return;
    }
    if (path === "/terms" || path === "/terms/") {
      window.location.replace("./terms.html");
      return;
    }
    if (path === "/contact" || path === "/contact/") {
      window.location.replace("./contact.html");
      return;
    }
    if (path === "/about" || path === "/about/") {
      window.location.replace("./about.html");
      return;
    }
    if (path === "/products" || path === "/products/") {
      window.location.replace("./products.html");
      return;
    }
    if (path === "/courses" || path === "/courses/") {
      window.location.replace("./courses.html");
      return;
    }
    toggleNav();
    setActiveNav();
    initFaq();
    initCourses();
  });
})();
