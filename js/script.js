// basic shared interactivity for the multi-page site
document.addEventListener('DOMContentLoaded', function() {
  // set year in all pages (IDs used across pages)
  const years = ['year','year2','year3','year4','year5','year6'];
  years.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = new Date().getFullYear();
  });

  // mobile nav toggle (simple)
  const navToggle = document.querySelectorAll('.nav-toggle');
  navToggle.forEach(btn => {
    btn.addEventListener('click', function() {
      const nav = document.querySelector('.main-nav');
      if (!nav) return;
      nav.style.display = (nav.style.display === 'flex') ? 'none' : 'flex';
    });
  });

  // reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const onScrollReveal = () => {
    const h = window.innerHeight;
    reveals.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < h - 100) el.classList.add('active');
    });
  };
  onScrollReveal();
  window.addEventListener('scroll', onScrollReveal);

  // Gallery lightbox (gallery page images have class .gimg or .gallery-grid img)
  const galleryImages = document.querySelectorAll('.gimg, .gallery-grid img');
  if (galleryImages.length) {
    let currentIndex = 0;
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lb-img');

    const showLightbox = (i) => {
      const imgs = Array.from(galleryImages);
      if (!imgs[i]) return;
      currentIndex = i;
      if (lightbox) {
        lbImg.src = imgs[i].src;
        lightbox.classList.add('lb-show');
        lightbox.setAttribute('aria-hidden','false');
      }
    };

    galleryImages.forEach((img, idx) => {
      img.addEventListener('click', e => {
        // if page uses a simple gallery-grid (as in gallery.html)
        // find corresponding index
        showLightbox(idx);
      });
    });

    if (lightbox) {
      const close = lightbox.querySelector('.lb-close');
      const next = lightbox.querySelector('.lb-next');
      const prev = lightbox.querySelector('.lb-prev');

      close && close.addEventListener('click', () => {
        lightbox.classList.remove('lb-show'); lightbox.setAttribute('aria-hidden','true');
      });

      next && next.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        lbImg.src = galleryImages[currentIndex].src;
      });

      prev && prev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        lbImg.src = galleryImages[currentIndex].src;
      });

      // keyboard controls
      document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('lb-show')) return;
        if (e.key === 'ArrowRight') next && next.click();
        if (e.key === 'ArrowLeft') prev && prev.click();
        if (e.key === 'Escape') close && close.click();
      });

      // click outside closes
      lightbox.addEventListener('click', (ev) => {
        if (ev.target === lightbox) close && close.click();
      });
    }
  }

  // contact form demo: non-blocking alert (no backend)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('input[name="name"]').value || 'Friend';
      alert(`Thanks ${name}! Your message was received (demo).`);
      contactForm.reset();
    });
  }

});
