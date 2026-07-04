// ---------- Mobile nav ----------
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  // ---------- Lightbox ----------
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lbImg = lightbox.querySelector('img');
    const lbCap = lightbox.querySelector('.lightbox-cap');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    document.querySelectorAll('[data-expand]').forEach((el) => {
      el.addEventListener('click', () => {
        const img = el.querySelector('img');
        if (!img) return;
        lbImg.src = img.src;
        lbImg.alt = img.alt || '';
        lbCap.textContent = el.dataset.caption || img.alt || '';
        lightbox.classList.add('open');
      });
    });

    function closeLightbox() { lightbox.classList.remove('open'); lbImg.src = ''; }
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
  }

  // ---------- Password gate (DEMO ONLY — see README) ----------
  // This is a client-side convenience gate, not real security: the password
  // and content are both still delivered to the browser. For real protection
  // of confidential case studies, use your host's built-in access control
  // (Netlify "Visitor access" / Cloudflare Access) instead — see README.md.
  const gate = document.getElementById('gate');
  if (gate) {
    const form = gate.querySelector('form');
    const input = gate.querySelector('input');
    const error = gate.querySelector('.gate-error');
    const correctHash = gate.dataset.passHash; // sha-256 hex, set per page

    let unlocked = false;
    try { unlocked = sessionStorage.getItem('site-unlocked') === '1'; } catch (e) {}
    if (unlocked) gate.classList.add('hidden');

    async function sha256(text) {
      const enc = new TextEncoder().encode(text);
      const buf = await crypto.subtle.digest('SHA-256', enc);
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const hash = await sha256(input.value.trim());
      if (hash === correctHash) {
        try { sessionStorage.setItem('site-unlocked', '1'); } catch (err) {}
        gate.classList.add('hidden');
        error.textContent = '';
      } else {
        error.textContent = 'Incorrect password — try again.';
      }
    });
  }
});
