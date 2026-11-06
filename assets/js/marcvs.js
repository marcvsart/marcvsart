// marcvs.art: cabeçalho, rodapé e glitch pesado.
// Carregado de forma síncrona logo após <header data-site-header>, para não piscar.
(function () {
  'use strict';
  var PT = document.documentElement.lang === 'pt-BR';

  // Páginas equivalentes nas duas línguas (botão EN | PT).
  var PAIRS = [['/', '/pt/'], ['/paintings/', '/pt/pinturas/'], ['/sound/', '/pt/som/']];
  var ANCHORS = [['films', 'filmes'], ['texts', 'textos'], ['collections', 'colecoes'], ['sound', 'som'], ['paintings', 'pinturas']];

  var NAV = PT ? [
    { href: '/pt/#filmes', label: 'Filmes', match: /^\/pt\/$/, hash: 'filmes' },
    { href: '/pt/pinturas/', label: 'Pinturas', match: /^\/pt\/pinturas\// },
    { href: '/pt/som/', label: 'Som', match: /^\/pt\/som\// },
    { href: '/pt/#textos', label: 'Textos', match: null }
  ] : [
    { href: '/#films', label: 'Films', match: /^\/$/, hash: 'films' },
    { href: '/paintings/', label: 'Paintings', match: /^\/paintings\// },
    { href: '/sound/', label: 'Sound', match: /^\/sound\// },
    { href: '/#texts', label: 'Texts', match: null }
  ];

  var FOOTER = [
    { href: 'https://www.instagram.com/marcvs/', label: 'Instagram ↗' },
    { href: 'https://www.instagram.com/zombiebasilisk/', label: 'Zombiebasilisk ↗' },
    { href: 'https://www.transient.xyz/nfts/ethereum/0x6f2ef204ab017c648f8c4f1ec49f731827d14ff2', label: 'Transient ↗' },
    { href: 'https://objkt.com/users/tz1LxMnuPvqrYo4Z1TnVon1zrVu6VwJfuxwa/created', label: 'objkt ↗' },
    PT ? { href: 'https://marcuscouto.com/sistema/#contato', label: 'Contato ↗' } : { href: 'https://marcuscouto.com/en/system/#contact', label: 'Contact ↗' }
  ];
  var PRO = PT
    ? { href: 'https://marcuscouto.com/', label: 'Marcus Couto · direção criativa ↗' }
    : { href: 'https://marcuscouto.com/en/', label: 'Marcus Couto · creative direction ↗' };

  function el(tag, attrs, text) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function counterpart() {
    var path = location.pathname.replace(/index\.html$/, '');
    var from = PT ? 1 : 0, to = PT ? 0 : 1;
    var pair = PAIRS.filter(function (p) { return p[from] === path; })[0];
    var target = pair ? pair[to] : (PT ? '/' : '/pt/');
    var hash = location.hash.slice(1);
    if (hash) {
      var a = ANCHORS.filter(function (x) { return x[from] === hash; })[0];
      target += '#' + (a ? a[to] : hash);
    }
    return target;
  }

  function buildHeader(header) {
    header.className = 'site-header';
    var brand = el('a', { class: 'brand hg', href: PT ? '/pt/' : '/', 'data-text': 'marcvs' }, 'marcvs');
    var nav = el('nav', { class: 'site-nav', 'aria-label': PT ? 'Principal' : 'Main' });
    NAV.forEach(function (item) {
      var link = el('a', { href: item.href }, item.label);
      if (item.match && item.match.test(location.pathname)) link.setAttribute('aria-current', 'page');
      nav.append(link);
    });
    var lang = el('div', { class: 'lang', role: 'group', 'aria-label': PT ? 'Idioma' : 'Language' });
    var other = el('a', { href: counterpart(), lang: PT ? 'en' : 'pt-BR', hreflang: PT ? 'en' : 'pt-BR' }, PT ? 'EN' : 'PT');
    other.setAttribute('aria-label', PT ? 'Read in English' : 'Ler em português');
    window.addEventListener('hashchange', function () { other.href = counterpart(); });
    var current = el('span', { 'aria-current': 'true' }, PT ? 'PT' : 'EN');
    lang.append(PT ? other : current, el('span', { 'aria-hidden': 'true' }, '|'), PT ? current : other);
    header.replaceChildren(brand, nav, lang);
  }

  function buildFooter(footer) {
    footer.className = 'site-footer';
    var nav = el('nav', { 'aria-label': PT ? 'Links' : 'Links' });
    FOOTER.forEach(function (item) { nav.append(el('a', { href: item.href, target: '_blank', rel: 'noopener' }, item.label)); });
    footer.replaceChildren(nav, el('a', { class: 'pro-link', href: PRO.href }, PRO.label));
  }

  // ---- glitch pesado -------------------------------------------------------
  // .hg     → títulos e marca: fatias deslocadas em azul e branco, com tremor
  // .tear   → frames: faixas da imagem arrancadas para os lados
  // #loss   → perda de sinal rápida na página inteira
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  function fire(node) {
    if (!node || reduced.matches) return;
    node.classList.remove('on'); void node.offsetWidth; node.classList.add('on');
  }
  function every(node, min, max, first) {
    var loop = function () { setTimeout(function () { fire(node); loop(); }, (min + Math.random() * (max - min)) * 1000); };
    setTimeout(function () { fire(node); loop(); }, first === undefined ? (min + Math.random() * (max - min)) * 1000 : first);
  }
  function setupGlitch() {
    document.querySelectorAll('.hg').forEach(function (node) {
      if (!node.hasAttribute('data-text')) node.setAttribute('data-text', node.textContent);
      (node.closest('a') || node).addEventListener('mouseenter', function () { fire(node); });
      every(node, 2.5, 8.5);
    });
    document.querySelectorAll('.tear').forEach(function (node) {
      (node.closest('a') || node).addEventListener('mouseenter', function () { fire(node); });
      if (!node.classList.contains('hero-frame')) every(node, 3, 10);
    });
    var loss = document.getElementById('loss');
    var hero = document.querySelector('.hero-frame');
    if (loss) {
      var lossLoop = function () {
        setTimeout(function () { fire(loss); fire(hero); lossLoop(); }, (9 + Math.random() * 8) * 1000);
      };
      setTimeout(function () { fire(loss); fire(hero); lossLoop(); }, 1200);
    }
  }

  var header = document.querySelector('[data-site-header]');
  if (header) buildHeader(header);
  document.addEventListener('DOMContentLoaded', function () {
    var footer = document.querySelector('[data-site-footer]');
    if (footer) buildFooter(footer);
    setupGlitch();
  });
})();
