/* main.js — NomadOS-ийг асаана: boot дэлгэц, desktop, taskbar, start цэс,
   баруун товчны цэс, хэл / өнгөний горим, Konami код. */

const OS = (() => {
  const desk = $('#desktop');
  const wait = ms => new Promise(r => setTimeout(r, ms));

  /* ---------- Хэл ба өнгөний горим ---------- */
  I18N.lang = Store.get('lang', 'mn');
  document.documentElement.lang = I18N.lang;
  const autoTheme = () => (['night', 'dusk'].includes(Scene.current()) ? 'dark' : 'light');

  function applyTheme(v) {
    document.body.dataset.theme = v;
    $('meta[name="theme-color"]').content = v === 'dark' ? '#141a3a' : '#f4efe6';
    renderTray();
  }
  function setTheme(v) { Store.set('theme', v); applyTheme(v); }                       // гараар сонгосон
  function toggleTheme() { setTheme(document.body.dataset.theme === 'dark' ? 'light' : 'dark'); Sound.click(); }

  function setLang(v) {
    I18N.lang = v;
    Store.set('lang', v);
    document.documentElement.lang = v;
    document.title = `${L(P.name)} — ${L(P.role)} · ${P.osName}`;
    renderPower(); renderHero(); renderIcons(); renderTray(); tick();
    if (!$('#start-menu').hidden) renderStart();
    WM.rerenderAll();
  }
  function toggleSound() { Sound.toggle(); renderTray(); }

  /* ---------- Асаах дэлгэц ---------- */
  function renderPower() {
    $('#power-name').textContent = L(P.name);
    $('#power-role').textContent = L(P.role);
    $('#power-hint').textContent = t('power.hint');
    $('#power-lang').textContent = I18N.lang === 'mn' ? 'EN' : 'MN';
  }

  let booting = false;
  async function boot() {
    if (booting || document.body.classList.contains('booted')) return;
    booting = true;
    Sound.unlock();                                   // хөтөч дууг зөвхөн хэрэглэгч дарсны дараа зөвшөөрнө
    const power = $('#power'), log = $('#bootlog');
    power.classList.add('booting');
    log.textContent = '';
    for (const line of t('boot')) {
      log.textContent += line.replace('{n}', P.projects.length) + '\n';
      Sound.key();
      await wait(reducedMotion() ? 0 : 160);
    }
    await wait(260);
    renderDesktop();
    document.body.classList.add('booted');
    power.classList.add('off');
    Sound.boot();
    setTimeout(() => { power.hidden = true; }, 800);
    if (!isMobile()) setTimeout(() => WM.open('welcome'), 900);
    else setTimeout(() => toast(t('welcome.tip'), { icon: UI.egg, ms: 5200 }), 1400);
    booting = false;
  }

  function reboot() {
    WM.closeAll();
    closeMenus();
    document.body.classList.remove('booted');
    const power = $('#power');
    power.hidden = false;
    power.classList.remove('booting');
    $('#bootlog').textContent = '';
    renderPower();
    requestAnimationFrame(() => power.classList.remove('off'));
  }

  /* ---------- Desktop: нүүр хэсэг (hero) ба icon-ууд ---------- */
  function renderHero() {
    const name = L(P.name);
    $('#hero').innerHTML = `
      <p class="hero-hi">${t('hero.hi')}</p>
      <h1 class="hero-name" aria-label="${esc(name)}">${[...name].map((ch, i) =>
        `<span aria-hidden="true" style="--i:${i}">${ch === ' ' ? '&nbsp;' : esc(ch)}</span>`).join('')}</h1>
      <p class="hero-role">${esc(L(P.role))}</p>
      <p class="hero-tag">${esc(L(P.tagline))}</p>
      <div class="hero-cta">
        <button class="btn primary" type="button" data-open="projects">${t('hero.cta1')}</button>
        <button class="btn glass" type="button" data-open="contact">${t('hero.cta2')}</button>
      </div>
      ${P.status ? `<p class="hero-status"><span class="live-dot"></span>${esc(L(P.status))}</p>` : ''}`;
  }

  function renderIcons() {
    $('#icons').innerHTML = DESKTOP_APPS.map((id, i) =>
      `<button class="d-icon" type="button" data-open="${id}" style="--i:${i}">${icon(id)}<span>${t('icon.' + id)}</span></button>`).join('');
  }

  function renderDesktop() {
    document.title = `${L(P.name)} — ${L(P.role)} · ${P.osName}`;
    renderHero(); renderIcons(); renderTray(); tick();
  }

  /* ---------- Taskbar ---------- */
  function renderTray() {
    const dark = document.body.dataset.theme === 'dark';
    const set = (sel, html, label) => { const b = $(sel); b.innerHTML = html; b.title = label; b.setAttribute('aria-label', label); };
    set('#sound-btn', Sound.on ? UI.soundOn : UI.soundOff, t('tray.sound'));
    set('#lang-btn', `<span>${I18N.lang === 'mn' ? 'МН' : 'EN'}</span>`, t('tray.lang'));
    set('#theme-btn', dark ? UI.moon : UI.sun, t('tray.theme'));
    set('#egg-btn', `${UI.egg}<span>${Eggs.found.size}/${Eggs.list.length}</span>`, t('tray.eggs'));
  }

  function tick() {
    const now = new Date(), tz = 'Asia/Ulaanbaatar';
    $('#clock-time').textContent = now.toLocaleTimeString('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit' });
    const [m, d] = now.toLocaleDateString('en-US', { timeZone: tz, month: 'numeric', day: 'numeric' }).split('/');
    $('#clock-date').textContent = I18N.lang === 'mn'
      ? `${m}-р сарын ${d}`
      : now.toLocaleDateString('en-GB', { timeZone: tz, month: 'short', day: 'numeric' });
    $('#clock').title = t('clock.tz');
  }

  /* ---------- Start цэс ---------- */
  function renderStart() {
    const n = Eggs.found.size, N = Eggs.list.length;
    $('#start-menu').innerHTML = `
      <div class="sm-profile">
        <div class="avatar sm" aria-hidden="true"><span>${esc(P.initials)}</span></div>
        <div><b>${esc(L(P.name))}</b><span>${esc(L(P.role))}</span></div>
      </div>
      <p class="sm-label">${t('sm.apps')}</p>
      <div class="sm-grid">${[...DESKTOP_APPS, 'osinfo'].map(id =>
        `<button type="button" role="menuitem" data-open="${id}">${icon(id, 'ico-sm')}<span>${id === 'osinfo' ? 'NomadOS' : t('icon.' + id)}</span></button>`).join('')}</div>
      <div class="sm-foot">
        <div class="sm-eggs">${UI.egg}<span>${t('sm.eggs')} <b>${n}/${N}</b></span><div class="egg-meter"><i style="width:${n / N * 100}%"></i></div></div>
        <button class="sm-power" type="button" data-power>${UI.power}<span>${t('sm.power')}</span></button>
      </div>`;
  }

  function toggleStart(force) {
    const m = $('#start-menu');
    const show = force ?? m.hidden;
    if (show === !m.hidden) return;
    if (show) { renderStart(); closeCtx(); Sound.click(); }
    m.hidden = !show;
    $('#start-btn').setAttribute('aria-expanded', String(show));
  }

  /* ---------- Баруун товчны цэс (desktop дээр) ---------- */
  function closeCtx() { $('#ctx-menu').hidden = true; }
  function closeMenus() { toggleStart(false); closeCtx(); }

  desk.addEventListener('contextmenu', e => {
    if (e.target.closest('.win') || isMobile()) return;
    e.preventDefault();
    toggleStart(false);
    const m = $('#ctx-menu');
    const items = [['refresh', t('cx.refresh')], ['scene', t('cx.scene')], ['terminal', t('cx.terminal')], ['settings', t('cx.settings')], ['-'], ['osinfo', t('cx.about')]];
    m.innerHTML = items.map(([a, label]) => a === '-' ? '<hr>' : `<button type="button" role="menuitem" data-ctx="${a}">${label}</button>`).join('');
    m.hidden = false;
    m.style.left = Math.min(e.clientX, innerWidth - m.offsetWidth - 8) + 'px';
    m.style.top = Math.min(e.clientY, innerHeight - m.offsetHeight - 8) + 'px';
    Sound.click();
  });

  $('#ctx-menu').addEventListener('click', e => {
    const b = e.target.closest('[data-ctx]');
    if (!b) return;
    const a = b.dataset.ctx;
    closeCtx();
    if (a === 'refresh') { renderIcons(); Sound.click(); }
    else if (a === 'scene') Scene.toggleDayNight();
    else WM.open(a);
  });

  /* ---------- Konami код: ↑ ↑ ↓ ↓ ← → ← → B A ---------- */
  const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let kpos = 0;
  addEventListener('keydown', e => {
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    kpos = k === KONAMI[kpos] ? kpos + 1 : (k === KONAMI[0] ? 1 : 0);
    if (kpos === KONAMI.length) { kpos = 0; crash(); }
  });

  function crash() {
    const c = $('#crash');
    c.innerHTML = `
      <div class="crash-inner">
        <svg class="crash-cup" viewBox="0 0 64 64" aria-hidden="true">
          <path class="steam" d="M24 14c-3-4 3-6 0-10M32 14c-3-4 3-6 0-10M40 14c-3-4 3-6 0-10"/>
          <path d="M12 22h36v14a16 16 0 0 1-16 16h-4a16 16 0 0 1-16-16z"/><path d="M48 26h4a6 6 0 0 1 0 12h-5"/><path d="M8 58h44"/>
        </svg>
        <h2>${t('cr.title')}</h2>
        <p>${t('cr.body')}</p>
        <div class="crash-bar"><i></i></div>
        <p class="crash-code">${t('cr.code')}</p>
        <p class="crash-key">${t('cr.key')}</p>
      </div>`;
    c.hidden = false;
    Sound.error();
    setTimeout(() => {
      const off = () => {
        c.hidden = true;
        removeEventListener('keydown', off);
        c.removeEventListener('click', off);
        Eggs.find('konami');
      };
      addEventListener('keydown', off);
      c.addEventListener('click', off);
    }, 700);
  }

  /* ---------- Ерөнхий event-үүд ---------- */
  document.addEventListener('click', e => {
    const opener = e.target.closest('[data-open]');
    if (opener) { WM.open(opener.dataset.open, opener.dataset.arg); closeMenus(); return; }
    if (e.target.closest('[data-power]')) { Sound.close(); reboot(); return; }
    if (!e.target.closest('#start-menu, #start-btn')) toggleStart(false);
    if (!e.target.closest('#ctx-menu')) closeCtx();
  });

  addEventListener('keydown', e => {
    if (!$('#power').hidden && !document.body.classList.contains('booted') && e.key === 'Enter' && document.activeElement?.id !== 'power-lang') { e.preventDefault(); boot(); }
    if (e.key === 'Escape') {
      if (!$('#start-menu').hidden || !$('#ctx-menu').hidden) closeMenus();
      else WM.closeActive();
    }
  });

  $('#power-btn').addEventListener('click', boot);
  $('#power-lang').addEventListener('click', () => setLang(I18N.lang === 'mn' ? 'en' : 'mn'));
  $('#start-btn').addEventListener('click', () => toggleStart());
  $('#sound-btn').addEventListener('click', toggleSound);
  $('#lang-btn').addEventListener('click', () => { Sound.click(); setLang(I18N.lang === 'mn' ? 'en' : 'mn'); });
  $('#theme-btn').addEventListener('click', toggleTheme);
  $('#egg-btn').addEventListener('click', () => WM.open('settings'));
  $('#clock').addEventListener('click', () => {
    Sound.click();
    toast(`${t('clock.tz')} · ${new Date().toLocaleString(I18N.lang === 'mn' ? 'mn-MN' : 'en-GB', { timeZone: 'Asia/Ulaanbaatar', dateStyle: 'full', timeStyle: 'short' })}`, { ms: 3000 });
  });

  // Ханын зураг өөрчлөгдөхөд (нар дарах, тохиргоо) өнгөний горим дагаж солигдоно
  document.addEventListener('scene', () => { Store.set('theme', null); applyTheme(autoTheme()); WM.refresh('settings'); });
  document.addEventListener('eggs', () => { renderTray(); WM.refresh('settings'); if (!$('#start-menu').hidden) renderStart(); });

  /* ---------- Эхлүүлэх ---------- */
  applyTheme(Store.get('theme', null) || autoTheme());
  renderPower();
  renderDesktop();
  setInterval(tick, 15 * 1000);
  $('#power-btn').focus({ preventScroll: true });

  return { setTheme, setLang, toggleSound, reboot };
})();
