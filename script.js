// LOADER
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hidden');
    }
    document.body.style.overflow = 'auto';
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 800, once: true, offset: 60 });
    }
  }, 1700);
});
document.body.style.overflow = 'hidden';

// CURSOR
const cursor         = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0, followX = 0, followY = 0;

if (cursor && cursorFollower) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });
  function animateCursor() {
    followX += (mouseX - followX) * 0.12;
    followY += (mouseY - followY) * 0.12;
    cursorFollower.style.left = followX + 'px';
    cursorFollower.style.top  = followY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
}

// NAVBAR
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNav();
  if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 400);
});

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) current = section.id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
}

// TYPING
const roles    = ['Python Developer','Django Engineer','Azure Cloud Learner','Linux Administrator','Software Engineer','Backend Developer'];
let roleIndex  = 0, charIndex = 0, isDeleting = false;
const typedEl  = document.getElementById('typedText');

function typeText() {
  if (!typedEl) return;
  const currentRole = roles[roleIndex];
  if (!isDeleting) {
    typedEl.textContent = currentRole.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeText, 2000);
      return;
    }
  } else {
    typedEl.textContent = currentRole.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeText, isDeleting ? 55 : 95);
}
setTimeout(typeText, 2000);

// COUNTERS
let countersStarted = false;
function startCounters() {
  document.querySelectorAll('.stat-number').forEach(counter => {
    const target = parseInt(counter.dataset.target);
    let current = 0;
    const step = target / 60;
    function update() {
      current += step;
      if (current < target) { counter.textContent = Math.ceil(current); requestAnimationFrame(update); }
      else counter.textContent = target;
    }
    update();
  });
}
const aboutSection = document.getElementById('about');
if (aboutSection) {
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted) { countersStarted = true; startCounters(); }
    });
  }, { threshold: 0.3 }).observe(aboutSection);
}

// SKILL BARS
let barsAnimated = false;
const skillsSection = document.getElementById('skills');
if (skillsSection) {
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !barsAnimated) {
        barsAnimated = true;
        document.querySelectorAll('.bar-fill').forEach((bar, i) => {
          setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, i * 100);
        });
      }
    });
  }, { threshold: 0.2 }).observe(skillsSection);
}

// CONTACT FORM
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

if (contactForm && submitBtn) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btnText = submitBtn.querySelector('.btn-text');
    btnText.textContent = 'Sending...';
    submitBtn.disabled  = true;
    setTimeout(() => {
      btnText.textContent = 'Sent! ✓';
      if (formSuccess) formSuccess.classList.add('show');
      contactForm.reset();
      setTimeout(() => {
        btnText.textContent = 'Send Message';
        submitBtn.disabled  = false;
        if (formSuccess) formSuccess.classList.remove('show');
      }, 5000);
    }, 2000);
  });
}

// BACK TO TOP
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// STARS
function createStars() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;
  for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.style.cssText = `
      position:absolute;
      width:${Math.random() * 2 + 1}px;
      height:${Math.random() * 2 + 1}px;
      background:rgba(108,99,255,${Math.random() * 0.6 + 0.2});
      border-radius:50%;
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      animation:twinkle ${Math.random() * 3 + 2}s ease-in-out infinite;
      animation-delay:${Math.random() * 4}s;
      pointer-events:none;
    `;
    heroBg.appendChild(star);
  }
}
const s = document.createElement('style');
s.textContent = `@keyframes twinkle{0%,100%{opacity:0.2;transform:scale(1)}50%{opacity:0.9;transform:scale(1.8)}}`;
document.head.appendChild(s);
createStars();

// ESCAPE KEY
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  }
});

console.log('%c👋 Hi Recruiter! Built by Phanindra Galidevara', 'color:#6c63ff;font-size:18px;font-weight:bold;');