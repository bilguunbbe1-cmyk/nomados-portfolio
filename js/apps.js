/* apps.js — NomadOS-ийн аппууд.
   Апп бүр:  icon      — ICONS доторх дүрсний нэр
             title()   — цонхны гарчиг
             render()  — цонхны агуулгыг HTML текстээр буцаана
             mount()   — (заавал биш) render хийсний дараа event холбоно
             w, h      — анхны хэмжээ;  keep — хэл солиход агуулгыг дахин зурахгүй */

const P = window.PROFILE;

/* Icon: [градиентын өнгө 1, өнгө 2, цагаан SVG зураас] — бүгд гараар зурсан */
const ICONS = {
  welcome:  ['#ffb36b', '#e2612b', '<path d="M3 20h18"/><path d="M5 20v-7h14v7"/><path d="M3.5 13.5 12 6.5l8.5 7"/><path d="M10.5 20v-4h3v4"/>'],
  about:    ['#ffd36e', '#f29b2c', '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/><path d="M10 13h6M10 17h4"/>'],
  skills:   ['#7be0b0', '#1f9d74', '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M6.5 12h2.5l2-4 2.2 7 1.8-3h2.5"/><path d="M9 21h6M12 17v4"/>'],
  projects: ['#7cc7ff', '#2f6fde', '<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H9l2 2h7.5A2.5 2.5 0 0 1 21 9.5v7a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 16.5z"/><path d="M3 10h18"/>'],
  contact:  ['#ff9ab3', '#d6336c', '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/>'],
  terminal: ['#5d6584', '#1b1f33', '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="m7 9.5 3 2.5-3 2.5M12.5 15H17"/>'],
  shagai:   ['#f2dfb8', '#b98a4e', '<path d="M8 4.5c2.5-.8 3.2 1.4 4.6 1.2C15 5.3 18.5 5 19.4 8.2c.8 2.8-1.5 3.5-1.2 5.9.3 2.4-.4 5.2-3.9 5.4-2.6.2-3.1-1.8-5.3-1.6-2.5.2-4.6-1-4.6-3.6 0-2.3 1.9-2.6 1.6-4.6-.3-2.5-.4-4.4 2-5.2z"/><path d="M10 11.5c1.4-1.2 3-1.2 4.4 0"/>'],
  settings: ['#c7b6ff', '#6f4fd6', '<path d="M4 7h9M17 7h3M4 12h3M11 12h9M4 17h11M19 17h1"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="17" r="2"/>'],
  trash:    ['#cfd6e4', '#7a859c', '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'],
  osinfo:   ['#ffb36b', '#e2612b', '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="2.5"/><path d="M12 3.5v6M12 14.5v6M3.5 12h6M14.5 12h6"/>'],
  image:    ['#7cc7ff', '#2f6fde', '<rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="9" cy="10" r="2"/><path d="m21 16.5-5-5-9.5 8.5"/>'],
  file:     ['#e6e9f2', '#9aa3b8', '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/>'],
  github:   ['#5d6584', '#1b1f33', '<path d="M9 19c-4 1.3-4-2-6-2.5M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.8 2.8 5.8 3.1 5.8 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>'],
  linkedin: ['#6fb4ff', '#0a66c2', '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V16M8 7.5v.2M12 16v-3.2c0-1.4.9-2.3 2.1-2.3s1.9.9 1.9 2.3V16M12 10.5V16"/>'],
  youtube:  ['#ff6b6b', '#d62828', '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10 9.2v5.6l4.8-2.8z" fill="#fff"/>'],
  instagram:['#ffb36b', '#d6336c', '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17 7v.1"/>']
};

function icon(id, cls = '') {
  const [a, b, glyph] = ICONS[id] || ICONS.file;
  return `<span class="ico ${cls}" style="--a:${a};--b:${b}" aria-hidden="true"><svg viewBox="0 0 24 24">${glyph}</svg></span>`;
}

const findProject = id => P.projects.find(p => p.id === id);
const extLink = (href, label, cls = 'btn') => href ? `<a class="${cls}" href="${esc(href)}" target="_blank" rel="noopener">${label} ${UI.ext}</a>` : '';

/* ---------- Шагай: тал тус бүрийн дүрс ба магадлал ---------- */
const SHAGAI_SIDES = [
  { id: 'horse', w: 0.22, mark: '<path d="M22 31c5-7 15-7 20 0" class="bone-mark"/><path d="M27 37c3-2.5 7-2.5 10 0" class="bone-mark thin"/>' },
  { id: 'camel', w: 0.14, mark: '<path d="M19 35q6.5-11 13 0q6.5-11 13 0" class="bone-mark"/>' },
  { id: 'sheep', w: 0.34, mark: '<ellipse cx="32" cy="32" rx="9" ry="6" class="bone-mark"/>' },
  { id: 'goat',  w: 0.30, mark: '<path d="M21 27q11 12 22 0" class="bone-mark"/><path d="M24 38h16" class="bone-mark thin"/>' }
];
function rollSide() {
  let r = Math.random();
  for (const s of SHAGAI_SIDES) { if ((r -= s.w) < 0) return s; }
  return SHAGAI_SIDES[0];
}
const boneSvg = side => `<svg viewBox="0 0 64 64" class="bone-svg"><path class="bone-body" d="M20 9c8-3 11 3 15 2.5S47 6 53 13c6 7-1 12 0 18s6 13-1 19c-7 6-12 1-17 2s-10 6-18 2C9 50 9 44 10 38s-6-10-3-17c3-8 9-10 13-12z"/>${side.mark}</svg>`;

let shagaiStats = { throws: 0, horses: 0 };

/* ================================================================
   АППУУД
   ================================================================ */
const APPS = {

  /* --- Тавтай морил --- */
  welcome: {
    icon: 'welcome', w: 440, h: 470, pos: 'right',
    title: () => t('app.welcome'),
    render: () => `
      <div class="welcome">
        <div class="avatar" aria-hidden="true"><span>${esc(P.initials)}</span></div>
        <h3>${t('welcome.title')}</h3>
        <p>${t('welcome.body')}</p>
        <div class="quick">
          <button data-open="about">${icon('about', 'ico-xs')}${t('welcome.l1')}</button>
          <button data-open="projects">${icon('projects', 'ico-xs')}${t('welcome.l2')}</button>
          <button data-open="contact">${icon('contact', 'ico-xs')}${t('welcome.l3')}</button>
          <button data-open="terminal">${icon('terminal', 'ico-xs')}${t('welcome.l4')}</button>
        </div>
        <p class="tip">${UI.egg}<span>${t('welcome.tip')}</span></p>
      </div>`
  },

  /* --- Миний тухай (Notepad маягаар) --- */
  about: {
    icon: 'about', w: 600, h: 560,
    title: () => t('app.about'),
    render: () => `
      <div class="notepad">
        <div class="np-menu" aria-hidden="true">${t('about.menu').split('  ').map(m => `<span>${m}</span>`).join('')}</div>
        <article class="np-page">
          <p class="np-comment">// about_me.txt — ${esc(L(P.name))}</p>
          <h3 class="np-name">${esc(L(P.name))}</h3>
          <p class="np-role">${esc(L(P.role))}</p>
          <dl class="facts">
            <div><dt>${t('about.loc')}</dt><dd>${esc(L(P.location))}</dd></div>
            <div><dt>${t('about.school')}</dt><dd>${esc(L(P.school))}</dd></div>
            ${P.status ? `<div><dt>${t('about.status')}</dt><dd><span class="live-dot"></span>${esc(L(P.status))}</dd></div>` : ''}
          </dl>
          ${L(P.bio).map(p => `<p>${esc(p)}</p>`).join('')}
          <h4># ${t('about.journey')}</h4>
          <ol class="timeline">${P.timeline.map(i => `<li><b>${esc(i.year)}</b><span>${esc(L(i))}</span></li>`).join('')}</ol>
          <h4># ${t('about.langs')}</h4>
          <ul class="plain">${P.languages.map(l => `<li>${esc(L(l))}</li>`).join('')}</ul>
          <p class="np-end">— EOF<span class="caret"></span></p>
        </article>
      </div>`
  },

  /* --- Ур чадвар (Систем монитор маягаар) --- */
  skills: {
    icon: 'skills', w: 620, h: 580,
    title: () => t('app.skills'),
    render: () => {
      const groups = [...new Set(P.skills.map(s => s.group))];
      return `
      <div class="monitor">
        <div class="mon-stats">
          <div class="stat"><span>${t('sk.uptime')}</span><b>${P.projects.filter(p => p.code).length} ${t('sk.years')}</b></div>
          <div class="stat"><span>${t('sk.coffee')}</span><b class="coffee">87%</b></div>
          <div class="stat"><span>${t('sk.bugs')}</span><b>∞</b></div>
        </div>
        <div class="mon-graph"><span>${t('sk.graph')}</span><canvas height="70"></canvas></div>
        <div class="proc-head"><span>${t('sk.proc')}</span><span>${t('sk.load')}</span></div>
        ${groups.map(g => `
          <h4 class="proc-group">${t('grp.' + g)}</h4>
          ${P.skills.filter(s => s.group === g).map(s => `
            <div class="skill">
              <span class="sk-name">${esc(s.name)}</span>
              <span class="bar"><i style="--v:${s.level}%"></i></span>
              <span class="sk-val">${s.level}%</span>
            </div>`).join('')}`).join('')}
        <h4 class="proc-group">${t('sk.tools')}</h4>
        <ul class="chips">${P.tools.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
      </div>`;
    },
    mount(body) {
      requestAnimationFrame(() => body.querySelector('.monitor').classList.add('ready'));   // bar-ууд дүүрэх анимэйшн
      // "Урам зоригийн ачаалал" — санамсаргүй шилжилттэй шууд график
      const cv = body.querySelector('canvas');
      const ctx = cv.getContext('2d');
      const data = Array.from({ length: 48 }, () => 55 + Math.random() * 20);
      const draw = () => {
        const dpr = devicePixelRatio || 1, w = cv.clientWidth, h = cv.clientHeight;
        if (!w) return;
        cv.width = w * dpr; cv.height = h * dpr; ctx.scale(dpr, dpr);
        const color = getComputedStyle(document.body).getPropertyValue('--accent').trim();
        const step = w / (data.length - 1);
        ctx.beginPath();
        data.forEach((v, i) => { const x = i * step, y = h - (v / 100) * h; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
        ctx.lineWidth = 2; ctx.strokeStyle = color; ctx.lineJoin = 'round'; ctx.stroke();
        ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath();
        ctx.globalAlpha = 0.15; ctx.fillStyle = color; ctx.fill(); ctx.globalAlpha = 1;
      };
      draw();
      const timer = setInterval(() => {
        if (!cv.isConnected) return clearInterval(timer);       // цонх хаагдвал зогсоно
        data.shift();
        data.push(clamp(data.at(-1) + (Math.random() - 0.45) * 18, 20, 98));
        draw();
      }, 420);
    }
  },

  /* --- Бүтээлүүд (File explorer маягаар) --- */
  projects: {
    icon: 'projects', w: 760, h: 560,
    title: () => t('app.projects'),
    render: () => `
      <div class="explorer">
        <div class="ex-path"><span>~/${esc(P.username)}/projects</span><span>${P.projects.length} ${t('pr.items')}</span></div>
        <p class="ex-lead">${t('pr.lead')}</p>
        <div class="ex-grid">
          ${P.projects.map((p, i) => `
            <button class="ex-card" data-open="project" data-arg="${esc(p.id)}" style="--i:${i}">
              <span class="ex-thumb"><img src="${esc(p.image)}" alt="${esc(L(p.title))}" loading="lazy"></span>
              <span class="ex-meta">${esc(p.year)} · ${esc(L(p.type))}</span>
              <span class="ex-name">${esc(L(p.title))}</span>
              <span class="ex-short">${esc(L(p.short))}</span>
              <span class="ex-open">${t('pr.more')} →</span>
            </button>`).join('')}
        </div>
      </div>`
  },

  /* --- Нэг бүтээлийн дэлгэрэнгүй --- */
  project: {
    icon: 'image', w: 700, h: 600,
    title: id => `${L(findProject(id)?.title || '')}`,
    render: id => {
      const p = findProject(id);
      if (!p) return '';
      return `
      <article class="proj">
        <img class="proj-img" src="${esc(p.image)}" alt="${esc(L(p.title))}">
        <div class="proj-body">
          <p class="eyebrow">${esc(p.year)} · ${esc(L(p.type))}</p>
          <h3>${esc(L(p.title))}</h3>
          <p>${esc(L(p.desc))}</p>
          <dl class="facts">
            <div><dt>${t('pr.role')}</dt><dd>${esc(L(p.role))}</dd></div>
            <div><dt>${t('pr.stack')}</dt><dd><ul class="chips">${p.stack.map(s => `<li>${esc(s)}</li>`).join('')}</ul></dd></div>
          </dl>
          <div class="btn-row">
            ${extLink(p.demo, p.demoLabel ? L(p.demoLabel) : t('pr.demo'), 'btn primary')}
            ${extLink(p.code, t('pr.code'), 'btn')}
          </div>
        </div>
      </article>`;
    }
  },

  /* --- Холбоо барих (Шуудангийн апп маягаар) --- */
  contact: {
    icon: 'contact', w: 720, h: 520,
    title: () => t('app.contact'),
    render: () => {
      const c = P.contact;
      const social = [['github', 'GitHub', c.github], ['youtube', 'YouTube', c.youtube], ['linkedin', 'LinkedIn', c.linkedin], ['instagram', 'Instagram', c.instagram]].filter(s => s[2]);
      return `
      <div class="mail">
        <aside class="mail-side">
          <h4>${t('ct.socials')}</h4>
          <a class="soc" href="mailto:${esc(c.email)}">${icon('contact', 'ico-xs')}<span><b>Email</b><small>${esc(c.email)}</small></span></a>
          ${social.map(([ic, name, url]) => `<a class="soc" href="${esc(url)}" target="_blank" rel="noopener">${icon(ic, 'ico-xs')}<span><b>${name}</b><small>${esc(url.replace(/^https?:\/\/(www\.)?/, ''))}</small></span></a>`).join('')}
          <button class="btn small copy-email" type="button">${UI.copy}${t('ct.copy')}</button>
        </aside>
        <form class="mail-form" novalidate>
          <p class="mail-lead">${t('ct.lead')}</p>
          <div class="mf-row"><span class="mf-label">${t('ct.to')}</span><span class="mf-to">${esc(c.email)}</span></div>
          <label class="mf-row"><span class="mf-label">${t('ct.from')}</span><input name="name" autocomplete="name" required></label>
          <label class="mf-row"><span class="mf-label">${t('ct.subject')}</span><input name="subject" value="${esc(t('ct.subjectDefault'))}"></label>
          <textarea name="msg" rows="6" placeholder="${esc(t('ct.msg'))}" aria-label="Message" required></textarea>
          <div class="mf-foot"><button class="btn primary send" type="submit">${t('ct.send')} ${UI.send}</button></div>
        </form>
      </div>`;
    },
    mount(body) {
      const form = body.querySelector('form');
      body.querySelector('.copy-email').addEventListener('click', async () => {
        try { await navigator.clipboard.writeText(P.contact.email); } catch { /* clipboard хориотой байж болно */ }
        Sound.click();
        toast(t('ct.copied'), { icon: UI.copy, ms: 2400 });
      });
      form.addEventListener('submit', e => {
        e.preventDefault();
        const f = new FormData(form);
        const name = f.get('name').trim(), msg = f.get('msg').trim();
        if (!name || !msg) { Sound.error(); toast(t('ct.need'), { ms: 2600 }); return; }
        // Backend байхгүй тул зочны имэйл програмыг (mailto) бэлэн захиатай нээнэ
        const subject = encodeURIComponent(f.get('subject') || t('ct.subjectDefault'));
        const text = encodeURIComponent(`${msg}\n\n— ${name}`);
        form.classList.add('flying');                     // "онгоц нисэх" анимэйшн
        setTimeout(() => form.classList.remove('flying'), 1200);
        toast(t('ct.sending'), { icon: UI.send, ms: 3000 });
        setTimeout(() => { location.href = `mailto:${P.contact.email}?subject=${subject}&body=${text}`; }, 500);
      });
    }
  },

  /* --- Терминал (terminal.js) --- */
  terminal: {
    icon: 'terminal', w: 660, h: 430, keep: true,
    title: () => t('app.terminal'),
    render: () => '',
    mount: body => Terminal.mount(body)
  },

  /* --- Шагай тоглоом --- */
  shagai: {
    icon: 'shagai', w: 520, h: 500,
    title: () => t('app.shagai'),
    render: () => `
      <div class="shagai">
        <p class="sh-lead">${t('sh.lead')}</p>
        <div class="bones">${SHAGAI_SIDES.map(s => `<div class="bone">${boneSvg(s)}<span>${t('sh.' + s.id)}</span></div>`).join('')}</div>
        <p class="sh-result" aria-live="polite">${t('sh.ready')}</p>
        <button class="btn primary sh-throw" type="button">${t('sh.throw')}</button>
        <p class="sh-stats">${t('sh.throws')}: <b class="st-throws">${shagaiStats.throws}</b> · ${t('sh.horses')}: <b class="st-horses">${shagaiStats.horses}</b></p>
      </div>`,
    mount(body) {
      const bones = $$('.bone', body), btn = $('.sh-throw', body), res = $('.sh-result', body);
      btn.addEventListener('click', () => {
        btn.disabled = true;
        Sound.toss();
        res.textContent = '…';
        bones.forEach(b => {
          b.style.setProperty('--r', `${Math.round(Math.random() * 720 - 360)}deg`);
          b.style.setProperty('--x', `${Math.round(Math.random() * 30 - 15)}px`);
          b.classList.remove('land'); void b.offsetWidth; b.classList.add('toss');
        });
        setTimeout(() => {
          const sides = bones.map(() => rollSide());
          bones.forEach((b, i) => {
            b.innerHTML = `${boneSvg(sides[i])}<span>${t('sh.' + sides[i].id)}</span>`;
            b.classList.remove('toss'); b.classList.add('land');
            b.classList.toggle('is-horse', sides[i].id === 'horse');
          });
          const horses = sides.filter(s => s.id === 'horse').length;
          const same = sides.every(s => s.id === sides[0].id);
          shagaiStats.throws++; shagaiStats.horses += horses;
          res.textContent = same && horses !== 4 ? t('sh.same').replace('{x}', t('sh.' + sides[0].id)) : t('sh.r' + horses);
          $('.st-throws', body).textContent = shagaiStats.throws;
          $('.st-horses', body).textContent = shagaiStats.horses;
          if (horses >= 3) Sound.egg(); else Sound.click();
          btn.disabled = false;
        }, 700);
      });
    }
  },

  /* --- Тохиргоо --- */
  settings: {
    icon: 'settings', w: 520, h: 600,
    title: () => t('app.settings'),
    render: () => {
      const seg = (key, current, opts) => `
        <div class="seg" role="group">${opts.map(([v, label]) => `<button type="button" data-set="${key}:${v}" class="${v === current ? 'on' : ''}">${label}</button>`).join('')}</div>`;
      return `
      <div class="settings">
        <section><h4>${t('st.theme')}</h4>${seg('theme', document.body.dataset.theme, [['light', UI.sun + t('st.light')], ['dark', UI.moon + t('st.dark')]])}</section>
        <section><h4>${t('st.lang')}</h4>${seg('lang', I18N.lang, [['mn', 'Монгол'], ['en', 'English']])}</section>
        <section><h4>${t('st.scene')}</h4>${seg('scene', Scene.mode, ['auto', 'dawn', 'day', 'dusk', 'night'].map(s => [s, t('sc.' + s)]))}</section>
        <section><h4>${t('st.sound')}</h4>${seg('sound', Sound.on ? 'on' : 'off', [['on', t('st.on')], ['off', t('st.off')]])}</section>
        <section>
          <h4>${t('st.eggs')} · ${Eggs.found.size}/${Eggs.list.length}</h4>
          <div class="egg-meter"><i style="width:${Eggs.found.size / Eggs.list.length * 100}%"></i></div>
          <ul class="egg-list">${Eggs.list.map(e => `<li class="${Eggs.found.has(e) ? 'got' : ''}">${UI.egg}${Eggs.found.has(e) ? t('egg.' + e) : t('egg.hidden')}</li>`).join('')}</ul>
        </section>
        <div class="btn-row">
          <button class="btn" type="button" data-set="reboot:1">${UI.power}${t('st.reboot')}</button>
          <button class="btn ghost" type="button" data-set="reset:1">${t('st.reset')}</button>
        </div>
      </div>`;
    },
    mount(body) {
      body.addEventListener('click', e => {
        const b = e.target.closest('[data-set]');
        if (!b) return;
        const [key, val] = b.dataset.set.split(':');
        Sound.click();
        if (key === 'theme') OS.setTheme(val);
        if (key === 'lang') OS.setLang(val);
        if (key === 'scene') Scene.set(val);
        if (key === 'sound' && (val === 'on') !== Sound.on) OS.toggleSound();
        if (key === 'reboot') return OS.reboot();
        if (key === 'reset') Eggs.reset();
        WM.refresh('settings');
      });
    }
  },

  /* --- Хогийн сав --- */
  trash: {
    icon: 'trash', w: 600, h: 440,
    title: () => t('app.trash'),
    render: () => `
      <div class="trash">
        <div class="ex-path"><span>~/.trash</span><button class="btn small empty-trash" type="button">${t('tr.empty')}</button></div>
        <p class="ex-lead">${t('tr.lead')}</p>
        <div class="trash-split">
          <ul class="trash-files">${t('tr.files').map(([name], i) => `<li><button type="button" data-file="${i}">${icon('file', 'ico-xs')}<span>${esc(name)}</span></button></li>`).join('')}</ul>
          <pre class="trash-view">${t('tr.pick')}</pre>
        </div>
      </div>`,
    mount(body) {
      const view = $('.trash-view', body);
      body.addEventListener('click', e => {
        const f = e.target.closest('[data-file]');
        if (f) {
          Sound.click();
          $$('[data-file]', body).forEach(x => x.classList.toggle('on', x === f));
          view.textContent = t('tr.files')[f.dataset.file][1];
          Eggs.find('trash');
        }
        if (e.target.closest('.empty-trash')) { Sound.error(); toast(t('tr.noempty'), { ms: 3000 }); }
      });
    }
  },

  /* --- NomadOS-ийн тухай --- */
  osinfo: {
    icon: 'osinfo', w: 440, h: 400,
    title: () => t('app.osinfo'),
    render: () => `
      <div class="osinfo">
        <img src="assets/logo.svg" alt="" width="76" height="76">
        <h3>${esc(P.osName)}</h3>
        <p class="eyebrow">${t('os.version')}</p>
        <p>${t('os.body')}</p>
        <p class="muted">${t('os.made')}: <b>${esc(L(P.name))}</b> · ${new Date().getFullYear()}</p>
      </div>`
  }
};

/* Desktop дээр харагдах icon-уудын дараалал */
const DESKTOP_APPS = ['welcome', 'about', 'skills', 'projects', 'contact', 'terminal', 'shagai', 'settings', 'trash'];
