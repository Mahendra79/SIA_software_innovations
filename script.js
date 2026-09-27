const hdr = document.getElementById("hdr");
const onScroll = () => hdr && hdr.classList.toggle("scrolled", scrollY > 40);
addEventListener("scroll", onScroll, { passive: true });
onScroll();

// mobile menu
const menuBtn = document.getElementById("menuBtn");
const siteNav = document.getElementById("siteNav");
if (menuBtn && siteNav) {
  const setOpen = (open) => {
    siteNav.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", open);
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menuBtn.textContent = open ? "Close" : "Menu";
  };
  menuBtn.addEventListener("click", () => setOpen(!siteNav.classList.contains("open")));
  siteNav.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
  addEventListener("keydown", (e) => {
    if (e.key === "Escape" && siteNav.classList.contains("open")) { setOpen(false); menuBtn.focus(); }
  });
}


// hero video: respect reduced-motion preference
const heroVideo = document.querySelector(".hero-video");
if (heroVideo && matchMedia("(prefers-reduced-motion: reduce)").matches) {
  heroVideo.removeAttribute("autoplay");
  heroVideo.pause();
}
