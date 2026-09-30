/* ════════════════════════════════════════════════════════════════════
   ALPHADOG LODGING — SHARED JAVASCRIPT
   You should not need to edit this file for everyday content updates.
   It powers: the mobile menu, the fade-in-on-scroll effect, and the
   gallery lightbox (click a photo to view it full-screen).
   ════════════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════════════
   ═══ EDIT: GINGR LINKS — change them HERE and every "Book" and
   "Log in" button across the whole site updates automatically. ═══

   APPLICATION_URL = where "Apply Now" / "Start your application"
                 buttons go (the Gingr new-client application)
   LOGIN_URL   = where "Log in to Gingr" buttons go
                 (your Gingr client login page)
   ════════════════════════════════════════════════════════════════════ */
const GINGR_APPLICATION_URL = "https://alphadoglodging.portal.gingrapp.com/public/login/Ii9zZWN1cmUvaG9tZSI=";
const GINGR_LOGIN_URL   = "https://alphadoglodging.portal.gingrapp.com/public/login/Ii9zZWN1cmUvaG9tZSI=";

document.querySelectorAll('a[data-gingr="apply"]').forEach(a => { a.href = GINGR_APPLICATION_URL; a.target = "_blank"; a.rel = "noopener"; });
document.querySelectorAll('a[data-gingr="login"]').forEach(a => { a.href = GINGR_LOGIN_URL; a.target = "_blank"; a.rel = "noopener"; });

// Mobile hamburger menu
const hamb = document.getElementById('hamb');
const menu = document.getElementById('menu');
if (hamb && menu) hamb.addEventListener('click', () => menu.classList.toggle('open'));

// Fade-in on scroll for elements with class="reveal"
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Gallery lightbox — clicking any gallery IMAGE opens it full-screen.
// (Videos play in place and are not sent to the lightbox.)
const lb = document.getElementById('lightbox');
if (lb) {
  const lbImg = lb.querySelector('img');
  const lbCap = lb.querySelector('.lb-cap');
  function openLightbox(img){
    lbImg.src = img.dataset.full || img.src;
    lbImg.alt = img.alt || '';
    lbCap.textContent = '';
    lb.classList.add('open');
    // Add a history entry so the browser/phone Back button closes the photo
    // and returns to the gallery, instead of leaving the page.
    history.pushState({ lightbox: true }, '');
  }
  function closeLightbox(fromPopstate){
    if (!lb.classList.contains('open')) return;
    lb.classList.remove('open');
    // If we closed it ourselves (tap/Escape), rewind the history entry we added.
    if (!fromPopstate && history.state && history.state.lightbox) history.back();
  }
  document.querySelectorAll('.gallery-grid .g-item img').forEach(img => {
    img.parentElement.addEventListener('click', () => openLightbox(img));
  });
  lb.addEventListener('click', () => closeLightbox(false));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(false); });
  // Back button / back gesture: close the photo instead of leaving the page.
  window.addEventListener('popstate', () => closeLightbox(true));
}

// Tabbed sections (e.g. About & Team / FAQ on the About page).
// Guarded: does nothing on pages with no [role="tablist"].
document.querySelectorAll('[role="tablist"]').forEach(list => {
  const tabs = [...list.querySelectorAll('[role="tab"]')];
  const panels = tabs.map(t => document.getElementById(t.getAttribute("aria-controls")));
  function select(i){
    tabs.forEach((t, k) => {
      const on = k === i;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
      const p = panels[k];
      if (p) {
        p.hidden = !on;
        // reveal any fade-in elements inside a panel the first time it shows
        if (on) p.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
      }
    });
  }
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => select(i));
    t.addEventListener("keydown", e => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        const next = (i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
        tabs[next].focus(); select(next);
      }
    });
  });
});
