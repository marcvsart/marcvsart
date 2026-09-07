(() => {
  const mobileQuery = window.matchMedia('(max-width: 720px)');
  // ============================================================
  // PAINTINGS — lê a pasta /paintings do repo via github api.
  // suba uma imagem nova na pasta → bola nova na página de pinturas.
  // legendas em paintings/captions.txt, formato:
  //   nome-do-arquivo.jpg | legenda da obra
  // ============================================================
  const REPO = "marcvsart/marcvsart";
  const PDIR = "paintings";
  const pfield = document.getElementById('pfield');
  const orbs = [];

  function placeOrbs() {
    const W = pfield.clientWidth;
    if (!W) return;
    const mobile = mobileQuery.matches;
    // Reserva 26px para a flutuação e 14px entre as bordas das pinturas.
    const drift = 26;
    const clearance = drift + 14;
    const placed = [];
    orbs.forEach((o, index) => {
      const size = Math.min(W, mobile
        ? Math.min(260, W * (0.55 + o._scale * 0.2))
        : 180 + o._scale * 240);
      o._size = size;
      o.style.width = o.style.height = size + 'px';
      let x, y;
      if (mobile) {
        // Composição alternada: cada obra encontra espaço abaixo das anteriores.
        // A altura cresce com o catálogo, sem limite fixo nem colisões ao sortear.
        x = index % 2 ? W - size : 0;
        y = drift;
        placed.forEach(p => {
          const dx = (x + size / 2) - (p.x + p.s / 2);
          const distance = (size + p.s) / 2 + clearance;
          if (Math.abs(dx) < distance) {
            const below = p.y + p.s / 2 + Math.sqrt(distance ** 2 - dx ** 2) - size / 2;
            y = Math.max(y, below);
          }
        });
      } else {
        let fits = false;
        for (let tries = 0; tries < 40; tries++) {
          x = Math.random() * (W - size);
          y = drift + Math.random() * 640;
          fits = placed.every(p => Math.hypot(
            x + size / 2 - p.x - p.s / 2,
            y + size / 2 - p.y - p.s / 2
          ) >= (size + p.s) / 2 + clearance);
          if (fits) break;
        }
        // Nunca aceita uma posição sobreposta ao esgotar as tentativas.
        if (!fits) y = placed.reduce((max, p) => Math.max(max, p.y + p.s), 0) + clearance;
      }
      placed.push({ x, y, s: size });
      o.style.left = x + 'px';
      o.style.top = y + 'px';
    });
    const maxY = placed.reduce((max, p) => Math.max(max, p.y + p.s), 0);
    pfield.style.height = (maxY + 40) + 'px';
  }

  function buildOrb(name, caption) {
    const url = PDIR + '/' + name;
    const o = document.createElement('button');
    o.type = 'button';
    o.className = 'orb';
    o._scale = Math.random();
    o.style.backgroundImage = "url('" + url.replace(/'/g, "%27") + "')";
    o.style.setProperty('--dur', (6 + Math.random() * 7).toFixed(1) + 's');
    o.style.setProperty('--delay', (-Math.random() * 8).toFixed(1) + 's');
    o.style.setProperty('--drift', (-(10 + Math.random() * 16)).toFixed(0) + 'px');
    o.setAttribute('role', 'button');
    o.setAttribute('aria-label', 'View painting: ' + name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '));
    o.addEventListener('click', () => openViewer(url, caption));
    orbs.push(o);
    pfield.appendChild(o);
  }

  async function loadPaintings() {
    try {
      const caps = {};
      const capRes = await fetch(PDIR + '/captions.txt', { cache: 'no-cache' }).catch(() => null);
      if (capRes && capRes.ok) {
        (await capRes.text()).split('\n').forEach(line => {
          const i = line.indexOf('|');
          if (i > 0) caps[line.slice(0, i).trim()] = line.slice(i + 1).trim();
        });
      }
      // O manifesto local funciona mesmo sem acesso à API do GitHub.
      const names = new Set(Object.keys(caps).filter(name => /\.(jpe?g|png|webp|gif|avif)$/i.test(name)));
      try {
        const dirRes = await fetch('https://api.github.com/repos/' + REPO + '/contents/' + PDIR,
          { signal: AbortSignal.timeout(3500) });
        if (dirRes.ok) {
          const files = await dirRes.json();
          if (Array.isArray(files)) files.filter(f => f.type === 'file' && /\.(jpe?g|png|webp|gif|avif)$/i.test(f.name))
            .forEach(f => names.add(f.name));
        }
      } catch (_) { /* As obras locais continuam disponíveis. */ }
      if (!names.size) throw new Error('empty');
      names.forEach(name => buildOrb(name, caps[name] || ''));
      placeOrbs();
    } catch (_) {
      pfield.innerHTML = '<p class="empty">Paintings are temporarily unavailable.</p>';
      pfield.style.height = 'auto';
    }
  }
  loadPaintings();
  let _lastW = window.innerWidth;
  window.addEventListener('resize', () => {
    if (window.innerWidth !== _lastW && orbs.length) { _lastW = window.innerWidth; placeOrbs(); }
  });

  // ---- viewer fullscreen ---------------------------------------
  const viewer = document.getElementById('viewer');
  const viewerImg = document.getElementById('viewerImg');
  const viewerCap = document.getElementById('viewerCap');
  let viewerTrigger = null;
  function openViewer(url, caption) {
    viewerTrigger = document.activeElement;
    document.querySelector('.stage').inert = true;
    viewerImg.src = url;
    viewerImg.alt = url.split('/').pop().replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
    viewerCap.innerHTML = caption || '';
    viewerCap.style.display = caption ? '' : 'none';
    viewer.classList.add('on');
    viewer.querySelector('.close').focus();
  }
  function closeViewer() {
    if (!viewer.classList.contains('on')) return;
    viewer.classList.remove('on'); viewerImg.removeAttribute('src');
    document.querySelector('.stage').inert = false;
    viewerTrigger?.focus();
  }
  viewer.addEventListener('click', (e) => { if (e.target.closest('a')) return; closeViewer(); });
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeViewer();
    if (e.key === 'Tab' && viewer.classList.contains('on')) {
      const focusable = [...viewer.querySelectorAll('button, a[href]')];
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });



})();
