const header = document.querySelector(".site-header");
const reveals = document.querySelectorAll(".reveal");
const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector(".mobile-nav");

const closeMenu = () => {
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

mobileNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => event.key === "Escape" && closeMenu());

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
