const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.topbar nav');
const navMore = document.querySelector('.nav-more');
const navMoreButton = navMore.querySelector('button');

navMoreButton.addEventListener('click', () => {
  const isOpen = navMore.classList.toggle('open');
  navMoreButton.setAttribute('aria-expanded', String(isOpen));
});
toggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.classList.toggle('active', isOpen);
  toggle.setAttribute('aria-expanded', String(isOpen));
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.classList.remove('active');
  toggle.setAttribute('aria-expanded', 'false');
  navMore.classList.remove('open');
  navMoreButton.setAttribute('aria-expanded', 'false');
}));

document.addEventListener('click', (event) => {
  if (!navMore.contains(event.target)) {
    navMore.classList.remove('open');
    navMoreButton.setAttribute('aria-expanded', 'false');
  }
});

document.querySelectorAll('.approved-nav a').forEach((link) => link.addEventListener('click', (event) => {
  event.preventDefault();
  const image = document.querySelector('.approved-layout img');
  const progress = Number(link.dataset.scroll);
  window.scrollTo({ top: image.offsetTop + image.clientHeight * progress, behavior: 'smooth' });
  history.replaceState(null, '', link.getAttribute('href'));
}));

const revealTargets = document.querySelectorAll('.challenge > *, .solutions .section-head, .solution-grid article, .programs .section-head, .program-grid article, .articles .article-title, .article-grid article, .testimonial, .clients, .contact-grid, .footer-grid');
revealTargets.forEach((element) => element.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealTargets.forEach((element) => revealObserver.observe(element));

const topbar = document.querySelector('.topbar');
const navItems = [...document.querySelectorAll('.topbar nav a')];
const trackedSections = navItems.map((item) => document.querySelector(item.getAttribute('href'))).filter(Boolean);

window.addEventListener('scroll', () => {
  topbar.classList.toggle('scrolled', window.scrollY > 16);
}, { passive: true });

const navigationObserver = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  navItems.forEach((item) => item.classList.toggle('active', item.getAttribute('href') === `#${visible.target.id}`));
}, { rootMargin: '-35% 0px -55% 0px', threshold: [0.01, 0.35] });
trackedSections.forEach((section) => navigationObserver.observe(section));
