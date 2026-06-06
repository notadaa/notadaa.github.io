/* ============================================================
   SECTION FADE-IN + ACTIVE NAV
   ============================================================ */
const sections  = document.querySelectorAll('.section');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  },
  { threshold: 0.12, rootMargin: '-8% 0px -8% 0px' }
);

sections.forEach((s) => sectionObserver.observe(s));

/* ============================================================
   SMOOTH NAV CLICKS
   ============================================================ */
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    closeMobileMenu();
  });
});

/* ============================================================
   MOBILE MENU
   ============================================================ */
const sidebar      = document.getElementById('sidebar');
const mobileToggle = document.getElementById('mobileToggle');
const overlay      = document.getElementById('sidebarOverlay');

function openMobileMenu() {
  sidebar.classList.add('open');
  overlay.classList.add('open');
  mobileToggle.classList.add('open');
  mobileToggle.setAttribute('aria-expanded', 'true');
}

function closeMobileMenu() {
  sidebar.classList.remove('open');
  overlay.classList.remove('open');
  mobileToggle.classList.remove('open');
  mobileToggle.setAttribute('aria-expanded', 'false');
}

mobileToggle.addEventListener('click', () => {
  sidebar.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
});

overlay.addEventListener('click', closeMobileMenu);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMobileMenu();
});

/* ============================================================
   CONTACT FORM (Formspree)
   ============================================================ */
const contactForm = document.getElementById('contactForm');
const formStatus  = document.getElementById('formStatus');
const formSubmit  = document.getElementById('formSubmit');
const btnText     = document.getElementById('btnText');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    btnText.textContent = 'sending...';
    formSubmit.disabled = true;
    formStatus.className = 'form-status';
    formStatus.textContent = '';

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' },
      });

      if (res.ok) {
        formStatus.textContent = '✓ sent — I\'ll get back to you soon.';
        formStatus.className = 'form-status ok';
        contactForm.reset();
      } else {
        throw new Error();
      }
    } catch {
      formStatus.textContent = '✕ something went wrong. email me directly.';
      formStatus.className = 'form-status err';
    } finally {
      btnText.textContent = 'send message';
      formSubmit.disabled = false;
    }
  });
}
