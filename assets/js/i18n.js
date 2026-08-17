/* ==========================================================================
   i18n — motor de traducción sin dependencias.

   Cada página carga antes un diccionario en window.I18N_DICT con la forma
   { es: { clave: 'texto' }, en: { clave: 'text' } } y marca el HTML así:

     <h2 data-i18n="hero.title">Título por defecto</h2>
     <p data-i18n-html="hero.lead">Admite <em>markup</em> dentro</p>
     <input data-i18n-attr="placeholder:form.name">
     <a data-i18n-attr="aria-label:nav.home" data-i18n="nav.home">Inicio</a>

   El idioma elegido se guarda en localStorage y se comparte entre las tres
   páginas del sitio, así que cambiar a inglés en la portada mantiene inglés
   al entrar en SCM o en Magno.
   ========================================================================== */

(function () {
  'use strict';

  var STORAGE_KEY = 'scm-magno-lang';
  var SUPPORTED = ['es', 'en'];
  var DEFAULT = 'es';

  var dict = window.I18N_DICT || {};

  function resolve(lang, key) {
    var table = dict[lang];
    if (!table) return null;
    return Object.prototype.hasOwnProperty.call(table, key) ? table[key] : null;
  }

  /* Idioma inicial: lo guardado > el del navegador > español. */
  function initialLang() {
    var stored = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      /* Safari en modo privado puede lanzar al leer. Seguimos sin persistencia. */
    }
    if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;

    var nav = (navigator.language || navigator.userLanguage || '').slice(0, 2).toLowerCase();
    return SUPPORTED.indexOf(nav) !== -1 ? nav : DEFAULT;
  }

  function applyAttr(el, lang) {
    /* "placeholder:form.name" o varios separados por coma. */
    el.getAttribute('data-i18n-attr').split(',').forEach(function (pair) {
      var bits = pair.split(':');
      if (bits.length !== 2) return;
      var attr = bits[0].trim();
      var value = resolve(lang, bits[1].trim());
      if (value !== null) el.setAttribute(attr, value);
    });
  }

  function translate(lang) {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var value = resolve(lang, el.getAttribute('data-i18n'));
      if (value !== null) el.textContent = value;
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var value = resolve(lang, el.getAttribute('data-i18n-html'));
      if (value !== null) el.innerHTML = value;
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      applyAttr(el, lang);
    });

    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-lang-btn') === lang));
    });

    /* Los enlaces alternos de idioma ayudan al SEO aunque la traducción sea
       en cliente; al menos declaran que el contenido existe en ambos. */
    document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang: lang } }));
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* Sin persistencia, pero la página queda traducida igualmente. */
    }
    translate(lang);
  }

  function init() {
    translate(initialLang());

    document.addEventListener('click', function (event) {
      var btn = event.target.closest('[data-lang-btn]');
      if (!btn) return;
      event.preventDefault();
      setLang(btn.getAttribute('data-lang-btn'));
    });
  }

  window.I18N = { set: setLang, supported: SUPPORTED };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
