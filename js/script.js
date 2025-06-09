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

// Твои данные SendPulse
  const SENDPULSE_CLIENT_ID = '6792a3504cb18f5f17059fd42de4e55a';
  const SENDPULSE_CLIENT_SECRET = 'd0b79b3450bb42e748db3c46e58c1269';
  const SENDPULSE_BOOK_ID = 'ТВОЙ_BOOK_ID'; // Заменить на ID книги контактов

  // Генерация UUID v4
  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // Получение параметра из URL
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

  // Получение access token SendPulse
  async function getAccessToken() {
    const response = await fetch('https://api.sendpulse.com/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `grant_type=client_credentials&client_id=${SENDPULSE_CLIENT_ID}&client_secret=${SENDPULSE_CLIENT_SECRET}`
    });
    const data = await response.json();
    if (!data.access_token) throw new Error('Не удалось получить access token');
    return data.access_token;
  }

  // Добавление контакта в SendPulse CRM
  async function addContact(email, userid) {
    const token = await getAccessToken();

    const response = await fetch('https://api.sendpulse.com/crm/v1/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        book_id: SENDPULSE_BOOK_ID,
        emails: [email],
        variables: { userid: userid }
      })
    });

    const result = await response.json();
    if (!result.result) throw new Error('Ошибка при добавлении контакта');
    return result;
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

  document.getElementById('signup-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = this.email.value.trim();
    const userid = this.userid.value;

    if (!email) {
      alert('Пожалуйста, введите ваш e-mail');
      return;
    }

    try {
      await addContact(email, userid);
      alert('Спасибо за регистрацию! Проверьте ваш e-mail.');
      this.reset();
    } catch (error) {
      alert('Ошибка при регистрации. Попробуйте позже.');
      console.error(error);
    }
  });
