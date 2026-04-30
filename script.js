/* ============================================================
   SUCHARITHA GANGAPURAM — PORTFOLIO SCRIPTS (IMPROVED)
   ============================================================ */

(function () {
  'use strict';

  /* ── DARK MODE TOGGLE ── */
  const html      = document.documentElement;
  const themeBtn  = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  const saved = localStorage.getItem('sg-theme') || 'light';
  html.setAttribute('data-theme', saved);
  themeIcon.className = saved === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';

  themeBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('sg-theme', next);
    themeIcon.className = next === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  });

  /* ── NAV SCROLL ── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  /* ── NAV ACTIVE LINK ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 110) current = s.id;
    });
    navLinks.forEach(link => {
      link.style.color = (link.getAttribute('href') === '#' + current) ? 'var(--text)' : '';
    });
  }, { passive: true });

  /* ── HAMBURGER ── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  document.querySelectorAll('.ml').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 55);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObs.observe(el));

  /* ── SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── TYPING EFFECT ── */
  const roleEl = document.getElementById('typed-role');
  if (roleEl) {
    const roles = [
      'Full Stack Developer — React.js & Spring Boot',
      'Java Backend Developer',
      'React Frontend Developer',
      'Open to Full-time Roles',
    ];
    let ri = 0, ci = 0, deleting = false;

    function type() {
      const cur = roles[ri];
      if (deleting) { ci--; } else { ci++; }
      roleEl.textContent = cur.slice(0, ci);

      let delay = deleting ? 30 : 60;

      if (!deleting && ci === cur.length) {
        delay = 2400; deleting = true;
      } else if (deleting && ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
        delay = 380;
      }

      setTimeout(type, delay);
    }

    setTimeout(type, 1000);
  }

  /* ── PROJECT CARD WARM GLOW ON HOVER ── */
  document.querySelectorAll('.proj-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.backgroundImage = `radial-gradient(circle at ${x}% ${y}%, rgba(196,99,58,0.04), transparent 60%)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.backgroundImage = '';
    });
  });

  /* ── SEND BUTTON ── */
  const sendBtn = document.getElementById('send-btn');
  if (sendBtn) {
    sendBtn.addEventListener('click', e => {
      e.preventDefault();
      const name  = document.getElementById('fn')?.value.trim();
      const email = document.getElementById('fe')?.value.trim();
      const msg   = document.getElementById('fm')?.value.trim();

      if (!name || !email || !msg) {
        sendBtn.textContent = 'Please fill all fields ✕';
        sendBtn.style.background = '#c0392b';
        setTimeout(() => {
          sendBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
          sendBtn.style.background = '';
        }, 2200);
        return;
      }

      const mailto = `mailto:sucharithaaa4@gmail.com?subject=Message from ${encodeURIComponent(name)}&body=${encodeURIComponent(msg)}%0A%0AFrom: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}`;
      window.location.href = mailto;
    });
  }

  /* ── SKILL BLOCK HOVER WAVE ── */
  document.querySelectorAll('.skill-block').forEach(block => {
    block.addEventListener('mouseenter', () => {
      block.querySelectorAll('.sb-item').forEach((item, i) => {
        setTimeout(() => {
          item.style.color       = 'var(--text)';
          item.style.borderColor = 'rgba(196,99,58,0.28)';
        }, i * 45);
      });
    });
    block.addEventListener('mouseleave', () => {
      block.querySelectorAll('.sb-item').forEach(item => {
        item.style.color       = '';
        item.style.borderColor = '';
      });
    });
  });

})();
