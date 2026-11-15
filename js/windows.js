/* windows.js — Цонх удирдагч (Window Manager).
   Цонх нээх / хаах / чирэх / багасгах / томруулах, taskbar дээрх товчлуурууд.
   Гар утсан дээр цонх бүр бүтэн дэлгэцийн "апп" болж нээгдэнэ (CSS-ээр). */

const WM = (() => {
  const layer = $('#windows');
  const tasks = $('#tasks');
  const wins = new Map();        // key → { key, id, arg, app, el, task }
  let z = 30;                    // хамгийн дээд цонхны z-index
  let cascade = 0;               // шинэ цонх бүрийг бага зэрэг шилжүүлж байрлуулна
  let activeKey = null;

  function open(id, arg) {
    const app = APPS[id];
    if (!app) return null;
    const key = arg ? `${id}:${arg}` : id;
    if (wins.has(key)) { restore(key); return wins.get(key); }

    const el = document.createElement('section');
    el.className = 'win opening';
    el.dataset.app = id;
    el.setAttribute('role', 'dialog');
    el.innerHTML = `
      <header class="win-bar">
        <button class="wb wb-back" data-act="close" type="button">${UI.back}</button>
        ${icon(app.icon || id, 'ico-sm')}
        <h2 class="win-title"></h2>
        <div class="win-btns">
          <button class="wb wb-min" data-act="min" type="button">${UI.min}</button>
          <button class="wb wb-max" data-act="max" type="button">${UI.max}</button>
          <button class="wb wb-close" data-act="close" type="button">${UI.close}</button>
        </div>
      </header>
      <div class="win-body"></div>`;

    // Анхны хэмжээ, байрлал
    const W = layer.clientWidth, H = layer.clientHeight;
    const w = Math.min(app.w || 560, W - 24), h = Math.min(app.h || 440, H - 24);
    let x, y;
    if (app.pos === 'right') { x = W - w - Math.max(24, W * 0.06); y = Math.max(20, H * 0.08); }
    else {
      x = (W - w) / 2 + (cascade - 2) * 30;
      y = (H - h) / 2 + (cascade - 2) * 24;
      cascade = (cascade + 1) % 5;
    }
    Object.assign(el.style, {
      width: w + 'px', height: h + 'px',
      left: clamp(x, 12, W - w - 12) + 'px', top: clamp(y, 12, Math.max(12, H - h - 12)) + 'px'
    });
    layer.append(el);

    const task = document.createElement('button');
    task.className = 'task';
    task.type = 'button';
    task.innerHTML = `${icon(app.icon || id, 'ico-xs')}<span class="task-label"></span>`;
    tasks.append(task);

    const rec = { key, id, arg, app, el, task };
    wins.set(key, rec);

    el.addEventListener('pointerdown', () => focus(key));
    el.querySelector('.win-bar').addEventListener('click', e => {
      const b = e.target.closest('[data-act]');
      if (!b) return;
      ({ min: minimize, max: toggleMax, close })[b.dataset.act](key);
    });
    el.querySelector('.win-bar').addEventListener('dblclick', e => { if (!e.target.closest('button')) toggleMax(key); });
    el.addEventListener('animationend', () => el.classList.remove('opening'), { once: true });
    task.addEventListener('click', () => {
      if (activeKey === key && !el.classList.contains('min')) minimize(key);
      else restore(key);
    });

    enableDrag(rec);
    render(rec, true);
    focus(key);
    Sound.open();
    return rec;
  }

  /* Цонхны агуулгыг зурна. Хэл солиход дахин дуудагдана. */
  function render(rec, first = false) {
    const { app, arg, el, task } = rec;
    const title = app.title(arg);
    el.querySelector('.win-title').textContent = title;
    el.setAttribute('aria-label', title);
    task.querySelector('.task-label').textContent = title;
    task.title = title;
    el.querySelector('.wb-min').setAttribute('aria-label', t('w.min'));
    el.querySelector('.wb-max').setAttribute('aria-label', t('w.max'));
    el.querySelector('.wb-close').setAttribute('aria-label', t('w.close'));
    el.querySelector('.wb-back').setAttribute('aria-label', t('w.close'));
    if (first || !app.keep) {
      // body элементийг шинээр үүсгэж солино — хуучин event listener-үүд давхардахгүй
      const old = el.querySelector('.win-body');
      const body = document.createElement('div');
      body.className = 'win-body';
      body.innerHTML = app.render(arg);
      old.replaceWith(body);
      if (app.mount) app.mount(body, arg, rec);
    }
  }

  function focus(key) {
    const rec = wins.get(key);
    if (!rec) return;
    if (activeKey !== key) rec.el.style.zIndex = ++z;
    wins.forEach(r => {
      r.el.classList.toggle('active', r === rec);
      r.task.classList.toggle('active', r === rec);
    });
    activeKey = key;
  }

  function focusTop() {
    let top = null;
    wins.forEach(r => { if (!r.el.classList.contains('min') && (!top || +r.el.style.zIndex > +top.el.style.zIndex)) top = r; });
    if (top) focus(top.key);
  }

  function restore(key) {
    const rec = wins.get(key);
    if (!rec) return;
    rec.el.classList.remove('min');
    focus(key);
  }

  function minimize(key) {
    const rec = wins.get(key);
    rec.el.classList.add('min');
    rec.el.classList.remove('active');
    rec.task.classList.remove('active');
    activeKey = null;
    Sound.click();
    focusTop();
  }

  function toggleMax(key) {
    if (isMobile()) return;
    wins.get(key).el.classList.toggle('max');
    Sound.click();
  }

  function close(key) {
    const rec = wins.get(key);
    if (!rec) return;
    wins.delete(key);
    rec.task.remove();
    rec.el.classList.add('closing');
    Sound.close();
    setTimeout(() => rec.el.remove(), 200);
    if (activeKey === key) { activeKey = null; focusTop(); }
  }

  /* Гарчгийн мөрөөр чирж зөөх (Pointer Events — хулгана ба хуруу хоёуланд ажиллана) */
  function enableDrag(rec) {
    const bar = rec.el.querySelector('.win-bar');
    bar.addEventListener('pointerdown', e => {
      if (e.button !== 0 || e.target.closest('button') || isMobile() || rec.el.classList.contains('max')) return;
      const r = rec.el.getBoundingClientRect();
      const L0 = layer.getBoundingClientRect();
      const dx = e.clientX - r.left, dy = e.clientY - r.top;
      bar.setPointerCapture(e.pointerId);
      rec.el.classList.add('dragging');
      const move = ev => {
        const x = clamp(ev.clientX - L0.left - dx, -r.width + 90, L0.width - 90);
        const y = clamp(ev.clientY - L0.top - dy, 0, L0.height - 40);
        rec.el.style.left = x + 'px';
        rec.el.style.top = y + 'px';
      };
      const up = () => {
        rec.el.classList.remove('dragging');
        bar.removeEventListener('pointermove', move);
        bar.removeEventListener('pointerup', up);
        bar.removeEventListener('pointercancel', up);
      };
      bar.addEventListener('pointermove', move);
      bar.addEventListener('pointerup', up);
      bar.addEventListener('pointercancel', up);
    });
  }

  /* Цонхны хэмжээ өөрчлөгдвөл цонхнууд дэлгэцээс гарахгүй байлгана */
  addEventListener('resize', () => {
    const W = layer.clientWidth, H = layer.clientHeight;
    wins.forEach(({ el }) => {
      el.style.left = clamp(parseFloat(el.style.left), -el.offsetWidth + 90, W - 90) + 'px';
      el.style.top = clamp(parseFloat(el.style.top), 0, Math.max(0, H - 40)) + 'px';
    });
  });

  return {
    open, close, focus,
    closeActive: () => activeKey && close(activeKey),
    closeAll: () => [...wins.keys()].forEach(close),
    rerenderAll: () => wins.forEach(r => render(r)),
    refresh: id => wins.forEach(r => { if (r.id === id) render(r); }),
    isOpen: id => [...wins.values()].some(r => r.id === id)
  };
})();
