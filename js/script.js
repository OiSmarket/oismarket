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
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('signup-form');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию

    // Здесь ваш код для выполнения после нажатия на кнопку "Зарегистрироваться"
    alert('Вы успешно зарегистрировались!'); // Пример: показываем сообщение

    // Дополнительные действия:
    // - Отправка данных на сервер (AJAX)
    // - Перенаправление на другую страницу
    // - Отображение сообщения об успехе
  });
});
// Функция для генерации UUID v4
  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // Получение параметра userid из URL
  function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  // Установка cookie
  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    const expires = "expires="+ d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  // Получение cookie
  function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1);
      if (c.indexOf(cname) === 0) return c.substring(cname.length, c.length);
    }
    return null;
  }

  (function() {
    let userid = getUrlParameter('userid');
    if (userid) {
      setCookie('userid', userid, 365);
    } else {
      userid = getCookie('userid');
      if (!userid) {
        userid = generateUUID();
        setCookie('userid', userid, 365);
      }
    }
    document.getElementById('useridField').value = userid;
  })();

  // Обработка отправки формы
  document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = this.email.value.trim();
    const userid = this.userid.value;

    if (!email) {
      alert('Пожалуйста, введите ваш e-mail');
      return;
    }

    // Здесь нужно добавить отправку данных на сервер или в CRM
    // Пример отправки через fetch (замени URL на свой endpoint)
    fetch('https://your-server.com/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, userid: userid })
    })
    .then(response => {
      if (response.ok) {
        alert('Спасибо за регистрацию! Проверьте ваш e-mail.');
        this.reset();
      } else {
        alert('Ошибка при регистрации. Попробуйте позже.');
      }
    })
    .catch(() => {
      alert('Ошибка сети. Попробуйте позже.');
    });
  });
