/* scene.js — Тал нутгийн ханын зураг.
   Бүхэлдээ SVG кодоор зурагдана: тэнгэр, нар/сар, од, үүл, шувуу, уулс, гэр.
   Улаанбаатарын цагаар үүр → өдөр → үдэш → шөнө болж өөрчлөгдөнө.
   Өнгөнүүд CSS-ийн [data-scene] хувьсагчаас ирнэ (style.css-ийг үзнэ үү). */

const Scene = (() => {
  const desk = $('#desktop');
  const host = $('#wallpaper');
  const SAMPLE_HOUR = { dawn: 6.6, day: 12.5, dusk: 18.4, night: 1.5 };
  let mode = Store.get('scene', 'auto');   // 'auto' | 'dawn' | 'day' | 'dusk' | 'night'

  /* Улаанбаатарын одоогийн цаг (бутархай хэлбэрээр, ж: 14.5 = 14:30) */
  function ubHour() {
    const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Ulaanbaatar', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
    const h = +parts.find(p => p.type === 'hour').value % 24;
    const m = +parts.find(p => p.type === 'minute').value;
    return h + m / 60;
  }
  const sceneFor = h => (h >= 5 && h < 8) ? 'dawn' : (h >= 8 && h < 17) ? 'day' : (h >= 17 && h < 20) ? 'dusk' : 'night';

  /* Давтагддаг санамсаргүй тоо (seed) — уулсын хэлбэр хуудас бүрт ижилхэн гарна */
  function rng(seed) {
    return () => {
      seed = (seed + 0x6D2B79F5) | 0;
      let x = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
      return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* Зөөлөн уулсын нурууны path: цэгүүдийг quadratic curve-ээр холбоно */
  function ridge(seed, base, amp, step) {
    const r = rng(seed);
    const pts = [];
    for (let x = -120; x <= 1720 + step; x += step) pts.push([x, base - r() * amp]);
    let d = `M${pts[0][0]} ${pts[0][1].toFixed(1)}`;
    for (let i = 1; i < pts.length - 1; i++) {
      const [x, y] = pts[i], [nx, ny] = pts[i + 1];
      d += ` Q${x} ${y.toFixed(1)} ${((x + nx) / 2).toFixed(1)} ${((y + ny) / 2).toFixed(1)}`;
    }
    return d + ' L1720 900 L-120 900 Z';
  }

  function stars() {
    const r = rng(7);
    let s = '';
    for (let i = 0; i < 110; i++) {
      const x = (r() * 1600).toFixed(0), y = (r() * 560).toFixed(0), rad = (0.6 + r() * 1.5).toFixed(2);
      s += `<circle cx="${x}" cy="${y}" r="${rad}" style="animation-delay:${(r() * 4).toFixed(2)}s"/>`;
    }
    return s;
  }

  const cloud = (x, y, s, dur, delay) => `
    <g class="cloud" style="animation-duration:${dur}s;animation-delay:${delay}s">
      <g transform="translate(${x} ${y}) scale(${s})">
        <ellipse cx="0" cy="0" rx="70" ry="22"/><ellipse cx="-34" cy="-10" rx="36" ry="24"/>
        <ellipse cx="22" cy="-18" rx="44" ry="30"/><ellipse cx="60" cy="-4" rx="30" ry="18"/>
      </g>
    </g>`;

  /* Монгол гэр — (0,0) нь гэрийн доод төв цэг */
  const GER = `
    <g id="ger" class="ger" transform="translate(900 748)" role="button" aria-label="ger">
      <ellipse cx="0" cy="4" rx="92" ry="9" class="ger-shadow"/>
      <g class="smoke"><circle cx="34" cy="-104" r="6"/><circle cx="38" cy="-104" r="8"/><circle cx="31" cy="-104" r="7"/></g>
      <rect x="30" y="-104" width="7" height="44" rx="1.5" class="ger-pipe"/>
      <path d="M-66 0 V-46 H66 V0 Z" class="ger-wall"/>
      <path d="M-66 -38 H66" class="ger-band" stroke-width="5"/>
      <path d="M-66 -9 H66" class="ger-band" stroke-width="3" opacity=".55"/>
      <path d="M-78 -44 Q-38 -64 0 -86 Q38 -64 78 -44 Q0 -52 -78 -44 Z" class="ger-roof"/>
      <path d="M-78 -44 Q0 -52 78 -44" class="ger-band" stroke-width="3" fill="none"/>
      <path d="M-52 -54 L-46 -46 M-26 -68 L-22 -50 M26 -68 L22 -50 M52 -54 L46 -46" class="ger-rope"/>
      <ellipse cx="0" cy="-85" rx="11" ry="3.5" class="ger-toono"/>
      <rect x="-14" y="-40" width="28" height="40" rx="2" class="ger-door"/>
      <path d="M-9 -33 H9 M-9 -22 H9 M-9 -11 H9 M0 -37 V-3" class="ger-door-line"/>
    </g>`;

  function render() {
    host.innerHTML = `
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" class="sky-a"/><stop offset=".75" class="sky-b"/>
        </linearGradient>
        <radialGradient id="glow"><stop offset="0" class="glow-a"/><stop offset="1" class="glow-b"/></radialGradient>
        <mask id="crescent"><rect x="-200" y="-200" width="400" height="400" fill="#fff"/><circle cx="20" cy="-14" r="40" fill="#000"/></mask>
      </defs>
      <rect width="1600" height="900" fill="url(#sky)"/>
      <g class="stars">${stars()}</g>
      <g id="orb" class="orb" role="button" aria-label="sun">
        <circle r="170" fill="url(#glow)" class="orb-glow"/>
        <circle r="46" class="orb-core"/>
      </g>
      <g class="clouds">${cloud(0, 170, 1, 140, -20)}${cloud(0, 260, 0.7, 190, -110)}${cloud(0, 120, 0.55, 230, -60)}</g>
      <g class="birds"><path d="M0 0q8-8 16 0q8-8 16 0"/><path d="M40 -22q6-6 12 0q6-6 12 0"/><path d="M-30 -30q5-5 10 0q5-5 10 0"/></g>
      <g class="layer" data-depth="5"><path d="${ridge(11, 600, 150, 130)}" class="m1"/></g>
      <g class="layer" data-depth="11"><path d="${ridge(23, 690, 90, 170)}" class="m2"/></g>
      <g class="layer" data-depth="18">
        <path d="M-120 770 Q 400 700 800 740 T 1720 716 L1720 900 L-120 900 Z" class="m3"/>
        ${GER}
      </g>
      <g class="layer" data-depth="28"><path d="M-120 830 Q 300 792 700 830 T 1720 806 L1720 900 L-120 900 Z" class="m4"/></g>
    </svg>`;
    bind();
  }

  /* Нар/сарыг цагийн дагуу нумын дагуу байрлуулна */
  function placeOrb(scene) {
    let h = mode === 'auto' ? ubHour() : SAMPLE_HOUR[scene];
    let p;
    if (scene === 'night') { const hh = h < 8 ? h + 24 : h; p = (hh - 20) / 9; }
    else p = (h - 5) / 15;
    p = clamp(p, 0.06, 0.94);
    const x = 260 + p * 1080;
    const y = 560 - Math.sin(p * Math.PI) * 420;
    const orb = $('#orb');
    orb.setAttribute('transform', `translate(${x.toFixed(0)} ${y.toFixed(0)})`);
    const core = $('.orb-core', orb);
    if (scene === 'night') core.setAttribute('mask', 'url(#crescent)');   // шөнө — хавирган сар
    else core.removeAttribute('mask');
  }

  function current() { return mode === 'auto' ? sceneFor(ubHour()) : mode; }

  function apply() {
    const scene = current();
    const changed = desk.dataset.scene !== scene;
    desk.dataset.scene = scene;
    placeOrb(scene);
    if (changed) document.dispatchEvent(new CustomEvent('scene', { detail: scene }));   // зөвхөн өөрчлөгдвөл
  }

  function set(m) { mode = m; Store.set('scene', m); apply(); }

  /* Өдөр ↔ шөнө шилжүүлэх (нар/сар дээр дарахад) */
  function toggleDayNight() {
    const night = ['night', 'dusk'].includes(current());
    set(night ? 'day' : 'night');
    toast(night ? t('sun.rise') : t('sun.set'), { icon: night ? UI.sun : UI.moon, ms: 2600 });
  }

  function bind() {
    $('#orb').addEventListener('click', () => { Sound.click(); toggleDayNight(); Eggs.find('sun'); });
    const ger = $('#ger');
    ger.addEventListener('click', () => {
      Sound.click();
      ger.classList.remove('puff'); void ger.getBBox(); ger.classList.add('puff');
      toast(t('ger.tea'), { ms: 3400 });
      Eggs.find('ger');
    });

    /* Parallax — хулгана хөдлөхөд уулс өөр өөр хурдаар шилжинэ */
    if (matchMedia('(pointer: fine)').matches && !reducedMotion()) {
      const layers = $$('.layer', host);
      let raf = 0;
      desk.addEventListener('pointermove', e => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          const k = (e.clientX / innerWidth - 0.5) * 2;
          layers.forEach(l => { l.style.transform = `translateX(${(-k * l.dataset.depth).toFixed(1)}px)`; });
        });
      });
    }
  }

  render();
  apply();
  setInterval(apply, 60 * 1000);   // минут тутам нарны байрлалыг шинэчилнэ

  return { set, current, get mode() { return mode; }, toggleDayNight, ubHour };
})();
