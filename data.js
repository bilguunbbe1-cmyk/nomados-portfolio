/* ==================================================================
   data.js — ХУВИЙН МЭДЭЭЛЭЛ
   ------------------------------------------------------------------
   Сайтын бүх хувийн мэдээлэл энэ ганц файлд байна.
   Текст бүр { mn: "...", en: "..." } гэсэн хоёр хэлтэй.
   ================================================================== */

window.PROFILE = {
  osName: "NomadOS",                                   // "Үйлдлийн систем"-ийн нэр

  name: { mn: "Билгүүн", en: "Bilguun" },
  initials: "Б",                                       // аватар дээрх үсэг
  username: "bilguun",                                 // терминалд харагдах нэр
  role: { mn: "Full-stack хөгжүүлэгч", en: "Full-stack Developer" },
  tagline: {
    mn: "Тал нутаг шиг уудам төсөөлөлтэй, код бүрдээ дэг журамтай.",
    en: "Imagination as wide as the steppe, discipline in every line of code."
  },
  status: { mn: "Дадлагын боломж хайж байна", en: "Open to internships" },
  location: { mn: "Улаанбаатар, Монгол", en: "Ulaanbaatar, Mongolia" },
  school: { mn: "СЭЗИС · Мэдээллийн системийн менежмент", en: "UFE · Management Information Systems" },

  bio: {
    mn: [
      "Сайн байна уу! Би Билгүүн — СЭЗИС-ийн оюутан, full-stack хөгжүүлэгч. React дээр интерфэйс бүтээж, Supabase эсвэл Node.js/Express дээр backend бичээд, санаагаа бодитоор ажилладаг, интернэтэд байршсан апп болгох дуртай.",
      "Төсөл бүрдээ жинхэнэ асуудлаас эхэлдэг: хуурамч цүнхнээс хамгаалах баталгааны сериал дугаар, тэнхимийн түүхийг хадгалах дижитал музей, продакшны багийн төсөл, санхүүг нэг дор удирдах самбар. Энэ портфолиог ч ердийн сайт бус, жижигхэн ертөнц болгохыг зорьсон."
    ],
    en: [
      "Hi! I'm Bilguun — a UFE student and full-stack developer. I build interfaces in React and backends with Supabase or Node.js/Express, and I love turning ideas into apps that are actually live on the internet.",
      "Each project starts from a real problem: serial-number certificates against counterfeit bags, a digital museum for my department's history, a dashboard for a production team's projects and finances. This portfolio tries to be a tiny world rather than just another website."
    ]
  },

  timeline: [
    { year: "2026.08", mn: "Studio Control — продакшны багийн удирдлагын самбар (Express + SQLite)", en: "Studio Control — a production team dashboard (Express + SQLite)" },
    { year: "2026.11", mn: "ISM Digital Museum — тэнхимийн интерактив музей (React + Supabase)", en: "ISM Digital Museum — an interactive department museum (React + Supabase)" },
    { year: "2026.11", mn: "Maison Erdene — Stripe төлбөртэй онлайн дэлгүүр", en: "Maison Erdene — an online shop with Stripe payments" },
    { year: "2026.11", mn: "NomadOS — та яг одоо дотор нь байна", en: "NomadOS — you're inside it right now" }
  ],

  skills: [                                            // level = 0–100
    { name: "JavaScript", level: 85, group: "frontend" },
    { name: "React", level: 80, group: "frontend" },
    { name: "HTML & CSS", level: 85, group: "frontend" },
    { name: "Tailwind CSS", level: 70, group: "frontend" },
    { name: "Supabase", level: 75, group: "backend" },
    { name: "PostgreSQL / RLS", level: 65, group: "backend" },
    { name: "Node.js / Express", level: 65, group: "backend" },
    { name: "Stripe API", level: 55, group: "backend" }
  ],
  tools: ["Git", "GitHub", "Vite", "Vercel", "Supabase", "VS Code"],
  languages: [
    { mn: "Монгол — төрөлх", en: "Mongolian — native" },
    { mn: "Англи", en: "English" }
  ],

  /* БҮТЭЭЛҮҮД */
  projects: [
    {
      id: "maison-erdene",
      year: "2026",
      title: { mn: "Maison Erdene", en: "Maison Erdene" },
      type: { mn: "SWE334 улирлын төсөл", en: "SWE334 term project" },
      image: "assets/projects/maison-erdene.jpg",
      short: { mn: "Баталгааны сериалтай тансаг цүнхний дэлгүүр", en: "A luxury bag shop with verifiable serials" },
      desc: {
        mn: "Тансаг зэрэглэлийн цүнхний онлайн дэлгүүр (зохиомол брэнд). Төлбөр Stripe-аар баталгаажмагц цүнх бүрд давтагдашгүй сериал дугаар олгогдож, жинхэнэ эсэхийг нь хэн ч /verify хуудсаар шалгана. Supabase Auth, RLS, Edge Functions болон Stripe webhook ашигласан.",
        en: "An online shop for luxury bags (a fictional brand). Once Stripe confirms a payment, each bag gets a unique serial number that anyone can check on the /verify page. Built with Supabase Auth, RLS, Edge Functions and a Stripe webhook."
      },
      role: { mn: "Санаа, дизайн, frontend ба backend", en: "Concept, design, frontend & backend" },
      stack: ["React", "Vite", "Tailwind CSS", "Supabase", "Stripe"],
      demo: "https://maison-erdene.vercel.app",
      code: "https://github.com/bilguunbbe1-cmyk/maison-erdene"
    },
    {
      id: "ism-digital-museum",
      year: "2026",
      title: { mn: "ISM Digital Museum", en: "ISM Digital Museum" },
      type: { mn: "Гэрийн даалгавар №1", en: "Homework #1" },
      image: "assets/projects/ism-digital-museum.jpg",
      short: { mn: "Тэнхимийн түүх, бүтээлийн интерактив музей", en: "An interactive museum of the department's history" },
      desc: {
        mn: "Мэдээллийн системийн менежментийн тэнхимийн түүх, багш нар, арга хэмжээ, оюутны бүтээлийг нэг дор хадгалах веб апп. «Time Machine» хэсгээр тэнхимийн замналыг он цагаар аялж үзнэ. Зочин, бүтээгч, админ гэсэн гурван эрхтэй, бүтээл админы хяналтаар нийтлэгдэнэ.",
        en: "A web app that keeps the ISM department's history, teachers, events and student work in one place. The \"Time Machine\" lets you travel through the department's timeline. Three roles — guest, creator and admin — with admin review before work is published."
      },
      role: { mn: "Бие даан — бүтэн стек", en: "Solo — full stack" },
      stack: ["React 19", "React Router", "Supabase", "PostgreSQL"],
      demo: "https://ism-digital-museum-nine.vercel.app",
      code: "https://github.com/bilguunbbe1-cmyk/ism-digital-museum"
    },
    {
      id: "studio-control",
      year: "2026",
      title: { mn: "Studio Control", en: "Studio Control" },
      type: { mn: "Бодит хэрэглээний төсөл", en: "Real-world project" },
      image: "assets/projects/studio-control.svg",
      short: { mn: "Продакшны багийн төсөл, санхүүгийн самбар", en: "Projects & finance dashboard for a studio" },
      desc: {
        mn: "Продакшн студийн төсөл, даалгавар, шийдвэр, ажилтан, санхүүг удирдах самбар. JWT нэвтрэлттэй, CEO / Менежер / Продакшн гэсэн гурван эрхийн түвшинтэй. Санхүү, цалингийн дүнг зөвхөн UI-д нуугаад зогсохгүй сервер талдаа хасдаг тул network-ээс ч харагдахгүй.",
        en: "A dashboard for a production studio's projects, tasks, decisions, staff and finances. JWT auth with three role tiers — CEO, Manager, Production. Financial and salary figures are stripped server-side, not just hidden in the UI, so they never appear in network responses."
      },
      role: { mn: "Бие даан — бүтэн стек", en: "Solo — full stack" },
      stack: ["React", "Vite", "Express", "SQLite", "JWT"],
      demo: "https://studio-control-khaki.vercel.app",
      code: "https://github.com/bilguunbbe1-cmyk/studio-control"
    },
    {
      id: "nomados",
      year: "2026",
      title: { mn: "NomadOS портфолио", en: "NomadOS portfolio" },
      type: { mn: "Бие даалт 2", en: "Assignment 2" },
      image: "assets/projects/nomados.svg",
      short: { mn: "Таны яг одоо үзэж буй сайт", en: "The very site you're looking at" },
      desc: {
        mn: "Framework-гүй, цэвэр HTML, CSS, JavaScript-ээр бичсэн үйлдлийн систем маягийн портфолио. Цонх удирдагч, терминал, шагай тоглоом, Улаанбаатарын цагаар өөрчлөгддөг ханын зураг бүгд гараар бичигдсэн.",
        en: "An OS-style portfolio in plain HTML, CSS and JavaScript — no frameworks. The window manager, terminal, shagai game and the wallpaper that follows Ulaanbaatar time are all hand-written."
      },
      role: { mn: "Санаа, дизайн, код", en: "Concept, design, code" },
      stack: ["HTML", "CSS", "Vanilla JS", "SVG"],
      demo: "",                                            // хоосон бол "Демо" товч харагдахгүй
      code: "https://github.com/bilguunbbe1-cmyk/nomados-portfolio"
    }
  ],

  contact: {
    email: "bilguunbbe1@gmail.com",
    github: "https://github.com/bilguunbbe1-cmyk",
    linkedin: "",                                      // хоосон бол харагдахгүй
    instagram: ""
  }
};
