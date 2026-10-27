const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".navbar");

if (menu && nav) {
  menu.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("mobile-open");
    menu.setAttribute("aria-expanded", String(isOpen));
  });

  // Reset mobile menu state when switching back to desktop layout.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
      nav.classList.remove("mobile-open");
      menu.setAttribute("aria-expanded", "false");
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const id = link.getAttribute("href");
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({behavior:"smooth"});
    }
  });
});
