/* ==========================================================================
   SITE — comportamiento común: cabecera al hacer scroll, menú móvil,
   revelado de secciones, contadores y validación del formulario.
   ========================================================================== */

(function () {
  'use strict';

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
      items.forEach(function (el) {
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
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ------------------------------------------------------------ contadores */

  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    if (isNaN(target)) return;

    var decimals = (el.getAttribute('data-count').split('.')[1] || '').length;
    var duration = 1400;
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

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      counters.forEach(function (el) {
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
      { threshold: 0.6 }
    );

    counters.forEach(function (el) {
      observer.observe(el);
    });
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
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  function init() {
    initHeader();
    initNav();
    initReveal();
    initCounters();
    initForm();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
