/* terminal.js — Командын мөрийн апп.
   Зочин команд бичиж мэдээлэл авна. ↑/↓ — түүх, Tab — автоматаар гүйцээх.
   Монгол alias-ууд ч ажиллана (тусламж, намтар, бүтээл …). */

const Terminal = (() => {
  const TX = {
    mn: {
      banner: n => `<span class="t-acc">${n}</span> терминалд тавтай морил. Эхлэхийн тулд <span class="t-acc">help</span> гэж бичээрэй.`,
      help: 'Боломжит командууд:',
      notFound: c => `Команд олдсонгүй: <span class="t-err">${c}</span> — <span class="t-acc">help</span> гэж бичээд үзээрэй.`,
      cmds: {
        help: 'командуудын жагсаалт', about: 'миний тухай', skills: 'ур чадвар', projects: 'бүтээлүүд (open 1 → нээх)',
        contact: 'холбоо барих', open: 'апп нээх: open about|skills|projects|contact|shagai|settings|trash',
        neofetch: 'системийн мэдээлэл', shagai: 'шагай орхих', theme: 'theme light|dark', lang: 'lang mn|en',
        ls: 'файлууд', cat: 'файл унших: cat secret.txt', date: 'Улаанбаатарын цаг', clear: 'дэлгэц цэвэрлэх', exit: 'терминал хаах'
      },
      openUsage: 'Хэрэглээ: open about | skills | projects | contact | shagai | settings | trash | <бүтээлийн дугаар>',
      opened: a => `«${a}» нээгдлээ.`,
      sudo: 'Уучлаарай, <b>guest</b> хэрэглэгчид sudo эрх байхгүй.\nЭнэ үйлдлийг бүртгэлээ. 😄 Гэхдээ надтай холбогдвол бүх эрх нээгдэнэ.',
      rm: 'Хамгаалалт идэвхжлээ. Энэ бол портфолио — туршилтын талбай биш 🙂',
      coffee: 'Кофе чанаж байна… ☕ Хөгжүүлэгч дахин 100% цэнэгтэй боллоо!',
      catMissing: f => `cat: ${f}: файл олдсонгүй`,
      secret: 'НУУЦ ЗУРАГ:\n · Тэнгэр өөд харж, нар эсвэл сарыг дар\n · Гэр дотор хэн нэгэн цай чанаж байх шиг…\n · Хогийн савыг ухаж үз\n · Терминалд sudo, coffee гэж бичиж үз\n · Гар дээр: ↑ ↑ ↓ ↓ ← → ← → B A',
      hack: ['Хамгаалалтын системд холбогдож байна…', 'Нууц үг тайлж байна', 'НЭВТРЭХ ЭРХ ОЛГОГДЛОО ✓', '…зүрх сэтгэлд тань 💛 Тоглосон юм. Харин намайг ажилд аваарай!'],
      themeSet: v => `Горим: ${v}`, langSet: 'Хэл: Монгол',
      neo: { os: 'Систем', shell: 'Shell', uptime: 'Кодлосон', theme: 'Горим', projects: 'Бүтээл', loc: 'Байршил' }
    },
    en: {
      banner: n => `Welcome to the <span class="t-acc">${n}</span> terminal. Type <span class="t-acc">help</span> to begin.`,
      help: 'Available commands:',
      notFound: c => `Command not found: <span class="t-err">${c}</span> — try <span class="t-acc">help</span>.`,
      cmds: {
        help: 'list commands', about: 'about me', skills: 'my skills', projects: 'my projects (open 1 → view)',
        contact: 'how to reach me', open: 'open an app: open about|skills|projects|contact|shagai|settings|trash',
        neofetch: 'system info', shagai: 'toss shagai', theme: 'theme light|dark', lang: 'lang mn|en',
        ls: 'list files', cat: 'read a file: cat secret.txt', date: 'Ulaanbaatar time', clear: 'clear screen', exit: 'close terminal'
      },
      openUsage: 'Usage: open about | skills | projects | contact | shagai | settings | trash | <project number>',
      opened: a => `Opened "${a}".`,
      sudo: "Sorry, user <b>guest</b> has no sudo rights.\nThis incident will be reported. 😄 Get in touch with me to unlock everything.",
      rm: 'Protection enabled. This is a portfolio, not a playground 🙂',
      coffee: 'Brewing coffee… ☕ The developer is back to 100%!',
      catMissing: f => `cat: ${f}: no such file`,
      secret: 'TREASURE MAP:\n · Look up at the sky and click the sun or moon\n · Someone seems to be making tea in the ger…\n · Dig through the trash\n · Type sudo or coffee in this terminal\n · On your keyboard: ↑ ↑ ↓ ↓ ← → ← → B A',
      hack: ['Connecting to the mainframe…', 'Cracking password', 'ACCESS GRANTED ✓', '…to your heart 💛 Just kidding. Hire me instead!'],
      themeSet: v => `Theme: ${v}`, langSet: 'Language: English',
      neo: { os: 'OS', shell: 'Shell', uptime: 'Coding', theme: 'Theme', projects: 'Projects', loc: 'Location' }
    }
  };
  const tx = () => TX[I18N.lang];

  const ALIAS = { 'тусламж': 'help', 'намтар': 'about', 'whoami': 'about', 'ур': 'skills', 'бүтээл': 'projects', 'холбоо': 'contact',
    'цэвэрлэх': 'clear', 'кофе': 'coffee', 'шагай': 'shagai', 'нээ': 'open', 'гарах': 'exit', 'cls': 'clear' };
  const NAMES = ['help', 'about', 'skills', 'projects', 'contact', 'open', 'neofetch', 'shagai', 'theme', 'lang', 'ls', 'cat', 'date', 'clear', 'exit', 'history', 'echo', 'sudo', 'coffee', 'hack'];
  const FILES = ['about.txt', 'skills.sys', 'projects/', 'contact.mail', 'shagai.exe', 'secret.txt'];
  const APP_NAMES = ['about', 'skills', 'projects', 'contact', 'shagai', 'settings', 'trash', 'welcome'];

  const GER_ART = [
    '        _.-^-._        ',
    '     .-\'  _|_  \'-.     ',
    '   .\'____| |____\'.   ',
    '   |  ||  ___  ||  |   ',
    '   |  || |   | ||  |   ',
    '   |__||_|___|_||__|   '
  ].join('\n');

  function mount(body) {
    const user = P.username;
    const ps1 = `<span class="t-user">${esc(user)}@nomad</span>:<span class="t-path">~</span>$`;
    body.innerHTML = `
      <div class="term">
        <div class="term-out" role="log"></div>
        <form class="term-line" autocomplete="off">
          <label class="term-ps1">${ps1}</label>
          <input class="term-in" spellcheck="false" autocapitalize="off" aria-label="command">
        </form>
      </div>`;
    const term = $('.term', body), out = $('.term-out', body), input = $('.term-in', body), form = $('.term-line', body);
    const hist = [];
    let hi = 0;

    const print = (html, cls = '') => {
      const row = document.createElement('div');
      row.className = 't-row ' + cls;
      row.innerHTML = html;
      out.append(row);
      term.scrollTop = term.scrollHeight;
      return row;
    };
    const wait = ms => new Promise(r => setTimeout(r, ms));
    const bar = (v, n = 20) => '█'.repeat(Math.round(v / 100 * n)) + '░'.repeat(n - Math.round(v / 100 * n));
    const link = (href, text) => `<a href="${esc(href)}" target="_blank" rel="noopener">${esc(text)}</a>`;

    print(tx().banner(esc(P.osName)));
    print(`<span class="t-dim">${t('hero.hint')} · Tab ↹ · ↑ ↓</span>`);

    const commands = {
      help() {
        print(tx().help, 't-acc');
        Object.entries(tx().cmds).forEach(([c, d]) => print(`  <span class="t-cmd">${c.padEnd(10)}</span><span class="t-dim">${d}</span>`));
      },
      about() {
        print(`<b>${esc(L(P.name))}</b> — <span class="t-acc">${esc(L(P.role))}</span>`);
        print(esc(L(P.tagline)), 't-dim');
        L(P.bio).forEach(p => print(esc(p)));
      },
      skills() {
        P.skills.forEach(s => print(`  ${esc(s.name.padEnd(18))} <span class="t-acc">${bar(s.level)}</span> ${s.level}%`));
        print(`  ${t('sk.tools')}: ${P.tools.map(esc).join(', ')}`, 't-dim');
      },
      projects() {
        P.projects.forEach((p, i) => print(`  <span class="t-acc">[${i + 1}]</span> <b>${esc(L(p.title))}</b> <span class="t-dim">(${esc(p.year)}) — ${esc(L(p.short))}</span>`));
        print(`  <span class="t-dim">→ open 1</span>`);
      },
      contact() {
        const c = P.contact;
        print(`  email     <a href="mailto:${esc(c.email)}">${esc(c.email)}</a>`);
        if (c.github) print(`  github    ${link(c.github, c.github.replace(/^https?:\/\//, ''))}`);
        if (c.linkedin) print(`  linkedin  ${link(c.linkedin, c.linkedin.replace(/^https?:\/\/(www\.)?/, ''))}`);
        if (c.instagram) print(`  instagram ${link(c.instagram, c.instagram.replace(/^https?:\/\/(www\.)?/, ''))}`);
      },
      open(args) {
        const a = (args[0] || '').toLowerCase();
        const n = parseInt(a, 10);
        if (n >= 1 && n <= P.projects.length) { WM.open('project', P.projects[n - 1].id); return print(tx().opened(esc(L(P.projects[n - 1].title))), 't-ok'); }
        if (APP_NAMES.includes(a)) { WM.open(a); return print(tx().opened(a), 't-ok'); }
        print(tx().openUsage, 't-dim');
      },
      neofetch() {
        const n = tx().neo;
        const years = Math.max(1, new Date().getFullYear() - P.codingSince);
        const info = [
          `<b class="t-acc">${esc(user)}@nomad</b>`, '-----------------',
          `<b>${n.os}</b>: ${esc(P.osName)} 1.0`, `<b>${n.shell}</b>: nomad-sh`,
          `<b>${n.uptime}</b>: ${years} ${t('sk.years')}`, `<b>${n.theme}</b>: ${document.body.dataset.theme} · ${Scene.current()}`,
          `<b>${n.projects}</b>: ${P.projects.length}`, `<b>${n.loc}</b>: ${esc(L(P.location))}`
        ];
        print(`<div class="neo"><pre class="t-acc">${esc(GER_ART)}</pre><div>${info.join('<br>')}</div></div>`);
      },
      shagai() {
        const sides = Array.from({ length: 4 }, rollSide);
        const horses = sides.filter(s => s.id === 'horse').length;
        Sound.toss();
        print(`  🎲 ${sides.map(s => `[${t('sh.' + s.id)}]`).join(' ')}`);
        print(`  ${t('sh.r' + horses)}`, horses >= 3 ? 't-ok' : 't-dim');
      },
      theme(args) { const v = args[0] === 'dark' || args[0] === 'light' ? args[0] : (document.body.dataset.theme === 'dark' ? 'light' : 'dark'); OS.setTheme(v); print(tx().themeSet(v), 't-ok'); },
      lang(args) { const v = args[0] === 'en' || args[0] === 'mn' ? args[0] : (I18N.lang === 'mn' ? 'en' : 'mn'); OS.setLang(v); print(tx().langSet, 't-ok'); },
      ls() { print(FILES.map(f => f.endsWith('/') ? `<span class="t-path">${f}</span>` : f).join('   ')); },
      cat(args) {
        const f = args[0] || '';
        if (f === 'secret.txt') return print(esc(tx().secret), 't-ok pre');
        if (f === 'about.txt') return commands.about();
        if (f === 'skills.sys') return commands.skills();
        if (f === 'contact.mail') return commands.contact();
        print(tx().catMissing(esc(f)), 't-err');
      },
      date() { print(new Date().toLocaleString(I18N.lang === 'mn' ? 'mn-MN' : 'en-GB', { timeZone: 'Asia/Ulaanbaatar', dateStyle: 'full', timeStyle: 'short' }) + ` (${t('clock.tz')})`); },
      echo(args) { print(esc(args.join(' '))); },
      history() { hist.forEach((h, i) => print(`  ${String(i + 1).padStart(3)}  ${esc(h)}`, 't-dim')); },
      clear() { out.innerHTML = ''; },
      exit() { WM.close('terminal'); },
      sudo() { Sound.error(); print(`[sudo] password for ${esc(user)}: ********`, 't-dim'); print(tx().sudo, 't-err pre'); Eggs.find('sudo'); },
      coffee() {
        print(esc('   ( (\n    ) )\n  ........\n  |      |]\n  \\      /\n   `----\''), 't-acc pre');
        print(tx().coffee, 't-ok');
        Eggs.find('coffee');
      },
      async hack() {
        input.disabled = true;
        const [a, b, c, d] = tx().hack;
        print(a, 't-dim'); await wait(500);
        const row = print(`${b} [${'░'.repeat(20)}]`);
        for (let i = 1; i <= 20; i++) { await wait(55); row.textContent = `${b} [${'█'.repeat(i)}${'░'.repeat(20 - i)}] ${i * 5}%`; }
        await wait(250); print(c, 't-ok'); await wait(700); print(d);
        input.disabled = false; input.focus();
      }
    };

    function run(raw) {
      if (/^rm\s+-rf/.test(raw)) { Sound.error(); return print(tx().rm, 't-err'); }
      const [first, ...args] = raw.split(/\s+/);
      const cmd = ALIAS[first.toLowerCase()] || first.toLowerCase();
      if (commands[cmd]) commands[cmd](args);
      else { Sound.error(); print(tx().notFound(esc(first))); }
    }

    form.addEventListener('submit', e => {
      e.preventDefault();
      const raw = input.value.trim();
      input.value = '';
      print(`${ps1} ${esc(raw)}`);
      if (!raw) return;
      hist.push(raw); hi = hist.length;
      run(raw);
    });

    input.addEventListener('keydown', e => {
      Sound.key();
      if (e.key === 'ArrowUp') { e.preventDefault(); if (hi > 0) input.value = hist[--hi]; }
      else if (e.key === 'ArrowDown') { e.preventDefault(); hi = Math.min(hist.length, hi + 1); input.value = hist[hi] || ''; }
      else if (e.key === 'Tab') {
        e.preventDefault();
        const v = input.value.toLowerCase();
        const [w, arg] = v.split(/\s+/);
        if (arg !== undefined) {   // 2 дахь үгийг гүйцээх (open …, cat …)
          const pool = w === 'open' ? APP_NAMES : w === 'cat' ? FILES : [];
          const m = pool.filter(x => x.startsWith(arg));
          if (m.length === 1) input.value = `${w} ${m[0]}`;
        } else {
          const m = NAMES.filter(x => x.startsWith(v));
          if (m.length === 1) input.value = m[0] + ' ';
          else if (m.length > 1) print(m.join('   '), 't-dim');
        }
      } else if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); commands.clear(); }
    });

    term.addEventListener('click', () => { if (!getSelection().toString()) input.focus({ preventScroll: true }); });
    if (!isMobile()) setTimeout(() => input.focus({ preventScroll: true }), 60);
  }

  return { mount };
})();
