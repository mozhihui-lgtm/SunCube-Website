const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector(".mobile-nav");
const form = document.querySelector("#project-planner-form");

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
  mobileNav?.classList.toggle("open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

mobileNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  menuButton?.setAttribute("aria-expanded", "false");
  mobileNav.classList.remove("open");
  document.body.classList.remove("menu-open");
}));

window.addEventListener("scroll", () => header?.classList.toggle("scrolled", window.scrollY > 20));

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent(`SunCube project enquiry — ${data.get("organization") || data.get("name")}`);
  const body = encodeURIComponent(
`Hello SunCube,

I would like to discuss an agrivoltaic project.

Name: ${data.get("name")}
Email: ${data.get("email")}
Organization: ${data.get("organization") || "Not provided"}
Project location: ${data.get("location") || "Not provided"}
Farm / project type: ${data.get("type")}
Approximate area: ${data.get("area") || "Not provided"}

Project goals:
${data.get("message")}
`);
  window.location.href = `mailto:yijun_lu@u.nus.edu?subject=${subject}&body=${body}`;
});
