const nav = document.querySelector("#nav");
const toggle = document.querySelector(".toggle");
const menuIcon = toggle.innerHTML;

function setMenu(open) {
  nav.classList.toggle("opened", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  toggle.innerHTML = open
    ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>'
    : menuIcon;
}

toggle.addEventListener("click", () =>
  setMenu(!nav.classList.contains("opened")),
);
document.querySelector("header").addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav.classList.contains("opened")) {
    setMenu(false);
    toggle.focus();
  }
});
window.addEventListener("resize", () => {
  if (innerWidth > 900) setMenu(false);
});

const links = [...nav.querySelectorAll("a")];
function updateNavigation() {
  let active = "#home";
  for (const hash of [...links.map((link) => link.hash), "#contact"]) {
    if (document.querySelector(hash).getBoundingClientRect().top <= 180)
      active = hash;
  }
  links.forEach((link) => {
    if (link.hash === active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  document.querySelector("header").classList.toggle("scrolled", scrollY > 25);
}
window.addEventListener("scroll", updateNavigation, { passive: true });
updateNavigation();

const buttons = document.querySelectorAll("[data-filter]");
const entries = document.querySelectorAll("[data-category]");
buttons.forEach((button) =>
  button.addEventListener("click", () => {
    const category = button.dataset.filter;
    buttons.forEach((item) =>
      item.setAttribute("aria-pressed", String(item === button)),
    );
    let count = 0;
    entries.forEach((entry) => {
      entry.hidden = category !== "all" && entry.dataset.category !== category;
      if (entry.hidden) entry.open = false;
      else count++;
    });
    document.querySelector(".sectorCount").textContent =
      count + (count === 1 ? " industry" : " industries") + " shown";
  }),
);
document.querySelector("footer small").textContent =
  "© " + new Date().getFullYear();
