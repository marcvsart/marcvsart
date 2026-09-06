// O catálogo é local: acompanha o mesmo commit das imagens no GitHub Pages.
// Formato documentado em films/captions.txt e README.md.
export function safeFilmURL(value) {
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) ? url.href : null;
  } catch { return null; }
}

export function parseCrop(value = '') {
  if (!value) return '50% 50%';
  const match = value.match(/^(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%$/);
  return match && Number(match[1]) <= 100 && Number(match[2]) <= 100
    ? `${Number(match[1])}% ${Number(match[2])}%` : null;
}

export function parseFilms(source) {
  const records = [];
  const warnings = [];
  const seen = new Set();
  source.replace(/^\uFEFF/, '').split(/\r?\n/).forEach((line, index) => {
    if (!line.trim() || line.trimStart().startsWith('#')) return;
    const fields = line.split('|').map(value => value.trim());
    const [file, title, date, keywords, url, cropValue] = fields;
    if (![5, 6].includes(fields.length) || !file || !title || /[\\/]/.test(file) ||
        !/\.(png|jpe?g|webp|gif|avif)$/i.test(file) || seen.has(file)) {
      warnings.push(`Linha ${index + 1}: registro inválido ou arquivo repetido.`);
      return;
    }
    seen.add(file);
    const href = safeFilmURL(url);
    if (!href) warnings.push(`Linha ${index + 1}: URL ausente ou inválida.`);
    const crop = parseCrop(cropValue);
    if (!crop) warnings.push(`Linha ${index + 1}: recorte inválido; usando o centro.`);
    records.push({ file, title, date, tags: keywords.split(',').map(tag => tag.trim()).filter(Boolean), href, crop: crop || '50% 50%' });
  });
  return { records, warnings };
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

export function renderFilms(root, records) {
  root.replaceChildren();
  if (!records.length) {
    const message = element('p', 'shelf-message');
    const channel = element('a', '', 'Watch the films on ZOMBIEBASILISK ↗');
    channel.href = 'https://www.instagram.com/zombiebasilisk/';
    channel.target = '_blank';
    channel.rel = 'noopener noreferrer';
    message.append(channel);
    root.append(message);
    return;
  }

  records.forEach((film, index) => {
    const tape = element('details', 'tape');
    // Accordion nativo: clique, toque, Enter e espaço, sem capturar o teclado.
    tape.name = 'film-shelf';
    const summary = element('summary');
    const number = element('span', 'tape-number', String(index + 1).padStart(2, '0'));
    number.setAttribute('aria-hidden', 'true');
    const title = element('span', 'tape-title', film.title);
    const date = element('span', 'tape-date', film.date || '—');
    const tags = element('span', 'tape-tags');
    film.tags.forEach(tag => tags.append(element('span', '', tag)));
    const toggle = element('span', 'tape-toggle');
    toggle.setAttribute('aria-hidden', 'true');
    summary.append(number, title, date, tags, toggle);

    const panel = element('div', 'tape-panel');
    const frame = element(film.href ? 'a' : 'div', 'film-frame');
    if (film.href) {
      frame.href = film.href;
      frame.target = '_blank';
      frame.rel = 'noopener noreferrer';
      frame.setAttribute('aria-label', `Watch ${film.title} (opens in a new tab)`);
    }
    const image = element('img');
    image.alt = `Frame — ${film.title}`;
    image.decoding = 'async';
    image.style.objectPosition = film.crop || '50% 50%';
    image.addEventListener('error', () => {
      image.hidden = true;
      image.style.display = 'none';
      frame.classList.add('image-unavailable');
    });
    const watch = element('span', 'film-watch');
    watch.append(element('span', '', film.href ? 'Watch film' : 'Video link unavailable'));
    if (film.href) watch.append(element('span', '', '↗'));
    frame.append(image, watch);
    panel.append(frame);
    tape.append(summary, panel);
    // Carrega o original na primeira abertura. O crop é apenas visual, via CSS.
    tape.addEventListener('toggle', () => {
      if (!tape.open) return;
      if (!image.hasAttribute('src')) image.src = `films/${encodeURIComponent(film.file)}`;
      // Fallback para navegadores sem suporte a details[name].
      root.querySelectorAll('details[open]').forEach(other => {
        if (other !== tape) other.open = false;
      });
    });
    root.append(tape);
  });
}

export async function loadFilms(root) {
  try {
    const response = await fetch('films/captions.txt', { cache: 'no-cache' });
    if (!response.ok) throw new Error('Catalog unavailable');
    const { records, warnings } = parseFilms(await response.text());
    warnings.forEach(message => console.warn('[films]', message));
    renderFilms(root, records);
  } catch {
    root.replaceChildren(element('p', 'shelf-message', 'The film selection is temporarily unavailable. Visit ZOMBIEBASILISK using the link above.'));
  } finally {
    root.setAttribute('aria-busy', 'false');
  }
}

if (typeof document !== 'undefined') {
  const root = document.getElementById('film-shelf');
  if (root) loadFilms(root);
}
