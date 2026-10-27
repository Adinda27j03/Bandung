const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".navbar");

if (menu && nav) {
  menu.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("mobile-open");
    menu.setAttribute("aria-expanded", String(isOpen));
    menu.textContent = isOpen ? "×" : "☰";
  });

  nav.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("mobile-open");
      menu.setAttribute("aria-expanded", "false");
      menu.textContent = "☰";
    });
  });
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const id = link.getAttribute("href");
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
