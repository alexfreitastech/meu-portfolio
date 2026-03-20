const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 300);
});

document.getElementById('navToggle').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('open');
  });
});

document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    fadeObserver.unobserve(entry.target);
  });
}, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

document.querySelectorAll('.fade-in, .fade-up').forEach(el => fadeObserver.observe(el));

const staggerSelectors = ['.skills-grid', '.soft-grid', '.projects-grid', '.languages-row', '.edu-grid'];

staggerSelectors.forEach(selector => {
  const container = document.querySelector(selector);
  if (!container) return;

  const cards = Array.from(container.children);

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
  });

  const reveal = () => {
    cards.forEach((card, i) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, i * 80);
    });
  };

  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      reveal();
      staggerObserver.unobserve(entry.target);
    });
  }, { threshold: 0.05 });

  staggerObserver.observe(container);

  const rect = container.getBoundingClientRect();
  if (rect.top < window.innerHeight) {
    reveal();
    staggerObserver.unobserve(container);
  }
});

const timeline = document.querySelector('.courses-timeline');
if (timeline) {
  const items = timeline.querySelectorAll('.course-item');

  items.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
  });

  const revealTimeline = () => {
    items.forEach((item, i) => {
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      }, i * 100);
    });
  };

  const tlObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      revealTimeline();
      tlObserver.unobserve(entry.target);
    });
  }, { threshold: 0.05 });

  tlObserver.observe(timeline);
}

const contactLinks = document.querySelector('.contact-links');
if (contactLinks) {
  const btns = Array.from(contactLinks.children);

  btns.forEach(btn => {
    btn.style.opacity = '0';
    btn.style.transform = 'translateX(-16px)';
    btn.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
  });

  const revealContact = () => {
    btns.forEach((btn, i) => {
      setTimeout(() => {
        btn.style.opacity = '1';
        btn.style.transform = 'translateX(0)';
      }, i * 90);
    });
  };

  const ctaObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      revealContact();
      ctaObserver.unobserve(entry.target);
    });
  }, { threshold: 0.05 });

  ctaObserver.observe(contactLinks);
}

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.3 });

sections.forEach(sec => navObserver.observe(sec));

const style = document.createElement('style');
style.textContent = `.nav-links a.active { color: var(--moss); } .nav-links a.active::after { width: 100%; }`;
document.head.appendChild(style);