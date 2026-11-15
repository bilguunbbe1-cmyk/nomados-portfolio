/* core.js — жижиг туслах хэрэгслүүд:
   DOM товчлол, хадгалалт (localStorage), дуу (Web Audio), мэдэгдэл (toast), нууцууд (easter eggs) */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const isMobile = () => matchMedia('(max-width: 760px)').matches;
const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/* localStorage — хувийн горимд алдаа гарч болох тул try/catch-аар хамгаална */
const Store = {
  get(key, fallback) {
    try { const v = localStorage.getItem('nomad:' + key); return v === null ? fallback : JSON.parse(v); }
    catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem('nomad:' + key, JSON.stringify(value)); } catch { /* ignore */ }
  }
};

/* Жижиг SVG дүрсүүд (UI товчлуурууд) */
const UI = {
  min: '<svg viewBox="0 0 12 12"><path d="M2 6h8"/></svg>',
  max: '<svg viewBox="0 0 12 12"><rect x="2" y="2" width="8" height="8" rx="1.5"/></svg>',
  close: '<svg viewBox="0 0 12 12"><path d="M3 3l6 6M9 3l-6 6"/></svg>',
  soundOn: '<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>',
  soundOff: '<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M17 9l5 6M22 9l-5 6"/></svg>',
  sun: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  moon: '<svg viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg>',
  egg: '<svg viewBox="0 0 24 24"><path d="M12 3c3.6 0 7 5.6 7 10a7 7 0 0 1-14 0c0-4.4 3.4-10 7-10z"/><path d="M7.5 12.5l2-1.5 2.5 2 2.5-2 2 1.5"/></svg>',
  ext: '<svg viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
  info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg>',
  copy: '<svg viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/></svg>',
  send: '<svg viewBox="0 0 24 24"><path d="M21 3L3 10.5l7 2.5 2.5 7z"/><path d="M21 3l-11 10"/></svg>',
  power: '<svg viewBox="0 0 24 24"><path d="M12 3v8"/><path d="M6.3 7.1a8 8 0 1 0 11.4 0"/></svg>',
  back: '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>'
};

/* ---------- Дуу: Web Audio API-гаар бүх дууг кодоор үүсгэнэ (файл татахгүй) ---------- */
const Sound = (() => {
  let ctx = null;
  let on = Store.get('sound', true);

  function ensure() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!ctx && AC) ctx = new AC();
    if (ctx && ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function tone(freq, dur = 0.08, { type = 'sine', vol = 0.05, at = 0 } = {}) {
    if (!on) return;
    const c = ensure();
    if (!c) return;
    const t0 = c.currentTime + at;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain).connect(c.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  // Монгол ардын аялгуунд түгээмэл пентатоник (5 нотын) гамм: G A C D E G
  const PENTA = [392, 440, 523.25, 587.33, 659.25, 784];

  return {
    unlock: ensure,
    get on() { return on; },
    toggle() { on = !on; Store.set('sound', on); if (on) this.click(); return on; },
    click() { tone(880, 0.035, { type: 'triangle', vol: 0.025 }); },
    key() { tone(1100 + Math.random() * 300, 0.015, { type: 'square', vol: 0.006 }); },
    open() { tone(523.25, 0.07, { vol: 0.035 }); tone(784, 0.1, { vol: 0.03, at: 0.05 }); },
    close() { tone(659.25, 0.06, { vol: 0.03 }); tone(440, 0.09, { vol: 0.03, at: 0.05 }); },
    error() { tone(150, 0.18, { type: 'square', vol: 0.02 }); },
    boot() { [0, 2, 3, 4, 5].forEach((n, i) => tone(PENTA[n], 0.6, { vol: 0.04, at: i * 0.13 })); },
    egg() { [2, 4, 5].forEach((n, i) => tone(PENTA[n] * 2, 0.22, { type: 'triangle', vol: 0.035, at: i * 0.09 })); },
    toss() { for (let i = 0; i < 6; i++) tone(300 + Math.random() * 500, 0.03, { type: 'square', vol: 0.012, at: i * 0.07 }); }
  };
})();

/* ---------- Мэдэгдэл (toast) — баруун доод буланд гарч ирээд алга болно ---------- */
function toast(html, { icon = UI.info, ms = 4200 } = {}) {
  const box = $('#toasts');
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<span class="toast-ico">${icon}</span><div>${html}</div>`;
  box.append(el);
  while (box.children.length > 3) box.firstElementChild.remove();
  setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 300); }, ms);
}

/* ---------- Нууцууд (easter eggs) — олдсоныг localStorage-д хадгална ---------- */
const Eggs = {
  list: ['sun', 'ger', 'konami', 'sudo', 'trash', 'coffee'],
  found: new Set(Store.get('eggs', [])),
  find(id) {
    if (this.found.has(id)) return false;
    this.found.add(id);
    Store.set('eggs', [...this.found]);
    Sound.egg();
    toast(`<b>${t('egg.found')}</b> ${this.found.size}/${this.list.length} · ${t('egg.' + id)}`, { icon: UI.egg });
    if (this.found.size === this.list.length) setTimeout(() => toast(t('egg.all'), { icon: UI.egg, ms: 7000 }), 1400);
    document.dispatchEvent(new CustomEvent('eggs'));
    return true;
  },
  reset() {
    this.found.clear();
    Store.set('eggs', []);
    document.dispatchEvent(new CustomEvent('eggs'));
  }
};
