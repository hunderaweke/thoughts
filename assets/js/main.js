// Theme Switcher Logic
document.addEventListener("DOMContentLoaded", () => {
  const themeBtn = document.getElementById("theme-toggle");
  if (!themeBtn) {
    console.error("Theme toggle button not found");
    return;
  }

  // Check saved theme or default to light
  const savedTheme = localStorage.getItem("theme") || "light";
  // Ensure both attribute and class are set (safeguard)
  if (!document.documentElement.getAttribute("data-theme")) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  updateThemeUI(savedTheme);

  themeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const isDark = document.documentElement.classList.contains("dark");
    const newTheme = isDark ? "light" : "dark";

    // Update both attribute (for CSS vars) and class (for Tailwind)
    document.documentElement.setAttribute("data-theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", newTheme);
    updateThemeUI(newTheme);
  });

  function updateThemeUI(theme) {
    const lightIcon = document.getElementById("theme-icon-light");
    const darkIcon = document.getElementById("theme-icon-dark");

    if (!lightIcon || !darkIcon) return;

    // If theme is dark, show Sun (to switch to light)
    // If theme is light, show Moon (to switch to dark)
    if (theme === "dark") {
      lightIcon.classList.remove("hidden");
      darkIcon.classList.add("hidden");
    } else {
      lightIcon.classList.add("hidden");
      darkIcon.classList.remove("hidden");
    }
  }
});

// Sticky Title Logic
document.addEventListener("DOMContentLoaded", () => {
  const mainTitle = document.getElementById("main-title");
  const sidebarTitle = document.getElementById("sidebar-title");

  if (mainTitle && sidebarTitle) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            sidebarTitle.classList.remove("opacity-0", "pointer-events-none");
            sidebarTitle.classList.add("opacity-100");
          } else {
            sidebarTitle.classList.add("opacity-0", "pointer-events-none");
            sidebarTitle.classList.remove("opacity-100");
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(mainTitle);
  }
});

// Table of Contents Scrollspy
document.addEventListener("DOMContentLoaded", () => {
  const toc = document.querySelector("#TableOfContents");
  if (!toc) return;

  const headers = document.querySelectorAll(".prose h2, .prose h3, .prose h4");
  const tocLinks = toc.querySelectorAll("a");

  // Map headers to their TOC links
  const headerMap = new Map();
  headers.forEach((header) => {
    const id = header.id;
    const link = toc.querySelector(`a[href="#${id}"]`);
    if (link) headerMap.set(header, link);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Remove active class from all
          tocLinks.forEach((link) => link.classList.remove("active-toc-item"));

          // Add to current
          const link = headerMap.get(entry.target);
          if (link) link.classList.add("active-toc-item");
        }
      });
    },
    {
      rootMargin: "-10% 0px -80% 0px", // Trigger near top
      threshold: 0,
    }
  );

  headers.forEach((header) => observer.observe(header));
});

// Copy Code Logic
document.querySelectorAll("pre > code").forEach((codeBlock) => {
  const pre = codeBlock.parentNode;
  pre.classList.add("relative", "group"); // Make sure parent is relative for absolute positioning

  // Create button
  const copyBtn = document.createElement("button");
  copyBtn.className =
    "absolute top-2 right-2 bg-white text-black text-[10px] font-mono uppercase px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity border border-gray-300 hover:bg-black hover:text-white";
  copyBtn.innerText = "Copy";

  // Logic
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(codeBlock.innerText).then(() => {
      copyBtn.innerText = "Copied!";
      setTimeout(() => {
        copyBtn.innerText = "Copy";
      }, 2000);
    });
  });

  pre.appendChild(copyBtn);

  // Language Label
  const langMatch = codeBlock.className.match(/language-(\w+)/);
  if (langMatch) {
    const langLabel = document.createElement("div");
    langLabel.className =
      "absolute top-2 left-2 text-[10px] font-mono text-gray-400 uppercase pointer-events-none";
    langLabel.innerText = langMatch[1];
    pre.appendChild(langLabel);

    // Add padding to code to avoid overlap
    codeBlock.classList.add("pt-8");
  }
});

// Client-side Filtering
document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll(".filter-checkbox");
  const posts = document.querySelectorAll(".post-item");

  if (!checkboxes.length || !posts.length) return;

  function filterPosts() {
    const activeTags = Array.from(checkboxes)
      .filter((cb) => cb.checked)
      .map((cb) => cb.value.toLowerCase());

    posts.forEach((post) => {
      if (activeTags.length === 0) {
        // Show all if no filter
        post.style.display = "block";
        return;
      }

      const postTags = (post.getAttribute("data-tags") || "").split(",");
      // Check if post has any of the active tags
      const matches = activeTags.some((tag) => postTags.includes(tag));

      post.style.display = matches ? "block" : "none";
    });
  }

  checkboxes.forEach((cb) => {
    cb.addEventListener("change", filterPosts);
  });
});

// Accordion Logic
// Accordion Logic
window.toggleAccordion = function (element) {
  const postItem = element.closest(".post-item");
  const content = postItem.querySelector(".accordion-content");
  const plus = element.querySelector(".plus-icon");
  const minus = element.querySelector(".minus-icon");

  // Toggle state
  const isExpanded = content.classList.contains("active");

  if (isExpanded) {
    // Collapse
    content.classList.remove("active");
    content.style.gridTemplateRows = "0fr";
    plus.classList.remove("hidden");
    minus.classList.add("hidden");
  } else {
    // Expand
    content.classList.add("active");
    content.style.gridTemplateRows = "1fr";
    plus.classList.add("hidden");
    minus.classList.remove("hidden");
  }

  event.stopPropagation();
};

// Footnote Tooltip Logic
document.addEventListener("DOMContentLoaded", () => {
  // Create tooltip element
  const tooltip = document.createElement("div");
  tooltip.className = "footnote-tooltip";
  document.body.appendChild(tooltip);

  let popperInstance = null; // If using popper.js, but we'll do simple positioning first

  const footnoteRefs = document.querySelectorAll(".footnote-ref");

  footnoteRefs.forEach((ref) => {
    ref.addEventListener("mouseenter", (e) => {
      const href = ref.getAttribute("href"); // e.g., "#fn:1"
      // Escape the colon for selector
      const targetId = href.replace(":", "\\:").substring(1);
      const source = document.getElementById(targetId);

      if (source) {
        // Get text content, removing back-to-top links if present
        let content = source.textContent;
        // Clean up "↩︎" or similar usually at end
        content = content.replace(/[↩︎]/g, "").trim();

        tooltip.textContent = content;
        tooltip.classList.add("visible");

        // Position logic
        const rect = ref.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();

        // Position above centered
        let top = rect.top - tooltipRect.height - 10;
        let left = rect.left + rect.width / 2 - tooltipRect.width / 2;

        // Boundary checks
        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10)
          left = window.innerWidth - tooltipRect.width - 10;
        if (top < 10) top = rect.bottom + 10; // Flip to bottom if no space top

        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
      }
    });

    ref.addEventListener("mouseleave", () => {
      tooltip.classList.remove("visible");
    });
  });
});

// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    // Close menu when clicking on a link
    const menuLinks = mobileMenu.querySelectorAll("a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!menuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add("hidden");
      }
    });
  }
});

// Grid/List View Toggle
document.addEventListener("DOMContentLoaded", () => {
  const gridViewBtn = document.getElementById("grid-view");
  const listViewBtn = document.getElementById("list-view");
  const postsContainer = document.getElementById("posts-container");

  if (gridViewBtn && listViewBtn && postsContainer) {
    // Load saved view preference
    const savedView = localStorage.getItem("posts-view") || "list";
    applyView(savedView);

    gridViewBtn.addEventListener("click", () => {
      applyView("grid");
      localStorage.setItem("posts-view", "grid");
    });

    listViewBtn.addEventListener("click", () => {
      applyView("list");
      localStorage.setItem("posts-view", "list");
    });

    function applyView(view) {
      if (view === "grid") {
        postsContainer.className = "grid grid-cols-1 md:grid-cols-2 gap-6";
        gridViewBtn.classList.add("bg-gray-100", "dark:bg-gray-900");
        listViewBtn.classList.remove("bg-gray-100", "dark:bg-gray-900");
      } else {
        postsContainer.className = "posts-list";
        listViewBtn.classList.add("bg-gray-100", "dark:bg-gray-900");
        gridViewBtn.classList.remove("bg-gray-100", "dark:bg-gray-900");

        // Adjust cards for list view
        const cards = postsContainer.querySelectorAll(".post-item");
        cards.forEach((card) => {
          card.classList.remove("md:col-span-2");
        });
      }
    }
  }
});
