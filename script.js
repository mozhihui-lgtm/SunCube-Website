const header = document.querySelector(".site-header");
const reveals = document.querySelectorAll(".reveal");
const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector(".mobile-nav");
const navGroups = document.querySelectorAll(".nav-group");

const closeNavGroups = (exceptGroup = null) => {
  navGroups.forEach((group) => {
    if (group === exceptGroup) return;
    group.classList.remove("open");
    group.querySelector(".nav-group-toggle").setAttribute("aria-expanded", "false");
  });
};

const closeMenu = () => {
  closeNavGroups();
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open menu");
  mobileNav.classList.remove("open");
  document.body.classList.remove("menu-open");
};

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
  mobileNav.classList.toggle("open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navGroups.forEach((group) => {
  const toggle = group.querySelector(".nav-group-toggle");
  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    closeNavGroups(group);
    group.classList.toggle("open", !isOpen);
    toggle.setAttribute("aria-expanded", String(!isOpen));
  });
});

mobileNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("click", (event) => {
  if (![...navGroups].some((group) => group.contains(event.target))) closeNavGroups();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const projectEmailForm = document.querySelector("#project-email-form");
projectEmailForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = new FormData(projectEmailForm).get("email");
  const subject = encodeURIComponent("SunCube project enquiry");
  const body = encodeURIComponent(`Hello SunCube,\n\nI would like to discuss an agrivoltaic project.\n\nMy email: ${email}\n\nFarm location:\nCrop type:\nCurrent shade or energy challenge:\n`);
  window.location.href = `mailto:yijun_lu@u.nus.edu?subject=${subject}&body=${body}`;
});

const appDownloadButton = document.querySelector("#app-download-button");
const appDialog = document.querySelector("#app-dialog");
const appDialogClose = appDialog.querySelector(".app-dialog-close");

appDownloadButton.addEventListener("click", () => appDialog.showModal());
appDialogClose.addEventListener("click", () => appDialog.close());
appDialog.addEventListener("click", (event) => {
  if (event.target === appDialog) appDialog.close();
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach((element) => observer.observe(element));

const projectCategoryTabs = document.querySelectorAll("[data-project-category]");
const projectPanels = document.querySelectorAll(".project-panel");

const activateProjectCategory = (activeTab) => {
  const category = activeTab.dataset.projectCategory;

  projectCategoryTabs.forEach((tab) => {
    const isActive = tab === activeTab;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
  });

  projectPanels.forEach((panel) => {
    const isActive = panel.id === `project-panel-${category}`;
    panel.hidden = !isActive;
    panel.classList.toggle("is-active", isActive);
  });
};

projectCategoryTabs.forEach((tab, index) => {
  tab.tabIndex = tab.classList.contains("is-active") ? 0 : -1;
  tab.addEventListener("click", () => activateProjectCategory(tab));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % projectCategoryTabs.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + projectCategoryTabs.length) % projectCategoryTabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = projectCategoryTabs.length - 1;
    const nextTab = projectCategoryTabs[nextIndex];
    activateProjectCategory(nextTab);
    nextTab.focus();
  });
});

document.querySelectorAll("[data-project-link]").forEach((link) => {
  link.addEventListener("click", () => {
    const targetTab = document.querySelector(`[data-project-category="${link.dataset.projectLink}"]`);
    if (targetTab) activateProjectCategory(targetTab);
  });
});
