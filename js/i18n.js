/* i18n.js — интерфэйсийн текстүүд (Монгол / English).
   t('key')  → одоогийн хэл дээрх текст
   L(obj)    → { mn, en } объектоос одоогийн хэлийг сонгоно */

const STRINGS = {
  mn: {
    'power.hint': 'Асаахын тулд товчийг дарна уу · Enter',
    'boot': [
      'NomadOS BIOS v1.0',
      'Санах ой шалгаж байна ........ OK',
      'Тал нутгийн ханын зураг ачаалж байна ... OK',
      'Бүтээлүүдийг холбож байна .... {n} бүтээл',
      'Морь эмээллэж байна .......... OK',
      'Сүүтэй цай буцалгаж байна ..... OK',
      'Desktop эхлүүлж байна ...'
    ],

    'app.welcome': 'Тавтай морил', 'app.about': 'Миний тухай.txt', 'app.skills': 'Ур чадвар — Систем монитор',
    'app.projects': 'Бүтээлүүд', 'app.contact': 'Холбоо барих — Шуудан', 'app.terminal': 'Терминал',
    'app.shagai': 'Шагай', 'app.settings': 'Тохиргоо', 'app.trash': 'Хогийн сав', 'app.osinfo': 'NomadOS-ийн тухай',

    'icon.welcome': 'Тавтай морил', 'icon.about': 'Миний тухай', 'icon.skills': 'Ур чадвар', 'icon.projects': 'Бүтээлүүд',
    'icon.contact': 'Холбоо барих', 'icon.terminal': 'Терминал', 'icon.shagai': 'Шагай', 'icon.settings': 'Тохиргоо', 'icon.trash': 'Хогийн сав',

    'hero.hi': 'Сайн байна уу! Би бол',
    'hero.cta1': 'Бүтээлүүд үзэх', 'hero.cta2': 'Холбогдох',
    'hero.hint': 'Апп нээхийн тулд icon дээр дарна уу',

    'welcome.title': 'NomadOS-д тавтай морил!',
    'welcome.body': 'Энэ бол миний портфолио — гэхдээ ердийн вэбсайт биш, тал нутгийн жижигхэн үйлдлийн систем. Хавтас нээж, терминалд команд бичиж, бүр шагай ч орхиж болно.',
    'welcome.l1': 'Миний тухай, ур чадвар', 'welcome.l2': 'Бүтээлүүд', 'welcome.l3': 'Холбоо барих', 'welcome.l4': 'Терминал',
    'welcome.tip': 'Зөвлөгөө: энд 6 нууц (easter egg) нуугдсан байгаа. Тэнгэр рүү, гэр лүү харж үзээрэй…',

    'about.loc': 'Байршил', 'about.school': 'Сургууль', 'about.status': 'Төлөв',
    'about.journey': 'Замнал', 'about.langs': 'Хэлний мэдлэг', 'about.menu': 'Файл  Засах  Харах  Тусламж',

    'sk.uptime': 'Кодлосон хугацаа', 'sk.years': 'жил', 'sk.coffee': 'Кофены түвшин', 'sk.bugs': 'Засварласан алдаа',
    'sk.proc': 'Процесс', 'sk.load': 'Түвшин', 'sk.tools': 'Хэрэгслүүд', 'sk.graph': 'Урам зоригийн ачаалал — шууд',
    'grp.frontend': 'Frontend', 'grp.backend': 'Backend', 'grp.design': 'Дизайн',

    'pr.items': 'бүтээл', 'pr.more': 'Нээх', 'pr.demo': 'Демо үзэх', 'pr.code': 'Код · GitHub',
    'pr.role': 'Миний үүрэг', 'pr.stack': 'Технологи', 'pr.lead': 'Бүтээл дээр дарж дэлгэрэнгүйг нь нээнэ үү.',

    'ct.lead': 'Хамтын ажил, дадлага, санал хүсэлт — юу ч байсан бичээрэй. Би хариулна!',
    'ct.to': 'Хэнд', 'ct.from': 'Таны нэр', 'ct.subject': 'Гарчиг', 'ct.msg': 'Сайн байна уу! Таны портфолиог үзээд…',
    'ct.send': 'Илгээх', 'ct.copy': 'Имэйл хуулах', 'ct.copied': 'Имэйл хаяг хуулагдлаа!',
    'ct.sending': 'Таны имэйл програм нээгдэж байна…', 'ct.socials': 'Холбоосууд', 'ct.subjectDefault': 'Портфолиогоос мэндчилгээ',
    'ct.need': 'Нэр болон захиагаа бичнэ үү.',

    'sh.lead': 'Монголын уламжлалт тоглоом. Дөрвөн шагай орхиж, өнөөдрийн азаа үзээрэй!',
    'sh.throw': 'Шагай орхих', 'sh.throws': 'Орхисон', 'sh.horses': 'Морь',
    'sh.horse': 'Морь', 'sh.camel': 'Тэмээ', 'sh.sheep': 'Хонь', 'sh.goat': 'Ямаа',
    'sh.r4': 'Дөрвөн морь! Маш их аз таныг хүлээж байна.', 'sh.r3': 'Гурван морь — өнөөдөр сайхан өдөр болно.',
    'sh.r2': 'Хоёр морь — итгэлтэй урагшаа.', 'sh.r1': 'Нэг морь — бага ч гэсэн эхлэл бий.', 'sh.r0': 'Морь алга… Дахиад орхиод үз!',
    'sh.same': 'Бүгд адилхан — {x}! Ховор тохиолдол.', 'sh.ready': 'Шагайгаа орхиход бэлэн үү?',

    'st.theme': 'Өнгөний горим', 'st.light': 'Цайвар', 'st.dark': 'Бараан', 'st.lang': 'Хэл',
    'st.scene': 'Ханын зураг · Улаанбаатарын цагаар', 'sc.auto': 'Автомат', 'sc.dawn': 'Үүр', 'sc.day': 'Өдөр', 'sc.dusk': 'Үдэш', 'sc.night': 'Шөнө',
    'st.sound': 'Дуу', 'st.on': 'Асаалттай', 'st.off': 'Унтраалттай', 'st.eggs': 'Олдсон нууцууд',
    'st.reboot': 'Дахин ачаалах', 'st.reset': 'Нууцуудыг шинэчлэх',

    'tr.lead': 'Хаягдсан ч мартагдаагүй дурсамжууд…', 'tr.empty': 'Хоослох', 'tr.noempty': 'Үгүй ээ, эдгээр бол дурсамж. Хоослохгүй.',
    'tr.pick': 'Файл сонгож нээнэ үү.',
    'tr.files': [
      ['хуучин_портфолио_2019.html', '<marquee>Миний гоё сайт</marquee>\n\nТийм ээ, би нэг үе marquee таг ашиглаж байсан.\nОдоо бодоход ичмээр. Гэхдээ бүх зүйл эндээс эхэлсэн.'],
      ['bugs.txt', 'Бүх алдааг заслаа. ✓\n\n(Нэг нь үлдсэн. Тэр бол feature.)'],
      ['semicolon.js', ';\n\n// Шөнийн 2 цагт 3 цаг хайсан тэр цэг таслал.'],
      ['motivation.mp3', '▶ 0:00 / 0:00\n\nДаваа гарагийн өглөө энэ файл хоосорсон байна.\nКофе уусны дараа дахин ачаална.']
    ],

    'egg.found': 'Нууц олдлоо!', 'egg.hidden': '??? — хараахан олдоогүй',
    'egg.sun': 'Тэнгэрийн эзэн', 'egg.ger': 'Гэрийн цай', 'egg.konami': 'Konami код', 'egg.sudo': 'sudo эрх',
    'egg.trash': 'Хогийн савны дурсамж', 'egg.coffee': 'Кофены цаг',
    'egg.all': 'Баяр хүргэе! Та бүх нууцыг оллоо. Одоо надтай холбогдох л үлдлээ 😉',
    'egg.tip': 'Нууц', 'ger.tea': 'Гэрээс сүүтэй цайны үнэр ханхалж байна. Ороод цай уучих!',
    'sun.set': 'Нар жаргалаа…', 'sun.rise': 'Нар мандлаа!',

    'sm.apps': 'Аппууд', 'sm.power': 'Унтраах', 'sm.eggs': 'Олдсон нууц',
    'cx.refresh': 'Шинэчлэх', 'cx.scene': 'Өдөр/шөнө солих', 'cx.terminal': 'Терминал нээх', 'cx.settings': 'Тохиргоо', 'cx.about': 'NomadOS-ийн тухай',

    'cr.title': 'КОФЕ ДУУССАН',
    'cr.body': 'Хөгжүүлэгчийн кофе дууссан тул NomadOS түр зогслоо. Цэнэглэж байна…',
    'cr.code': 'Алдааны код: 0xC0FFEE',
    'cr.key': 'Үргэлжлүүлэхийн тулд аль нэг товч дарна уу',

    'w.min': 'Багасгах', 'w.max': 'Томруулах', 'w.close': 'Хаах',
    'tray.sound': 'Дуу асаах/унтраах', 'tray.lang': 'Хэл солих', 'tray.theme': 'Цайвар/бараан горим', 'tray.eggs': 'Олдсон нууцууд',
    'clock.tz': 'Улаанбаатар',

    'os.version': 'Хувилбар 1.0 «Тал»',
    'os.body': 'Ямар ч framework, бэлэн загваргүйгээр HTML, CSS, JavaScript-ээр гараас бичсэн. Ханын зургийг SVG кодоор зурсан бөгөөд Улаанбаатарын цагтай хамт үүр, өдөр, үдэш, шөнө болж өөрчлөгддөг.',
    'os.made': 'Бүтээсэн'
  },

  en: {
    'power.hint': 'Press the button to power on · Enter',
    'boot': [
      'NomadOS BIOS v1.0',
      'Checking memory ............. OK',
      'Loading steppe wallpaper .... OK',
      'Mounting projects ........... {n} found',
      'Saddling horses ............. OK',
      'Boiling milk tea ............ OK',
      'Starting desktop ...'
    ],

    'app.welcome': 'Welcome', 'app.about': 'About me.txt', 'app.skills': 'Skills — System Monitor',
    'app.projects': 'Projects', 'app.contact': 'Contact — Mail', 'app.terminal': 'Terminal',
    'app.shagai': 'Shagai', 'app.settings': 'Settings', 'app.trash': 'Trash', 'app.osinfo': 'About NomadOS',

    'icon.welcome': 'Welcome', 'icon.about': 'About me', 'icon.skills': 'Skills', 'icon.projects': 'Projects',
    'icon.contact': 'Contact', 'icon.terminal': 'Terminal', 'icon.shagai': 'Shagai', 'icon.settings': 'Settings', 'icon.trash': 'Trash',

    'hero.hi': 'Hello! I am',
    'hero.cta1': 'See my work', 'hero.cta2': 'Get in touch',
    'hero.hint': 'Click an icon to open an app',

    'welcome.title': 'Welcome to NomadOS!',
    'welcome.body': "This is my portfolio — but not a regular website: it's a tiny operating system from the Mongolian steppe. Open folders, type commands in the terminal, or even toss some shagai.",
    'welcome.l1': 'About me & skills', 'welcome.l2': 'Projects', 'welcome.l3': 'Contact', 'welcome.l4': 'Terminal',
    'welcome.tip': 'Tip: there are 6 hidden easter eggs. Try looking at the sky, or the ger…',

    'about.loc': 'Location', 'about.school': 'School', 'about.status': 'Status',
    'about.journey': 'Journey', 'about.langs': 'Languages', 'about.menu': 'File  Edit  View  Help',

    'sk.uptime': 'Coding uptime', 'sk.years': 'years', 'sk.coffee': 'Coffee level', 'sk.bugs': 'Bugs fixed',
    'sk.proc': 'Process', 'sk.load': 'Level', 'sk.tools': 'Tools', 'sk.graph': 'Inspiration load — live',
    'grp.frontend': 'Frontend', 'grp.backend': 'Backend', 'grp.design': 'Design',

    'pr.items': 'projects', 'pr.more': 'Open', 'pr.demo': 'Live demo', 'pr.code': 'Code · GitHub',
    'pr.role': 'My role', 'pr.stack': 'Stack', 'pr.lead': 'Click a project to open its details.',

    'ct.lead': "Collaboration, internships, feedback — write me anything. I'll answer!",
    'ct.to': 'To', 'ct.from': 'Your name', 'ct.subject': 'Subject', 'ct.msg': 'Hi! I saw your portfolio and…',
    'ct.send': 'Send', 'ct.copy': 'Copy email', 'ct.copied': 'Email address copied!',
    'ct.sending': 'Opening your mail app…', 'ct.socials': 'Links', 'ct.subjectDefault': 'Hello from your portfolio',
    'ct.need': 'Please write your name and a message.',

    'sh.lead': 'A traditional Mongolian game. Toss four ankle bones and see your luck for today!',
    'sh.throw': 'Toss shagai', 'sh.throws': 'Tosses', 'sh.horses': 'Horses',
    'sh.horse': 'Horse', 'sh.camel': 'Camel', 'sh.sheep': 'Sheep', 'sh.goat': 'Goat',
    'sh.r4': 'Four horses! Great luck is coming your way.', 'sh.r3': "Three horses — it's going to be a good day.",
    'sh.r2': 'Two horses — keep moving forward.', 'sh.r1': 'One horse — small, but a start.', 'sh.r0': 'No horses… toss again!',
    'sh.same': 'All the same — {x}! A rare toss.', 'sh.ready': 'Ready to toss?',

    'st.theme': 'Appearance', 'st.light': 'Light', 'st.dark': 'Dark', 'st.lang': 'Language',
    'st.scene': 'Wallpaper · Ulaanbaatar time', 'sc.auto': 'Auto', 'sc.dawn': 'Dawn', 'sc.day': 'Day', 'sc.dusk': 'Dusk', 'sc.night': 'Night',
    'st.sound': 'Sound', 'st.on': 'On', 'st.off': 'Off', 'st.eggs': 'Easter eggs found',
    'st.reboot': 'Reboot', 'st.reset': 'Reset easter eggs',

    'tr.lead': 'Thrown away, but not forgotten…', 'tr.empty': 'Empty trash', 'tr.noempty': "No way — these are memories. Not emptying.",
    'tr.pick': 'Pick a file to open it.',
    'tr.files': [
      ['old_portfolio_2019.html', "<marquee>My cool site</marquee>\n\nYes, I once used the marquee tag.\nEmbarrassing now. But everything started here."],
      ['bugs.txt', 'All bugs fixed. ✓\n\n(One is left. It is a feature.)'],
      ['semicolon.js', ';\n\n// The semicolon I hunted for 3 hours at 2 AM.'],
      ['motivation.mp3', "▶ 0:00 / 0:00\n\nThis file runs empty on Monday mornings.\nReloads after coffee."]
    ],

    'egg.found': 'Easter egg found!', 'egg.hidden': '??? — not found yet',
    'egg.sun': 'Master of the sky', 'egg.ger': 'Tea in the ger', 'egg.konami': 'Konami code', 'egg.sudo': 'sudo powers',
    'egg.trash': 'Memories in the trash', 'egg.coffee': 'Coffee time',
    'egg.all': "Congrats! You found every secret. Now all that's left is to get in touch 😉",
    'egg.tip': 'Eggs', 'ger.tea': 'The smell of milk tea drifts from the ger. Come in for a cup!',
    'sun.set': 'The sun sets…', 'sun.rise': 'The sun rises!',

    'sm.apps': 'Apps', 'sm.power': 'Shut down', 'sm.eggs': 'Easter eggs',
    'cx.refresh': 'Refresh', 'cx.scene': 'Toggle day/night', 'cx.terminal': 'Open terminal', 'cx.settings': 'Settings', 'cx.about': 'About NomadOS',

    'cr.title': 'OUT OF COFFEE',
    'cr.body': "The developer ran out of coffee, so NomadOS has paused. Recharging…",
    'cr.code': 'Error code: 0xC0FFEE',
    'cr.key': 'Press any key to continue',

    'w.min': 'Minimize', 'w.max': 'Maximize', 'w.close': 'Close',
    'tray.sound': 'Toggle sound', 'tray.lang': 'Switch language', 'tray.theme': 'Light/dark mode', 'tray.eggs': 'Easter eggs found',
    'clock.tz': 'Ulaanbaatar',

    'os.version': 'Version 1.0 "Steppe"',
    'os.body': 'Hand-written in HTML, CSS and JavaScript, without frameworks or templates. The wallpaper is drawn with SVG code and follows Ulaanbaatar time through dawn, day, dusk and night.',
    'os.made': 'Made by'
  }
};

const I18N = { lang: 'mn' };
const t = key => STRINGS[I18N.lang][key] ?? STRINGS.mn[key] ?? key;
const L = obj => (obj && typeof obj === 'object' && !Array.isArray(obj)) ? (obj[I18N.lang] ?? obj.mn) : obj;
