// Бургер-меню
const burgerBtn = document.getElementById('burger-btn');
const nav = document.getElementById('nav');
const navOverlay = document.getElementById('nav-overlay');

burgerBtn.addEventListener('click', () => {
  burgerBtn.classList.toggle('active');
  nav.classList.toggle('active');
  navOverlay.classList.toggle('active');
  document.body.classList.toggle('menu-open');
});

navOverlay.addEventListener('click', () => {
  burgerBtn.classList.remove('active');
  nav.classList.remove('active');
  navOverlay.classList.remove('active');
  document.body.classList.remove('menu-open');
});

// Закрытие бургер-меню при клике на ссылку
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    if (nav.classList.contains('active')) {
      burgerBtn.classList.remove('active');
      nav.classList.remove('active');
      navOverlay.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });
});

// FAQ раскрытие
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', function() {
    const item = this.parentElement;
    item.classList.toggle('open');
  });
});