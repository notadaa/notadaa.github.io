/* Section fade-in */
const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.1 }
);

sections.forEach((s) => observer.observe(s));

/* Contact form */
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
        formStatus.textContent = "✓ sent — I'll get back to you soon.";
        formStatus.className = 'form-status ok';
        contactForm.reset();
      } else { throw new Error(); }
    } catch {
      formStatus.textContent = '✕ something went wrong. email me directly.';
      formStatus.className = 'form-status err';
    } finally {
      btnText.textContent = 'send message';
      formSubmit.disabled = false;
    }
  });
}
