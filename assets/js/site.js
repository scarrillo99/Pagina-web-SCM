/* ==========================================================================
   SITE — comportamiento común de las tres marcas.

   Todo es progresivo: sin JavaScript la web se lee entera, los enlaces
   navegan y los formularios se envían. Aquí solo se añade capa de
   experiencia.
   ========================================================================== */

(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------------------------------------------------------------- header */

  function initHeader() {
    var header = document.querySelector('[data-header]');
    if (!header) return;

    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ------------------------------------------------------------ menú móvil */

  function initNav() {
    var toggle = document.querySelector('[data-nav-toggle]');
    var nav = document.querySelector('[data-nav]');
    if (!toggle || !nav) return;

    /* El índice alimenta el escalonado de la entrada de cada enlace. */
    [].forEach.call(nav.querySelectorAll('.nav__link'), function (link, i) {
      link.style.setProperty('--i', String(i));
    });

    var close = function () {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      document.body.classList.remove('nav-open');
    };

    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
      document.body.classList.toggle('nav-open', !open);
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) close();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') close();
    });
  }

  /* --------------------------------------------------------------- reveal */

  function initReveal() {
    var items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      [].forEach.call(items, function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    [].forEach.call(items, function (el) {
      observer.observe(el);
    });
  }

  /* ------------------------------------------------------------ contadores */

  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    if (isNaN(target)) return;

    var decimals = (el.getAttribute('data-count').split('.')[1] || '').length;
    var duration = 1600;
    var start = null;

    var step = function (timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      /* easeOutExpo: arranca rápido y frena, se lee mejor que lineal. */
      var eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      el.textContent = (target * eased).toFixed(decimals);
      if (progress < 1) window.requestAnimationFrame(step);
    };

    window.requestAnimationFrame(step);
  }

  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    if (reduced.matches || !('IntersectionObserver' in window)) {
      [].forEach.call(counters, function (el) {
        el.textContent = el.getAttribute('data-count');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          animateCount(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.5 }
    );

    [].forEach.call(counters, function (el) {
      observer.observe(el);
    });
  }

  /* ---------------------------------------------------------- hero rotativo */

  /* La portada apila varias fotos y las va relevando. El intervalo se lee de
     data-interval, así que cambiar la velocidad es tocar un número en el
     HTML. Se para si el visitante pide menos movimiento, si la pestaña deja
     de estar visible y si solo hay una foto enchufada. */
  function initHeroSlider() {
    var slider = document.querySelector('[data-hero-slider]');
    if (!slider) return;

    var slides = [].slice.call(slider.querySelectorAll('.hero__portrait'));
    if (slides.length < 2) return;

    var credit = document.querySelector('[data-hero-credit]');
    var creditName = credit ? credit.querySelector('[data-credit-name]') : null;
    var creditClub = credit ? credit.querySelector('[data-credit-club]') : null;

    var index = 0;

    var paint = function () {
      var who = slides[index].getAttribute('data-name') || '';
      /* Una foto sin nombre no lleva crédito: mejor nada que un relleno. */
      if (credit) credit.hidden = who === '';
      if (creditName) creditName.textContent = who;
      if (creditClub) creditClub.textContent = slides[index].getAttribute('data-club') || '';
    };

    /* is-running apaga el respaldo sin JavaScript del CSS. */
    slider.classList.add('is-running');
    slides[0].classList.add('is-active');
    paint();

    if (reduced.matches) return;

    var interval = parseInt(slider.getAttribute('data-interval'), 10);
    if (isNaN(interval) || interval < 1200) interval = 8000;

    var timer = null;

    var start = function () {
      if (timer !== null) return;
      timer = window.setInterval(function () {
        slides[index].classList.remove('is-active');
        index = (index + 1) % slides.length;
        slides[index].classList.add('is-active');
        paint();
      }, interval);
    };

    var stop = function () {
      if (timer === null) return;
      window.clearInterval(timer);
      timer = null;
    };

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop();
      else start();
    });

    start();
  }

  /* ------------------------------------------------------------- parallax */

  /* Desplazamiento corto de las capas de fondo, calculado en un solo
     requestAnimationFrame por fotograma. La amplitud la fija data-parallax
     en píxeles; por encima de 40 empieza a notarse como truco. */
  function initParallax() {
    if (reduced.matches) return;
    if (!window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches) return;

    var layers = [].slice.call(document.querySelectorAll('[data-parallax]'));
    if (!layers.length) return;

    var ticking = false;

    var update = function () {
      ticking = false;
      var vh = window.innerHeight;
      layers.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;
        var amount = parseFloat(el.getAttribute('data-parallax')) || 24;
        /* -1 arriba de la pantalla, 1 abajo. */
        var progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        el.style.transform = 'translate3d(0,' + (progress * amount).toFixed(2) + 'px,0)';
      });
    };

    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
  }

  /* ------------------------------------------------------ filtro actualidad */

  function initFilters() {
    var group = document.querySelector('[data-filters]');
    if (!group) return;

    var buttons = [].slice.call(group.querySelectorAll('[data-filter]'));
    var posts = [].slice.call(document.querySelectorAll('[data-category]'));
    var empty = document.querySelector('[data-posts-empty]');
    if (!buttons.length || !posts.length) return;

    var apply = function (value) {
      var shown = 0;
      posts.forEach(function (post) {
        var match = value === 'all' || post.getAttribute('data-category') === value;
        post.hidden = !match;
        if (match) shown++;
      });
      if (empty) empty.hidden = shown > 0;
    };

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (other) {
          other.setAttribute('aria-pressed', String(other === btn));
        });
        apply(btn.getAttribute('data-filter'));
      });
    });
  }

  /* --------------------------------------------------- entrada de página */

  /* Solo entrada, no salida. Un fundido de salida obliga a retrasar la
     navegación unos cientos de milisegundos en CADA clic, y eso se nota más
     que lo que aporta: la web tiene que ir rápida antes que lucida. La
     entrada, en cambio, no cuesta nada porque ocurre mientras el navegador ya
     está pintando. */
  function initPageEntrance() {
    if (reduced.matches) return;
    /* js-on marca que hay JavaScript: solo entonces el CSS se permite partir
       de opacidad cero. Sin script, el contenido se ve desde el primer byte. */
    document.body.classList.add('js-on');
    var reveal = function () {
      document.body.classList.add('is-ready');
    };
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(reveal);
    });
    /* Red de seguridad: si por lo que sea el fotograma no llega, el contenido
       no puede quedarse invisible. */
    window.setTimeout(reveal, 400);
  }

  /* ------------------------------------------------------------ formulario */

  /* El formulario no tiene backend todavía: abre el cliente de correo con el
     mensaje ya redactado. Cuando haya endpoint, se cambia el action del form
     y se borra este manejador. Ver README. */
  function initForm() {
    var form = document.querySelector('[data-mailto-form]');
    if (!form) return;

    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) return; /* el navegador muestra sus mensajes */
      event.preventDefault();

      var to = form.getAttribute('data-mailto-form');
      var data = new FormData(form);
      var lines = [];

      data.forEach(function (value, key) {
        if (String(value).trim() === '') return;
        var field = form.querySelector('[name="' + key + '"]');
        var label = field ? form.querySelector('label[for="' + field.id + '"]') : null;
        lines.push((label ? label.textContent.trim() : key) + ': ' + value);
      });

      var subject = form.getAttribute('data-mailto-subject') || 'Web';
      window.location.href =
        'mailto:' +
        to +
        '?subject=' +
        encodeURIComponent(subject) +
        '&body=' +
        encodeURIComponent(lines.join('\n'));

      var note = form.querySelector('[data-form-note]');
      if (note) note.hidden = false;
    });
  }

  /* --------------------------------------------------------------- año pie */

  function initYear() {
    [].forEach.call(document.querySelectorAll('[data-year]'), function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  function init() {
    initHeader();
    initNav();
    initReveal();
    initHeroSlider();
    initCounters();
    initParallax();
    initFilters();
    initPageEntrance();
    initForm();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
